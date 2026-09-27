// scripts/eee_textbook_data_kt3.cjs
// Publisher-Grade Master Curriculum Content for Early Elizabethan England (1558-88)
// Key Topic 3: Elizabethan society in the Age of Exploration, 1558-88
// Grounded 100% in Edexcel 9-1 Specification and Pearson Student Book

module.exports = {
  unitId: 'eee',
  keyTopicId: 'KT3',
  keyTopicNumber: 3,
  period: '1558–88',
  title: 'Paper 2: Early Elizabethan England, 1558–88',
  topicTitle: 'Key Topic 3: Elizabethan society in the Age of Exploration, 1558–88',
  enquiryQuestion:
    'How did expanding humanist education, the crisis of rural vagrancy, and audacious global voyages transform domestic society and project English power onto the world stage?',
  coverImage: '/images/roanoke_colony.jpg',
  coverCaption:
    'Source A: Governor John White discovers the deserted settlement of Roanoke Island in August 1590, finding the single word ‘CROATOAN’ carved upon a wooden palisade post—the enduring enigma of the ‘Lost Colony’.',

  specMatrix: [
    {
      code: 'KT3.1',
      title: 'Education and Leisure',
      spec: 'Expansion of grammar & petty schools; University education; Elite & popular sports (hunting, football, bear-baiting); Rise of public theatre (Burbage, Globe).',
    },
    {
      code: 'KT3.2',
      title: 'The Problem of the Poor',
      spec: 'Causes of poverty: population growth, enclosure, rack-renting & Antwerp cloth collapse; Deserving vs Idle Poor; 1572 & 1576 Poor Relief legislation.',
    },
    {
      code: 'KT3.3',
      title: 'Exploration & Voyages of Discovery',
      spec: 'Motives for exploration & joint-stock trade; Navigational advances (astrolabes, Mercator map, galleons); Drake’s circumnavigation (1577–80).',
    },
    {
      code: 'KT3.4',
      title: 'Raleigh and Virginia',
      spec: 'Walter Raleigh’s colonisation vision; 1584 reconnaissance; Failure of 1585 Roanoke colony (Lane); The 1587 ‘Lost Colony’ (White); Significance of early empire.',
    },
  ],

  enquiries: [
    // -------------------------------------------------------------
    // ENQUIRY 3.1
    // -------------------------------------------------------------
    {
      id: 'lesson_3_1',
      number: '3.1',
      title: 'Education and Leisure in Elizabethan England, 1558–88',
      focus:
        'How did Renaissance humanism reshape schooling and university education, and why did the emergence of the public theatre democratise popular culture?',
      sideImage: '/images/swan_theatre.jpg',
      sideImageCaption:
        'Contemporary sketch of The Swan Theatre in Southwark (1596), illustrating the open-air thrust stage, tiered seating galleries, and the groundling pit.',
      paragraphs: [
        `During the reign of Elizabeth I, Renaissance humanist philosophy fundamentally transformed English attitudes toward education. Education was increasingly prized not merely for religious training, but as the essential vehicle for civic duty, social mobility, and effective state administration. Although no universal state schooling system existed, opportunities expanded significantly across the social spectrum. For young boys aged four to seven, 'petty schools' (often run in private homes by literate women or parish clerics) provided foundational instruction in reading, writing English, and basic arithmetic. Bright boys from merchant, yeoman, and gentry backgrounds then progressed to grammar schools, where 72 new institutions were founded under Elizabeth. The grammar school regimen was intensely demanding: pupils attended from 6:00 am to 5:30 pm six days a week, subjected to strict discipline and corporal punishment via the birch. The curriculum focused almost exclusively on classical languages: Latin grammar, Greek, rhetoric, and classical literature (Cicero, Seneca, Virgil), instilling intellectual rigor and Christian morality. Girls from wealthy noble families were educated privately at home by tutors in needlework, music, French, and estate management, while ordinary girls received minimal formal instruction.`,

        `Higher education expanded concurrently to supply the Tudor state with trained lawyers, administrators, and clergymen. Oxford and Cambridge universities grew, with new colleges founded under royal patronage, including Jesus College, Oxford (1571), endowed specifically to educate Welsh Protestant scholars. At the same time, thousands of young gentlemen attended the Inns of Court in London to study English common law, preparing for service as members of Parliament or regional Justices of the Peace. Although literacy remained socially stratified—rising to approximately 30% of men and 10% of women in London, but remaining far lower in rural counties—the growth of schooling cultivated a thriving, ambitious 'middling sort' capable of critical thought and administrative responsibility.`,

        `Leisure pursuits mirrored the rigid hierarchy of Elizabethan society while fostering new commercial entertainment. The nobility engaged in refined pastimes such as hunting deer, hawking, fencing, and real tennis. The lower orders engaged in boisterous folk football—often bloody contests between rival parishes with no referee, rules, or pitch boundaries—as well as brutal blood sports such as bear-baiting, bull-baiting, and cock-fighting. Specially constructed baiting amphitheatres in Southwark attracted thousands of spectators from all social classes, including Queen Elizabeth herself. The supreme cultural achievement was the rapid development of the secular public theatre. Previously, travelling troupes performed mystery plays in inn-yards, but Puritan authorities condemned them as breeding grounds for crime, plague transmission, and Catholic superstition. The 1572 Vagabonds Act required actors to obtain licenses from noble patrons. In response, permanent commercial playhouses were erected outside London’s city jurisdiction: James Burbage built *The Theatre* in 1576, followed by *The Curtain* (1577), *The Rose* (1587), and *The Globe* (1599). Featuring the brilliant plays of Christopher Marlowe and William Shakespeare, the theatre democratised entertainment: 'groundlings' paid one penny to stand in the open pit, while affluent citizens paid twopence for tiered gallery seats, bringing disparate social classes together into a shared national culture.`,
      ],
      keyFigures: [
        {
          name: 'William Shakespeare',
          role: 'Playwright & Actor',
          desc: 'Crafted masterpieces reflecting Tudor political order, human nature, and national identity; part-owner of the Globe Theatre.',
        },
        {
          name: 'James Burbage',
          role: 'Actor & Master Builder',
          desc: 'Constructed London’s first permanent commercial playhouse, *The Theatre* (1576), establishing professional English drama.',
        },
        {
          name: 'John Stockwood',
          role: 'Puritan Cleric & Preacher',
          desc: 'Preached fiercely against public theatres, warning that playhouses diverted Christians from divine worship into secular sin.',
        },
      ],
      spotlight: {
        title: 'The Architecture of the Elizabethan Playhouse',
        desc: 'Built in polygonal timber frames holding up to 3,000 spectators, playhouses featured a raised thrust stage, a trapdoor (‘Hell’), and an overhanging painted canopy (‘The Heavens’) equipped with pulleys for dramatic descents of gods and apparitions.',
      },
      source: {
        meta: 'SOURCE B • Primary Sermon: Puritan Opposition to Drama',
        date: '1578',
        title: 'John Stockwood’s Sermon at Paul’s Cross, London',
        body: '‘...Will not a filthy play, with the blast of a trumpet, sooner call a thousand unto a theatrical show than the ringing of an hundred bells into the church to hear the word of God? The cause of plagues is sin, and the cause of sin are these public stage plays.’',
        hingeQuestion:
          'How does Stockwood’s moral condemnation of the playhouses illustrate the deep religious and civic anxiety that secular mass entertainment generated among Elizabethan authorities?',
      },
      vocab: [
        {
          term: 'Humanism',
          def: 'Renaissance intellectual movement emphasising classical literature, logic, and human potential.',
        },
        {
          term: 'Grammar School',
          def: 'Secondary school providing fee-paying classical Latin education to boys from the gentry and middling sort.',
        },
        {
          term: 'Groundlings',
          def: 'Common spectators who paid one penny to stand in the uncovered pit surrounding the theatre stage.',
        },
        {
          term: 'Inns of Court',
          def: 'London legal institutions where young gentlemen studied English common law and governance.',
        },
      ],
    },

    // -------------------------------------------------------------
    // ENQUIRY 3.2
    // -------------------------------------------------------------
    {
      id: 'lesson_3_2',
      number: '3.2',
      title: 'The Problem of the Poor and Vagrancy, 1558–88',
      focus:
        'Why did rural pauperism reach unprecedented crisis levels under Elizabeth, and how did state legislation transition from brutal punishment to structured social welfare?',
      sideImage: '/images/caveat_for_cursitors.png',
      sideImageCaption:
        'Title page of Thomas Harman’s A Caveat or Warning for Common Cursitors (1567), depicting a vagrant being whipped at the cart’s tail through the town.',
      paragraphs: [
        `Throughout the Elizabethan era, England experienced an alarming surge in poverty and vagrancy, driven by compounding economic pressures far beyond the control of individual citizens. England’s population grew by over 35%, soaring from 2.8 million in 1558 to over 4 million by 1603. Because agricultural productivity failed to keep pace with demographic expansion, food prices skyrocketed: grain prices doubled, triggering severe cost-of-living crises for ordinary labourers whose real wages fell by up to 50%. A succession of catastrophic bad harvests in the 1570s and 1580s caused widespread rural famine. Furthermore, Henry VIII’s earlier debasement of the coinage had sparked structural inflation, while the collapse of the European wool and cloth trade through Antwerp in the 1560s left thousands of English spinners, weavers, and clothiers without employment.`,

        `These economic strains were exacerbated by the rapid growth of agrarian 'enclosure'. Landowners increasingly combined scattered medieval open-field strips into unified, fenced fields, converting traditional arable crop land into lucrative sheep pastures. Wool was far more profitable than cereal crops and required substantially less manual labour: a single shepherd and his dogs could oversee a flock of 2,000 sheep on acreage that had previously provided livelihoods for dozens of peasant tenant families. Enclosing common land deprived poor cottagers of essential grazing rights for their livestock, while landowners engaged in 'rack-renting'—drastically hiking rents to force customary peasant farmers off their land. Evicted families were cast adrift, wandering the countryside in search of subsistence as 'vagabonds', swelling the slums of London and major provincial towns.`,

        `Tudor authorities viewed vagrancy not merely as an economic problem, but as an existential threat to public order and social hierarchy. Elizabethan society drew a rigid moral distinction between the 'Deserving' or 'Impotent Poor' (the elderly, sick, orphans, and disabled who were physically incapable of labour) and the 'Undeserving' or 'Idle Poor' (able-bodied vagrants and rogues who were viewed as lazy, deceitful, and prone to crime). Sensational pamphlets like Thomas Harman’s *A Caveat for Common Cursitors* (1567) terrified the public by claiming vagabonds belonged to organised criminal guilds of 'Counterfeit Cranks' (beggars pretending to have epilepsy) and 'Hookers' (thieves using poles to steal goods through open windows). Pioneer municipal schemes in Norwich, Ipswich, and London led Parliament to enact landmark national statutes. The **1572 Vagabonds Act** imposed severe corporal punishments on vagrants (whipped and bored through the ear with a hot iron for a first offence; executed as felons for a third offence) while mandating that local Justices of the Peace collect compulsory weekly poor rates to relieve the impotent. The **1576 Act for the Relief of the Poor** introduced rehabilitation: local authorities were ordered to provide raw materials (wool, hemp, flax) to put the able-bodied poor to work, and to establish 'Houses of Correction' (Bridewells) to punish those who refused employment. This established the permanent principle of state responsibility for poverty relief.`,
      ],
      keyFigures: [
        {
          name: 'Thomas Harman',
          role: 'Magistrate & Pamphleteer',
          desc: 'Author of *A Caveat for Common Cursitors* (1567); popularised the taxonomy of dishonest rogues, stoking anti-vagrant panic.',
        },
        {
          name: 'William Cecil',
          role: 'Chief Minister & Social Planner',
          desc: 'Drafted economic legislation and supervised poor relief statutes, balancing severe social control with municipal welfare.',
        },
        {
          name: 'Justice of the Peace',
          role: 'Local Magistrate',
          desc: 'Unpaid local gentry responsible for collecting poor rates, setting local wages, and punishing vagrants in the parish.',
        },
      ],
      spotlight: {
        title: 'Impotent vs. Idle: The Tudor Welfare Divide',
        desc: 'The crucial shift in Elizabethan policy was recognising that unemployment was not solely moral failing but structural misfortune. While ‘impotent’ poor received parish pensions, the ‘idle’ poor were subjected to forced labour in Bridewell houses of correction.',
      },
      source: {
        meta: 'SOURCE C • Statutory Statute: Penalties for Vagrancy',
        date: '1572',
        title: 'Extract from the 1572 Act for the Punishment of Vagabonds',
        body: '‘...Any person declared a rogue or vagabond shall, upon conviction, be grievously whipped and burnt through the gristle of the right ear with an hot iron of the compass of an inch about, unless some honest person will take him into service for one whole year.’',
        hingeQuestion:
          'Why did the Elizabethan state simultaneously deploy brutal physical mutilation against vagrants while legally mandating municipal poor relief for the impotent?',
      },
      vocab: [
        {
          term: 'Enclosure',
          def: 'Fencing in common land and open fields to create consolidated estates, often converting arable land to sheep pasture.',
        },
        {
          term: 'Rack-renting',
          def: 'Landlords aggressively increasing rents on agricultural tenants, forcing impoverished peasants off ancestral land.',
        },
        {
          term: 'Impotent Poor',
          def: 'Paupers physically incapable of work (the aged, sick, orphaned), deemed deserving of financial relief.',
        },
        {
          term: 'House of Correction',
          def: 'Workhouses (Bridewells) established under the 1576 Act to provide forced labour for the able-bodied idle.',
        },
      ],
    },

    // -------------------------------------------------------------
    // ENQUIRY 3.3
    // -------------------------------------------------------------
    {
      id: 'lesson_3_3',
      number: '3.3',
      title: 'Exploration and Voyages of Discovery, 1558–88',
      focus:
        'How did navigational innovations and commercial rivalry shatter Iberian dominance and inspire Drake’s historic circumnavigation of the globe?',
      sideImage: '/images/sir_john_hawkins.JPG',
      sideImageCaption:
        'Sir John Hawkins, innovative naval commander and shipbuilder, who pioneered English triangular slave trade voyages and designed the agile race-built galleons.',
      paragraphs: [
        `Elizabethan voyages of exploration were driven by a convergence of commercial crisis, imperial rivalry, and navigational curiosity. The sudden closure of the lucrative Antwerp cloth market in the 1560s threatened England’s economic stability, forcing merchant adventurers to establish new global trade routes. To finance high-risk oceanic voyages, English investors pioneered chartered joint-stock companies, where capital was pooled and liability shared. These included the Muscovy Company (trading timber, furs, and hemp with Russia), the Eastland Company (securing Baltic naval stores), and the Levant Company (trading English wool for Mediterranean silks and spices). Explorers also sought the elusive 'North-West Passage'—a hypothetical northern sea route around North America to China and the Far East—championed by Martin Frobisher (1576–78) and John Davis. Furthermore, Protestant England was determined to challenge the maritime monopoly of Catholic Spain and Portugal, whose empires extracted vast treasures from the Americas under the Papal Treaty of Tordesillas.`,

        `These daring voyages were enabled by revolutionary advances in maritime technology and cartography. Traditional navigational guesswork was replaced by astronomical science: navigators used the **astrolabe**, **quadrant**, and **cross-staff** to measure the precise angular elevation of the sun and the Pole Star, allowing them to calculate latitude at sea. Magnetic compasses became more reliable, while the log-and-line allowed crews to calculate their speed in knots. In 1569, Flemish cartographer Gerardus Mercator introduced the **Mercator projection map**, creating ocean charts with straight lines of latitude and longitude that enabled navigators to plot accurate compass bearings across vast ocean expanses. Concurrently, English shipbuilders pioneered the 'race-built galleon': longer, sleeker vessels with streamlined forecastles and lateen sails that could tack closer to the wind, carry heavier payloads, and withstand perilous Atlantic weather.`,

        `The crowning achievement of Elizabethan exploration was Sir Francis Drake’s historic global circumnavigation between 1577 and 1580. In December 1577, Drake sailed from Plymouth with five ships, secretly backed by Elizabeth and Privy Councillors with a mission to plunder Spanish colonies along the Pacific coast of the Americas and seek potential territories for English colonisation. After enduring deadly mutiny and terrifying storms in the Strait of Magellan, four vessels were destroyed or returned to England, leaving only Drake’s flagship, the *Pelican* (renamed the *Golden Hind*). Drake sailed up the undefended Pacific coastline of Chile and Peru, sacking Spanish settlements and capturing the great treasure ship *Nuestra Señora de la Concepción* (the *Cacafuego*). In June 1579, Drake landed in northern California, claiming the territory for Elizabeth as *Nova Albion* ('New England'). He then sailed across the uncharted Pacific to the Moluccas (the Spice Islands), establishing a trade alliance with the Sultan of Ternate and loading his hull with six tons of precious cloves. Sailing across the Indian Ocean and around the Cape of Good Hope, Drake returned to Plymouth in September 1580 after a 36,000-mile voyage. He was the first Englishman to circumnavigate the earth. The voyage yielded £400,000 in treasure (delivering an astronomical 4,700% return to investors), shattered the myth of Spanish maritime invincibility, and established England as a formidable naval power.`,
      ],
      keyFigures: [
        {
          name: 'Sir Francis Drake',
          role: 'Navigator & Privateer',
          desc: 'Commander of the *Golden Hind*; first Englishman to circumnavigate the globe (1577–80), bringing home immense wealth and glory.',
        },
        {
          name: 'Sir John Hawkins',
          role: 'Naval Commander & Treasurer of the Navy',
          desc: 'Pioneered early Atlantic slave voyages; redesigned the royal fleet with fast, heavily armed race-built galleons.',
        },
        {
          name: 'Gerardus Mercator',
          role: 'Cartographer & Geographer',
          desc: 'Created the 1569 Mercator projection map, revolutionising maritime navigation by rendering constant compass bearings as straight lines.',
        },
      ],
      spotlight: {
        title: 'Nova Albion: The First English Claim in North America',
        desc: 'In June 1579, Drake repaired the *Golden Hind* in modern-day California, erecting a brass plate claiming ‘Nova Albion’ for Queen Elizabeth. While never permanently settled, it demonstrated England’s emerging ambition to rival the Spanish Empire in the New World.',
      },
      source: {
        meta: 'SOURCE D • Primary Chronicle: Drake’s Return to Plymouth',
        date: '1580',
        title: 'Account of Drake’s Welcome by Chronicler John Stow',
        body: '‘...The Queen’s Majesty, well pleased with Drake’s profitable return and great voyage, went aboard his ship at Deptford, where she conferred upon him the honour of knighthood, causing his ship to be preserved as a monument to English valour and enterprise.’',
        hingeQuestion:
          'How did Drake’s claim of ‘Nova Albion’ and royal knighting at Deptford reflect England’s emerging geopolitical ambition to establish a Protestant global empire?',
      },
      vocab: [
        {
          term: 'Joint-Stock Company',
          def: 'A commercial enterprise where investors pool capital, share profits, and limit individual financial liability.',
        },
        {
          term: 'Astrolabe',
          def: 'Navigational instrument used by mariners to calculate latitude by measuring the angle of the sun and stars.',
        },
        {
          term: 'Mercator Projection',
          def: 'Map projection representing lines of constant compass direction as straight lines, revolutionising ocean navigation.',
        },
        {
          term: 'Nova Albion',
          def: '‘New England’—the Californian territory claimed for Queen Elizabeth by Sir Francis Drake in June 1579.',
        },
      ],
    },

    // -------------------------------------------------------------
    // ENQUIRY 3.4
    // -------------------------------------------------------------
    {
      id: 'lesson_3_4',
      number: '3.4',
      title: 'Raleigh and the Colonisation of Virginia, 1584–90',
      focus:
        'Why did Walter Raleigh’s ambitious attempts to establish an English colony on Roanoke Island end in catastrophic failure and the mystery of the ‘Lost Colony’?',
      sideImage: '/images/sir_walter_raleigh.jpg',
      sideImageCaption:
        'Sir Walter Raleigh, courtier, explorer, and author, who secured a royal patent from Elizabeth to finance and organise the colonisation of Virginia.',
      paragraphs: [
        `In the 1580s, English imperial ambitions crystallised around Sir Walter Raleigh, a dashing Devon courtier and royal favourite. Raleigh recognised that founding permanent colonies in North America would provide England with profound geopolitical and economic advantages: securing naval bases to launch privateering raids against Spanish treasure fleets, developing new export markets for English cloth, acquiring vital supplies of timber, tar, and hemp to free England from dependence on Baltic naval stores, and planting a Protestant empire to counterbalance Catholic Spain. In March 1584, Queen Elizabeth granted Raleigh a royal patent conferring exclusive rights to discover, settle, and govern any 'remote, heathen and barbarous lands' not possessed by Christian monarchs. Raleigh dispatched a reconnaissance voyage led by Philip Amadas and Arthur Barlowe in April 1584. They surveyed the Outer Banks of present-day North Carolina, finding fertile land, excellent timber, and friendly native inhabitants. Barlowe returned with two Algonquian Indians—Manteo and Wanchese—who learned English and helped Thomas Harriot compile a phonetic language guide. Delighted by Barlowe’s glowing reports, Raleigh named the territory 'Virginia' in honour of Elizabeth, the Virgin Queen, and was knighted by the monarch in 1585.`,

        `In April 1585, Raleigh launched England’s first colonisation expedition: a fleet of seven ships carrying 108 male settlers under the naval command of Sir Richard Grenville, with Ralph Lane appointed governor. The settlement was established on Roanoke Island. However, the colony was crippled by catastrophic errors from the outset. Crucially, the expedition’s flagship, the *Tiger*, ran aground on a treacherous sandbar, flooding its hold and destroying nearly all the colonists’ seed grain and food provisions. The colonists themselves were poorly selected: predominantly wealthy 'gentlemen' who refused manual labor, and discharged mercenary soldiers accustomed to violence who lacked farming and hunting skills. Grenville departed for England to procure fresh supplies, leaving Lane in charge of an increasingly desperate outpost. Relations with the local Secotan tribe deteriorated rapidly when English soldiers burned an entire native village over an alleged stolen silver cup. When Chief Wingina recognised English dependence on native food supplies and planned to expel them, Lane launched a pre-emptive strike, assassinating Wingina. Facing imminent starvation and surrounded by hostile tribes, the colonists abandoned Roanoke in June 1586, taking passage home on Sir Francis Drake’s fleet, which arrived unexpectedly after raiding the Spanish Caribbean.`,

        `Undeterred, Raleigh organised a second colonisation effort in 1587, led by artist John White. Crucially, this second venture was designed as a permanent agrarian community: it comprised 117 settlers, including 89 men, 17 women, and 11 children, who were promised 500 acres of land each. In August 1587, White’s daughter Eleanor gave birth to Virginia Dare, the first child born of English parents in North America. However, the settlers arrived too late in the agricultural season to plant crops, and native relations remained hostile following the murder of an English colonist. At the colonists’ desperate urging, Governor White returned to England in late 1587 to secure emergency provisions. Upon reaching London, White found England facing the impending Spanish Armada crisis; Elizabeth placed an immediate embargo on all ocean-going ships for national defence. Trapped in England, White was unable to sail for three agonizing years. When he finally returned to Roanoke in August 1590, the settlement was completely deserted: the palisade was intact, but houses had been dismantled, and the single word 'CROATOAN' was carved into a palisade post, alongside 'CRO' on a nearby tree. No Maltese cross (the pre-arranged distress signal) had been carved. Bad weather and mutinous sailors prevented White from searching Croatoan Island, forcing him to return home. The fate of the 117 settlers remains one of history’s greatest unsolved mysteries. Despite total operational collapse, the Roanoke voyages established vital precedents in funding, logistics, and indigenous relations that enabled the permanent founding of Jamestown in 1607.`,
      ],
      keyFigures: [
        {
          name: 'Sir Walter Raleigh',
          role: 'Courtier & Colonisation Sponsor',
          desc: 'Conceived and financed the Virginia expeditions; granted royal patent in 1584, though forbidden by Elizabeth from sailing himself.',
        },
        {
          name: 'Ralph Lane',
          role: 'Governor of 1585 Colony',
          desc: 'Military officer whose heavy-handed brutality toward Chief Wingina provoked native warfare and led to Roanoke’s abandonment in 1586.',
        },
        {
          name: 'John White',
          role: 'Governor of 1587 Colony & Artist',
          desc: 'Painted stunning watercolours of Native Americans; returned in 1590 to discover the colony deserted with the word ‘CROATOAN’.',
        },
      ],
      spotlight: {
        title: 'The Anatomy of Colonial Failure: Why Did Roanoke Collapse?',
        desc: 'Roanoke failed due to five fatal factors: disastrous timing (arriving too late to plant crops), poor colonist composition (gentlemen refusing manual labour), loss of seed supplies when the *Tiger* grounded, heavy-handed violence alienating native tribes, and the 1588 Armada embargo stranding settlers without supplies for three years.',
      },
      source: {
        meta: 'SOURCE E • Primary Chronicle: The Deserted Palisade',
        date: 'August 1590',
        title: 'Governor John White’s Journal upon Returning to Roanoke Island',
        body: '‘...We found the houses taken down, and the place very strongly enclosed with a high palisade of great trees, very fort-like; and upon one of the chief trees, in fair capital letters, was graven CROATOAN without any cross or sign of distress...’',
        hingeQuestion:
          'Why did the operational necessity of national defence during the 1588 Armada directly seal the fate of the English settlers stranded at Roanoke Island?',
      },
      vocab: [
        {
          term: 'Royal Patent',
          def: 'Official royal charter granting exclusive rights to explore, settle, and govern foreign territories.',
        },
        {
          term: 'Outer Banks',
          def: 'String of barrier islands off North Carolina where Roanoke Island provided a concealed privateer haven.',
        },
        {
          term: 'Secotan Tribe',
          def: 'Local Algonquian Native American tribe led by Chief Wingina, alienated by English military brutality.',
        },
        {
          term: 'Croatoan',
          def: 'Neighbouring island inhabited by friendly Native Americans; the solitary word carved at the deserted 1590 site.',
        },
      ],
    },
  ],

  // -------------------------------------------------------------
  // SYNTHESIS & EXAM MASTERCLASS (PAGES 10-11)
  // -------------------------------------------------------------
  examMasterclass: {
    overview:
      'Key Topic 3 examines domestic social transformation (humanist education, urban leisure, and rising poverty) alongside maritime expansion (Drake’s circumnavigation and Raleigh’s Roanoke colonies). In Edexcel Paper 2, Section B assesses feature descriptions (Q1 [4 marks]), causal explanation (Q2 [12 marks]), and sustained essay judgment (Q3 [16 marks]).',
    q1: {
      question: 'Describe two features of Elizabethan grammar schools. [4 marks]',
      structure:
        'Identify feature 1 + supporting precise factual detail. Identify feature 2 + supporting precise factual detail. Zero evaluation or comparison needed.',
      modelAnswer:
        'One feature of Elizabethan grammar schools was their rigorous classical curriculum. Pupils were taught Latin grammar, Greek, classical rhetoric, and works by Roman authors such as Cicero and Seneca, preparing boys for university, law, or public administration.\n\nA second feature was the strict regimen and harsh corporal punishment. The school day was exceptionally long, typically running from 6:00 am to 5:30 pm six days a week, and teachers made frequent use of the birch to punish academic errors or misbehaviour.',
    },
    q2: {
      question:
        'Explain why the problem of poverty and vagrancy increased during the reign of Elizabeth I. [12 marks]',
      stimulus: ['Enclosure', 'Population growth'],
      paragraphs: [
        {
          point: 'Rapid demographic expansion and inflation',
          evidence:
            'England’s population surged by over 35%, growing from 2.8 million in 1558 to over 4 million by 1603. Because agricultural output failed to keep pace, bread prices doubled, while wages fell in real terms by nearly 50%, forcing marginal families into destitution.',
          explanation:
            'This demographic pressure created widespread rural unemployment and food shortages, compounding poverty beyond personal control.',
        },
        {
          point: 'Agrarian enclosure, rack-renting, and sheep farming',
          evidence:
            'Landowners increasingly enclosed open medieval fields and converted arable crop farming into sheep pastures. Sheep farming required far less manual labour than growing wheat—one shepherd could manage 2,000 sheep—while rack-renting forced customary tenants off their holdings.',
          explanation:
            'This evicted thousands of rural peasant families from ancestral lands, forcing them to migrate as vagabonds to seek urban charity.',
        },
        {
          point: 'Collapse of the European cloth trade and catastrophic harvests',
          evidence:
            'The collapse of the Antwerp cloth trade in the 1560s threw thousands of domestic spinners and weavers out of work. Concurrently, a series of bad harvests in the 1570s and 1580s caused severe food crises and price spikes.',
          explanation:
            'The sudden loss of export markets combined with crop failures pushed previously self-sufficient labourers into absolute pauperism.',
        },
      ],
    },
    q3: {
      question:
        '‘The main reason for the failure of the Virginia colonies in the 1580s was poor relations with the Native Americans.’ How far do you agree? Explain your answer. [16 marks + 4 SPaG]',
      stimulus: ['The role of Ralph Lane', 'Supplies and farming skills'],
      verdictStructure:
        'Agree (Lane’s brutality, burning villages, and killing Chief Wingina alienated the Secotan tribe who controlled food sources) vs Disagree (the fundamental cause was poor planning: the grounding of the Tiger destroying seed grain, aristocratic colonists refusing manual labour, and the 1588 Armada embargo stranding White in England for 3 years). Conclude that lack of food self-sufficiency forced reliance on natives, making conflict fatal, but structural planning failures were the root cause.',
    },
  },

  // -------------------------------------------------------------
  // BACK COVER (PAGE 12)
  // -------------------------------------------------------------
  backCover: {
    knowledgeOrganiser: [
      {
        date: '1567',
        event:
          'Thomas Harman publishes A Caveat for Common Cursitors, stoking anti-vagrancy panic.',
      },
      {
        date: '1569',
        event:
          'Gerardus Mercator publishes his revolutionary conformal map projection for navigation.',
      },
      {
        date: '1571',
        event:
          'Jesus College, Oxford founded under royal charter to educate Welsh Protestant scholars.',
      },
      {
        date: '1572',
        event: 'Vagabonds Act: ear-boring for beggars; compulsory local poor rates established.',
      },
      {
        date: '1576',
        event: 'Act for Relief of Poor (Houses of Correction); James Burbage builds The Theatre.',
      },
      {
        date: '1577–80',
        event: 'Francis Drake circumnavigates the globe in the Golden Hind, claiming Nova Albion.',
      },
      {
        date: 'Apr 1581',
        event:
          'Elizabeth knights Drake at Deptford; £400,000 Spanish treasure haul secures Crown debt.',
      },
      {
        date: 'Mar 1584',
        event: 'Walter Raleigh granted royal patent to explore and colonise North American lands.',
      },
      {
        date: '1585',
        event: 'First Roanoke colony established under Richard Grenville and Governor Ralph Lane.',
      },
      {
        date: 'Jun 1586',
        event:
          'First colony collapses due to starvation and native conflict; settlers evacuated by Drake.',
      },
      {
        date: '1587',
        event: 'Second Roanoke colony founded by John White; birth of Virginia Dare.',
      },
      {
        date: 'Aug 1590',
        event:
          'White returns after 3-year Armada delay; finds Roanoke deserted with ‘CROATOAN’ carved.',
      },
    ],
    vocabulary: [
      {
        term: 'Humanism',
        def: 'Renaissance philosophy prioritising classical learning, logic, and civic service.',
      },
      {
        term: 'Grammar School',
        def: 'Fee-paying school teaching Latin grammar and rhetoric to boys aged 7–14.',
      },
      {
        term: 'Groundlings',
        def: 'Common spectators who paid one penny to stand in the uncovered theatre pit.',
      },
      {
        term: 'Enclosure',
        def: 'Consolidating open-field strips into hedged fields, replacing arable crops with sheep.',
      },
      {
        term: 'Rack-renting',
        def: 'Drastic rent increases by landlords that evicted customary peasant tenants.',
      },
      {
        term: 'Impotent Poor',
        def: 'Paupers unable to work due to age, illness, or disability; entitled to parish relief.',
      },
      {
        term: 'House of Correction',
        def: 'Workhouses (Bridewells) set up to provide forced labour for able-bodied vagrants.',
      },
      {
        term: 'Joint-Stock Company',
        def: 'Business enterprise where investors pool capital and share oceanic trading risks.',
      },
      {
        term: 'Astrolabe',
        def: 'Navigational tool calculating latitude by measuring celestial angular height.',
      },
      {
        term: 'Mercator Projection',
        def: 'Map with straight lines of longitude and latitude, aiding ocean navigation.',
      },
      {
        term: 'Nova Albion',
        def: 'Californian territory claimed for Queen Elizabeth by Francis Drake in June 1579.',
      },
      {
        term: 'Lost Colony',
        def: 'The 1587 Roanoke settlement found deserted in 1590 with the word ‘CROATOAN’.',
      },
    ],
    qrCards: [
      {
        code: 'Q1',
        title: 'Elizabethan Education & Leisure',
        desc: 'Revise grammar schools, petty schools, humanist curricula, and the rise of playhouses.',
      },
      {
        code: 'Q2',
        title: 'The Problem of the Poor',
        desc: 'Master causes of poverty (population, enclosure), Harman’s rogues, and 1572/1576 Acts.',
      },
      {
        code: 'Q3',
        title: 'Voyages & Drake’s Circumnavigation',
        desc: 'Test knowledge on joint-stock companies, astrolabes, Mercator maps, and the Golden Hind.',
      },
      {
        code: 'Q4',
        title: 'Raleigh & the Roanoke Colonies',
        desc: 'Revise Raleigh’s patent, Lane’s 1585 failure, White’s 1587 Lost Colony, and long-term impact.',
      },
    ],
    checklist: [
      'I can explain how Renaissance humanism influenced the expansion of grammar schools and universities.',
      'I can describe popular Elizabethan sports and explain why public theatres emerged after 1576.',
      'I can evaluate the economic causes of poverty: population growth, inflation, enclosure, and cloth collapse.',
      'I can distinguish between the Impotent Poor and Idle Poor and explain the 1572 and 1576 Poor Laws.',
      'I can assess the technological breakthroughs in navigation (astrolabe, compass, Mercator map, galleons).',
      'I can explain the significance of Sir Francis Drake’s circumnavigation (1577–80) for England and Spain.',
      'I can explain why Walter Raleigh organised the colonisation of Virginia and the 1584 reconnaissance.',
      'I can evaluate why both the 1585 and 1587 Roanoke colonies failed, leading to the ‘Lost Colony’.',
    ],
  },
};
