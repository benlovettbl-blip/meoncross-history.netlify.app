const fs = require('fs');
const path = require('path');

const dataJsPath = path.join(__dirname, '..', 'units', 'early_modern_world', 'data.js');

const flashcardsByLesson = [
  // Lesson 1: Who held global power in 1450?
  [
    {
      term: 'Ming Dynasty',
      definition:
        'The ruling imperial dynasty of China (1368–1644), famous for immense wealth, porcelain, and Admiral Zheng He’s massive treasure fleets across the Indian Ocean.',
    },
    {
      term: 'Ottoman Empire',
      definition:
        'A powerful Islamic empire founded in Anatolia that conquered Constantinople in 1453, controlling crucial overland trade routes between Europe and Asia.',
    },
    {
      term: 'Songhai Empire',
      definition:
        'A vast West African trading empire centered in Timbuktu and Gao, renowned for its Islamic scholarship and control of the trans-Saharan gold and salt trade.',
    },
    {
      term: 'Silk Roads',
      definition:
        'An ancient network of overland trade routes connecting China and India to the Mediterranean, carrying silk, spices, porcelain, and ideas across Afro-Eurasia.',
    },
    {
      term: 'Fall of Constantinople (1453)',
      definition:
        'The capture of the Byzantine capital by Ottoman Sultan Mehmed II, which blocked European merchants from overland Asian trade and forced them to sail west.',
    },
    {
      term: 'Eurocentrism',
      definition:
        'The misleading historical bias of viewing world history solely through European perspectives and assuming Europe was always the dominant civilization.',
    },
  ],
  // Lesson 2: How did religious conflict trigger global exploration (1517–1588)?
  [
    {
      term: 'Protestant Reformation',
      definition:
        'The 16th-century religious movement launched by Martin Luther that challenged Catholic Church authority and split Western Christianity.',
    },
    {
      term: 'Indulgence',
      definition:
        'A certificate sold by the medieval Catholic Church promising forgiveness of sins and reduced time in Purgatory, sparking Martin Luther’s protests in 1517.',
    },
    {
      term: 'Treaty of Tordesillas (1494)',
      definition:
        'A treaty mediated by the Pope dividing the newly explored Americas between Spain and Portugal, ignoring all non-Catholic states and Indigenous peoples.',
    },
    {
      term: 'Privateer',
      definition:
        'An armed private ship and crew licensed by a government with "letters of marque" to attack and plunder enemy merchant vessels during wartime.',
    },
    {
      term: 'Spanish Armada (1588)',
      definition:
        'A massive fleet of 130 warships sent by Catholic King Philip II of Spain to invade Protestant England and overthrow Queen Elizabeth I, resulting in catastrophic defeat.',
    },
    {
      term: 'Circumnavigation',
      definition:
        'The act of sailing completely around the globe, first achieved by Ferdinand Magellan’s expedition (1519–1522) and later by Sir Francis Drake (1577–1580).',
    },
  ],
  // Lesson 3: Trade or takeover: How did early encounters turn into empire?
  [
    {
      term: 'Joint-Stock Company',
      definition:
        'A pioneering business model where multiple investors pool capital to buy shares in overseas trading ventures, spreading financial risk and sharing profits.',
    },
    {
      term: 'East India Company (EIC)',
      definition:
        'An English trading corporation founded in 1600 that held a royal monopoly on Asian trade and gradually expanded from trading spices to governing India.',
    },
    {
      term: 'Royal Charter',
      definition:
        'A formal decree issued by a monarch granting exclusive legal privileges, commercial monopolies, or territorial governance to an individual or company.',
    },
    {
      term: 'Factory (Trading Post)',
      definition:
        'A fortified commercial warehouse and settlement in a foreign port where merchant agents ("factors") stored trade goods and conducted business.',
    },
    {
      term: 'Mughal Empire',
      definition:
        'The wealthy and powerful Islamic empire that ruled the Indian subcontinent in the 16th and 17th centuries, possessing far greater riches than any European nation.',
    },
    {
      term: 'Jamestown (1607)',
      definition:
        'The first permanent English settlement in North America, established in Virginia, which survived economically through the commercial cultivation of tobacco.',
    },
  ],
  // Lesson 4: James I and the Gunpowder Plot: Why was religious division so volatile?
  [
    {
      term: 'Recusancy Fines',
      definition:
        'Crippling financial penalties imposed by the English Crown on Catholics who refused to attend compulsory Church of England Sunday services.',
    },
    {
      term: 'Divine Right of Kings',
      definition:
        'The political doctrine that a monarch’s authority comes directly from God, making the king accountable to no earthly power or Parliament.',
    },
    {
      term: 'Gunpowder Plot (1605)',
      definition:
        'A conspiracy led by Catholic plotters including Robert Catesby and Guy Fawkes to blow up the Houses of Parliament and kill King James I.',
    },
    {
      term: 'Jesuit',
      definition:
        'A member of the Roman Catholic Society of Jesus; in Jacobean England, Jesuit priests were outlawed and pursued as suspected foreign traitors.',
    },
    {
      term: 'Treason',
      definition:
        'The crime of attempting to assassinate the monarch or overthrow the state, punished in early modern Britain by hanging, drawing, and quartering.',
    },
    {
      term: 'Monteagle Letter',
      definition:
        'An anonymous warning letter delivered to Catholic Lord Monteagle in October 1605 that unmasked the Gunpowder Plot and led to Guy Fawkes’ arrest.',
    },
  ],
  // Lesson 5: Who controlled Britain? The Ideological Battle
  [
    {
      term: 'English Civil War (1642–1651)',
      definition:
        'A series of military conflicts between supporters of King Charles I (Royalists or Cavaliers) and supporters of Parliament (Roundheads).',
    },
    {
      term: 'New Model Army',
      definition:
        'A disciplined, professional, and religiously devoted army created by Parliament in 1645, commanded by Thomas Fairfax and Oliver Cromwell, promoting on merit.',
    },
    {
      term: 'Regicide',
      definition:
        'The deliberate trial and execution of a reigning monarch; specifically the public beheading of King Charles I outside Whitehall on 30 January 1649.',
    },
    {
      term: 'The Commonwealth',
      definition:
        'The republican government that ruled England, Wales, Scotland, and Ireland without a monarch from 1649 until the Restoration in 1660.',
    },
    {
      term: 'Puritanism',
      definition:
        'A radical Protestant movement within the Church of England seeking to "purify" worship of all Catholic rituals and enforce strict, austere moral conduct.',
    },
    {
      term: 'Levellers',
      definition:
        'A radical political faction during the English Civil War that demanded universal male suffrage, religious freedom, and legal equality for all citizens.',
    },
  ],
  // Lesson 6: Who controlled Britain? The Economic Shift
  [
    {
      term: 'Mercantilism',
      definition:
        'The prevailing 17th-century economic theory that national power depends on accumulating gold and silver bullion by maximizing exports and limiting imports.',
    },
    {
      term: 'Navigation Acts (1651)',
      definition:
        'Protectionist trade laws passed by Parliament requiring that all goods imported into Britain or its colonies be carried on English-built ships.',
    },
    {
      term: 'Fiscal-Military State',
      definition:
        'A state that reorganizes its tax systems, central banking, and bureaucracy to successfully finance large permanent armed forces and naval power.',
    },
    {
      term: 'Bank of England (1694)',
      definition:
        'The central banking institution created to manage government borrowing and fund naval warfare, establishing Britain’s modern National Debt.',
    },
    {
      term: 'Royal African Company (RAC)',
      definition:
        'An English chartered trading company led by the Stuart royal family that held a monopoly on the transatlantic trade in enslaved human beings.',
    },
    {
      term: 'Consumer Revolution',
      definition:
        'The rapid expansion in the consumption of overseas imported commodities (sugar, tobacco, tea, coffee, and calico) across British society in the late 1600s and 1700s.',
    },
  ],
  // Lesson 7: What were the mechanics of the Transatlantic Slave Trade?
  [
    {
      term: 'Triangular Trade',
      definition:
        'The brutal transatlantic commercial system: European manufactured goods to West Africa, enslaved Africans to the Americas, and plantation crops back to Europe.',
    },
    {
      term: 'Middle Passage',
      definition:
        'The horrific forced oceanic voyage of captive Africans across the Atlantic, characterized by extreme overcrowding, chains, disease, and high mortality.',
    },
    {
      term: 'Barracoon',
      definition:
        'A fortified enclosure, warehouse, or cage on the West African coast where captured Africans were imprisoned and branded while awaiting slave ships.',
    },
    {
      term: 'Chattel Slavery',
      definition:
        'A dehumanizing legal system where enslaved people are classified as personal property (chattel), bought, sold, and inherited without any civil rights.',
    },
    {
      term: 'Plantation Complex',
      definition:
        'An industrial-scale agricultural enterprise in the Americas dedicated to producing lucrative cash crops (sugar, tobacco) using forced, enslaved labor.',
    },
    {
      term: 'Branding',
      definition:
        'The cruel practice of burning a red-hot metal iron mark into the flesh of an enslaved person to register ownership by an empire, merchant, or company.',
    },
  ],
  // Lesson 8: How did enslaved Africans resist the Transatlantic Slave Trade?
  [
    {
      term: 'Spectrum of Resistance',
      definition:
        'The wide range of actions taken by enslaved people to resist oppression, from covert daily sabotage to armed rebellion and revolution.',
    },
    {
      term: 'Maroons',
      definition:
        'Communities of self-emancipated Africans who escaped bondage and established fortified, independent societies in mountainous or forested regions like Jamaica.',
    },
    {
      term: 'Covert Resistance',
      definition:
        'Subtle, everyday acts of rebellion against enslavement, including slowing down work, pretending illness, breaking tools, and sabotaging machinery.',
    },
    {
      term: 'Stono Rebellion (1739)',
      definition:
        'The largest armed uprising by enslaved Africans in the mainland British colonies, taking place near Charleston, South Carolina.',
    },
    {
      term: 'Obeah',
      definition:
        'An African-derived spiritual and medicinal system practiced in the Caribbean, providing enslaved communities with healing, solidarity, and spiritual resistance.',
    },
    {
      term: 'Abolitionism',
      definition:
        'The political, social, and moral movement to outlaw the slave trade and legally emancipate all enslaved people worldwide.',
    },
  ],
  // Lesson 9: How 'modern' was Britain by 1750? (Synthesis & Assessment)
  [
    {
      term: 'Constitutional Monarchy',
      definition:
        'A political system established after the 1688 Glorious Revolution where a monarch’s powers are strictly constrained by Parliament and the law.',
    },
    {
      term: 'Rotten Borough',
      definition:
        'A parliamentary constituency with a tiny voting population that could be easily bribed or controlled by a wealthy aristocrat to seat an MP.',
    },
    {
      term: 'The Bloody Code',
      definition:
        'The harsh 18th-century English criminal code that imposed the death penalty for over 200 offenses, predominantly to safeguard private property.',
    },
    {
      term: 'Gin Craze',
      definition:
        'An era of widespread, cheap gin consumption in early 18th-century London, creating moral panic, poverty, and social turmoil documented by William Hogarth.',
    },
    {
      term: 'Urbanisation',
      definition:
        'The rapid demographic growth and movement of people from agricultural countryside into commercial towns and cities.',
    },
    {
      term: 'Enlightenment',
      definition:
        'An 18th-century European intellectual movement that advocated reason, science, individual liberty, and skepticism of religious superstition and tyranny.',
    },
  ],
];

(async () => {
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const module = await import(fileUrl);
  const unitData = module.default || module.unitData || module.early_modern_world;

  if (!unitData || !unitData.lessons) {
    console.error('Failed to load lessons from early_modern_world/data.js');
    process.exit(1);
  }

  unitData.lessons.forEach((lesson, idx) => {
    const deck = flashcardsByLesson[idx];
    if (deck) {
      lesson.vocab = deck;
      lesson.flashcards = deck;
      console.log(`✅ Lesson ${idx + 1} ('${lesson.title}'): Injected ${deck.length} flashcards.`);
    }
  });

  const updatedCode = `const early_modern_world = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = early_modern_world;\nexport default early_modern_world;\n`;

  fs.writeFileSync(dataJsPath, updatedCode, 'utf8');
  console.log(
    '\n🎉 Successfully updated units/early_modern_world/data.js with 54 high-value flashcards!',
  );
})();
