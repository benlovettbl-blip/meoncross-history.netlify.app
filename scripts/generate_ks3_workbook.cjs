/**
 * History Revision Hub — Universal KS3 Declarative Workbook CLI & Pipeline
 *
 * Compiles 20-Page A4 Pupil Workbooks using the Declarative Universal KS3 Workbook Engine:
 * - Page 1: Publisher-Grade Front Cover with Pupil Portfolio & Department Customizer
 * - Pages 2–3: Living Timeline & Panoramic Dual-Coding Spread
 * - Pages 4–19: Double-Page Enquiry Spreads (Verso Evidence Launchpad + Recto Extended Writing)
 * - Page 20: Universal KS3 Back Cover (Assessment Ledger & QR Hub)
 *
 * Usage:
 *   node scripts/generate_ks3_workbook.cjs <unit_id>
 * Example:
 *   node scripts/generate_ks3_workbook.cjs early_modern_world
 */

const fs = require('fs');
const path = require('path');
const { renderKs3WorkbookToPdf } = require('./ks3_workbook_engine.cjs');

const ROOT_DIR = path.join(__dirname, '..');
const unitId = process.argv[2] || 'early_modern_world';

// Registry of Unit Configurations for KS3 Universal Engine
const UNIT_REGISTRY = {
  medieval_england: () => {
    const { lessonConfigs } = require('./render_medieval_england_twopage_workbook.cjs');
    const timelineMilestones = [
      {
        date: '1066',
        title: 'Milestone 1: 1066 & The Battle of Hastings',
        lesson: 'Lesson 1',
        summary:
          'Following the death of Edward the Confessor, Duke William of Normandy defeats King Harold II on Senlac Hill. The Norman cavalry and feigned retreat shatter the Anglo-Saxon shield wall, bringing nine centuries of Anglo-Saxon rule to a violent end.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the Norman cavalry charge, the Saxon shield wall, or King Harold struck by an arrow.',
        keyTerm: 'Housecarls & Shield Wall',
        exactDate: '14 October 1066',
      },
      {
        date: '1069–1086',
        title: 'Milestone 2: Castles, Harrying of the North & Domesday Survey',
        lesson: 'Lesson 2',
        summary:
          'William crushes Anglo-Saxon resistance through the brutal Harrying of the North and the rapid construction of over 500 timber motte-and-bailey castles. In 1086, he consolidates control with the Domesday Book, an unprecedented national land and tax audit.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch a timber motte-and-bailey castle, Portchester Castle keep, or the Great Domesday Book.',
        keyTerm: 'Motte & Domesday Audit',
        exactDate: '1069–1086',
      },
      {
        date: '1170',
        title: 'Milestone 3: Martyrdom of Archbishop Thomas Becket',
        lesson: 'Lesson 3',
        summary:
          'A bitter collision between King Henry II and his former friend Archbishop Thomas Becket over Church courts and criminous clerks culminates in Becket’s brutal assassination by four Norman knights in Canterbury Cathedral, forcing the Crown into humiliating public penance.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the Archbishop’s cross, the four knights in Canterbury Cathedral, or Henry II’s penance.',
        keyTerm: 'Benefit of Clergy',
        exactDate: '29 December 1170',
      },
      {
        date: '1215',
        title: 'Milestone 4: The Signing of Magna Carta at Runnymede',
        lesson: 'Lesson 4',
        summary:
          'Rebellious barons force King John to grant Magna Carta at Runnymede meadow near Windsor. Clause 39 guarantees that no free man can be imprisoned without lawful trial by his peers, establishing the revolutionary principle that the Crown is bound by the Rule of Law.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch King John with the Great Seal, the barons at Runnymede, or Clause 39 parchment.',
        keyTerm: 'Rule of Law & Due Process',
        exactDate: '15 June 1215',
      },
      {
        date: 'c.1250–1330',
        title: 'Milestone 5: Open-Field Village, Tithes & Doom Paintings',
        lesson: 'Lesson 5',
        summary:
          'Medieval peasant life is shaped by the open-field manorial system, week-work on the lord’s demesne, and the parish tithe. The Catholic Church exercises profound psychological control through terrifying parish Doom wall paintings depicting the flaming Hellmouth.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch an open-field strip farm, a church Doom painting with the Hellmouth, or a peasant harvesting with a sickle.',
        keyTerm: 'Manorialism & The Tithe',
        exactDate: '13th–14th Century',
      },
      {
        date: '1348–1350',
        title: 'Milestone 6: The Black Death & Breakdown of Serfdom',
        lesson: 'Lesson 6',
        summary:
          'Yersinia pestis arrives at Melcombe Regis, killing roughly half of England’s population in 18 months. The resulting acute labour shortage empowers surviving peasants to demand higher wages, shattering the foundations of feudal serfdom despite the 1351 Statute of Labourers.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch a bubo swelling, a mass plague burial trench, or peasants demanding higher wages.',
        keyTerm: 'Demographic Collapse',
        exactDate: '1348–1350',
      },
      {
        date: '1381',
        title: 'Milestone 7: The Peasants’ Revolt & The March on London',
        lesson: 'Lesson 7',
        summary:
          'Furious over the regressive Third Poll Tax and wage restrictions, rural commons led by Wat Tyler and radical priest John Ball march on London, sacking the Savoy Palace and storming the Tower. Richard II tricks the rebels at Smithfield, executing leaders but ending the poll tax.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch John Ball preaching on the green, the burning of the Savoy Palace, or the confrontation at Smithfield.',
        keyTerm: 'Poll Tax & Egalitarianism',
        exactDate: 'June 1381',
      },
      {
        date: '1455–1485',
        title: 'Milestone 8: The Wars of the Roses & The Battle of Bosworth',
        lesson: 'Lesson 8',
        summary:
          'Thirty years of dynastic slaughter between the House of Lancaster and House of York, driven by Henry VI’s weakness and bastard feudalism, culminates at Bosworth Field. Richard III is slain, and Henry VII marries Elizabeth of York, founding the Tudor dynasty.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the Red and White Roses, the blizzard at Towton, or Henry Tudor crowned at Bosworth Field.',
        keyTerm: 'Bastard Feudalism & Tudors',
        exactDate: '22 August 1485',
      },
    ];

    const subLabels = [
      'Battle of Hastings',
      'Castles & Domesday',
      'Henry II & Becket',
      'Magna Carta',
      'Village Life & Faith',
      'The Black Death',
      'Peasants’ Revolt',
      'Wars of the Roses',
    ];
    const overviewTitles = [
      'Why did William win at Hastings in 1066?',
      'How did William subjugate and control England?',
      'Why did Henry II clash with Thomas Becket?',
      'Magna Carta: Liberty or baronial power grab?',
      'What was life like in a medieval village?',
      'How did the Black Death transform society?',
      'Why did the peasants revolt in 1381?',
      'Why did the nobility tear England apart?',
    ];
    const syllabusTopics = [
      'Edward the Confessor, Stamford Bridge, Norman Cavalry & The Feigned Retreat.',
      'Motte-and-Bailey Fortresses, Harrying of the North & The Domesday Audit.',
      'Benefit of Clergy, Constitutions of Clarendon & The Canterbury Cathedral Murder.',
      'King John, Baronial Revolt, Runnymede, Clause 39 & Papal Annulment.',
      'The Three Estates, Manorial Dues, Tithes, Demesne & Church Doom Frescoes.',
      'Yersinia Pestis, Melcombe Regis, Demographic Collapse & Statute of Labourers.',
      'The Third Poll Tax, John Ball’s Sermon, Tower Executions & The Smithfield Climax.',
      'Lancaster vs York, Bastard Feudalism, Towton Blizzard & Bosworth Field.',
    ];
    const specBullets = [
      [
        'Death of Edward the Confessor & 1066 succession crisis',
        'Stamford Bridge victory & Harold’s 200-mile forced march south',
        'Senlac Hill tactics: housecarl shield wall vs Norman feigned retreat',
      ],
      [
        'Over 500 timber motte-and-bailey castles built to suppress Saxons',
        '1069–1070 Harrying of the North: scorched earth & 100,000 dead',
        '1086 Domesday Book: complete national fiscal and military survey',
      ],
      [
        'Royal common law vs Church canon courts: criminous clerks',
        '1164 Constitutions of Clarendon & Becket’s resistance and exile',
        '1170 cathedral assassination & Henry II’s 1174 public whipping penance',
      ],
      [
        'King John’s extortionate scutage taxes & loss of Normandy (1214)',
        '1215 Runnymede charter: Clause 12, Clause 39 & Clause 61',
        'Pope Innocent III’s annulment & the legacy of the Rule of Law',
      ],
      [
        'The Three Estates: those who fight, those who pray, those who work',
        'Manorial system: demesne land, week-work, heriot, and the church tithe',
        'Parish Doom frescoes: weighing of souls & the terror of the Hellmouth',
      ],
      [
        'June 1348 arrival of Black Death at Melcombe Regis (bubonic vs pneumonic)',
        '30% to 50% mortality: social collapse, mass pits & religious confusion',
        'Acute labour shortage, peasant wage bargaining & 1351 Statute of Labourers',
      ],
      [
        '1380 Third Poll Tax & John Ball’s radical egalitarian preaching',
        'Rebels storm London, burn Savoy Palace & execute Archbishop Sudbury',
        'Smithfield confrontation: death of Wat Tyler & Richard II’s retribution',
      ],
      [
        'Henry VI’s mental illness & Bastard Feudalism: private noble armies',
        '1461 Battle of Towton: the bloodiest slaughter on English soil',
        '1485 Battle of Bosworth: death of Richard III & the Tudor settlement',
      ],
    ];

    return {
      unitId: 'medieval_england',
      unitTitle: 'MEDIEVAL ENGLAND & THE STRUGGLE FOR POWER (1066–1485)',
      yearGroup: 'Year 7',
      yearNumber: 7,
      gDriveFolderName: 'Medieval England',
      subtitle: 'Conquest, Feudalism, Church vs Crown, Plague & Dynastic Civil War',
      dateRange: '1066–1485',
      overarchingEnquiry:
        'How was power won, maintained, contested, and transformed in Medieval England (1066–1485)?',
      coverImage: 'images/battle_of_hastings_painting.jpg',
      heroPhotoHeightMm: 42,
      coverPlate: {
        tag: 'Primary Oil Plate • Frank Wilkin (1820)',
        shelfmark: 'BATTLE ABBEY • EAST SUSSEX • ENGLISH HERITAGE',
        title: '‘The Battle of Hastings: Duke William Invades England’',
        description:
          'Monumental historic depiction of Duke William of Normandy leading his heavy cavalry and archers against King Harold II’s Anglo-Saxon shield wall on Senlac Hill, 14 October 1066.',
      },
      thematicStrands: [
        {
          title: 'Monarchy, Law & State Power',
          color: '#1e3a8a',
          trajectory:
            'Norman conquest autocracy → Royal justice & Clarendon → Magna Carta & Dynastic collapse (L1–L4, L8)',
        },
        {
          title: 'Feudal Economy & Military Tech',
          color: '#0369a1',
          trajectory:
            'Motte-and-bailey engineering → Domesday land audit → Post-plague market economy (L1, L2, L5, L6)',
        },
        {
          title: 'Catholic Hegemony & Ideology',
          color: '#b91c1c',
          trajectory:
            'Papal supremacy & Becket martyrdom → Doom paintings & tithes → Divine plague etiology (L3, L5, L6)',
        },
        {
          title: 'Popular & Baronial Resistance',
          color: '#15803d',
          trajectory:
            'Saxon rebellions & Hereward → Runnymede baronial revolt → 1381 Peasants’ March on London (L2, L4, L7)',
        },
      ],
      hubUrl: 'https://the-history-revision-hub.netlify.app/?unit=medieval_england',
      milestones: timelineMilestones,
      lessons: lessonConfigs.map((cfg, i) => ({
        ...cfg,
        shortTitle: subLabels[i] || `Lesson ${i + 1}`,
        overviewTitle: overviewTitles[i] || `Lesson ${i + 1}`,
        syllabusTopic: syllabusTopics[i] || '',
        specBullets: specBullets[i] || [],
        questionCount: 20,
      })),
      timelineCheckP2:
        'Why was William of Normandy able to maintain power over two million Anglo-Saxons using castles and the Domesday Book?',
      timelineCheckP3:
        'How did the demographic collapse of the Black Death and the Wars of the Roses destroy the medieval feudal system by 1485?',
      timelinePart1Title:
        'Living Unit Timeline • Part 1: Norman Conquest, Castles & Royal Authority (1066–1215)',
      timelinePart2Title:
        'Living Unit Timeline • Part 2: Village Life, Pestilence, Rebellion & Civil War (1250–1485)',
      quips: [
        'The History Department • Key Stage 3 Historical Studies • Year 7',
        'Power in medieval England was contested between King, Church, Barons, and the Peasantry.',
        'The Norman Conquest introduced feudal tenure, French language, and continental castles.',
        'Motte-and-bailey castles were psychological and military instruments of Norman subjugation.',
        'The Domesday Book of 1086 was Europe’s most comprehensive fiscal and military survey.',
        'Archbishop Thomas Becket defended Church autonomy against King Henry II’s royal courts.',
        'Clause 39 of Magna Carta laid the enduring foundations of due process and habeas corpus.',
        'Medieval peasants carried the economic weight of society through agricultural labour.',
        'Parish church Doom paintings visualised the divine terror of Judgment and eternal Hellfire.',
        'The Black Death killed 30% to 50% of England’s population, shattering feudal serfdom.',
        'Labour scarcity empowered surviving peasants to demand higher wages and freedom of movement.',
        'The 1381 Peasants’ Revolt was sparked by the regressive and unfair Third Poll Tax.',
        'John Ball preached radical equality: "When Adam delved and Eve span, who was then the gentleman?"',
        'Bastard Feudalism enabled ambitious nobles to wage private civil wars with liveried retainers.',
        'The Battle of Towton in 1461 remains the bloodiest single day of combat on English soil.',
        'The Battle of Bosworth in 1485 ended the Plantagenet dynasty and brought the Tudors to power.',
        'Historical sources must be interrogated for author purpose, perspective, and contemporary context.',
        'Analytical connectives build historical arguments: Consequently, This directly resulted in...',
        'Key Stage 3 Historical Studies • Pupil Assessment Record',
      ],
    };
  },

  early_modern_world: () => {
    const { lessonConfigs } = require('./render_early_modern_world_twopage_workbook.cjs');
    const timelineMilestones = [
      {
        date: '1453',
        title: 'Milestone 1: Fall of Constantinople & Ottoman Hegemony',
        lesson: 'Lesson 1',
        summary:
          'Sultan Mehmed II’s Ottoman forces breach the Byzantine walls using massive siege cannons. Controlling Constantinople and the Silk Road, the Ottoman Empire levies heavy transit taxes, forcing peripheral European crowns out onto the Atlantic to search for maritime routes to Asian spices.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the Ottoman siege cannon, Mehmed II’s galleys rolling over land, or Constantinople.',
        keyTerm: 'Ottoman Hegemony',
        exactDate: 'May 1453',
      },
      {
        date: '1494–1588',
        title: 'Milestone 2: Treaty of Tordesillas & Defeat of the Spanish Armada',
        lesson: 'Lesson 2',
        summary:
          'Pope Alexander VI divides the globe between Catholic Spain and Portugal (Treaty of Tordesillas). Protestant England strikes back through state-sponsored privateering (Drake, Hawkins). When Philip II sends the 1588 Armada to invade England, English fireships and storms scatter the fleet, unleashing English oceanic ambitions.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the 1494 Tordesillas meridian dividing the Atlantic, or Drake’s fireships scattering the Armada.',
        keyTerm: 'Mercantilism & Privateering',
        exactDate: '1494 / 1588',
      },
      {
        date: '1600–1615',
        title: 'Milestone 3: Foundation of the East India Company & Mughal Trade',
        lesson: 'Lesson 3',
        summary:
          'Elizabeth I charters the East India Company. English merchants operate as humble supplicants at the court of Mughal Emperor Jahangir, securing trade firmans to build fortified factories at Surat and Madras. Over time, commercial enclaves expand into private corporate armies and territorial rule.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Sir Thomas Roe bowing before Emperor Jahangir, or a fortified coastal trading factory at Surat.',
        keyTerm: 'Joint-Stock Factory',
        exactDate: '31 Dec 1600',
      },
      {
        date: '1605',
        title: 'Milestone 4: The Gunpowder Plot & Jacobean Surveillance State',
        lesson: 'Lesson 4',
        summary:
          'Disillusioned Catholic conspirators led by Robert Catesby conceal 36 gunpowder barrels beneath the House of Lords. Discovered on 4 November, Guy Fawkes is captured. Robert Cecil’s surveillance network weaponizes the conspiracy to enact ferocious anti-recusancy laws and solidify Protestant state identity.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the 36 barrels in the Parliament undercroft, the Monteagle letter, or Guy Fawkes.',
        keyTerm: 'Recusancy & Counter-Espionage',
        exactDate: '5 Nov 1605',
      },
      {
        date: '1642–1649',
        title: 'Milestone 5: The English Civil War & Execution of Charles I',
        lesson: 'Lesson 5',
        summary:
          "Constitutional collision over Divine Right, Ship Money, and religion plunges England into civil war. Parliament's New Model Army defeats Royalist forces. In January 1649, Charles I is executed outside Whitehall for treason against his own people; England becomes an unprecedented Puritan republic under Oliver Cromwell.",
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Charles I raising the royal standard at Nottingham, or the execution scaffold outside Whitehall.',
        keyTerm: 'Regicide & Parliamentary Sovereignty',
        exactDate: '30 Jan 1649',
      },
      {
        date: '1688–1694',
        title: 'Milestone 6: Glorious Revolution & Founding of the Bank of England',
        lesson: 'Lesson 6',
        summary:
          "James II deposed in the Glorious Revolution. William III and Mary II accept the 1689 Bill of Rights, establishing constitutional monarchy. In 1694, the Bank of England is founded, creating the National Debt; Britain's new fiscal-military state raises millions at low interest to build the Royal Navy into Europe's supreme fleet.",
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the 1689 Bill of Rights parchment, or the founding charter and gold vaults of the Bank of England.',
        keyTerm: 'Fiscal-Military State',
        exactDate: '1688 / 1694',
      },
      {
        date: 'c.1700–1780',
        title: 'Milestone 7: The Transatlantic Slave Trade & The Brookes',
        lesson: 'Lesson 7',
        summary:
          'British ports (Liverpool, Bristol, London) dominate the Triangular Trade. British ships force over 3 million enslaved Africans across the catastrophic Middle Passage into chattel slavery on Caribbean sugar estates. In 1788, the abolitionist plan of the slave ship Brookes exposes the industrial scale of human commodification.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the chilling cross-section diagram of the slave ship Brookes, or the triangular trade flow.',
        keyTerm: 'Triangular Trade & Chattel Slavery',
        exactDate: '18th Century',
      },
      {
        date: '1739–1760',
        title: 'Milestone 8: Jamaican Maroon Sovereignty & Tacky’s Rebellion',
        lesson: 'Lesson 8',
        summary:
          'Enslaved Africans actively resist the plantation machine through sabotage, cultural preservation, and armed insurrection. In Jamaica, Queen Nanny leads Maroon guerillas against British regiments, forcing the Crown to sign the 1739 Peace Treaty recognizing Maroon sovereignty—proving black agency long before parliamentary abolition.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Queen Nanny’s Blue Mountain fighters, the horn (abeng) signaling across ravines, or the 1739 Treaty.',
        keyTerm: 'Maroon Sovereignty & Agency',
        exactDate: '1739 / 1760',
      },
    ];

    const subLabels = [
      'Ottoman Power',
      'Early Empire',
      'Mughal India',
      'Jacobean State',
      'Civil War',
      'Glorious Rev.',
      'Atlantic Slave',
      'Resistance',
    ];
    const overviewTitles = [
      'Global Power in 1450',
      'Religious Zeal & Exploration',
      'Trade to Empire',
      'Gunpowder Plot & Terror',
      'The English Civil War',
      'The Financial Revolution',
      'Transatlantic Slave Trade',
      'Enslaved Resistance',
    ];
    const syllabusTopics = [
      'Ottoman Hegemony, Fall of Constantinople & European Periphery.',
      'Papal Bull, Treaty of Tordesillas & Spanish Armada.',
      'East India Company, Mughal Bengal & North American Trade.',
      'Recusancy Fines, 36 Barrels & Cecil’s Surveillance State.',
      'Divine Right Absolutism, Ship Money, Regicide & Cromwell.',
      'The 1688 Settlement, Bank of England & Fiscal State.',
      'Triangular Trade, The Brookes & The Middle Passage.',
      'Queen Nanny of the Maroons, Tacky’s Revolt & Abolition Agency.',
    ];
    const specBullets = [
      [
        '1453 Fall of Constantinople & Ottoman Silk Road taxes',
        'Ming China’s maritime retreat & Asian economic dominance',
        'European peripheral isolation & quest for spice routes',
      ],
      [
        '1494 Treaty of Tordesillas: Papal division of the globe',
        'Protestant privateering: Drake & Hawkins raid bullion',
        '1588 Spanish Armada defeat: English oceanic ambitions',
      ],
      [
        '1600 East India Company charter & Sir Thomas Roe in Agra',
        'Fortified coastal trading factories (Surat, Madras, Calcutta)',
        'EIC corporate armies & transition to territorial rule',
      ],
      [
        '1605 Gunpowder Plot: 36 barrels beneath Parliament',
        'Recusancy fines & James I’s Divine Right of Kings',
        'Robert Cecil’s surveillance network & Protestant identity',
      ],
      [
        'Divine Right vs Parliament: Ship Money & Personal Rule',
        '1642 Civil War outbreak & Cromwell’s New Model Army',
        '1649 Regicide of Charles I & the Puritan Republic',
      ],
      [
        '1688 Glorious Revolution & 1689 Bill of Rights',
        '1694 Bank of England & National Debt fund the Navy',
        'Britain’s transformation into a fiscal-military power',
      ],
      [
        'Triangular Trade architecture: outward, middle & homeward',
        'Horrors of Middle Passage & 1788 Brookes ship diagram',
        'Chattel slavery, sugar estates & human commodification',
      ],
      [
        'Covert resistance: sabotage, culture & work slowdowns',
        'Armed insurrections: 1760 Tacky’s Revolt in Jamaica',
        'Queen Nanny & Maroons win 1739 Sovereign Peace Treaty',
      ],
    ];

    return {
      unitId: 'early_modern_world',
      unitTitle: 'THE EARLY MODERN WORLD (1450–1750)',
      yearGroup: 'Year 8',
      yearNumber: 8,
      gDriveFolderName: 'Early Modern World',
      overarchingEnquiry:
        'How did religious conflict, oceanic exploration, constitutional civil war, and popular resistance transform Britain and the wider world?',
      coverImage: 'images/east_offering.jpg',
      coverPlate: {
        tag: 'Primary Painting Plate • Spiridione Roma (1778)',
        shelfmark: 'THE BRITISH LIBRARY • EAST INDIA HOUSE',
        title: '‘The East Offering Its Riches to Britannia’',
        description:
          'Spiridione Roma’s 1778 ceiling fresco commissioned for the East India Company House in Leadenhall Street, London, allegorically visualising the colonial extraction and transfer of Asian wealth to Britannia.',
      },
      thematicStrands: [
        {
          title: 'Sovereignty & Power',
          color: '#1e3a8a',
          trajectory: 'Divine Right → Civil War, Regicide & 1689 Settlement (L4–L6)',
        },
        {
          title: 'Exploration & Trade',
          color: '#0369a1',
          trajectory: 'Ottoman fall → Tordesillas → East India Co (L1–L3)',
        },
        {
          title: 'Religious Volatility',
          color: '#b91c1c',
          trajectory: 'Reformation → Gunpowder Plot & Puritan State (L2, L4, L5)',
        },
        {
          title: 'Enslaved Resistance',
          color: '#15803d',
          trajectory: 'Triangular Trade → The Brookes → Maroons & Nanny (L7, L8)',
        },
      ],
      hubUrl: 'https://the-history-revision-hub.netlify.app/?unit=early_modern_world',
      milestones: timelineMilestones,
      lessons: lessonConfigs.map((cfg, i) => ({
        ...cfg,
        shortTitle: subLabels[i] || `Lesson ${i + 1}`,
        overviewTitle: overviewTitles[i] || `Lesson ${i + 1}`,
        syllabusTopic: syllabusTopics[i] || '',
        specBullets: specBullets[i] || [],
        questionCount: 20,
      })),
      timelineCheckP2:
        'Why did the fall of Constantinople in 1453 force European crowns out onto the Atlantic Ocean?',
      timelineCheckP3:
        'How did the wealth generated by Atlantic trade and the 1688 financial settlement transform Britain into a global superpower?',
      timelinePart1Title:
        'Living Unit Timeline • Part 1: Global Encounter & Religious Crisis (1450–1605)',
      timelinePart2Title:
        'Living Unit Timeline • Part 2: Civil War, Finance & Enslaved Resistance (1642–1739)',
      quips: [
        'The History Department • Key Stage 3 Historical Studies • Year 8',
        'Trade routes like the Silk Road were engines of wealth, technology, and cultural exchange.',
        'Empires rose and fell on gunpowder, taxation, and bureaucratic organisation.',
        'The capture of Constantinople in 1453 shifted global trade away from the Mediterranean.',
        'European voyages were driven by gold, God, and competition for spices.',
        'Trade with Mughal India laid the foundations of the East India Company.',
        'In 1605, religious division erupted into the Gunpowder Plot beneath Parliament.',
        'The English Civil War pitted Divine Right against parliamentary sovereignty.',
        'The 1688 Glorious Revolution established a constitutional monarchy.',
        'The transatlantic slave trade relied on brutal exploitation and dehumanisation.',
        'Enslaved people constantly fought back through everyday sabotage and open rebellion.',
        'Historical evidence reveals multiple perspectives; always interrogate author motive.',
        'Primary sources are products of their time; cross-reference dispatches with material artifacts.',
        'Connectives build strong historical arguments: Consequently, This directly resulted in...',
        'Sustained criteria evaluation separates description from historical mastery.',
        'The 1689 Bill of Rights permanently subordinated the Crown to Parliament.',
        'Resistance was continuous: enslaved Africans rebelled at every stage of the trade.',
        'Queen Nanny used guerrilla warfare in the Blue Mountains to defeat British regulars.',
        'Abolition was won through political agitation, economic shifts, and African resistance.',
        'Key Stage 3 Historical Studies • Pupil Assessment Record',
      ],
    };
  },

  industrialisation_and_empire: () => {
    const rawData = require(
      path.join(ROOT_DIR, 'units', 'industrialisation_and_empire', 'data.js'),
    );
    const unitData = rawData.default || rawData.unitData || rawData;
    const { lessonConfigs } = require('./render_industrialisation_twopage_workbook.cjs');

    const timelineMilestones = [
      {
        date: '1784',
        title: 'Milestone 1: Henry Cort & The Metallurgical Revolution',
        lesson: 'Lesson 1',
        summary:
          'At Funtley Ironworks near Fareham, Hampshire, Henry Cort patents the reverberatory puddling furnace and grooved rolling mill. By transforming brittle pig iron into tough naval wrought iron without charcoal, Cort shatters reliance on Baltic iron, powering the steam revolution.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Cort’s puddling furnace, grooved rollers, or Portsmouth anchor trials.',
        keyTerm: 'Puddling Furnace & Grooved Rollers',
        exactDate: '1784',
      },
      {
        date: 'c.1780–1830',
        title: 'Milestone 2: The Factory System & Clock Discipline',
        lesson: 'Lesson 2',
        summary:
          'James Watt’s rotary steam engine and Richard Arkwright’s textile mechanisation shift labour from cottage hearths into steam mills. Workers, including thousands of pauper children, face 14-hour days governed by the relentless factory clock and mill fines.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the factory clock, a spinning mule, or a young child piecer crawling under a loom.',
        keyTerm: 'Clock Discipline & Textile Mills',
        exactDate: 'c.1780–1830',
      },
      {
        date: '1819',
        title: 'Milestone 3: The Peterloo Massacre & Demands for the Vote',
        lesson: 'Lesson 6',
        summary:
          '60,000 peaceful working-class men, women, and children gather at St Peter’s Field, Manchester, demanding parliamentary reform and the repeal of the Corn Laws. Terrified magistrates send the Manchester Yeomanry charging sabres drawn into the crowd, killing 18 and injuring 650.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the radical liberty cap banner, St Peter’s Field crowd, or Yeomanry sabre charge.',
        keyTerm: 'Peterloo Massacre & Six Acts',
        exactDate: '16 August 1819',
      },
      {
        date: '1832',
        title: 'Milestone 4: The Great Reform Act & Rotten Boroughs',
        lesson: 'Lesson 7',
        summary:
          'Following nationwide riots, burning castles, and the "Days of May" run on the banks, Parliament passes the Great Reform Act. 56 rotten boroughs like Old Sarum are disenfranchised, giving MPs to industrial cities like Manchester, but the vote is restricted to middle-class men.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the mound of Old Sarum, the burning of Nottingham Castle, or the 1832 Reform Act.',
        keyTerm: 'Rotten Boroughs & 1832 Act',
        exactDate: 'June 1832',
      },
      {
        date: '1842',
        title: 'Milestone 5: Edwin Chadwick’s Sanitary Report & Slum Mortality',
        lesson: 'Lesson 3',
        summary:
          'Edwin Chadwick’s 1842 Sanitary Report reveals that the average labourer lifespan in Manchester is just 17 years due to overflowing cesspools, contaminated wells, and typhus. Recurring cholera epidemics compel Parliament to pass the landmark 1848 Public Health Act.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Chadwick’s glazed drainage pipe, a cholera handbill, or John Snow’s Broad Street pump.',
        keyTerm: 'Sanitary Report & Public Health',
        exactDate: 'July 1842',
      },
      {
        date: '1851',
        title: 'Milestone 6: The Great Exhibition & The Living Standards Debate',
        lesson: 'Lesson 8',
        summary:
          'Queen Victoria and Prince Albert open the Great Exhibition in the Crystal Palace, showcasing Britain as the "Workshop of the World". While Optimist historians celebrate cheap consumer goods and railways, Pessimists point to persistent slum misery and physical degradation.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the Crystal Palace glass dome, a steam locomotive, or factory chimneys over slums.',
        keyTerm: 'Crystal Palace & Standard of Living',
        exactDate: 'May 1851',
      },
      {
        date: '1857',
        title: 'Milestone 7: The Indian Rebellion & The End of Company Rule',
        lesson: 'Lesson 5',
        summary:
          'Indian sepoys at Meerut revolt against East India Company rule, triggered by grease on Enfield rifle cartridges and deep resentment over the Doctrine of Lapse. The fierce conflict ends Company rule in 1858, transferring direct sovereign control to the British Crown.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch an Enfield rifle cartridge, the Red Fort at Delhi, or Queen Victoria’s Crown Raj badge.',
        keyTerm: '1857 Rebellion & Crown Raj',
        exactDate: 'May 1857',
      },
      {
        date: '1886',
        title: 'Milestone 8: High Imperial Hegemony & Walter Crane’s Map',
        lesson: 'Lesson 4',
        summary:
          'At the zenith of Victoria’s reign, Walter Crane publishes the Imperial Federation Map, showing British dominion across a quarter of the globe. Imperial expansion is maintained through the Royal Navy’s Two-Power Standard and fortified dockyards like Portsmouth.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Britannia ruling the globe, an ironclad battleship, or the Portsmouth Dockyard gates.',
        keyTerm: 'Imperial Federation & Royal Navy',
        exactDate: '1886',
      },
    ];

    const subLabels = [
      'Henry Cort & Iron',
      'Factory Labour',
      'Urban Health',
      'Empire & Trade',
      '1857 Rebellion',
      'Peterloo Massacre',
      '1832 Reform Act',
      'Living Standards',
    ];
    const overviewTitles = [
      'What powered the Industrial Revolution?',
      'Was factory work progress or punishment?',
      'Did industrialisation make towns unlivable?',
      'How was the British Empire built?',
      'How did India resist: 1857 Rebellion?',
      'How did ordinary people fight for a voice?',
      'Why was the 1832 Reform Act passed?',
      'Who truly benefited from industrialisation?',
    ];
    const syllabusTopics = [
      'Energy, Steam Power, Reverberatory Puddling & Naval Iron.',
      'Textile Mills, The Factory Clock, Child Labour & Work Discipline.',
      'Back-to-Back Slums, Cesspools, Cholera & The 1842 Sanitary Report.',
      'The Royal Navy, Portsmouth Dockyard, East India Company & Global Markets.',
      'Sepoy Grievances, Greased Cartridges, Meerut Uprising & Crown Raj.',
      'Corn Laws, St Peter’s Field (1819), Henry Hunt & The Six Acts.',
      'Rotten Boroughs, The "Days of May", Bristol Riots & Earl Grey’s Compromise.',
      'The Standard of Living Debate, Real Wages, Slums & Social Inequality.',
    ];
    const specBullets = [
      [
        'Transition from water wheels and charcoal to coal and Watt’s steam engine',
        'Henry Cort’s 1784 puddling furnace and grooved rolling mill at Funtley',
        'Naval trials at Portsmouth Dockyard; end of dependence on Baltic iron',
      ],
      [
        'Shift from agrarian rhythms to relentless factory clock-discipline',
        'Textile machines: spinning mules, power looms, and extreme physical hazards',
        'Pauper apprentices, child labour exploitation, and early Factory Acts',
      ],
      [
        'Rapid urbanisation: back-to-back housing, privies, and poisoned town wells',
        'The 1831–1854 cholera epidemics, miasma theory, and John Snow’s pump',
        'Edwin Chadwick’s 1842 Sanitary Report and the 1848 Public Health Act',
      ],
      [
        'The Two-Power Naval Standard and Portsmouth industrial dry docks',
        'The East India Company: corporate monopoly, private armies, and tea trade',
        'Global trade circuits: Indian cotton, Caribbean sugar, and British shipping',
      ],
      [
        'Long-term grievances: Doctrine of Lapse, heavy taxation, and religious fears',
        'The catalyst at Meerut: Enfield rifle cartridges greased with cow and pig fat',
        'Sieges of Delhi and Cawnpore; retribution; 1858 Government of India Act',
      ],
      [
        'Post-Waterloo economic depression, Corn Laws, and universal suffrage demands',
        'The 16 August 1819 peaceful meeting of 60,000 at St Peter’s Field, Manchester',
        'Manchester Yeomanry sabre charge; 18 dead; passage of the repressive Six Acts',
      ],
      [
        'Electoral corruption: rotten boroughs (Old Sarum) vs unrepresented industrial cities',
        'The reform crisis of 1831–1832: Lords rejection, Bristol riots, and bank runs',
        'The 1832 Great Reform Act: enfranchising middle-class men; working-class exclusion',
      ],
      [
        'The Optimist school (Clapham, Ashton): real wages, consumer goods, and railways',
        'The Pessimist school (Hammonds, Thompson): slum mortality, pollution, alienation',
        'Synoptic historical verdict: weighing economic gains against human suffering',
      ],
    ];

    const timelineMissions = [
      'Illustrate Milestone 1 on Page 2: Sketch Cort’s puddling furnace, grooved rollers, or Portsmouth anchor trials.',
      'Illustrate Milestone 2 on Page 2: Sketch the factory clock, an Arkwright water frame, or a child piecer under a loom.',
      'Illustrate Milestone 5 on Page 3: Sketch Chadwick’s glazed drainage pipe, a cholera handbill, or John Snow’s pump.',
      'Illustrate Milestone 8 on Page 3: Sketch the Royal Navy naval ensign, an East Indiaman, or Portsmouth Dockyard.',
      'Illustrate Milestone 7 on Page 3: Sketch an Enfield rifle cartridge, the Red Fort at Delhi, or Queen Victoria’s Crown Raj badge.',
      'Illustrate Milestone 3 on Page 2: Sketch the radical liberty cap banner, St Peter’s Field, or the Yeomanry sabre.',
      'Illustrate Milestone 4 on Page 2: Sketch the mound of Old Sarum, the burning of Nottingham Castle, or the 1832 Reform parchment.',
      'Illustrate Milestone 6 on Page 3: Sketch the Crystal Palace 1851 glass dome or factory chimneys over industrial slums.',
    ];

    const lessons = [
      {
        ...lessonConfigs[0],
        taskType: 'extended_writing',
        genre: 'Disciplinary Focus: Historical Significance',
        skill: 'Significance',
        timelineMission: timelineMissions[0],
        enquiryQuestion:
          'Enquiry: How significant was Henry Cort’s puddling process to British industrial and naval supremacy?',
        objectives: unitData.lessons[0].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[0].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'distinction',
          termA: 'Pig Iron',
          termB: 'Wrought Iron',
          prompt:
            'Distinguish between brittle high-carbon <strong>pig iron</strong> and tough low-carbon naval <strong>wrought iron</strong> refined at Funtley:',
        },
        bridgeTask: {
          title: 'Task 3: The Metallurgical Revolution: Domestic Innovation vs Foreign Dependency',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'Funtley Innovation: Cort’s Puddling & Grooved Rollers (1784)',
          col2Title: 'Naval & Industrial Impact: Shattering the Baltic Iron Bottleneck',
          synthesisPrompt:
            'Explain how Henry Cort’s breakthrough transformed British iron manufacturing and naval security:',
          clue: 'Notice that Portsmouth Dockyard master smiths proved Cort’s iron matched Swedish Orgrounds iron without imports.',
          scholarsEdge:
            '★ Scholar’s Edge: How did domestic iron production protect Britain from naval defeat during the Napoleonic Wars?',
        },
        structureStrip: lessonConfigs[0].structureStrip,
        connectives: lessonConfigs[0].connectives,
      },
      {
        ...lessonConfigs[1],
        taskType: 'extended_writing',
        genre: 'Disciplinary Focus: Change & Continuity',
        skill: 'Change & Continuity',
        timelineMission: timelineMissions[1],
        enquiryQuestion:
          'Enquiry: Was industrial work a triumph of human progress or a catastrophe of punishment for the working class?',
        objectives: unitData.lessons[1].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[1].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'mapping',
          prompt:
            'Write one historically accurate sentence connecting the mechanised <strong>pug mill</strong> to the mass production of durable <strong>Fareham Red bricks</strong>:',
        },
        bridgeTask: {
          title:
            'Task 3: The Industrial Labour Balance Sheet: Economic Progress vs Human Punishment',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'The Case for Progress (Factory Owners & National Wealth)',
          col2Title: 'The Working-Class Reality (Harsh Discipline & Child Labour)',
          synthesisPrompt:
            'Explain whether industrial work was primarily an engine of human progress or a system of punishment:',
          clue: 'Contrast the higher cash wages and factory goods with 14-hour days, dangerous machines, and mill fines.',
          scholarsEdge:
            '★ Scholar’s Edge: How did E.P. Thompson argue that industrialisation destroyed traditional rhythms of human labour?',
        },
        structureStrip: lessonConfigs[1].structureStrip,
        connectives: lessonConfigs[1].connectives,
      },
      {
        ...lessonConfigs[2],
        taskType: 'source_utility',
        genre: 'Disciplinary Focus: Dual-Source Utility',
        skill: 'Dual-Source Utility',
        timelineMission: timelineMissions[2],
        enquiryQuestion:
          'Enquiry: How useful are Sources A and B for investigating living conditions in Victorian industrial towns?',
        objectives: unitData.lessons[2].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[2].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'cloze',
          prompt: 'Complete the sentences using the core terms:',
          clozeText:
            'Victorian reformers believed disease spread through foul [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ], but Chadwick proved that municipal [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ] was essential to eradicate urban cholera epidemics.',
        },
        bridgeTask: {
          title:
            'Task 3: The Urban Sanitary Crisis: Statistical Indictment vs Laissez-Faire Inertia',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'Chadwick’s Statistical Indictment (1842 Sanitary Report)',
          col2Title: 'Laissez-Faire Resistance & Urban Reality (Ratepayers & Landlords)',
          synthesisPrompt:
            'Explain why living conditions in Victorian industrial towns were so deadly and difficult to reform:',
          clue: 'Examine the 17-year life expectancy in Manchester compared to 38 years in the countryside.',
          scholarsEdge:
            '★ Scholar’s Edge: Why did the widespread belief in "miasma" (bad air) delay clean drinking water and germ theory?',
        },
        sourceA: {
          title:
            'Source A: Edwin Chadwick, Report on the Sanitary Condition of the Labouring Population (1842)',
          shelfmark: 'POOR LAW COMMISSION • PARLIAMENTARY REPORT • JULY 1842',
          text: '“The annual loss of life from filth and bad ventilation is greater than the loss from death or wounds in any wars in which the country has been engaged in modern times. In the cellar dwellings of Manchester and Leeds, human excrement oozes through walls, and whole families sleep upon damp dung. The average age at death of the working class in Manchester is 17 years, compared to 38 years for the rural gentry.”',
          clue: 'Notice the deliberate comparison to wartime casualties designed to shock wealthy Parliamentarians into action.',
        },
        sourceB: {
          title: 'Source B: Minutes of the Fareham Local Board of Health (1850)',
          shelfmark: 'HAMPSHIRE RECORD OFFICE • 42M72/1 • FAREHAM BOARD OF HEALTH',
          text: '“Resolved: That the open ditch running from West Street behind the brewery into Fareham Creek constitutes an intolerable public nuisance and danger to health. Overflow from private cesspits and pigsties discharges continuously into the roadway, saturating the subsoil and poisoning adjacent wells from which inhabitants draw daily water. Cases of violent typhus fever have arisen immediately adjacent.”',
          clue: 'Notice how archival minutes from Hampshire prove that sanitary collapse affected southern market towns, not just northern cities.',
        },
        matrix: [
          {
            col: '1. CONTENT & CLAIMS',
            text: 'Extract specific details: 17-year lifespan in Manchester vs cesspools and typhus overflowing into Fareham wells.',
          },
          {
            col: '2. PROVENANCE & MOTIVE',
            text: 'Compare Chadwick’s national reforming agenda to shock MPs against a local council recording municipal health emergencies.',
          },
          {
            col: '3. HISTORICAL UTILITY',
            text: 'Judge how together they prove national urban squalor and the desperate necessity of the 1848 Public Health Act.',
          },
        ],
        connectives:
          'Source A provides statistical proof that... • This is corroborated by Source B, which demonstrates... • When evaluating Provenance, Chadwick wrote with the motive of... • Together, both sources are highly useful because...',
      },
      {
        ...lessonConfigs[3],
        taskType: 'extended_writing',
        genre: 'Disciplinary Focus: Causal Weighting & Prioritisation',
        skill: 'Causation',
        timelineMission: timelineMissions[3],
        enquiryQuestion:
          'Enquiry: Was the expansion of the British Empire primarily driven by naval military power or commercial profit?',
        objectives: unitData.lessons[3].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[3].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'distinction',
          termA: 'Chartered Monopoly (EIC)',
          termB: 'Two-Power Standard',
          prompt:
            'Distinguish between corporate commercial expansion (<strong>East India Company</strong>) and state naval deterrence (<strong>Two-Power Standard</strong>):',
        },
        bridgeTask: {
          title: 'Task 3: Pillars of Imperial Expansion: Royal Navy Firepower vs Corporate Trade',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'Naval Supremacy & Strategic Coaling (The Royal Navy)',
          col2Title: 'Commercial Extraction & Corporate Monopolies (East India Company)',
          synthesisPrompt:
            'Explain whether the British Empire was built primarily by naval firepower or commercial profit:',
          clue: 'Think about how commercial posts at Surat and Calcutta depended on the Royal Navy guarding sea lanes.',
          scholarsEdge:
            '★ Scholar’s Edge: Did Britain acquire its empire through deliberate state strategy or "in a fit of absence of mind"?',
        },
        structureStrip: lessonConfigs[3].structureStrip,
        connectives: lessonConfigs[3].connectives,
      },
      {
        ...lessonConfigs[4],
        taskType: 'extended_writing',
        genre: 'Disciplinary Focus: Causal Narrative & Transformation',
        skill: 'Causation & Narrative',
        timelineMission: timelineMissions[4],
        enquiryQuestion:
          'Enquiry: Explain the sequence of events that transformed a military mutiny in Meerut into the 1857 Indian Rebellion.',
        objectives: unitData.lessons[4].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[4].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'mapping',
          prompt:
            'Write one historically accurate sentence connecting the aggressive annexation policy of the <strong>Doctrine of Lapse</strong> to the grievances of Indian <strong>sepoys</strong> in 1857:',
        },
        bridgeTask: {
          title:
            'Task 3: The 1857 Rebellion Factor Matrix: Long-Term Oppression vs Short-Term Spark',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'Long-Term Grievances: Doctrine of Lapse, Heavy Taxes & Annexations',
          col2Title: 'Short-Term Catalyst: Enfield Cartridges & The Meerut Mutiny',
          synthesisPrompt:
            'Explain the sequence of causal factors that turned a military mutiny into a nationwide rebellion:',
          clue: 'Notice that Hindu and Muslim sepoys united when their religious beliefs were disregarded by British commanders.',
          scholarsEdge:
            '★ Scholar’s Edge: Why do modern Indian historians term 1857 the "First War of Independence" rather than the "Sepoy Mutiny"?',
        },
        structureStrip: lessonConfigs[4].structureStrip,
        connectives: lessonConfigs[4].connectives,
      },
      {
        ...lessonConfigs[5],
        taskType: 'source_utility',
        genre: 'Disciplinary Focus: Forensic Evidence & Utility',
        skill: 'Dual-Source Utility',
        timelineMission: timelineMissions[5],
        enquiryQuestion:
          'Enquiry: How useful are Sources A and B for investigating the events and significance of the Peterloo Massacre (1819)?',
        objectives: unitData.lessons[5].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[5].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'cloze',
          prompt: 'Complete the sentences using the core terms:',
          clozeText:
            'When 60,000 peaceful protestors gathered to demand the [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ], the panicked magistrates unleashed cavalry and subsequently passed the repressive [ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ].',
        },
        bridgeTask: {
          title: 'Task 3: St Peter’s Field Balance Sheet: Peaceful Reformers vs Elite Terror',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'The Reformers’ Peaceful Demands (Orator Hunt & 60,000 Commons)',
          col2Title: 'The Magistrates’ Violent Panic (Manchester Yeomanry Cavalry)',
          synthesisPrompt:
            'Explain why the authorities responded to the peaceful Peterloo demonstration with lethal cavalry violence:',
          clue: 'Consider how terrified the ruling class was of a French-style revolution in post-Napoleonic Britain.',
          scholarsEdge:
            '★ Scholar’s Edge: How did the Peterloo Massacre lead directly to the oppressive Six Acts and later parliamentary reform?',
        },
        sourceA: {
          title: 'Source A: Samuel Bamford, Passages in the Life of a Radical (1844)',
          shelfmark: 'RADICAL MEMOIR • MIDDLETON REFORM DELEGATION • AUGUST 1819',
          text: '“We were ordered to form columns and march four abreast. Not a stick was permitted among our ranks; our mottoes on the banners were ‘Liberty and Fraternity’ and ‘Annual Parliaments’. We marched in peaceful discipline, accompanied by our wives and young children in their cleanest Sunday attire. When the cavalry appeared, sabres flashed in the sunlight, and they struck mercilessly into the defenceless crowd.”',
          clue: 'Notice Bamford’s emphasis on Sunday clothes, women, and children to prove the crowd was peaceful, not an armed mob.',
        },
        sourceB: {
          title:
            'Source B: Official Report of the Manchester Magistrates to the Home Office (August 1819)',
          shelfmark: 'NATIONAL ARCHIVES • HO 42/192 • DISPATCH OF REV. CHARLES ETHELSTON',
          text: '“The magistrates observed the vast multitude assembling with banners of a most revolutionary character, marching in military array to bugle signals. Deeming the town of Manchester in imminent danger of immediate rebellion and plunder, the Riot Act was duly read. The civil constables being surrounded and overpowered, the Manchester Yeomanry were commanded to disperse the unlawful assembly.”',
          clue: 'Notice the magistrates justify their charge by claiming the town was in danger of immediate French-style rebellion.',
        },
        matrix: [
          {
            col: '1. CONTENT & CLAIMS',
            text: 'Contrast Bamford’s unarmed Sunday families against the Magistrates’ claim of an unlawful military rebel army.',
          },
          {
            col: '2. PROVENANCE & MOTIVE',
            text: 'Examine Bamford writing to honour working-class martyrs against magistrates writing to justify their panicked lethal assault.',
          },
          {
            col: '3. HISTORICAL UTILITY',
            text: 'Conclude that Source B is exceptionally useful for revealing elite paranoia of revolution, while Source A captures lived reality.',
          },
        ],
        connectives:
          'Source A claims the demonstration was disciplined and peaceful, stating... • In direct contradiction, Source B asserts... • When evaluating Provenance, the Magistrates were motivated to... • Overall, Source B is invaluable for revealing...',
      },
      {
        ...lessonConfigs[6],
        taskType: 'extended_writing',
        genre: 'Disciplinary Focus: Causal Weighting & Turning Point',
        skill: 'Causation',
        timelineMission: timelineMissions[6],
        enquiryQuestion:
          'Enquiry: Why was the Great Reform Act passed in 1832? Was it conceded out of fear of revolution or granted as a principled reform?',
        objectives: unitData.lessons[6].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[6].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'distinction',
          termA: 'Rotten Borough',
          termB: 'Pocket Borough',
          prompt:
            'Distinguish between a depopulated <strong>Rotten Borough</strong> (e.g. Old Sarum) and an aristocratic landowner-controlled <strong>Pocket Borough</strong>:',
        },
        bridgeTask: {
          title:
            'Task 3: The 1832 Reform Deadlock: Rotten Borough Corruption vs Popular Mobilisation',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'Rotten Boroughs & Disenfranchised Cities (Pre-1832 Squalor)',
          col2Title: 'Popular Pressure & The "Days of May" (Riots & Bank Runs)',
          synthesisPrompt:
            'Explain whether the 1832 Reform Act was granted as a principled reform or conceded out of terror of revolution:',
          clue: 'Notice that Old Sarum had 2 MPs with 3 voters, while Manchester and Birmingham had 0 MPs.',
          scholarsEdge:
            '★ Scholar’s Edge: Why did Earl Grey claim he reformed Parliament "in order to preserve" the power of the aristocracy?',
        },
        structureStrip: lessonConfigs[6].structureStrip,
        connectives: lessonConfigs[6].connectives,
      },
      {
        ...lessonConfigs[7],
        taskType: 'historical_interpretations',
        genre: 'Disciplinary Focus: Historiographical Debate (Capstone Essay)',
        skill: 'Historical Interpretations',
        timelineMission: timelineMissions[7],
        enquiryQuestion:
          'Enquiry: Who truly benefited from the Industrial Revolution? Evaluate the competing claims of the Optimists and the Pessimists.',
        objectives: unitData.lessons[7].learning_objectives?.scaffolded || [],
        doNow: (unitData.lessons[7].do_now?.items || []).map((i) => ({
          q: i.question,
          a: i.answer,
        })),
        vocabTask: {
          type: 'distinction',
          termA: 'Real Wages',
          termB: 'Urban Mortality',
          prompt:
            'Distinguish between purchasing power (<strong>Real Wages</strong>) and physical well-being (<strong>Urban Mortality</strong>):',
        },
        bridgeTask: {
          title: 'Task 3: The Standard of Living Ledger: Material Progress vs Human Cost',
          instruction:
            'Extract 3 key pieces of factual evidence into each column, then develop your argument below:',
          col1Title: 'The Optimist Case: Rising Wages, Cheaper Goods & Railway Travel',
          col2Title: 'The Pessimist Case: Urban Squalor, Pollution & Loss of Independence',
          synthesisPrompt:
            'Evaluate whether the Industrial Revolution improved or diminished the quality of life for the British working class:',
          clue: 'Distinguish between purely economic statistics (real wages) and lived human experience (health, family, dignity).',
          scholarsEdge:
            '★ Scholar’s Edge: How do Eric Hobsbawm and T.S. Ashton differ on the standard of living between 1780 and 1840?',
        },
        interp1: {
          title: 'Interpretation 1: Professor T.S. Ashton, The Industrial Revolution (1948)',
          badge: 'The Optimist Perspective',
          text: '“There are today in Britain more people who are fed, clothed, and housed better than their ancestors were. By 1850, the real wages of factory operatives had risen by at least 30%. Steam machinery made cotton clothes, pottery, soap, and tea accessible to ordinary families for the first time. The central fact of the Industrial Revolution is that it enabled Britain to support a surging population without mass famine.”',
          author: 'T.S. Ashton, Economic Historian, London School of Economics',
        },
        interp2: {
          title: 'Interpretation 2: E.P. Thompson, The Making of the English Working Class (1963)',
          badge: 'The Pessimist Perspective',
          text: '“The average working man remained very close to subsistence level at the very time when he was surrounded by evidence of colossal national wealth. What the worker suffered was not just economic exploitation, but a catastrophic destruction of his independence, family life, and health. Men, women, and children were enslaved to the unyielding factory clock, breathing poisonous dust and dying in filthy slums.”',
          author: 'E.P. Thompson, Social Historian & Author',
        },
        matrix: [
          {
            col: '1. THE OPTIMIST ARGUMENT',
            text: 'Extract Ashton’s evidence: 30% rise in real wages, affordable tea, cotton clothing, and avoidance of demographic famine.',
          },
          {
            col: '2. THE PESSIMIST ARGUMENT',
            text: 'Extract Thompson’s evidence: destruction of human independence, family breakdown, 14-hour clock discipline, and deadly slums.',
          },
          {
            col: '3. SYNTHESIS & VERDICT',
            text: 'Formulate your sustained verdict: did the long-term material gains justify the acute generational trauma suffered by the working class?',
          },
        ],
        connectives:
          'Interpretation 1 advances the Optimist case, arguing that... • Conversely, Interpretation 2 presents a devastating critique, asserting... • Weighing the historiographical debate, while Ashton proves real wages rose, Thompson rightly highlights... • Overall, I judge that...',
      },
    ];

    return {
      unitId: 'industrialisation_and_empire',
      unitTitle: 'INDUSTRIALISATION, EMPIRE & POPULAR POWER (1750–1901)',
      yearGroup: 'Year 8',
      yearNumber: 8,
      gDriveFolderName: 'Industrialisation and Empire',
      subtitle: 'Steam Power, Urban Squalor, Imperial Expansion & The Battle for Democracy',
      dateRange: '1750–1901',
      overarchingEnquiry:
        'How did coal, steam, imperial conquest, and working-class resistance transform Britain from an agrarian kingdom into an industrial empire?',
      coverImage: 'images/imperial_federation_map.jpg',
      heroPhotoHeightMm: 42,
      coverPlate: {
        tag: 'Primary Visual Plate • Walter Crane (1886)',
        shelfmark: 'COLONIAL & INDIAN EXHIBITION • BRITISH LIBRARY',
        title: '‘Imperial Federation: Map of the World’',
        description:
          'Walter Crane’s celebrated 1886 allegorical map visualising the global reach of the British Empire at its zenith, highlighting commercial trade routes, naval supremacy, and imperial federation.',
      },
      thematicStrands: [
        {
          title: 'Technology, Energy & Infrastructure',
          color: '#1e3a8a',
          trajectory:
            'Cort’s puddling → Watt’s steam engine → Railways & Crystal Palace (L1, L2, L8)',
        },
        {
          title: 'Labour, Slums & Public Health',
          color: '#0369a1',
          trajectory:
            'Factory clock & child labour → Chadwick’s Report → 1848 Health Act (L2, L3, L8)',
        },
        {
          title: 'Imperial Command & Armed Resistance',
          color: '#15803d',
          trajectory: 'Two-Power Standard & EIC → 1857 Indian Uprising → Crown Raj (L4, L5)',
        },
        {
          title: 'Popular Protest & The Franchise',
          color: '#b91c1c',
          trajectory: 'Peterloo Massacre → 1832 Reform Act → Chartist Petitions (L6, L7)',
        },
      ],
      hubUrl:
        'https://the-history-revision-hub.netlify.app/?view=interactive&unit=industrialisation_and_empire',
      milestones: timelineMilestones,
      lessons: lessons.map((l, i) => ({
        ...l,
        shortTitle: subLabels[i] || `Lesson ${i + 1}`,
        overviewTitle: overviewTitles[i] || `Lesson ${i + 1}`,
        syllabusTopic: syllabusTopics[i] || '',
        specBullets: specBullets[i] || [],
        questionCount: 20,
      })),
      timelineCheckP2:
        'How did steam power, coal, and Henry Cort’s iron breakthrough transform Britain from a rural agrarian nation into the "Workshop of the World"?',
      timelineCheckP3:
        'Why did economic growth create intense social conflict, leading to the 1832 Reform crisis and the 1857 Indian Rebellion?',
      timelinePart1Title:
        'Living Unit Timeline • Part 1: Coal, Steam, Iron & The First Stirrings of Protest (1784–1832)',
      timelinePart2Title:
        'Living Unit Timeline • Part 2: Slum Health, Imperial Expansion & The Fight for Democracy (1840–1901)',
      quips: [
        'The History Department • Key Stage 3 Historical Studies • Year 8',
        'Coal, iron, and steam power transformed Britain from an agrarian kingdom into the Workshop of the World.',
        'Henry Cort’s puddling process at Funtley shattered Britain’s dependence on imported foreign iron.',
        'The factory clock imposed an unyielding new discipline of time, replacing traditional agrarian rhythms.',
        'Pauper apprentices and young piecers carried the heavy physical burden of early textile mechanisation.',
        'Edwin Chadwick’s 1842 Sanitary Report exposed horrific slum mortality, forcing the 1848 Public Health Act.',
        'Cholera epidemics shattered laissez-faire complacency, proving that disease ignored class boundaries.',
        'Portsmouth Royal Navy Dockyard stood as the world’s largest industrial and military engineering complex.',
        'The Two-Power Standard ensured the Royal Navy commanded global sea lanes to protect British commerce.',
        'The East India Company wielded corporate armies and sovereign taxation until the catastrophic 1857 Uprising.',
        'The 1857 Indian Rebellion united Hindu and Muslim sepoys against British East India Company domination.',
        'The Peterloo Massacre of 1819 exposed the ruling aristocracy’s intense paranoia of working-class revolution.',
        'The 1832 Great Reform Act abolished rotten boroughs but conceded the franchise strictly to middle-class men.',
        'The Chartist movement presented three massive national petitions demanding universal male suffrage.',
        'Historiographical debates evaluate whether the Industrial Revolution improved or impoverished working-class life.',
        'Primary archival sources must always be interrogated for nature, origin, purpose, and author bias.',
        'Analytical connectives structure disciplined historical debate: Consequently, This directly resulted in...',
        'Sustained criteria evaluation distinguishes descriptive writing from genuine historical mastery.',
        'The 1886 Imperial Federation Map by Walter Crane visualised the global zenith of the British Empire.',
        'Key Stage 3 Historical Studies • Pupil Assessment Record',
      ],
    };
  },

  great_war_part2: () => {
    const { lessonConfigs } = require('./render_great_war_part2_twopage_workbook.cjs');
    const timelineMilestones = [
      {
        date: 'August 1914',
        title: 'Milestone 1: The Rush to the Colours & Lord Kitchener’s Appeal',
        lesson: 'Lesson 1',
        summary:
          'Following the German invasion of neutral Belgium, Lord Kitchener issues his call for 500,000 volunteers. Over 750,000 enlist in 8 weeks; Hampshire men flock to the Portsmouth Town Hall to form the 14th and 15th "Pompey Pals" Battalions.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Lord Kitchener’s pointing finger, the Pompey Pals crest, or lines of volunteers outside Portsmouth Town Hall.',
        keyTerm: 'Pals Battalions & Civic Duty',
        exactDate: 'August 1914',
      },
      {
        date: 'Oct–Nov 1914',
        title: 'Milestone 2: First Battle of Ypres & The Arrival of the Indian Corps',
        lesson: 'Lesson 3',
        summary:
          'As the German Schlieffen Plan stalls, the British Expeditionary Force faces annihilation at Ypres. 1.5 million Indian troops deploy to France; Sepoy Khudadad Khan wins the Victoria Cross at Hollebeke, plugging the Allied frontline at catastrophic cost.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch Khudadad Khan holding his machine-gun post at Hollebeke, or Indian sepoys arriving at Marseille.',
        keyTerm: 'Imperial Mobilisation & The BEF',
        exactDate: 'October 1914',
      },
      {
        date: 'May 1915',
        title: 'Milestone 3: The Shell Scandal & Women’s Industrial Mobilisation',
        lesson: 'Lesson 4',
        summary:
          'Acute shortage of high-explosive artillery shells on the Western Front exposes peacetime industrial paralysis. David Lloyd George establishes the Ministry of Munitions; over 1 million women ("Canary Girls") enter projectile factories to manufacture 76% of British shells.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch a Canary Girl packing TNT shells in a munitions factory, or the yellowing effects of toxic powder.',
        keyTerm: 'Total War & Canary Girls',
        exactDate: 'May 1915',
      },
      {
        date: '1 July 1916',
        title: 'Milestone 4: The First Day on the Somme & The Attrition Crisis',
        lesson: 'Lesson 2',
        summary:
          'Following a seven-day artillery bombardment of 1.5 million shells that fails to cut German barbed wire, British infantry advance into interlocking machine-gun fire. The British Army suffers 57,470 casualties on day one, decimating civilian Pals Battalions.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch uncut German barbed wire belts, Maxim machine-gun posts, or the cratered wasteland of No Man’s Land.',
        keyTerm: 'War of Attrition & Maxim Gun',
        exactDate: '1 July 1916',
      },
      {
        date: '1916–1917',
        title: 'Milestone 5: Conscription, Conscientious Objection & State Powers',
        lesson: 'Lesson 4',
        summary:
          'As voluntary recruitment dries up after the Somme, Asquith passes the 1916 Military Service Act introducing universal conscription. 16,000 conscientious objectors face military tribunals and hard labour, while DORA expands state control over daily civilian life.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch an absolutist conscientious objector before a military tribunal, or DORA curfew and rationing stamps.',
        keyTerm: 'Conscription & DORA Autocracy',
        exactDate: 'March 1916',
      },
      {
        date: 'Aug–Nov 1918',
        title: 'Milestone 6: The Hundred Days Offensive & All-Arms Warfare',
        lesson: 'Lesson 2',
        summary:
          'Following Germany’s failed Spring Offensive, Sir Douglas Haig orchestrates the Hundred Days Offensive. Integrating creeping barrages, Mark V tanks, aircraft reconnaissance, and elite Dominion assault corps, Allied forces breach the Hindenburg Line and force the 11 November Armistice.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch a Mark V tank breaking the Hindenburg Line, or coordinating aircraft and creeping artillery barrages.',
        keyTerm: 'All-Arms Combined Warfare',
        exactDate: '11 Nov 1918',
      },
      {
        date: '28 June 1919',
        title: 'Milestone 7: The Hall of Mirrors & The Treaty of Versailles',
        lesson: 'Lesson 5',
        summary:
          'The Allied Big Three (Clemenceau, Lloyd George, Wilson) impose harsh peace terms on the defeated German Republic. Article 231 forces Germany to accept total War Guilt, alongside £6.6 billion in reparations, disarmament (100,000 army, zero tanks), and territorial amputations.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the Hall of Mirrors at Versailles, the signing of Article 231, or the German delegate pen.',
        keyTerm: 'Article 231 & Reparations',
        exactDate: '28 June 1919',
      },
      {
        date: '1922',
        title: 'Milestone 8: Village Mourning & The Stubbington War Memorial',
        lesson: 'Lesson 6',
        summary:
          'In Stubbington, Hampshire, the local community erects a unique wooden shelter over the village pump on the green. Designed by the mother of local VAD volunteer Nancy Lowry, the shelter commemorates 67 local soldiers and civilians lost to the industrial slaughter of the Great War.',
        sketchPrompt:
          '✎ Dual-Coding Sketchpad: Sketch the wooden memorial shelter over the village green pump, Nancy Lowry’s nursing cross, or the bronze plaque.',
        keyTerm: 'Memorialisation & Lost Generation',
        exactDate: '1922',
      },
    ];

    const subLabels = [
      'Enlistment 1914',
      'Trench Warfare & Haig',
      'Empire Troops',
      'Home Front & DORA',
      'Versailles Peace 1919',
      'Stubbington & Lost Gen',
      'Capstone Assessment',
    ];

    const overviewTitles = [
      'Why did men volunteer in 1914?',
      'Did generals make trench horror worse?',
      'Why were colonial troops forgotten?',
      'How did war control daily British life?',
      'Did Versailles solve or create problems?',
      'How did the Lost Generation impact Stubbington?',
      'Capstone Synthesis: The Great War',
    ];

    const syllabusTopics = [
      'Lord Kitchener’s Recruitment Campaign, Pals Battalions & Domestic Coercion.',
      'Trench Architecture, Military Attrition & The Historiographical Haig Debate.',
      'The Imperial War Machine, Colonial Mobilisation & Postwar Erasure.',
      'Defence of the Realm Act (DORA), Conscription & The Female Home Front.',
      'The Paris Peace Conference, Article 231 & The Legacy of Versailles.',
      'Micro-History, Local Bereavement & The Stubbington War Memorial.',
      'Synoptic Capstone Assessment: Total War, Global Scope & Disciplinary Synthesis.',
    ];

    const specBullets = [
      [
        '1914 British voluntary mobilisation: Kitchener’s Call for 500,000 men',
        'Pals Battalions: Pompey Pals (14th & 15th Hampshire) & civic peer pressure',
        'Domestic coercion: White Feather movement, propaganda & Belgian atrocity stories',
      ],
      [
        'Trench system engineering: firebays, traverses, dugouts & machine-gun vectors',
        '1916 Battle of the Somme: 57,470 first-day casualties & defensive fire dominance',
        'Historians’ debate: "Butcher of the Somme" (Clark) vs "Technological Learner" (Terraine)',
      ],
      [
        '1.5 million Indian troops: Khudadad Khan VC & stabilizing Ypres in 1914',
        'BWIR munitions carriers & 140,000 Chinese Labour Corps logistic workers',
        'Imperial racial hierarchies, frontline restrictions & postwar memorial erasure',
      ],
      [
        'August 1914 DORA powers: press censorship, curfew, licensing & requisitioning',
        '1916 Military Service Act: conscription tribunals & conscientious objectors',
        '1 million "Canary Girls" in munitions factories & 1918 Representation of the People Act',
      ],
      [
        'The Big Three collision: Clemenceau (security) vs Lloyd George vs Wilson (14 Points)',
        'Treaty terms: Article 231 War Guilt, £6.6bn reparations & 100,000-man military limit',
        'Historiographical verdict: Keynes’ "Carthaginian Peace" vs modern revisionist balance',
      ],
      [
        'Demographic shock of the "Lost Generation" on small English agricultural villages',
        'The Stubbington Memorial Shelter (1922): unique village green pump architecture',
        'Micro-case study: Nancy Lowry (VAD nurse) & the 67 local fallen men on the memorial',
      ],
      [
        'Evaluating the four thematic strands across the 1914–1919 conflict',
        'Synthesis of military, domestic, imperial, and local evidence in extended writing',
        'Mastery of Edexcel criteria: direct answering, precise evidence, causation & sustained judgement',
      ],
    ];

    const doNows = [
      [
        { q: 'Which three nations formed the Triple Entente in 1907?' },
        {
          q: 'What revolutionary British battleship was launched in 1906, rendering older warships obsolete?',
        },
        {
          q: 'What was Kaiser Wilhelm II’s aggressive foreign policy aiming for a "place in the sun" called?',
        },
        { q: 'Where was Archduke Franz Ferdinand assassinated on 28 June 1914?' },
        {
          q: 'Which 1839 treaty guaranteeing Belgian neutrality did Germany violate, prompting Britain to declare war?',
        },
      ],
      [
        {
          q: 'How many men volunteered to join the British Army within the first eight weeks of August 1914?',
        },
        {
          q: 'What name was given to volunteer units allowing workmates and friends to enlist together?',
        },
        {
          q: 'Which local Hampshire Pals battalion was raised from dockers and clerks in Portsmouth?',
        },
        { q: 'What civilian organisation handed out symbols of cowardice to men not in uniform?' },
        {
          q: 'Which military plan did Germany use in 1914 aiming to defeat France in six weeks before fighting Russia?',
        },
      ],
      [
        {
          q: 'Why were trenches dug in a zigzag pattern with traverses rather than straight lines?',
        },
        {
          q: 'What lethal defensive weapon could fire up to 500 rounds per minute on the Western Front?',
        },
        {
          q: 'How many casualties did the British Army suffer on the first day of the Somme (1 July 1916)?',
        },
        { q: 'Who was the British Commander-in-Chief during the Battle of the Somme?' },
        {
          q: 'What military term describes wearing down an enemy through continuous losses until physical collapse?',
        },
      ],
      [
        { q: 'How many soldiers did the British Indian Army mobilise during the First World War?' },
        { q: 'Who was the first South Asian soldier to be awarded the Victoria Cross in 1914?' },
        {
          q: 'Which non-combat unit of 140,000 workers handled railway repairs and supply unloading in France?',
        },
        {
          q: 'Why were non-white colonial troops barred from combat on European frontlines by 1915?',
        },
        {
          q: 'What 1914 battle saw the Indian Corps plug critical gaps to prevent the fall of the Channel ports?',
        },
      ],
      [
        {
          q: 'What emergency act passed in August 1914 gave the British government sweeping autocratic powers?',
        },
        {
          q: 'What nickname was given to female munitions workers whose skin turned yellow from toxic TNT?',
        },
        {
          q: 'In what year did the British government introduce compulsory military conscription for single men?',
        },
        {
          q: 'What term describes men who refused to fight in the war on moral or religious grounds?',
        },
        {
          q: 'Which 1918 legislation granted the vote to women over 30 who met property qualifications?',
        },
      ],
      [
        {
          q: 'Which three Allied leaders dominated the 1919 Paris Peace Conference ("The Big Three")?',
        },
        {
          q: 'Which controversial clause in the Treaty of Versailles forced Germany to accept sole War Guilt?',
        },
        {
          q: 'How much money in war reparations was Germany ordered to pay to the Allies in 1921?',
        },
        {
          q: 'What was the maximum size allowed for the German Army under the disarmament terms of Versailles?',
        },
        {
          q: 'Which demilitarised zone was established along Germany’s western border with France?',
        },
      ],
      [
        {
          q: 'What local memorial shelter in Hampshire commemorates 67 fallen villagers from the Great War?',
        },
        {
          q: 'Who was the local VAD nurse commemorated on the Stubbington memorial whose mother designed the shelter?',
        },
        {
          q: 'In what month and year did the First World War end with the signing of the Armistice?',
        },
        {
          q: 'What term describes the total mobilisation of a society’s economy, industry, and civilians for war?',
        },
        {
          q: 'Which British economist warned in 1919 that Versailles would cause European economic ruin?',
        },
      ],
    ];

    const timelineMissions = [
      'Illustrate Milestone 1 on Page 2: Sketch Lord Kitchener’s appeal, the Pompey Pals crest, or lines of volunteers.',
      'Illustrate Milestone 4 on Page 2: Sketch uncut German barbed wire, Maxim machine-gun posts, or the Somme wasteland.',
      'Illustrate Milestone 2 on Page 2: Sketch Sepoy Khudadad Khan holding his machine-gun post at Hollebeke.',
      'Illustrate Milestone 3 on Page 2: Sketch a Canary Girl packing TNT shells, or Milestone 5 on Page 3 (tribunal).',
      'Illustrate Milestone 7 on Page 3: Sketch the Hall of Mirrors at Versailles, or the signing of Article 231.',
      'Illustrate Milestone 8 on Page 3: Sketch the wooden memorial shelter over the village pump, or Nancy Lowry’s nursing cross.',
      'Review all 8 Milestones across Pages 2–3 to synthesize your overarching historical argument.',
    ];

    return {
      unitId: 'great_war_part2',
      unitTitle: 'THE GREAT WAR (1914–1919)',
      yearGroup: 'Year 9',
      yearNumber: 9,
      gDriveFolderName: 'The Great War Part 2',
      subtitle: 'Voluntary Enlistment, Trench Warfare, Global Empire & The Peace of Versailles',
      dateRange: '1914–1919',
      overarchingEnquiry:
        'How did a single spark in Sarajevo ignite a global conflict that transformed the modern world?',
      coverImage: 'images/stubbington_memorial_1.jpg',
      coverPlate: {
        tag: 'Local Archival Primary Record • Memorialisation (1922)',
        shelfmark: 'FAREHAM ARCHIVES • HAMPSHIRE RECORD OFFICE',
        title: 'The Stubbington War Memorial Shelter on the Village Green',
        description:
          'Erected in 1922 over the historic village water pump, designed by the mother of VAD nurse Nancy Lowry, commemorating the 67 local soldiers and civilians lost to the industrial slaughter of the Great War.',
      },
      thematicStrands: [
        {
          title: 'State Control, Conscription & Versailles',
          color: '#1e3a8a',
          trajectory:
            'Voluntary enlistment → DORA autocracy & 1916 conscription → 1919 Versailles breakdown (L1, L2, L4, L5)',
        },
        {
          title: 'Industrialised Slaughter & Global Resources',
          color: '#0369a1',
          trajectory:
            'Trench engineering & Maxim guns → Munitions Shell Crisis → Imperial logistics & 1918 tanks (L2, L3, L4, L7)',
        },
        {
          title: 'Propaganda, War Guilt & Haig Revisionism',
          color: '#b91c1c',
          trajectory:
            'Kitchener jingoism → Attrition mindset & Haig debate → Article 231 War Guilt Clause (L1, L2, L5)',
        },
        {
          title: 'Conscientious Dissent, Munitions & Colonial Agency',
          color: '#15803d',
          trajectory:
            'Sepoy battlefield agency → Canary Girls industrial mobilization → Taranto mutiny & objectors (L3, L4, L6)',
        },
      ],
      hubUrl: 'https://the-history-revision-hub.netlify.app/?view=interactive&unit=great_war_part2',
      milestones: timelineMilestones,
      lessons: lessonConfigs.map((cfg, i) => ({
        ...cfg,
        shortTitle: subLabels[i] || `Lesson ${i + 1}`,
        overviewTitle: overviewTitles[i] || `Lesson ${i + 1}`,
        syllabusTopic: syllabusTopics[i] || '',
        specBullets: specBullets[i] || [],
        doNow: doNows[i] || [],
        timelineMission:
          timelineMissions[i] ||
          'Illustrate the milestone sketchpad on Pages 2–3 with your visual symbol.',
        questionCount: 20,
      })),
      timelineCheckP2:
        'Why did the failure of the Schlieffen Plan and the introduction of machine guns force armies into the trenches by winter 1914?',
      timelineCheckP3:
        'How did total home front mobilisation and combined-arms tactics in 1918 break the four-year deadlock of the Western Front?',
      timelinePart1Title:
        'Living Unit Timeline • Part 1: Outbreak, Mobilisation & The Attrition Deadlock (1914–1916)',
      timelinePart2Title:
        'Living Unit Timeline • Part 2: Conscription, Victory, Versailles & Remembrance (1916–1922)',
      quips: [
        'The History Department • Key Stage 3 Historical Studies • Year 9',
        'Industrialisation transformed war into a catastrophic clash of machinery, artillery, and chemical weapons.',
        'Lord Kitchener’s recruitment campaign mobilized 2.5 million voluntary British soldiers by late 1915.',
        'Pals Battalions harnessed intense local solidarity, but led to concentrated community devastation.',
        'Defensive technology—machine guns and barbed wire—dominated offensive infantry tactics in 1914–1917.',
        'The Battle of the Somme remains the bloodiest day in British military history (57,470 casualties).',
        'Historiographical interpretations of General Haig range from "Butcher" to "Technological Innovator".',
        'Over 4 million soldiers and non-combat labourers from across the British Empire served in the Great War.',
        'Indian soldiers plugged crucial frontline gaps at Ypres and Neuve Chapelle in autumn 1914.',
        '140,000 Chinese labourers sustained Allied logistics under hazardous conditions in northern France.',
        'DORA granted the British government unprecedented emergency powers over daily civilian life.',
        'Over 1 million female "Canary Girls" manufactured 76% of all British shells and munitions.',
        'The 1916 Military Service Act introduced compulsory conscription, opposed by 16,000 conscientious objectors.',
        'The Big Three at Versailles clashed over whether to crush, disarm, or rehabilitate post-war Germany.',
        'Article 231 forced Germany to accept sole moral and legal responsibility for Allied war losses.',
        'The "Lost Generation" left an indelible mark of bereavement on thousands of British towns and villages.',
        'The 1922 Stubbington War Memorial Shelter stands over the village pump as a unique community tribute.',
        'Historical sources must be interrogated for provenance, contemporary audience, and underlying motive.',
        'Connectives build disciplined historical analysis: Consequently, This directly resulted in, On balance...',
        'Key Stage 3 Historical Studies • Pupil Assessment Record',
      ],
    };
  },
};
UNIT_REGISTRY.great_war = UNIT_REGISTRY.great_war_part2;

async function main() {
  console.log(`\n======================================================`);
  console.log(`🚀 Universal KS3 Declarative Workbook Engine: [${unitId}]`);
  console.log(`======================================================\n`);

  if (!UNIT_REGISTRY[unitId]) {
    // If not in declarative registry, check if a unit-specific two-page renderer exists
    const fallbackScript = path.join(__dirname, `render_${unitId}_twopage_workbook.cjs`);
    if (fs.existsSync(fallbackScript)) {
      console.log(`Executing two-page workbook compiler: ${fallbackScript}...`);
      const { execSync } = require('child_process');
      execSync(`node "${fallbackScript}"`, { stdio: 'inherit', cwd: ROOT_DIR });
      return;
    }
    console.error(
      `❌ Error: Unit [${unitId}] is not registered in the Universal KS3 Workbook Engine.`,
    );
    process.exit(1);
  }

  const unitConfig = UNIT_REGISTRY[unitId]();
  const outputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  console.log(`Compiling 20-page A4 workbook for ${unitConfig.unitTitle}...`);
  const { htmlPath, pdfPath } = await renderKs3WorkbookToPdf(unitConfig, outputDir);

  // Synchronize to standard production destinations
  const prodPdfPath = path.join(ROOT_DIR, 'public', 'pdfs', `${unitId}_pupil_workbook.pdf`);
  const prodPdfV17 = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    `${unitId}_pupil_workbook_FINAL_V17.pdf`,
  );
  const distPdfV17 = path.join(ROOT_DIR, 'dist', 'pdfs', `${unitId}_pupil_workbook_FINAL_V17.pdf`);
  const distPdf = path.join(ROOT_DIR, 'dist', 'pdfs', `${unitId}_pupil_workbook.pdf`);
  const prodHtml1 = path.join(ROOT_DIR, 'public', 'units', unitId, 'pupil_workbook.html');
  const prodHtml2 = path.join(ROOT_DIR, 'units', unitId, 'pupil_workbook.html');

  fs.mkdirSync(path.dirname(distPdfV17), { recursive: true });
  fs.copyFileSync(pdfPath, prodPdfPath);
  fs.copyFileSync(pdfPath, prodPdfV17);
  fs.copyFileSync(pdfPath, distPdfV17);
  fs.copyFileSync(pdfPath, distPdf);
  fs.copyFileSync(htmlPath, prodHtml1);
  fs.copyFileSync(htmlPath, prodHtml2);
  console.log(`✅ Synchronized to production PDF: ${prodPdfPath}`);
  console.log(`✅ Synchronized to production V17 PDF: ${prodPdfV17}`);
  console.log(`✅ Synchronized to dist PDF: ${distPdfV17}`);

  // Synchronize to Google Drive Department File (if connected)
  const candidateFolders = [
    `G:\\My Drive\\AAMX\\Dep File\\Year ${unitConfig.yearNumber || 8}\\${unitConfig.gDriveFolderName || 'Early Modern World'}`,
    `G:\\My Drive\\AAMX\\Dep File\\Year 7\\${unitConfig.gDriveFolderName || 'Early Modern World'}`,
    `G:\\My Drive\\AAMX\\Dep File\\Year 8\\${unitConfig.gDriveFolderName || 'Early Modern World'}`,
    `G:\\My Drive\\AAMX\\RESOURCES\\pdfs`,
  ];
  for (const gDriveFolder of candidateFolders) {
    if (fs.existsSync(gDriveFolder)) {
      try {
        const gDriveFile1 = path.join(
          gDriveFolder,
          `${unitConfig.gDriveFolderName || 'Early Modern World'} Pupil Workbook.pdf`,
        );
        const gDriveFile2 = path.join(gDriveFolder, `${unitId}_pupil_workbook_FINAL_V17.pdf`);
        const gDriveFile3 = path.join(
          gDriveFolder,
          `${unitConfig.gDriveFolderName || 'Early Modern World'} Pupil Workbook (V18 - Ruled Lines Fixed).pdf`,
        );
        const gDriveFile4 = path.join(gDriveFolder, `${unitId}_pupil_workbook.pdf`);
        fs.copyFileSync(pdfPath, gDriveFile1);
        fs.copyFileSync(pdfPath, gDriveFile2);
        fs.copyFileSync(pdfPath, gDriveFile3);
        fs.copyFileSync(pdfPath, gDriveFile4);
        console.log(`✅ Synchronized to Google Drive: ${gDriveFile1}`);
      } catch (gErr) {
        console.warn(
          `⚠️ Warning: Could not write directly to Google Drive (${gDriveFolder}):`,
          gErr.message,
        );
      }
    }
  }

  console.log(`\n🎉 100% SUCCESS: KS3 Workbook for [${unitId}] compiled and synchronized!`);
}

main().catch((err) => {
  console.error('❌ Error compiling KS3 workbook:', err);
  process.exit(1);
});
