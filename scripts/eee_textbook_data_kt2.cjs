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
      timeline: [
        {
          date: 'Nov 1569',
          title: 'Revolt of Northern Earls',
          text: 'Earls seize Durham Cathedral, restore Latin Mass; crushed by royal army; 450 executed.',
        },
        {
          date: 'Feb 1570',
          title: 'Papal Bull *Regnans in Excelsis*',
          text: 'Pope Pius V excommunicates Elizabeth; commands subjects to depose her on pain of anathema.',
        },
        {
          date: 'Jul 1586',
          title: 'Babington Cipher Decrypted',
          text: 'Phelippes deciphers Mary’s approval to assassinate Elizabeth; conspirators arrested and hanged.',
        },
        {
          date: '8 Feb 1587',
          title: 'Execution of Mary Stuart',
          text: 'Mary beheaded at Fotheringhay Castle under Bond of Association, eliminating Catholic figurehead.',
        },
      ],
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
      timeline: [
        {
          date: 'Sep 1568',
          title: 'Ambush at San Juan de Ulúa',
          text: 'Spanish warships betray Hawkins and Drake under truce flag; privateering becomes holy vendetta.',
        },
        {
          date: '1577–80',
          title: 'Global Circumnavigation',
          text: 'Drake traverses Straits of Magellan on Golden Hind; plunders Pacific coast of Spanish Americas.',
        },
        {
          date: 'Mar 1579',
          title: 'Capture of the *Cacafuego*',
          text: 'Drake seizes 26 tons of silver and gold bullion worth £400,000, wiping out English Crown debts.',
        },
        {
          date: '4 Apr 1581',
          title: 'Drake Knighted at Deptford',
          text: 'Elizabeth boards Golden Hind, publicly knighting Drake in defiance of King Philip II’s protests.',
        },
      ],
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
      timeline: [
        {
          date: 'Dec 1584',
          title: 'Treaty of Joinville',
          text: 'Secret alliance between Spain and French Catholic League; Elizabeth isolated against Spanish superpower.',
        },
        {
          date: 'Aug 1585',
          title: 'Treaty of Nonsuch',
          text: 'Elizabeth signs formal pact with Dutch rebels, dispatching 7,400 English troops under Leicester.',
        },
        {
          date: 'Jan 1586',
          title: 'Governor-General Clashes',
          text: 'Leicester accepts executive Dutch title without royal consent; Elizabeth infuriated; campaign founders.',
        },
        {
          date: 'Apr 1587',
          title: 'Raid on Cadiz Harbour',
          text: 'Drake destroys 36 Spanish ships and burns seasoned barrel staves, delaying Armada launch by a year.',
        },
      ],
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
      timeline: [
        {
          date: 'May 1588',
          title: 'Armada Departs Lisbon',
          text: 'Medina Sidonia commands 130 ships and 30,000 men to unite with Parma’s invasion army in Flanders.',
        },
        {
          date: '29 Jul 1588',
          title: 'Crescent Sighted off Cornwall',
          text: 'Armada enters English Channel in impenetrable crescent; English race-built galleons shadow from behind.',
        },
        {
          date: '7 Aug 1588',
          title: 'Calais Fireship Attack',
          text: 'Eight drifting fireships strike anchored Spanish fleet at midnight; panic scatters defensive formation.',
        },
        {
          date: '8 Aug 1588',
          title: 'Battle of Gravelines',
          text: 'English culverins batter isolated Spanish galleons; Protestant wind blows crippled Armada north.',
        },
      ],
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
        title: 'Source A: Proclamation of the Earls of Northumberland and Westmorland',
        type: 'Rebel Manifesto Proclaimed at Durham Cathedral',
        date: '15 November 1569',
        quote:
          'We, Thomas Earl of Northumberland and Charles Earl of Westmorland, the Queen’s true and faithful subjects... have taken upon us to assemble to reform all such disordered doings as have been brought about by certain new set-up nobles about the Queen’s Majesty, who have subverted the ancient nobility and the true ancient Catholic faith of this realm.',
        context:
          'Proclamation issued by the Northern Earls upon storming Durham Cathedral, tearing up the English Book of Common Prayer, and celebrating Latin Catholic mass.',
        hingeQuestion:
          'How does this proclamation reveal whether the Northern Earls rebelled out of genuine religious devotion or aristocratic resentment against William Cecil’s centralizing Protestant council?',
      },
      sourceB: {
        title: 'Source B: Mary Stuart’s Fatal Letter to Anthony Babington',
        type: 'Decrypted Cipher Intercept (Thomas Phelippes)',
        date: '17 July 1586',
        quote:
          'When all is prepared both within and without the realm, let the great design be set on foot... Then shall it be time to set the six gentlemen to work, taking order upon the accomplishing of their design, that I may be suddenly transported out of this place before Her Majesty’s forces can assemble.',
        context:
          'The fatal letter intercepted by Sir Francis Walsingham’s intelligence network, in which Mary endorsed Babington’s plot to assassinate Elizabeth with the words: ‘Set the six gentlemen to work.’',
        hingeQuestion:
          'Why did Mary’s written approval of the ‘six gentlemen’ make her execution an unavoidable legal and political imperative under the 1584 Bond of Association?',
      },
    },

    // Page 4: KT 2.2 (Relations with Spain)
    p4: {
      sourceA: {
        title: 'Source A: Ambassador Bernardino de Mendoza’s Dispatch to Philip II',
        type: 'Confidential Diplomatic Report to the Spanish Crown',
        date: '6 April 1581',
        quote:
          'The Queen has been at Deptford to feast on Drake’s ship... and there conferred upon him the accolade of knighthood, telling him that the King of Spain had demanded his head and she had a gilded sword with which to strike it off. This action is an intolerable insult to Your Majesty and an open defiance of your sovereign authority in the Indies.',
        context:
          'Written by Mendoza after Queen Elizabeth boarded the Golden Hind at Deptford and publicly knighted Francis Drake, directly rejecting Spanish demands that Drake be executed as an international pirate.',
        hingeQuestion:
          'Why did Elizabeth’s public knighting of Drake mark an irreversible point of no return in Anglo-Spanish diplomatic relations?',
      },
      sourceB: {
        title: 'Source B: Don Martín Enríquez’s Official Report on San Juan de Ulúa',
        type: 'Spanish Viceregal Dispatch to Madrid',
        date: 'September 1568',
        quote:
          'Finding these English heretic corsairs anchored insolently in our royal port, I gave orders that our armed galleons should hem them in... Although they pleaded a treaty of replenishment, we fell upon their flagship with artillery and small arms, sinking three of their vessels and slaying many heretics. The pirate Drake and Hawkins escaped by flight in two small barks.',
        context:
          'Spanish official report describing the surprise naval ambush against John Hawkins and Francis Drake’s fleet in Mexico, where Spanish warships attacked English vessels under a truce flag, leaving Drake with an unyielding desire for vengeance.',
        hingeQuestion:
          'How did the Spanish betrayal at San Juan de Ulúa transform English privateering from commercial smuggling into a religious and patriotic vendetta?',
      },
    },

    // Page 6: KT 2.3 (Outbreak of War with Spain)
    p6: {
      sourceA: {
        title: 'Source A: Queen Elizabeth’s Royal Reprimand to Leicester',
        type: 'Crown Royal Dispatch to the Low Countries',
        date: '10 February 1586',
        quote:
          'We could never have imagined that a man raised up by ourself, and extraordinarily favoured by us above any other subject of this land, would in such contempt of our commandment have broken our instructions... Our express pleasure therefore is that all delays set apart, you do upon your allegiance resign that government and title which you have taken upon you.',
        context:
          'Elizabeth’s blistering reprimand to Leicester after he accepted the title of ‘Governor-General of the United Provinces’ from the Dutch rebels, directly defying her strict orders that England was not seeking to seize Dutch sovereignty.',
        hingeQuestion:
          'Why did Leicester’s acceptance of executive power in the Netherlands threaten Elizabeth’s entire diplomatic justification for the 1585 Treaty of Nonsuch?',
      },
      sourceB: {
        title: 'Source B: Sir Francis Drake’s Cadiz Dispatch to Walsingham',
        type: 'Eyewitness Naval Dispatch from Cadiz Harbour',
        date: '27 April 1587',
        quote:
          'We have sunk, burned, and brought away four and thirty great ships of the King of Spain, laden with provisions and naval munition... We have also burned great stores of seasoned timber and barrel staves prepared for their casks, so that the King of Spain shall have much ado to find water casks for his fleet. Assure Her Majesty that by God’s grace we have singed the King of Spain’s beard.',
        context:
          'Drake’s celebratory dispatch following his pre-emptive strike on Cadiz, reporting the destruction of thirty-four Spanish warships and the burning of thousands of tons of provisions, delaying the Armada’s departure by over a year.',
        hingeQuestion:
          'Why was the destruction of naval barrel staves and food casks at Cadiz more decisive in crippling the Armada than the destruction of Spanish galleons?',
      },
    },

    // Page 8: KT 2.4 (The Spanish Armada)
    p8: {
      sourceA: {
        title: 'Source A: Duke of Medina Sidonia’s Secret Letter to Philip II',
        type: 'Confidential Spanish Flagship Memorandum',
        date: '24 June 1588',
        quote:
          'I must represent to Your Majesty that our fleet is in very bad condition... We are short of experienced mariners and skilled gunners; the provisions of bread and beef are already rotting and spoiled by damp casks, and the water is foul. Furthermore, we have no safe deep-water port in Flanders where our great ships can ride to join with the Prince of Parma. I beseech Your Majesty to consider whether this voyage can succeed.',
        context:
          'A desperate, candid appeal from Medina Sidonia begging King Philip II to reconsider the Armada expedition, warning that the Spanish fleet was short of experienced gunners, lacked fresh provisions, and possessed no deep-water harbour to meet the Duke of Parma.',
        hingeQuestion:
          'How does Medina Sidonia’s private despair reveal the fatal strategic flaws inherent in Philip II’s plan to coordinate an invasion across the English Channel?',
      },
      sourceB: {
        title: 'Source B: Lord Howard of Effingham’s Post-Gravelines Dispatch',
        type: 'Official English Admiralty Report to Privy Council',
        date: '8 August 1588',
        quote:
          'Their force is wonderful great and strong, yet we pluck their feathers by little and little... The fireships put them from their anchors at Calais in great disorder, and this morning we have had a very sharp fight with them off Gravelines, wherein we have battered their great galleons through and through with our culverins, while our agile ships kept their distance and received little hurt.',
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
