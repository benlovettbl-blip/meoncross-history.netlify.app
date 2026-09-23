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
  const gDriveFolder = `G:\\My Drive\\AAMX\\Dep File\\Year ${unitConfig.yearNumber || 8}\\${unitConfig.gDriveFolderName || 'Early Modern World'}`;
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
      fs.copyFileSync(pdfPath, gDriveFile1);
      fs.copyFileSync(pdfPath, gDriveFile2);
      fs.copyFileSync(pdfPath, gDriveFile3);
      console.log(`✅ Synchronized to Google Drive: ${gDriveFile1}`);
      console.log(`✅ Synchronized to Google Drive: ${gDriveFile3}`);
    } catch (gErr) {
      console.warn(
        `⚠️ Warning: Could not write directly to Google Drive (file may be open):`,
        gErr.message,
      );
    }
  }

  console.log(`\n🎉 100% SUCCESS: KS3 Workbook for [${unitId}] compiled and synchronized!`);
}

main().catch((err) => {
  console.error('❌ Error compiling KS3 workbook:', err);
  process.exit(1);
});
