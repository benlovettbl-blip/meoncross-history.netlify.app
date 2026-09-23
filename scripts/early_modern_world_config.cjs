/**
 * Configuration for Year 8 Early Modern World KS3 Workbook
 */

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

function getEarlyModernConfig(lessonList) {
  const list = lessonList || [];
  return {
    unitId: 'early_modern_world',
    unitTitle: 'THE EARLY MODERN WORLD (1450–1750)',
    yearGroup: 'Year 8',
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
    milestones: timelineMilestones,
    lessons: list.map((cfg, i) => {
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
        ...cfg,
        shortTitle: subLabels[i] || `Lesson ${i + 1}`,
        overviewTitle: overviewTitles[i] || `Lesson ${i + 1}`,
        syllabusTopic: syllabusTopics[i] || '',
        specBullets: specBullets[i] || [],
        questionCount: 20,
      };
    }),
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
      'History is not a static list of dates, but a live argument about how our modern world was made.',
      'Always evaluate long-term significance alongside immediate short-term triggers.',
      'Resistance took many forms: cultural preservation, escape, and armed insurrection.',
      'Queen Nanny and the Jamaican Maroons forced an empire into a treaty of freedom.',
      'Independent judgement requires balancing competing historiographical interpretations.',
      'Key Stage 3 Historical Studies • Pupil Assessment Record • Year 8',
    ],
    pageHeight: '256mm',
    pageMargin: '10mm 12mm 10mm 12mm',
  };
}

module.exports = {
  getEarlyModernConfig,
  timelineMilestones,
};
