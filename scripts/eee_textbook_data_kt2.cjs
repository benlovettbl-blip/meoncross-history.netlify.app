/**
 * eee_textbook_data_kt2.cjs
 *
 * Publisher-Grade Textbook Data Module for Early Elizabethan England (1558–1588)
 * Key Topic 2: Challenges to Elizabeth at Home and Abroad, 1569–1588
 *
 * Grounded in the official Pearson Edexcel GCSE (9–1) History Specification (1HI0/B4)
 * and extracted directly from the Pearson Student Book and Revision Guide.
 */

module.exports = function getKt2Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT2',
    topicNumber: 2,
    title: 'Challenges to Elizabeth at Home and Abroad, 1569–1588',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Option B4 (1HI0/B4) &bull; Key Topic 2 Master Textbook',
    enquiry:
      'Why did domestic plots, Catholic conspiracies, and foreign rivalry push Elizabeth from fragile peace into total war with Spain by 1588?',
    coverImage: 'images/armada_portrait.jpg',
    caption:
      'Plate I: The Armada Portrait of Queen Elizabeth I (1588), attributed to George Gower. Elizabeth rests her hand upon the globe with the English fireships at Calais and the storm-wrecked Spanish fleet depicted in the background, symbolising divine favour and global dominion.',
    specTopics: [
      {
        num: 1,
        title: '1. Plots and Revolts at Home (1569–87)',
        bullets: [
          'Revolt of the Northern Earls (1569): Earls of Northumberland and Westmorland, Catholic grievances, and the Durham Cathedral mass.',
          'Papal Bull (1570): Regnans in Excelsis, excommunication, and statutory response in the 1571 Treasons Act.',
          'Catholic plots: Ridolfi (1571), Throckmorton (1583), Babington (1586), Walsingham’s spy network, and the execution of Mary Stuart (1587).',
        ],
        seq: '1569 Durham Mass &bull; 1570 Papal Bull &bull; 1586 Cipher Sting &bull; 1587 Execution',
        focus: 'Catholic Treason & Espionage',
      },
      {
        num: 2,
        title: '2. Relations with Spain, 1569–85',
        bullets: [
          'Commercial rivalry in the Americas: Spanish trade monopoly, illicit commerce, and privateering under letters of marque.',
          'Francis Drake: 1572 raid on Nombre de Dios, 1577–80 circumnavigation on Golden Hind, Cacafuego haul, and 1581 Deptford knighting.',
          'The Netherlands crisis: Duke of Alba, Spanish Fury at Antwerp (1576), Pacification of Ghent, and the 1584 Treaty of Joinville.',
        ],
        seq: '1572 Nombre de Dios &bull; 1579 Cacafuego &bull; 1581 Knighting &bull; 1584 Joinville Bloc',
        focus: 'Imperial Piracy & Cold War',
      },
      {
        num: 3,
        title: '3. Outbreak of War with Spain, 1585–88',
        bullets: [
          'Treaty of Nonsuch (1585): English military intervention, 7,400 troops under Leicester, and occupation of Flushing and Brill.',
          'Leicester’s campaign: accepting Governor-Generalship, clashes with States-General, lack of supplies, and desertions at Deventer and Zutphen.',
          'Drake’s Caribbean campaign (1585–86) and the 1587 Cadiz raid: ‘singeing the King of Spain’s beard’ and barrel staves crisis.',
        ],
        seq: 'Aug 1585 Nonsuch &bull; Jan 1586 Governor-Gen &bull; Apr 1587 Cadiz &bull; Staves Burned',
        focus: 'Direct War & Naval Strikes',
      },
      {
        num: 4,
        title: '4. The Spanish Armada, 1588',
        bullets: [
          'Philip II’s ‘Enterprise of England’: Medina Sidonia, coordination with Parma’s 27,000 veterans in Flanders, and logistical flaws.',
          'Naval technology: English race-built galleons, Hawkins’ design, long-range culverin gunnery, and crescent formation tactics.',
          'The decisive battles: Fireships at Calais (7 Aug), Battle of Gravelines (8 Aug), the ‘Protestant Wind’, and circumnavigation of Scotland/Ireland.',
        ],
        seq: 'Jul 1588 Crescent &bull; 7 Aug Fireships &bull; 8 Aug Gravelines &bull; Atlantic Wrecks',
        focus: 'Naval Tactics & Dynastic Victory',
      },
    ],
  };

  const EEE_COMPONENT_BANK = {
    // Page 3: KT 2.1 (Plots and Revolts at Home)
    p3: {
      keyFigure: {
        name: 'Sir Francis Walsingham',
        lifespan: '1532–1590',
        role: 'Principal Secretary & Spymaster General to Elizabeth I',
        significance:
          "Elizabeth's brilliant and ruthless director of intelligence. He established a vast clandestine network of 53 overseas informants, double-agents, and cryptographers to uncover and dismantle Catholic plots against the Queen's life.",
        actions: [
          'Recruited cryptographer Thomas Phelippes to decipher encrypted ciphers intercepted from Mary, Queen of Scots.',
          'Turned Catholic courier Gilbert Gifford into a double-agent, smuggling messages in waterproof beer barrels to trap Mary.',
          'Drafted the 1584 Bond of Association, legally binding English subjects to execute anyone plotting against Elizabeth.',
        ],
        image: getBase64Image('images/sir_francis_walsingham.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">COUNTER-ESPIONAGE &bull; 1586</span>
        </div>
        <h4 class="csb-title">The Anatomy of Walsingham's Intelligence Apparatus</h4>
        <div class="csb-body">
          Walsingham operated sixteenth-century Europe's most sophisticated counter-espionage network, relying on three coordinated pillars:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Intercept &amp; Decryption:</strong> Cryptographer Thomas Phelippes used letter-frequency analysis to break substitution ciphers and forged postscripts (adding a gallows emblem) to identify co-conspirators.</li>
            <li><strong>Agent Provocateurs &amp; Double-Agents:</strong> Catholic turncoats like Gilbert Gifford enabled correspondence to flow through Chartley Manor beer barrels, ensuring conspirators committed treason on paper.</li>
            <li><strong>Statutory Entrapment:</strong> Walsingham withheld arrests until Mary personally endorsed Elizabeth's murder, securing incontrovertible legal proof for her trial under the 1584 Bond of Association.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Walsingham turned the conspirators' own secrecy into their death trap, eliminating Mary Stuart without provoking the immediate domestic rebellion Elizabeth feared.
        </div>
      </div>
      `,
      bottomEnquiry: {
        q1: 'Why did Anthony Babington believe his correspondence with Mary, Queen of Scots was secure, and how did Walsingham exploit it?',
        q2: 'Explain why Pope Pius V’s 1570 papal bull transformed Mary Stuart from a troublesome refugee into an existential security threat.',
        q3: "‘The execution of Mary, Queen of Scots in 1587 was caused by Walsingham's espionage network rather than her own actions.’ How far do you agree?",
      },
    },

    // Page 5: KT 2.2 (Relations with Spain)
    p5: {
      keyFigure: {
        name: 'Sir Francis Drake',
        lifespan: '1540–1596',
        role: 'Naval Commander, Privateer & Global Circumnavigator',
        significance:
          "England's most famous 'sea dog' and naval strategist. His audacious privateering expeditions challenged the Spanish Empire's New World monopoly, enriched the English Crown, and proved English naval supremacy.",
        actions: [
          'Executed the historic 1577–1580 global circumnavigation aboard the Golden Hind, plundering Spanish Pacific settlements.',
          'Captured the Spanish galleon Cacafuego in 1579, returning to Plymouth with over £400,000 in silver and gold bullion.',
          'Publicly knighted by Queen Elizabeth aboard the Golden Hind at Deptford on 4 April 1581, defying King Philip II.',
        ],
        image: getBase64Image('images/sir_francis_drake.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">ECONOMIC WARFARE &bull; 1577–80</span>
        </div>
        <h4 class="csb-title">The Cacafuego Haul: Geopolitical Economic Warfare</h4>
        <div class="csb-body">
          Drake's privateering was not merely rogue piracy; it was state-sanctioned economic warfare against the Spanish Empire:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Imperial Disruption:</strong> Spanish colonial ports on the Pacific coast of Peru and Chile were unfortified because Spain assumed no foreign ship could navigate the Straits of Magellan.</li>
            <li><strong>Fiscal Windfall:</strong> Drake captured 26 tons of silver bullion, 80 pounds of gold, and 13 chests of coin—worth £400,000, exceeding the English Crown's entire annual income.</li>
            <li><strong>Geopolitical Defiance:</strong> Elizabeth paid off all foreign Crown debts, funded the Levant Company, and openly knighted Drake at Deptford, proving England would no longer bend to Spanish hegemony.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Drake's plunder demonstrated Spanish naval vulnerability, providing England with financial independence while driving Philip II toward armed invasion.
        </div>
      </div>
      `,
      bottomEnquiry: {
        q1: 'State two actions taken by Francis Drake during his 1577–1580 voyage that infuriated King Philip II of Spain.',
        q2: 'Explain why the assassination of William the Silent in July 1584 forced Elizabeth to abandon covert proxy warfare in the Netherlands.',
        q3: '‘Commercial rivalry was a more significant cause of Anglo-Spanish tension than religious differences between 1569 and 1585.’ How far do you agree?',
      },
    },

    // Page 7: KT 2.3 (Outbreak of War with Spain)
    p7: {
      keyFigure: {
        name: 'Robert Dudley, Earl of Leicester',
        lifespan: '1532–1588',
        role: 'Lieutenant-General of English Forces in the Low Countries',
        significance:
          "Elizabeth's lifelong favourite and leading military commander. He championed forward Protestant intervention in Europe, commanding the 7,400-strong English expeditionary force dispatched to the Netherlands in 1585.",
        actions: [
          'Appointed Lieutenant-General of English forces under the Treaty of Nonsuch, arriving in Flushing in December 1585.',
          'Enraged Elizabeth by accepting the title of Governor-General of the United Provinces in January 1586 without permission.',
          'Fought Spanish forces under the Duke of Parma at Zutphen (1586), failing to capture deep-water ports before returning in 1587.',
        ],
        image: getBase64Image('images/robert_dudley_earl_of_leicester.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">LOGISTICAL SABOTAGE &bull; 1587</span>
        </div>
        <h4 class="csb-title">The Cadiz Barrel Staves Disaster: Logistical Sabotage</h4>
        <div class="csb-body">
          Drake's raid on Cadiz harbour in April 1587 inflicted damage far beyond sinking Spanish warships:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Destruction of Cooperage:</strong> Drake burned over 1,700 tons of seasoned oak barrel staves stockpiled on the Cadiz wharves to build watertight casks for food, fresh water, and beer.</li>
            <li><strong>Unseasoned Wood Replacement:</strong> Philip II was forced to construct emergency casks from unseasoned green wood, which shrank, leaked, and rotted food supplies during the 1588 voyage.</li>
            <li><strong>Delayed Launch:</strong> The raid delayed the Armada's departure by more than twelve months, pushing the campaign into the stormy late-summer Atlantic weather window.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> By destroying naval cooperage, Drake ensured that Spanish provisions spoiled before the Armada reached the Channel, crippling crew stamina before battle commenced.
        </div>
      </div>
      `,
      bottomEnquiry: {
        q1: 'Identify the two ‘cautionary towns’ handed over by the Dutch under the 1585 Treaty of Nonsuch.',
        q2: 'Explain why Elizabeth was enraged by Leicester accepting the title of ‘Governor-General of the United Provinces’ in January 1586.',
        q3: '‘Drake’s raid on Cadiz in 1587 was more decisive in defeating the Spanish invasion than English operations in the Netherlands.’ How far do you agree?',
      },
    },

    // Page 9: KT 2.4 (The Spanish Armada)
    p9: {
      keyFigure: {
        name: 'Charles Howard, Lord Howard of Effingham',
        lifespan: '1536–1624',
        role: 'Lord High Admiral of England & Supreme Naval Commander',
        significance:
          'Supreme commander of English naval forces against the Spanish Armada. A skilled aristocrat who managed the fierce rivalries between hot-headed captains like Drake and Hawkins, coordinating the decisive fireship strike at Calais.',
        actions: [
          'Maintained strategic command of the English fleet at Plymouth, shadowing the Armada up the Channel without risking close-quarters melee.',
          'Approved and executed the midnight fireship attack on the Spanish anchorage at Calais on 7–8 August 1588.',
          'Directed the running artillery bombardment at the Battle of Gravelines, exploiting superior culverin range to batter Spanish galleons.',
        ],
        image: getBase64Image('images/spanish_armada_battle.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">NAVAL TACTICAL REVOLUTION &bull; 1588</span>
        </div>
        <h4 class="csb-title">The Culverin Revolution: Race-Built Galleons vs Floating Fortresses</h4>
        <div class="csb-body">
          The defeat of the Armada marked a revolutionary transformation in European naval warfare doctrine:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Ship Design:</strong> John Hawkins designed 'race-built' English galleons—longer, lower, faster, and more maneuverable than high-castled Spanish floating fortresses built for land armies.</li>
            <li><strong>Gunnery Tactics:</strong> English ships were armed with long-range culverins on four-wheeled truck carriages, allowing trained gunners to reload rapidly and fire 17-pound balls from distance.</li>
            <li><strong>Denying the Boarding Action:</strong> Spanish doctrine relied on short-range heavy cannons to disable rigging before boarding with soldiers. English captains maintained standoff distance, denying Spain close combat.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> The English replaced medieval hand-to-hand boarding with standoff broadside artillery warfare, establishing modern naval combat doctrine for centuries.
        </div>
      </div>
      `,
      bottomEnquiry: {
        q1: 'Describe the tactic used by the English navy on the night of 7 August 1588 to scatter the Spanish fleet anchored at Calais.',
        q2: 'Explain why the Duke of Parma’s invasion army was unable to embark on their barges and meet Medina Sidonia’s fleet.',
        q3: '‘The defeat of the Spanish Armada was caused primarily by poor weather rather than English naval tactics.’ How far do you agree?',
      },
    },
  };

  const leftSources = {
    // Page 2: KT 2.1 (Plots and Revolts at Home)
    p2: {
      sourceA: {
        type: 'MANUSCRIPT PROCLAMATION',
        date: 'November 1569',
        title: 'Proclamation of the Earls of Northumberland and Westmorland at Durham',
        image: getBase64Image('images/the_duke_of_norfolk_thomas_howard.jpg'),
        context:
          'Proclamation issued by Thomas Percy, Earl of Northumberland, and Charles Neville, Earl of Westmorland, upon storming Durham Cathedral, tearing up the English Book of Common Prayer, and celebrating Latin Catholic mass.',
        hingeQuestion:
          'How does this proclamation reveal whether the Northern Earls rebelled out of genuine religious devotion or aristocratic resentment against William Cecil’s centralizing Protestant council?',
      },
      sourceB: {
        type: 'DECRYPTED CIPHER INTERCEPT',
        date: '17 July 1586',
        title: 'Mary, Queen of Scots to Anthony Babington (Decrypted by Thomas Phelippes)',
        image: null,
        context:
          'The fatal letter intercepted by Sir Francis Walsingham’s intelligence network, in which Mary endorsed Babington’s plot to assassinate Elizabeth with the words: ‘Set the six gentlemen to work taking order upon the accomplishing of their design.’',
        hingeQuestion:
          'Why did Mary’s written approval of the ‘six gentlemen’ make her execution an unavoidable legal and political imperative under the 1584 Bond of Association?',
      },
    },

    // Page 4: KT 2.2 (Relations with Spain)
    p4: {
      sourceA: {
        type: 'DIPLOMATIC DISPATCH',
        date: 'April 1581',
        title: 'Spanish Ambassador Bernardino de Mendoza’s Furious Dispatch to Philip II',
        image: getBase64Image('images/king_philip_ii_of_spain.jpg'),
        context:
          'Written by Mendoza after Queen Elizabeth boarded the Golden Hind at Deptford and publicly knighted Francis Drake, directly rejecting Spanish demands that Drake be executed as an international pirate and his plunder returned.',
        hingeQuestion:
          'Why did Elizabeth’s public knighting of Drake mark an irreversible point of no return in Anglo-Spanish diplomatic relations?',
      },
      sourceB: {
        type: 'SPANISH VICEREGAL REPORT',
        date: '1568',
        title: 'Report of Don Martín Enríquez on the Battle of San Juan de Ulúa',
        image: null,
        context:
          'Spanish official report describing the surprise naval ambush against John Hawkins and Francis Drake’s fleet in Mexico, where Spanish warships attacked English vessels under a truce flag, sinking four ships and leaving Drake with an unyielding desire for vengeance.',
        hingeQuestion:
          'How did the Spanish betrayal at San Juan de Ulúa transform English privateering from commercial smuggling into a religious and patriotic vendetta?',
      },
    },

    // Page 6: KT 2.3 (Outbreak of War with Spain)
    p6: {
      sourceA: {
        type: 'ROYAL REPRIMAND',
        date: 'February 1586',
        title: 'Queen Elizabeth’s Furious Dispatch to Robert Dudley, Earl of Leicester',
        image: null,
        context:
          'Elizabeth’s blistering reprimand to Leicester after he accepted the title of ‘Governor-General of the United Provinces’ from the Dutch rebels, directly defying her strict orders that England was not seeking to seize Dutch sovereignty.',
        hingeQuestion:
          'Why did Leicester’s acceptance of executive power in the Netherlands threaten Elizabeth’s entire diplomatic justification for the 1585 Treaty of Nonsuch?',
      },
      sourceB: {
        type: 'NAVAL DISPATCH',
        date: '27 April 1587',
        title: 'Sir Francis Drake’s Dispatch to Sir Francis Walsingham from Cadiz Harbour',
        image: null,
        context:
          'Drake’s celebratory dispatch following his pre-emptive strike on Cadiz, reporting the destruction of thirty-six Spanish warships and the burning of thousands of tons of provisions, delaying the Armada’s departure by over a year.',
        hingeQuestion:
          'Why was the destruction of naval barrel staves and food casks at Cadiz more decisive in crippling the Armada than the destruction of Spanish galleons?',
      },
    },

    // Page 8: KT 2.4 (The Spanish Armada)
    p8: {
      sourceA: {
        type: 'SECRET MEMORANDUM',
        date: 'June 1588',
        title: 'The Duke of Medina Sidonia’s Secret Letter to King Philip II from Lisbon',
        image: null,
        context:
          'A desperate, candid appeal from Medina Sidonia begging King Philip II to cancel the Armada expedition, warning that the Spanish fleet was short of experienced gunners, lacked fresh provisions, and possessed no deep-water harbour to meet the Duke of Parma.',
        hingeQuestion:
          'How does Medina Sidonia’s private despair reveal the fatal strategic flaws inherent in Philip II’s plan to coordinate an invasion across the English Channel?',
      },
      sourceB: {
        type: 'OFFICIAL BATTLE REPORT',
        date: '8 August 1588',
        title: 'Lord Howard of Effingham’s Post-Gravelines Dispatch to Sir Francis Walsingham',
        image: null,
        context:
          'Lord Admiral Howard’s dispatch immediately following the Battle of Gravelines, describing how English fireships scattered the Spanish fleet at Calais and allowed English culverin gunners to batter Spanish hulls without boarding.',
        hingeQuestion:
          'Why did English naval commanders attribute their survival to divine intervention (‘Flavit Deus’) rather than solely to superior English gunnery and ship design?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Recusancy',
        def: 'Refusal to attend mandatory Church of England services, punished by statutory fines.',
      },
      {
        term: 'Papal Bull',
        def: 'An official formal proclamation issued by the Pope with the force of canon law.',
      },
      {
        term: 'Bond of Association',
        def: 'A 1584 pledge binding signatories to execute anyone attempting or benefiting from regicide.',
      },
      {
        term: 'Regicide',
        def: 'The deliberate murder of an anointed sovereign monarch, viewed as treason and cosmic sin.',
      },
    ],
    p4: [
      {
        term: 'Privateering',
        def: 'State-sanctioned piracy where armed merchant ships operated under government letters of marque.',
      },
      {
        term: 'Circumnavigation',
        def: 'Sailing entirely around the earth, achieved by Drake aboard the Golden Hind (1577–80).',
      },
      {
        term: 'Council of Blood',
        def: 'The Duke of Alba’s brutal military tribunal in the Netherlands executing thousands of Protestants.',
      },
      {
        term: 'Treaty of Joinville',
        def: 'Secret 1584 alliance uniting Spain and the French Catholic League against European Protestantism.',
      },
    ],
    p6: [
      {
        term: 'Treaty of Nonsuch',
        def: 'Formal 1585 treaty providing 7,400 English soldiers and cash subsidies to Dutch rebels.',
      },
      {
        term: 'Cautionary Towns',
        def: 'Strategic Dutch deep-water ports (Flushing and Brill) held by English garrisons as collateral.',
      },
      {
        term: 'Governor-General',
        def: 'Executive title accepted by Leicester in 1586, implying English sovereignty over the Dutch.',
      },
      {
        term: 'Barrel Staves',
        def: 'Seasoned oak wooden planks required to construct watertight casks for fresh water and food.',
      },
    ],
    p8: [
      {
        term: 'Crescent Formation',
        def: 'Defensive Spanish naval array protecting vulnerable supply hulks inside heavy outer galleons.',
      },
      {
        term: 'Culverin',
        def: 'Long-range English naval cannon firing a 17-pound ball with superior reload speed and range.',
      },
      {
        term: 'Fireship (Hellburner)',
        def: 'Wooden vessel packed with gunpowder, pitch, and cannon shot set ablaze and drifted into anchored fleets.',
      },
      {
        term: 'Protestant Wind',
        def: 'Violent south-westerly gale that blew the shattered Spanish Armada into the hostile North Sea.',
      },
    ],
  };

  return { coverConfig, componentBank: EEE_COMPONENT_BANK, leftSources, leftVocab };
};
