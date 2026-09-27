/**
 * eee_textbook_data_kt3.cjs
 *
 * Publisher-Grade Textbook Data Module for Early Elizabethan England (1558–1588)
 * Key Topic 3: Elizabethan Society in the Age of Exploration, 1558–1588
 *
 * Grounded in the official Pearson Edexcel GCSE (9–1) History Specification (1HI0/B4)
 * and extracted directly from the Pearson Student Book and Revision Guide.
 */

module.exports = function getKt3Data(helpers) {
  const { getBase64Image } = helpers;

  const coverConfig = {
    ktId: 'KT3',
    topicNumber: 3,
    title: 'Elizabethan Society in the Age of Exploration, 1558–1588',
    subtitle:
      'Pearson Edexcel GCSE (9–1) History &bull; Paper 2 Option B4 (1HI0/B4) &bull; Key Topic 3 Master Textbook',
    enquiry:
      'How did expanding humanist education, the crisis of rural vagrancy, and audacious global voyages transform domestic society and project English power onto the world stage?',
    coverImage: 'images/roanoke_colony.jpg',
    caption:
      'Plate I: Governor John White discovers the deserted settlement of Roanoke Island in August 1590, finding the single word ‘CROATOAN’ carved upon a wooden palisade post—the enduring enigma of the ‘Lost Colony’.',
    specTopics: [
      {
        num: 1,
        title: '1. Education and Leisure',
        bullets: [
          'Expansion of education: petty schools, grammar schools (Latin, Greek, rhetoric), university growth, and the Inns of Court.',
          'Gender and class stratification: education of noble girls at home vs limited schooling for ordinary labourers.',
          'Leisure pursuits: noble hunting and hawking, popular football and bear-baiting; the rise of purpose-built public theatres.',
        ],
        seq: 'Petty Schools &bull; Grammar School Latin &bull; Inns of Court &bull; 1576 The Theatre Built',
        focus: 'Humanist Learning & Secular Theatre',
      },
      {
        num: 2,
        title: '2. The Problem of the Poor',
        bullets: [
          'Causes of poverty: population boom (2.8m to 4m), bad harvests, rising food prices, coin debasement, and Antwerp cloth collapse.',
          'Agrarian change: enclosure of common land, rack-renting, and conversion from arable farming to sheep pasture.',
          'Attitudes and legislation: Impotent vs Idle Poor; Thomas Harman’s Caveat; 1572 Vagabonds Act and 1576 Poor Relief Act.',
        ],
        seq: 'Population Boom &bull; Enclosure &bull; 1572 Ear Boring/Rates &bull; 1576 Bridewells',
        focus: 'Agrarian Dislocation & State Welfare',
      },
      {
        num: 3,
        title: '3. Exploration & Discovery',
        bullets: [
          'Commercial drivers: collapse of Antwerp trade, joint-stock companies (Muscovy, Levant), and search for the North-West Passage.',
          'Navigational advances: magnetic compass, astrolabe, quadrant, 1569 Mercator projection map, and race-built galleons.',
          'Drake’s global circumnavigation (1577–80): Pacific plunder, Cacafuego haul, claiming Nova Albion, and spice trade at Ternate.',
        ],
        seq: 'Joint-Stock Trade &bull; Mercator Map &bull; 1579 Cacafuego &bull; 1580 Circumnavigation',
        focus: 'Scientific Navigation & Global Trade',
      },
      {
        num: 4,
        title: '4. Raleigh & Virginia',
        bullets: [
          'Walter Raleigh’s colonial vision: royal patent (1584), trade benefits, bases against Spanish treasure, and 1584 reconnaissance.',
          'The 1585 Roanoke colony: Ralph Lane, grounding of the Tiger, food shortages, conflict with Secotan tribe, and Wingina’s murder.',
          'The 1587 ‘Lost Colony’: John White, families and Virginia Dare, delayed return due to 1588 Armada, and the ‘CROATOAN’ mystery.',
        ],
        seq: '1584 Patent &bull; 1585 Lane’s Colony &bull; 1587 White’s Settlement &bull; 1590 Croatoan',
        focus: 'Early Empire & Strategic Foundations',
      },
    ],
  };

  const EEE_COMPONENT_BANK = {
    // Page 3: KT 3.1 (Education and Leisure)
    p3: {
      keyFigure: {
        name: 'James Burbage',
        lifespan: '1531–1597',
        role: 'Actor, Joiner & Master Builder of *The Theatre* (1576)',
        significance:
          "Pioneer of the professional English commercial theatre. He built London's first purpose-built public playhouse in Shoreditch in 1576, establishing the physical foundation for the golden age of Elizabethan drama.",
        actions: [
          "Secured patronage under the Earl of Leicester's Men to protect his acting company from anti-vagrant licensing laws.",
          "Constructed *The Theatre* outside the City of London's jurisdiction in 1576, bypassing Puritan civic bans on drama.",
          'Dismantled *The Theatre* in 1598, using its oak timbers to construct the world-famous *Globe Theatre* on Bankside.',
        ],
        image: getBase64Image('images/theatre.jpg') || getBase64Image('images/swan_theatre.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">POPULAR CULTURE &bull; 1576–1599</span>
        </div>
        <h4 class="csb-title">The Architecture of the Elizabethan Playhouse</h4>
        <div class="csb-body">
          Built in polygonal open-air timber frames holding up to 3,000 spectators, playhouses democratized English culture across classes:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Cross-Class Assembly:</strong> 'Groundlings' paid one penny to stand in the uncovered central pit, while affluent merchants and nobles paid twopence or threepence for tiered, roofed gallery seats.</li>
            <li><strong>Staging &amp; Symbolism:</strong> A large thrust stage featured a trapdoor ('Hell') for apparitions, a rear discovery space, and a painted roof canopy ('The Heavens') equipped with pulleys for descending gods.</li>
            <li><strong>Puritan Civic Anxiety:</strong> London's Puritan magistrates condemned playhouses as hotbeds of sin, crime, Catholic allegory, and plague transmission, forcing theatres into suburban liberties like Southwark.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> The theatre created a shared secular national consciousness, celebrating Tudor political order while reflecting the anxieties and aspirations of an expanding empire.
        </div>
      </div>
      `,
      timeline: [
        {
          date: 'c. 1560s',
          title: 'Expansion of Grammar Schools',
          text: 'Boom in fee-paying grammar schools teaching Latin, rhetoric, and classical literature to boys.',
        },
        {
          date: '1572',
          title: 'Vagabonds & Actors Act',
          text: 'Acting troupes required aristocratic patronage (e.g. Leicester’s Men) to avoid arrest as vagabonds.',
        },
        {
          date: '1576',
          title: 'Burbage Builds *The Theatre*',
          text: 'First permanent public playhouse opens in Shoreditch, outside London’s Puritan civic boundaries.',
        },
        {
          date: '1599',
          title: 'Construction of *The Globe*',
          text: 'Timbers of The Theatre dismantled and reassembled on Bankside; London theatre becomes global cultural phenomenon.',
        },
      ],
      bottomEnquiry: {
        q1: 'State two subjects that dominated the academic curriculum in Elizabethan grammar schools.',
        q2: 'Explain why Puritan civic authorities in London strongly opposed public theatrical performances.',
        q3: '‘The rise of the public theatre was the most significant cultural development in Elizabethan England.’ How far do you agree?',
      },
    },

    // Page 5: KT 3.2 (The Problem of the Poor)
    p5: {
      keyFigure: {
        name: 'Thomas Harman',
        lifespan: 'c. 1510–1572',
        role: 'Kent Magistrate & Social Pamphleteer',
        significance:
          'Author of the sensational 1567 pamphlet *A Caveat or Warning for Common Cursitors*. His vivid taxonomy of dishonest rogues inflamed Tudor public panic over vagrancy and influenced statutory poor relief legislation.',
        actions: [
          "Interrogated dozens of vagrants passing through his Kent estate to document their slang ('canting') and criminal tricks.",
          "Categorised beggars into 23 distinct types, including 'Counterfeit Cranks' (fake epileptics) and 'Hookers' (thieves).",
          "Dedicated his work to the Countess of Shrewsbury, urging magistrates to adopt severe corporal punishment for the 'idle'.",
        ],
        image: getBase64Image('images/caveat_for_cursitors.png'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">SOCIAL LEGISLATION &bull; 1572–76</span>
        </div>
        <h4 class="csb-title">Impotent vs. Idle: The Tudor Welfare Divide</h4>
        <div class="csb-body">
          The decisive evolution in Elizabethan social policy was distinguishing misfortune from moral deviance:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>The Impotent (Deserving) Poor:</strong> Those physically unable to work (the aged, sick, lame, and orphans) were granted parish licenses to beg and regular financial relief funded by mandatory local rates.</li>
            <li><strong>The Idle (Undeserving) Poor:</strong> Able-bodied vagrants who refused work were viewed as dangerous criminals, subject to whipping, ear boring (1572 Act), and execution for repeat offences.</li>
            <li><strong>Rehabilitation &amp; Work:</strong> The 1576 Act ordered towns to stockpile wool, hemp, and flax to put the able-bodied to work, establishing 'Houses of Correction' (Bridewells) to discipline the recalcitrant.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> The Acts of 1572 and 1576 established the enduring constitutional principle that the secular state was legally responsible for administering nationwide poor relief.
        </div>
      </div>
      `,
      timeline: [
        {
          date: '1560s',
          title: 'Enclosure & Population Surge',
          text: 'Arable land converted to sheep pasture; population rises to 4 million, causing severe rural underemployment.',
        },
        {
          date: '1567',
          title: 'Harman’s *Caveat for Cursitors*',
          text: 'Magistrate Thomas Harman publishes sensational taxonomy of fake beggars, inflaming public panic.',
        },
        {
          date: '1572',
          title: 'Vagabonds Act (Rates & Ear Boring)',
          text: 'Statute introduces compulsory poor rates for impotent poor; vagabonds whipped and bored through the ear.',
        },
        {
          date: '1576',
          title: 'Act for Relief of the Poor',
          text: 'Parishes provide raw wool and hemp for the able-bodied; Houses of Correction (Bridewells) built.',
        },
      ],
      bottomEnquiry: {
        q1: 'Identify two corporal punishments inflicted on vagrants under the 1572 Vagabonds Act.',
        q2: 'Explain why agricultural enclosure caused an increase in rural vagrancy between 1558 and 1588.',
        q3: '‘Population growth was the main cause of rising poverty in Elizabethan England.’ How far do you agree?',
      },
    },

    // Page 7: KT 3.3 (Exploration and Discovery)
    p7: {
      keyFigure: {
        name: 'Sir John Hawkins',
        lifespan: '1532–1595',
        role: 'Naval Commander, Shipbuilder & Treasurer of the Navy',
        significance:
          "Pioneered early transatlantic triangular trade voyages and completely rebuilt the royal navy as Treasurer from 1577. His innovative 'race-built' galleons provided England with the naval agility required to defeat the Spanish Armada.",
        actions: [
          'Organised three commercial voyages to West Africa and the Caribbean in the 1560s, trading goods for enslaved Africans.',
          'Survived the Spanish ambush at San Juan de Ulúa (1568), returning to England committed to modernising naval warfare.',
          'Redesigned English royal warships with lowered forecastles, longer keels, and four-wheeled truck-mounted culverin batteries.',
        ],
        image: getBase64Image('images/sir_john_hawkins.JPG'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">IMPERIAL EXPANSION &bull; 1579</span>
        </div>
        <h4 class="csb-title">Nova Albion: The First English Claim in North America</h4>
        <div class="csb-body">
          In June 1579, during his global circumnavigation, Francis Drake sailed the *Golden Hind* onto the coast of modern-day California:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Sovereignty Proclaimed:</strong> Drake beached his ship near Point Reyes to caulk leaking seams, met the local Miwok people, and claimed the vast territory for Queen Elizabeth, naming it *Nova Albion* ('New England').</li>
            <li><strong>The Brass Plate:</strong> Drake nailed a brass plate to a wooden post inscribed with the date, Elizabeth's name, and a silver sixpence displaying the Queen's portrait as formal legal notice of English possession.</li>
            <li><strong>Challenging the Papacy:</strong> By claiming land bordering the Pacific, Drake directly rejected the 1494 Papal Bull *Inter Caetera* granting the entire Americas to Spain and Portugal.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Nova Albion established the ideological precedent that Protestant England had a divine right to settle North American lands unoccupied by European Christian princes.
        </div>
      </div>
      `,
      timeline: [
        {
          date: '1569',
          title: 'Mercator Projection Map',
          text: 'Gerardus Mercator introduces grid projection allowing mariners to navigate along straight compass courses.',
        },
        {
          date: '1577–80',
          title: 'Drake’s Global Circumnavigation',
          text: 'Golden Hind plunders Spanish Pacific settlements; claims Nova Albion; returns with £400,000 treasure.',
        },
        {
          date: 'Mar 1579',
          title: 'Capture of the *Cacafuego*',
          text: 'Drake captures Spanish treasure galleon with 26 tons of silver bullion, financing English Crown operations.',
        },
        {
          date: '4 Apr 1581',
          title: 'Drake Knighted at Deptford',
          text: 'Queen Elizabeth knights Drake aboard Golden Hind, asserting English oceanic maritime supremacy.',
        },
      ],
      bottomEnquiry: {
        q1: 'Describe one navigational instrument that helped Elizabethan sailors calculate latitude at sea.',
        q2: 'Explain why English merchants established joint-stock companies in the 1560s and 1570s.',
        q3: '‘Francis Drake’s global circumnavigation was motivated more by privateering plunder than geographical exploration.’ How far do you agree?',
      },
    },

    // Page 9: KT 3.4 (Raleigh and Virginia)
    p9: {
      keyFigure: {
        name: 'Sir Walter Raleigh',
        lifespan: '1554–1618',
        role: 'Courtier, Explorer, Author & Colonisation Sponsor',
        significance:
          'Visionary sponsor of English colonisation in North America. Granted a royal patent by Elizabeth in 1584, he planned and financed the pioneering expeditions to Roanoke Island, popularising tobacco and the concept of an English overseas empire.',
        actions: [
          'Secured a six-year royal patent in 1584 granting exclusive rights to settle lands in North America not held by Christians.',
          "Financed the 1584 reconnaissance voyage, naming the territory 'Virginia' in tribute to Elizabeth, the Virgin Queen.",
          'Organised the 1585 military outpost under Ralph Lane and the 1587 permanent family settlement under Governor John White.',
        ],
        image: getBase64Image('images/sir_walter_raleigh.jpg'),
      },
      conceptSpotlight: `
      <div class="concept-spotlight-box">
        <div class="csb-header">
          <span class="csb-tag">CORE STRATEGIC MECHANISM</span>
          <span class="csb-category">COLONIAL FAILURE &bull; 1585–1590</span>
        </div>
        <h4 class="csb-title">The Logistical Anatomy of the Roanoke Failure</h4>
        <div class="csb-body">
          The collapse of Raleigh's colonial ventures on Roanoke Island resulted from five compounding structural errors:
          <ul style="margin: 3px 0 3px 14px; padding: 0; font-size: 7.1pt; line-height: 1.3;">
            <li><strong>Loss of Supplies:</strong> The flagship *Tiger* ran aground on a sandbar in 1585, flooding the hold and destroying virtually all the colonists' seed grain and food provisions.</li>
            <li><strong>Inappropriate Personnel:</strong> The 1585 expedition comprised wealthy gentlemen who refused manual labor and discharged soldiers who used violence instead of farming or fishing.</li>
            <li><strong>Indigenous Hostility:</strong> Ralph Lane burned an entire Secotan village over a stolen silver cup and assassinated Chief Wingina, destroying all local food cooperation.</li>
            <li><strong>Armada Interruption:</strong> The 1587 settlement under John White was starved of relief supplies for three years because Elizabeth banned all ocean-going ships for defence against the Armada.</li>
          </ul>
        </div>
        <div class="csb-takeaway">
          <strong>Strategic Legacy:</strong> Despite total operational collapse, Roanoke provided indispensable lessons in funding, diplomacy, and logistics that ensured the successful founding of Jamestown in 1607.
        </div>
      </div>
      `,
      timeline: [
        {
          date: 'Mar 1584',
          title: 'Raleigh Granted Royal Patent',
          text: 'Elizabeth grants Raleigh 6-year exclusive patent to discover and settle non-Christian lands in the New World.',
        },
        {
          date: 'Jul 1585',
          title: 'Lane Outpost at Roanoke',
          text: 'Flagship Tiger runs aground, spoiling seeds; Ralph Lane attacks Secotan village; colonists evacuated by Drake.',
        },
        {
          date: 'Jul 1587',
          title: 'White’s Family Settlement',
          text: 'Governor John White lands 117 men, women, and children at Roanoke; Virginia Dare born as first English child.',
        },
        {
          date: 'Aug 1590',
          title: 'The Lost Colony & CROATOAN',
          text: 'White returns after 3-year Armada delay; settlement deserted; single word CROATOAN carved on palisade.',
        },
      ],
      bottomEnquiry: {
        q1: 'Name the English flagship whose grounding destroyed the 1585 colonists’ food supplies on Roanoke Island.',
        q2: 'Explain why Governor John White was unable to return to Roanoke Island with supplies until 1590.',
        q3: '‘Poor leadership was the main reason for the failure of the Virginia colonies in the 1580s.’ How far do you agree?',
      },
    },
  };

  const leftSources = {
    // Page 2: KT 3.1 (Education and Leisure)
    p2: {
      sourceA: {
        title: 'Source A: John Stockwood’s Sermon at Paul’s Cross, London',
        type: 'Puritan Pulpit Sermon Against Theatres',
        date: '24 August 1578',
        quote:
          'Will not a filthy play, with the blast of a trumpet, sooner call together thousands than an hour’s tolling of a bell bring a hundred to the sermon?... If you resort unto the Theatre and the Curtain, what flocking of young men and wenches, what filthy talk and wickedness is there committed! These playhouses are the sinks of all iniquity, and surely provoke the wrath of God against our city.',
        context:
          'Delivered by prominent Puritan preacher John Stockwood, denouncing public playhouses as sinks of moral corruption and arguing that theatrical performances provoked God into punishing London with bubonic plague.',
        hingeQuestion:
          'How does Stockwood’s sermon illustrate why London civic and religious authorities viewed secular public theatre as an intolerable threat to public order and Christian morality?',
      },
      sourceB: {
        title: 'Source B: Statutes of an Elizabethan Grammar School',
        type: 'Official School Foundation Statutes',
        date: 'c. 1560',
        quote:
          'The scholars shall assemble each morning at six of the clock and depart at five of the afternoon... They shall speak no English within the schoolhouse, nor in the churchyard, nor in playing, but only Latin, on pain of the birch rod. Every scholar shall daily recite the Lord’s Prayer, the Articles of the Christian Faith, and the Ten Commandments in the Latin tongue before departing.',
        context:
          'Statutory rules prescribing the daily routine at a grammar school: lessons starting at 6:00 am, mandatory spoken Latin conversation among pupils, daily religious prayers, and strict corporal punishment via the birch rod.',
        hingeQuestion:
          'Why did Elizabethan grammar schools prioritise classical Latin rhetoric and severe corporal discipline over practical commercial or vocational instruction?',
      },
    },

    // Page 4: KT 3.2 (The Problem of the Poor)
    p4: {
      sourceA: {
        title: 'Source A: Thomas Harman’s A Caveat for Common Cursitors',
        type: 'Social Investigation & Taxonomy of Vagrancy',
        date: '1567',
        quote:
          'The Counterfeit Crank is a rogue that feigneth himself to have the falling sickness... These men will rub their faces with fresh blood from a sheep or bullock, and put a piece of soap into their mouths to make foam, wallowing in the dirt and crying out piteously to deceive honest people of their money. When night comes, they meet at hedge taverns and spend their alms in riot and drunkenness.',
        context:
          'From Harman’s wildly popular pamphlet detailing the tricks of vagabonds, warning honest citizens against ‘Counterfeit Cranks’ who rubbed soap into their mouths to produce foam and feign epileptic fits to extract charitable alms.',
        hingeQuestion:
          'How does Harman’s sensational account reveal why the Elizabethan landed gentry viewed roaming vagabonds not as victims of poverty, but as an organised criminal conspiracy?',
      },
      sourceB: {
        title: 'Source B: The 1572 Act for the Punishment of Vagabonds',
        type: 'Enacted Parliamentary Statute (14 Eliz. 1 c. 5)',
        date: 'June 1572',
        quote:
          'Every person that shall be declared a rogue, vagabond, or sturdy beggar, shall upon conviction be grievously whipped and burned through the gristle of the right ear with a hot iron of the compass of an inch... And the Justices of the Peace shall survey all aged, impotent, and lame persons within their divisions, and tax and assess all inhabitants to a weekly payment for their sustenance.',
        context:
          'The landmark statute establishing severe corporal punishment for rogues and vagrants (whipped and bored through the gristle of the right ear with a hot iron), while legally obliging local Justices of the Peace to collect compulsory weekly poor rates.',
        hingeQuestion:
          'Why did the Elizabethan state simultaneously deploy brutal physical mutilation against vagrants while establishing the principle of compulsory public taxation to relieve the impotent poor?',
      },
    },

    // Page 6: KT 3.3 (Exploration and Discovery)
    p6: {
      sourceA: {
        title: 'Source A: Gerardus Mercator’s World Chart Introduction',
        type: 'Scientific Navigational Treatise',
        date: '1569',
        quote:
          'In this chart, we have spread out the surface of the globe upon a plane in such a manner that the degrees of latitude increase towards the poles in the same proportion as the degrees of longitude... By this means, the mariner may lay his ruler upon his chart from port to port, and it shall show him the constant compass bearing that he must sail, without the perilous error of curved rhumb lines.',
        context:
          'Flemish cartographer Gerardus Mercator’s explanation of his groundbreaking projection, which rendered lines of latitude and longitude at right angles so that straight lines on the chart represented lines of constant compass bearing.',
        hingeQuestion:
          'How did Mercator’s projection map transform ocean navigation from perilous guesswork into an accurate, predictable mathematical science for Elizabethan mariners?',
      },
      sourceB: {
        title: 'Source B: Chronicler John Stow on Drake’s Deptford Knighting',
        type: 'Contemporary London Historical Chronicle',
        date: 'April 1581',
        quote:
          'On the fourth day of April, Her Majesty did dine on board the ship of Master Francis Drake, lying at Deptford upon the Thames... After dinner, Her Majesty took a sword and conferred the honour of knighthood upon him, rewarding his courage in sailing round the earthly globe. And she did command that his ship should be preserved in perpetual memory of his worthy service, to the great honour of our nation.',
        context:
          'Description of Queen Elizabeth boarding the Golden Hind at Deptford on 4 April 1581 to dine with Francis Drake and confer upon him the honour of knighthood, ordering his ship to be preserved as a national monument to English naval valour.',
        hingeQuestion:
          'Why was Elizabeth’s public knighting of Drake aboard the Golden Hind viewed across Europe as an open declaration of England’s ambition to become an oceanic superpower?',
      },
    },

    // Page 8: KT 3.4 (Raleigh and Virginia)
    p8: {
      sourceA: {
        title: 'Source A: Arthur Barlowe’s Reconnaissance Report to Raleigh',
        type: 'Official First Voyage Exploration Report',
        date: 'September 1584',
        quote:
          'The soil is the most plentiful, sweet, fruitful and wholesome of all the world... We found the people most gentle, loving, and faithful, void of all guile and treason, and such as lived after the manner of the Golden Age. The woods are laden with grapes in such abundance that the very surge of the sea overflowed with them, and cedars taller than any in Bohemia.',
        context:
          'Report submitted by Captain Arthur Barlowe following his survey of the Outer Banks of North Carolina, describing the soil as the most plentiful in the world and the indigenous Secotan people as gentle, loving, and faithful.',
        hingeQuestion:
          'How did Barlowe’s glowing, romanticized account of North America contribute directly to the disastrous under-preparation and subsequent collapse of the 1585 Roanoke colony?',
      },
      sourceB: {
        title: 'Source B: Governor John White’s Journal on Returning to Roanoke',
        type: 'Eyewitness Colony Relieving Expedition Journal',
        date: '17 August 1590',
        quote:
          'We found the houses taken down, and the place very strongly enclosed with a high palisade of great trees, very fort-like. And upon one of the chief trees at the entrance, in fair capital letters, was graven CROATOAN, without any cross or sign of distress... We sought along the sandy shore for my daughter and granddaughter Virginia, but found no sign of any Christian living.',
        context:
          'John White’s eyewitness record of walking through the deserted Roanoke settlement in 1590, finding the houses dismantled, rusty iron cannon lying about, and the single word ‘CROATOAN’ carved into a wooden palisade post without a cross of distress.',
        hingeQuestion:
          'What does the absence of an engraved cross of distress alongside the word ‘CROATOAN’ suggest about the circumstances under which the 117 English colonists abandoned their settlement?',
      },
    },
  };

  const leftVocab = {
    p2: [
      {
        term: 'Humanism',
        def: 'Renaissance intellectual movement emphasising classical literature, logic, and human potential.',
      },
      {
        term: 'Grammar School',
        def: 'Fee-paying secondary schools providing classical Latin, Greek, and rhetoric to boys of the middling sort.',
      },
      {
        term: 'Groundlings',
        def: 'Common theatregoers who paid one penny to stand in the open pit surrounding the thrust stage.',
      },
      {
        term: 'Inns of Court',
        def: 'Four London legal societies where young gentlemen studied English common law and statecraft.',
      },
    ],
    p4: [
      {
        term: 'Enclosure',
        def: 'Fencing off open communal fields and wastes, converting arable farming into lucrative sheep pasture.',
      },
      {
        term: 'Rack-renting',
        def: 'Landlords aggressively hiking rents on peasant tenants, forcing impoverished families into vagrancy.',
      },
      {
        term: 'Impotent Poor',
        def: 'Paupers physically incapable of work (the aged, sick, lame, and orphans), deemed deserving of relief.',
      },
      {
        term: 'House of Correction',
        def: 'Workhouses (Bridewells) established under the 1576 Act to provide forced labour for the able-bodied idle.',
      },
    ],
    p6: [
      {
        term: 'Joint-Stock Company',
        def: 'Commercial enterprise where investors pool capital, share risks, and receive dividends from trade.',
      },
      {
        term: 'Astrolabe',
        def: 'Navigational brass instrument used by mariners to calculate latitude by measuring the angle of stars.',
      },
      {
        term: 'Mercator Projection',
        def: 'Map projection representing constant compass bearings as straight lines, revolutionising ocean voyages.',
      },
      {
        term: 'Nova Albion',
        def: '‘New England’—the Californian territory claimed for Queen Elizabeth by Sir Francis Drake in June 1579.',
      },
    ],
    p8: [
      {
        term: 'Royal Patent',
        def: 'A formal royal charter granting an individual exclusive legal rights to explore, govern, and trade in a territory.',
      },
      {
        term: 'Secotan Tribe',
        def: 'Algonquian-speaking Native Americans inhabiting the Roanoke region, initially friendly but alienated by English brutality.',
      },
      {
        term: 'Lost Colony',
        def: 'The 1587 settlement of 117 English men, women, and children that vanished mysteriously from Roanoke Island by 1590.',
      },
      {
        term: 'Cash Crop',
        def: 'Agricultural produce grown exclusively for commercial sale and export profit, notably Virginia tobacco.',
      },
    ],
  };

  return { coverConfig, componentBank: EEE_COMPONENT_BANK, leftSources, leftVocab };
};
