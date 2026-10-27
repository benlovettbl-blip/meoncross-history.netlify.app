// Comprehensive pedagogical 3-layer architecture data for Early Elizabethan England (1558-1588)
// 12 Lessons: 24 Narrative Visual Plates (2 per lesson, alternating) + 60 Primary Sources (Sources A-E)

const narrativePlatesData = {
  lesson_1: [
    {
      blockIndex: 0,
      image: "/images/elizabeth_coronation_robes.jpg",
      image_alt: "Queen Elizabeth I depicted in her coronation robes adorned with Tudor roses and royal ermine",
      caption: "The Coronation of Elizabeth I (January 1559): Crowned at Westminster Abbey amidst deep financial debt and intense factional intrigue.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/elizabeth_i_in_parliament_1559.jpg",
      image_alt: "Contemporary engraving of Queen Elizabeth I presiding over her first Parliament in 1559",
      caption: "Elizabeth I in Parliament (1559): Sitting beneath the royal canopy, balancing aristocratic lords, Protestant MPs, and the Marian bishops.",
      isReversed: true
    }
  ],
  lesson_2: [
    {
      blockIndex: 0,
      image: "/images/great_bible_frontispiece.jpg",
      image_alt: "Frontispiece of the Great Bible in English displaying the monarch distributing the Word of God",
      caption: "The English Vernacular Bible: Central to the Elizabethan religious compromise, requiring every parish church to possess an accessible English Bible.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/elizabeth_ermine_portrait.jpg",
      image_alt: "The Ermine Portrait of Queen Elizabeth I featuring the ermine collar symbolizing purity and sovereign majesty",
      caption: "The Ermine Portrait (1585): Symbolising purity, chastity, and monarchical supremacy, painted by Nicholas Hilliard.",
      isReversed: true
    }
  ],
  lesson_3: [
    {
      blockIndex: 1,
      image: "/images/papal_bull.jpg",
      image_alt: "The lead seal (bulla) and document of a 16th-century Papal Bull",
      caption: "Papal Decrees & Authority: Rome's formal instruments of ecclesiastical command used to declare English monarchs heretical and depose them.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/units/eee/assets/portraits/alba.jpg",
      image_alt: "Portrait of Fernando Álvarez de Toledo, 3rd Duke of Alba, Spanish military commander",
      caption: "The Duke of Alba in the Low Countries: His 10,000 veteran Spanish troops in the Netherlands stoked fears of an immediate Catholic invasion of England.",
      isReversed: true
    }
  ],
  lesson_4: [
    {
      blockIndex: 0,
      image: "/images/mary_queen_of_scots_white_mourning.jpg",
      image_alt: "Mary, Queen of Scots in white mourning robes (Deuil Blanc) following the death of King Francis II of France",
      caption: "Mary in White Mourning (c. 1560): A French-educated Catholic queen with a legitimate, direct royal claim to the throne of England.",
      isReversed: false
    },
    {
      blockIndex: 2,
      image: "/units/eee/assets/portraits/darnley.jpg",
      image_alt: "Portrait of Henry Stuart, Lord Darnley, second husband of Mary Queen of Scots",
      caption: "Lord Darnley: Mary's second husband whose mysterious gunpowder assassination at Kirk o' Field in 1567 destroyed her Scottish rule.",
      isReversed: true
    }
  ],
  lesson_5: [
    {
      blockIndex: 1,
      image: "/images/babington_plot_st_giles.jpg",
      image_alt: "Contemporary engraving of the gruesome execution of Anthony Babington and his fellow conspirators at St Giles's Fields",
      caption: "The Retribution of the Crown (September 1586): Anthony Babington and his co-conspirators hanged, drawn, and quartered at St Giles's Fields.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/mary_queen_of_scots_execution_fotheringhay_1587.jpg",
      image_alt: "Contemporary German-Dutch engraving depicting the scaffold and execution of Mary, Queen of Scots at Fotheringhay Castle",
      caption: "The Scaffold at Fotheringhay (8 February 1587): Mary, Queen of Scots executed before English commissioners after the discovery of the Babington Plot.",
      isReversed: true
    }
  ],
  lesson_6: [
    {
      blockIndex: 0,
      image: "/images/king_philip_ii_of_spain.jpg",
      image_alt: "Official portrait of King Philip II of Spain wearing the collar of the Golden Fleece",
      caption: "King Philip II of Spain: Sovereign of the global Spanish Empire, defender of the Catholic Counter-Reformation, and Elizabeth's greatest adversary.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/units/eee/assets/portraits/william_of_orange.jpg",
      image_alt: "Portrait of William the Silent, Prince of Orange, leader of the Dutch Revolt",
      caption: "William of Orange ('The Silent'): Leader of the Protestant Dutch Revolt against Spanish rule, assassinated by a Catholic fanatic in 1584.",
      isReversed: true
    }
  ],
  lesson_7: [
    {
      blockIndex: 1,
      image: "/images/drake_cadiz_1587.jpg",
      image_alt: "Engraving depicting Sir Francis Drake's fleet attacking Spanish shipping in the Bay of Cadiz in April 1587",
      caption: "Singeing the King of Spain's Beard (April 1587): Drake's raid on Cadiz destroyed over 30 Spanish galleons and delayed the Armada by a year.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/ark_royal.jpg",
      image_alt: "Contemporary naval engraving of the English warship Ark Royal, flagship of Lord Howard of Effingham",
      caption: "The Ark Royal (1587): Fast, heavily gunned race-built flagship designed by Sir John Hawkins to out-manoeuvre the heavy Spanish galleons.",
      isReversed: true
    }
  ],
  lesson_8: [
    {
      blockIndex: 1,
      image: "/images/spanish_armada_battle.jpg",
      image_alt: "Dramatic maritime painting showing English and Spanish galleons locked in close artillery duel in the English Channel",
      caption: "Clash in the Channel (July–August 1588): Long-range English culverin guns pounding the tightly packed Spanish crescent formation.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/armada_gravelines_chart_1590.jpg",
      image_alt: "Augustine Ryther chart depicting the English fireship attack on the Armada off Calais and the battle of Gravelines",
      caption: "The Fireships at Calais (August 1588): Eight flaming hulks sent into the anchorage, panicking the Spanish fleet into cutting their anchor cables.",
      isReversed: true
    }
  ],
  lesson_9: [
    {
      blockIndex: 1,
      image: "/images/tudor_wooden_hornbook_alphabet.jpg",
      image_alt: "Elizabethan wooden hornbook with printed alphabet, vowels, and Lord's Prayer protected by transparent horn",
      caption: "The Elizabethan Hornbook: The foundational tool for children in petty schools learning literacy, Latin vowels, and religious prayers.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/elizabethan_bear_baiting_southwark.jpg",
      image_alt: "Contemporary engraving of bear-baiting inside an amphitheatre pit on Bankside, Southwark",
      caption: "Bear-Baiting at Bankside: One of Tudor London's most popular mass spectacles, attracting royalty, nobility, and crowds of ordinary Londoners.",
      isReversed: true
    }
  ],
  lesson_10: [
    {
      blockIndex: 1,
      image: "/images/tudor_vagrant_whipping_cart.jpg",
      image_alt: "Woodcut showing a vagrant tied to the tail of a horse-drawn cart and whipped through the streets",
      caption: "The 1572 Vagrancy Act: Able-bodied vagrants ordered to be whipped until bloody and burned through the ear with an inch-wide hot iron.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/poor_law.jpg",
      image_alt: "Archival document recording parish rates and overseers of the poor relief registers in Elizabethan England",
      caption: "Parish Poor Registers: Parishes required to collect weekly compulsory poor rates and maintain ledgers supporting the impotent poor.",
      isReversed: true
    }
  ],
  lesson_11: [
    {
      blockIndex: 1,
      image: "/images/mariners_astrolabe_1603.jpg",
      image_alt: "Cast brass 16th-century mariner's astrolabe showing navigational altitude scales",
      caption: "The Mariner's Astrolabe: Navigational breakthrough allowing Elizabethan mariners to calculate latitude using the midday sun and Pole Star.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/francis_drake_circumnavigation.jpg",
      image_alt: "Engraving depicting Sir Francis Drake navigating the Golden Hind and landing on foreign shores",
      caption: "Drake’s Circumnavigation (1577–1580): First Englishman to circumnavigate the globe, returning £500,000 in silver and gold.",
      isReversed: true
    }
  ],
  lesson_12: [
    {
      blockIndex: 1,
      image: "/images/john_white_village_secotan.jpg",
      image_alt: "Watercolor painting by John White depicting the Algonquin village of Secotan with crops, houses, and ceremonial circle",
      caption: "The Village of Secotan (1585): John White's visual record of Native American agriculture, communal tobacco plots, and longhouses in Virginia.",
      isReversed: false
    },
    {
      blockIndex: 3,
      image: "/images/john_white_indians_fishing.jpg",
      image_alt: "John White watercolor depicting Native Americans catching fish in weirs and dugout canoes in Virginia waters",
      caption: "Native Algonquin Fishing Methods: John White documenting the rich coastal ecology and sophisticated fish weirs encountered by the Roanoke colonists.",
      isReversed: true
    }
  ]
};

module.exports = { narrativePlatesData };
