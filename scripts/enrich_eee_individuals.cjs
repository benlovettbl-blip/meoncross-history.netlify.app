const fs = require('fs');
const path = require('path');

const enrichedIndividuals = [
  {
    name: 'King Henry VIII',
    group: '👑 Tier 1: The Monarchs (Sovereign Rulers)',
    bio: "King of England (1509–1547); Elizabeth's father whose marital changes created her legitimacy crisis.",
    image: '/images/king_henry_viii.jpg',
    achievements: [
      'Broke England away from the Catholic Church to secure an annulment.',
      'Founded the Church of England, making himself the Supreme Head.',
      'Vastly increased royal wealth by dissolving the monasteries.',
    ],
    limitations: [
      'His volatile marriage history created long-term succession crises.',
      'Squandered much of the wealth gained from the monasteries on foreign wars.',
      'Failed to produce a healthy, long-lived male heir.',
    ],
    quotes: [
      '"We are, by the sufferance of God, King of England; and the Kings of England in times past never had any superior but God."',
    ],
  },
  {
    name: 'Queen Mary I (Mary Tudor)',
    group: '👑 Tier 1: The Monarchs (Sovereign Rulers)',
    bio: 'Queen of England (1553–1558); Elizabeth’s older Catholic sister and predecessor.',
    image: '/images/queen_mary_i_mary_tudor.jpg',
    achievements: [
      'Successfully claimed the throne despite attempts to bypass her for Lady Jane Grey.',
      'Restored Catholicism in England and papal supremacy during her reign.',
      'Strengthened the English navy and reorganized the royal finances.',
    ],
    limitations: [
      "Burned over 280 Protestant 'heretics', earning her the nickname 'Bloody Mary' and deeply unpopularizing her regime.",
      "Her marriage to Philip II of Spain provoked Wyatt's Rebellion.",
      "Lost Calais, England's last possession in France.",
    ],
    quotes: ['"When I am dead and opened, you shall find \'Calais\' lying in my heart."'],
  },
  {
    name: 'Queen Elizabeth I',
    group: '👑 Tier 1: The Monarchs (Sovereign Rulers)',
    bio: 'Queen of England (1558–1603); Supreme Governor of the Church of England.',
    image: '/images/queen_elizabeth_i.jpg',
    achievements: [
      "Established the Religious Settlement (1559), creating a 'middle way' that stabilized England.",
      'Successfully defended England against the Spanish Armada in 1588.',
      "Fostered a 'Golden Age' of exploration, trade, and culture.",
    ],
    limitations: [
      'Refused to marry or name a successor, leading to constant anxiety over the succession.',
      'Struggled with massive national debt and relied heavily on unpopular monopolies.',
      'Faced persistent threats from Catholic plots seeking to replace her with Mary, Queen of Scots.',
    ],
    quotes: [
      '"I know I have the body but of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too."',
    ],
  },
  {
    name: 'King Philip II of Spain',
    group: '👑 Tier 1: The Monarchs (Sovereign Rulers)',
    bio: "Sovereign ruler of the global Spanish Empire; Elizabeth's chief Catholic rival.",
    image: '/images/king_philip_ii_of_spain.jpg',
    achievements: [
      'Ruled the most powerful global empire of the 16th century, spanning the Americas and Europe.',
      'Successfully defended Catholicism against the Ottoman Empire at the Battle of Lepanto (1571).',
      'Briefly held the title of King of England during his marriage to Mary I.',
    ],
    limitations: [
      'His "Spanish Armada" of 1588 was a disastrous failure against England.',
      'Faced continuous and expensive rebellions in the Spanish Netherlands.',
      'His micro-management style often delayed crucial military and political decisions.',
    ],
    quotes: ['"I would rather lose all my lands and a hundred lives than be king over heretics."'],
  },
  {
    name: 'Francis II',
    group: '👑 Tier 1: The Monarchs (Sovereign Rulers)',
    bio: 'King of France; briefly King-consort of Scotland through his marriage to Mary, Queen of Scots.',
    image: '/images/francis_ii.jpg',
    achievements: [
      'Ascended to the French throne at age 15, temporarily uniting the crowns of France and Scotland through marriage.',
    ],
    limitations: [
      "Was politically dominated by his wife's uncles, the ultra-Catholic Guise brothers.",
      'His reign lasted only 17 months before he died of a severe ear infection.',
      "Failed to produce an heir, leading to his brother's succession and Mary's return to Scotland.",
    ],
    quotes: [
      '"(He was remembered more as a pawn of the Guise faction than a ruler in his own right)."',
    ],
  },
  {
    name: 'Mary, Queen of Scots (Mary Stuart)',
    group: '👑 Tier 1: The Monarchs (Sovereign Rulers)',
    bio: "Sovereign Queen of Scotland; Elizabeth's cousin and claimant to the English throne.",
    image: '/images/mary_queen_of_scots_mary_stuart.jpg',
    achievements: [
      'Maintained a strong Catholic claim to the English throne, serving as a figurehead for English Catholics.',
      'Briefly served as Queen Consort of France (1559–1560).',
    ],
    limitations: [
      "Her disastrous marriages and suspected involvement in Lord Darnley's murder alienated the Scottish nobles.",
      "Forced to abdicate in Scotland and fled to England, where she became Elizabeth's prisoner for 19 years.",
      'Repeatedly implicated in plots against Elizabeth, culminating in her execution in 1587.',
    ],
    quotes: ['"In my end is my beginning."'],
  },
  {
    name: 'The Duke of Norfolk (Thomas Howard)',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'The highest-ranking nobleman in England; executed in 1572 for plotting to marry Mary, Queen of Scots.',
    image: '/images/the_duke_of_norfolk_thomas_howard.jpg',
    achievements: [
      "Served as a leading member of Elizabeth's Privy Council.",
      'Commanded the English army in Scotland to negotiate the Treaty of Edinburgh (1560).',
    ],
    limitations: [
      "Resented the rise of 'new men' like William Cecil, leading him into treasonous conspiracies.",
      'His involvement in the Ridolfi Plot (1571) led directly to his trial and execution.',
      "Lacked the political cunning to outmaneuver Elizabeth's spymasters.",
    ],
    quotes: ['"I am no Catholic... but I would fain have Mary Queen of Scots for my wife."'],
  },
  {
    name: 'The Duke of Alba',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'High-ranking Spanish nobleman and military commander sent by Philip II to crush the Dutch Revolt.',
    image: '/images/the_duke_of_alba.jpg',
    achievements: [
      'A highly experienced and feared military commander for the Spanish Empire.',
      "Successfully established the 'Council of Troubles' to root out Protestant heresy in the Netherlands.",
    ],
    limitations: [
      'His brutal tactics (executing thousands) only hardened Dutch resistance rather than subduing it.',
      'Failed to permanently defeat the Sea Beggars and the Dutch rebellion.',
      'His heavy taxation policies severely damaged the economy of the Spanish Netherlands.',
    ],
    quotes: [
      '"A head of salmon is worth a thousand heads of frogs." (Referring to executing nobles over commoners)',
    ],
  },
  {
    name: 'The Duke of Parma',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'Spanish nobleman and governor of the Netherlands; commander of the invasion force the Armada was sent to transport.',
    image: '/images/the_duke_of_parma.png',
    achievements: [
      'Brilliant military tactician who successfully recaptured much of the southern Netherlands for Spain.',
      'Assembled a massive invasion force of 27,000 men on the coast of Flanders to invade England.',
    ],
    limitations: [
      'Lacked deep-water ports, meaning his invasion barges could not safely rendezvous with the Armada.',
      'His communications with the Duke of Medina Sidonia were drastically delayed by distance and enemy blockades.',
      'The failure of the Armada forced him to abandon the invasion of England entirely.',
    ],
    quotes: ['"I cannot perform miracles... without a secure port, this enterprise is doomed."'],
  },
  {
    name: 'The Duke of Medina Sidonia',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'Spanish nobleman appointed to command the Spanish Armada.',
    image: '/images/the_duke_of_medina_sidonia.jpg',
    achievements: [
      'Successfully navigated the Armada through the treacherous English Channel in an impenetrable crescent formation.',
      'Managed to return a portion of the devastated fleet to Spain by sailing around Scotland and Ireland.',
    ],
    limitations: [
      'Had no naval combat experience and famously suffered from seasickness.',
      'Was appointed based on his high noble rank rather than his military competence.',
      'Failed to adapt to the English use of fireships at Calais.',
    ],
    quotes: [
      '"I know by experience of water that I am seasick and always catch cold... I have no experience of the sea or of war."',
    ],
  },
  {
    name: 'The Duke of Guise',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'Powerful French Catholic noble who conspired to launch a French invasion of England.',
    image: '/images/the_duke_of_guise.jpg',
    achievements: [
      'Led the ultra-Catholic faction in France during the French Wars of Religion.',
      'Backed multiple plots (including the Throckmorton Plot) to overthrow Elizabeth and install Mary, Queen of Scots.',
    ],
    limitations: [
      'His focus was divided between civil war in France and plotting against England.',
      'His plans relied heavily on foreign funding (from Philip II) which was often unreliable.',
      'Assassinated in 1588, ending his influence over anti-Elizabeth conspiracies.',
    ],
    quotes: ['"We must extirpate this Protestant heresy root and branch."'],
  },
  {
    name: 'Robert Dudley (Earl of Leicester)',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: "Elizabeth's favorite courtier and leading Privy Councillor; later Governor-General of the Low Countries.",
    image: '/images/robert_dudley_earl_of_leicester.jpg',
    achievements: [
      'Remained Elizabeth\'s most trusted personal confidant and "favorite" for decades.',
      'Appointed commander of the English forces sent to aid the Dutch rebels in 1585.',
      'A leading patron of the Puritans in England.',
    ],
    limitations: [
      'The suspicious death of his wife (Amy Robsart) made it politically impossible for him to marry Elizabeth.',
      'His military campaign in the Netherlands was largely a failure and severely angered Elizabeth.',
      'Frequently clashed with William Cecil over foreign policy.',
    ],
    quotes: ['"I am your Majesty\'s most faithful and devoted servant, bound by more than duty."'],
  },
  {
    name: 'The Earl of Northumberland (Thomas Percy)',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'Catholic noble who co-led the failed Revolt of the Northern Earls.',
    image: '/images/the_earl_of_northumberland_thomas_percy.jpg',
    achievements: [
      'Held significant power and wealth in the North of England.',
      'Successfully captured Durham Cathedral and held a Catholic mass in 1569.',
    ],
    limitations: [
      'His rebellion (The Revolt of the Northern Earls) lacked coordination and failed to mobilize widespread support.',
      'Fled to Scotland but was betrayed, handed over to Elizabeth, and executed for treason in 1572.',
    ],
    quotes: ['"We intend nothing against the Queen, but only to restore the old religion."'],
  },
  {
    name: 'The Earl of Westmorland (Charles Neville)',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'Catholic noble who co-led the Revolt of the Northern Earls.',
    image: '/images/the_earl_of_westmorland_charles_neville.jpg',
    achievements: [
      'Mustered a force of nearly 6,000 men during the 1569 uprising.',
      'Managed to escape execution by fleeing into permanent exile in the Spanish Netherlands.',
    ],
    limitations: [
      'Lost all his English estates and titles as a result of his treason.',
      'Lived the rest of his life in poverty as a pensioner of Philip II of Spain.',
    ],
    quotes: [
      '"(He remained a symbol of the exiled Catholic resistance, but with zero actual power in England)."',
    ],
  },
  {
    name: 'Lord Darnley (Henry Stuart)',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'Nobleman of royal blood; second husband of Mary, Queen of Scots.',
    image: '/images/lord_darnley_henry_stuart.jpg',
    achievements: [
      'Fathered James VI of Scotland (later James I of England), uniting the two crowns in the future.',
    ],
    limitations: [
      'Was vain, arrogant, and politically inept, quickly alienating his wife and the Scottish nobles.',
      "Involved in the brutal assassination of Mary's secretary, David Rizzio.",
      "Was himself assassinated in an explosion at Kirk o' Field in 1567, a scandal that destroyed Mary's reign.",
    ],
    quotes: ['"(His arrogance made him universally despised at the Scottish court)."'],
  },
  {
    name: 'Lady Jane Grey',
    group: '🏰 Tier 2: The Nobility (Dukes, Earls, and Barons)',
    bio: 'Briefly named Protestant Queen in 1553; cousin of Elizabeth.',
    image: '/images/lady_jane_grey.jpg',
    achievements: [
      'A highly educated Protestant who was proclaimed Queen of England following the death of Edward VI.',
    ],
    limitations: [
      'Her "reign" lasted only nine days before popular support swung overwhelmingly to Mary Tudor.',
      'She was merely a pawn manipulated by powerful noblemen (like the Duke of Northumberland).',
      "Executed for high treason by Mary I after Wyatt's Rebellion.",
    ],
    quotes: ['"Lord, into thy hands I commend my spirit!" (Her last words on the scaffold)'],
  },
  {
    name: 'Sir William Cecil (Lord Burghley)',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: 'Elizabeth’s first Secretary of State and most trusted advisor.',
    image: '/images/sir_william_cecil_lord_burghley.jpg',
    achievements: [
      "Served as Elizabeth's chief minister for 40 years, guiding domestic and foreign policy.",
      'Was instrumental in drafting the Religious Settlement of 1559.',
      'Established a highly effective intelligence network before passing it to Walsingham.',
    ],
    limitations: [
      'Was highly cautious and constantly worried about foreign invasion and the succession crisis.',
      'His moderate, pragmatic approach often clashed with more radical Puritan advisors like Dudley.',
    ],
    quotes: ['"A realm gaineth more by one year\'s peace than by ten years\' war."'],
  },
  {
    name: 'Sir Francis Walsingham',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: "Elizabeth's Secretary of State and Spymaster.",
    image: '/images/sir_francis_walsingham.jpg',
    achievements: [
      'Built a vast, highly efficient espionage network spanning Europe.',
      'Uncovered the Throckmorton and Babington Plots, providing the evidence needed to execute Mary, Queen of Scots.',
      'A fiercely devout Puritan who actively protected Protestant interests at court.',
    ],
    limitations: [
      'His radical Puritan views often irritated Elizabeth.',
      'Died in severe debt after spending his own personal fortune to fund his spy network.',
    ],
    quotes: ['"There is less danger in fearing too much than too little."'],
  },
  {
    name: 'Sir Walter Raleigh',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: 'Courtier, explorer, and knight given the royal patent to colonize Virginia.',
    image: '/images/sir_walter_raleigh.jpg',
    achievements: [
      'Organized and financed the first English attempts to colonize North America (Roanoke).',
      'Popularized tobacco and potatoes in England.',
      'Was a highly favored courtier, poet, and writer.',
    ],
    limitations: [
      'Did not personally lead the Roanoke voyages because Elizabeth refused to let him leave court.',
      "Fell from royal favor after secretly marrying one of the Queen's maids of honor.",
      'The Roanoke colony he sponsored ultimately failed and disappeared.',
    ],
    quotes: [
      '"For whosoever commands the sea commands the trade; whosoever commands the trade of the world commands the riches of the world, and consequently the world itself."',
    ],
  },
  {
    name: 'Sir Francis Drake',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: 'Privateer, navigator, and naval commander; knighted in 1580.',
    image: '/images/sir_francis_drake.jpg',
    achievements: [
      'First Englishman to circumnavigate the globe (1577–1580), returning with massive Spanish plunder.',
      "'Singeing the King of Spain's beard' by destroying ships at Cadiz in 1587, delaying the Armada.",
      'Served as Vice-Admiral during the defeat of the Spanish Armada in 1588.',
    ],
    limitations: [
      'Was viewed by the Spanish purely as a pirate (El Draque) rather than a legitimate naval officer.',
      'His prioritizing of capturing treasure ships sometimes disrupted disciplined naval formations.',
    ],
    quotes: [
      '"There must be a beginning of any great matter, but the continuing unto the end until it be thoroughly finished yields the true glory."',
    ],
  },
  {
    name: 'Sir John Hawkins',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: 'Merchant, privateer, and treasurer of the Royal Navy.',
    image: '/images/sir_john_hawkins.JPG',
    achievements: [
      'Redesigned English galleons to be faster, more maneuverable, and heavily armed with long-range cannons.',
      'As Treasurer of the Navy, he ensured the English fleet was technologically superior to the Spanish.',
      'Pioneered the English involvement in the transatlantic slave trade.',
    ],
    limitations: [
      'His slaving voyages provoked violent clashes with the Spanish (e.g., the Battle of San Juan de Ulúa in 1568).',
      'His aggressive commercial expansion directly escalated the path to war with Spain.',
    ],
    quotes: [
      '"Serve God daily, love one another, preserve your victuals, beware of fire, and keep good company."',
    ],
  },
  {
    name: 'Sir Richard Grenville',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: 'Naval commander of the 1585 expedition to Roanoke.',
    image: '/images/sir_richard_grenville.jpg',
    achievements: [
      'Commanded the fleet that brought the first English colonists to Roanoke Island in 1585.',
      'A fierce and uncompromising naval commander in battles against the Spanish.',
    ],
    limitations: [
      'His hot-tempered and brutal treatment of the indigenous Algonquian people (e.g., burning a village over a missing silver cup) ruined relations at Roanoke.',
      'His delayed return with supplies doomed the first wave of colonists.',
    ],
    quotes: [
      '"(Known for his extreme temper and legendary last stand against the Spanish at Flores in 1591)."',
    ],
  },
  {
    name: 'Anthony Babington',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: 'A wealthy Catholic gentleman who led the Babington Plot.',
    image: '/images/anthony_babington.jpg',
    achievements: [
      'Organized a secret network of Catholic gentlemen willing to fight for Mary, Queen of Scots.',
    ],
    limitations: [
      "Was easily manipulated by Walsingham's double agents into writing his treasonous plans on paper.",
      'His naivety directly provided the legal evidence required to execute Mary.',
      'Executed for high treason in 1586.',
    ],
    quotes: ['"Six noble gentlemen... will undertake the tragic execution (of Elizabeth)."'],
  },
  {
    name: 'Francis Throckmorton',
    group: '🛡️ Tier 3: The Gentry (Knights, Chief Ministers, and Landowners)',
    bio: 'A Catholic gentleman who acted as a key intermediary in the Throckmorton Plot.',
    image: '/images/francis_throckmorton.jpg',
    achievements: [
      'Acted as a secret messenger between Mary, Queen of Scots, the Spanish Ambassador, and the Duke of Guise.',
    ],
    limitations: [
      'Was placed under surveillance by Walsingham, leading to a raid on his house that uncovered the plot documents.',
      'Confessed to the conspiracy under torture on the rack.',
      "His plot's failure led to the creation of the Bond of Association (1584).",
    ],
    quotes: ['"(His confession under torture doomed the 1583 Catholic uprising)."'],
  },
  {
    name: 'James Pilkington',
    group: '🎓 Tier 4: Professionals & High-Ranking Clergy',
    bio: 'The Protestant Bishop of Durham appointed by Elizabeth.',
    image: '',
    achievements: [
      'Spearheaded the imposition of Protestantism in the deeply Catholic North of England.',
      'Worked aggressively to root out Catholic relics and traditions.',
    ],
    limitations: [
      'His radical Protestantism deeply offended the Northern Earls, acting as a major trigger for their 1569 rebellion.',
      'Lacked the diplomatic tact needed to smoothly transition the North to the new religion.',
    ],
    quotes: [
      '"(His sermons actively antagonized the traditionalist Catholic nobility of the North)."',
    ],
  },
  {
    name: 'Thomas Harriot',
    group: '🎓 Tier 4: Professionals & High-Ranking Clergy',
    bio: 'Brilliant mathematician, navigator, and scholar who recorded the Roanoke voyage.',
    image: '/images/thomas_harriot.jpg',
    achievements: [
      'Learned the Algonquian language to communicate with indigenous leaders.',
      "Wrote 'A Briefe and True Report of the New Found Land of Virginia', highly influential in promoting colonization.",
      "Provided expert navigational training to Raleigh's captains.",
    ],
    limitations: [
      'His scientific view of the New World was often overly optimistic, minimizing the extreme hardships of colonization.',
      'Despite his diplomacy, he could not prevent the outbreak of violence between colonists and the Algonquians.',
    ],
    quotes: [
      '"There is good hope that they may be brought through discreet dealing... to the embracing of the truth, and consequently to honor, obey, fear and love us."',
    ],
  },
  {
    name: 'Thomas Phelippes',
    group: '🎓 Tier 4: Professionals & High-Ranking Clergy',
    bio: 'Walsingham’s chief cryptographer and codebreaker.',
    image: '',
    achievements: [
      'Mastered the art of deciphering intercepted Catholic messages.',
      "Successfully cracked Mary, Queen of Scots' cipher during the Babington Plot.",
      "Forged a postscript to Babington's letter to extract the names of the co-conspirators.",
    ],
    limitations: [
      'Was a behind-the-scenes operative whose historical fame was overshadowed by Walsingham.',
      'His work required immense time and patience in an era before modern computing.',
    ],
    quotes: [
      '"(He famously drew a gallows symbol on the deciphered letter, knowing it meant death for the plotters)."',
    ],
  },
  {
    name: 'Gilbert Gifford',
    group: '🎓 Tier 4: Professionals & High-Ranking Clergy',
    bio: 'A Catholic priest who acted as Walsingham’s agent provocateur during the Babington Plot.',
    image: '',
    achievements: [
      'Established the beer barrel smuggling route used to secretly communicate with Mary, Queen of Scots.',
      "Secretly handed all of Mary's intercepted letters directly to Walsingham.",
    ],
    limitations: [
      'Was a double agent motivated more by survival and money than genuine loyalty.',
      'Eventually fled to France where he was arrested and died in a Parisian prison.',
    ],
    quotes: ['"(His treachery was the fatal link in the Babington conspiracy)."'],
  },
  {
    name: 'Edmund Campion',
    group: '🎓 Tier 4: Professionals & High-Ranking Clergy',
    bio: 'Highly educated Jesuit missionary priest executed for treason.',
    image: '',
    achievements: [
      'Smuggled himself into England to secretly preach and restore Catholicism.',
      "Authored 'Campion's Brag', a famous pamphlet defending the Catholic faith and challenging Protestants to debate.",
    ],
    limitations: [
      "Was hunted relentlessly by Walsingham's pursuivants.",
      'Captured in 1581, brutally tortured on the rack, and executed as a traitor rather than a religious martyr.',
    ],
    quotes: [
      '"In condemning us you condemn all your own ancestors, all the ancient priests, bishops and kings—all that was once the glory of England."',
    ],
  },
  {
    name: 'Roberto Ridolfi',
    group: '⚖️ Tier 5: The "Middling Sort" (Wealthy Merchants & Bankers)',
    bio: 'An Italian banker based in London who used his financial networks to organize the Ridolfi Plot in 1571.',
    image: '',
    achievements: [
      'Used his status as a foreign banker to travel freely across Europe, passing messages between the Pope, Philip II, and the Duke of Norfolk.',
      'Secured a promise of 10,000 Spanish troops to invade England.',
    ],
    limitations: [
      "Was indiscreet and left a trail of evidence that was easily uncovered by William Cecil's intelligence network.",
      'His plot resulted in the execution of the Duke of Norfolk, while Ridolfi safely remained abroad.',
    ],
    quotes: [
      '"(He acted as the financial and logistical architect of the first major foreign invasion plot against Elizabeth)."',
    ],
  },
  {
    name: 'Chief Wingina',
    group: '🌍 Sovereign Status: Indigenous Leadership',
    bio: 'The ruler (mandoac) of the local Algonquian tribe at Roanoke.',
    image: '/images/chief_wingina.jpg',
    achievements: [
      'Initially established peaceful trade and diplomatic relations with the English explorers.',
      'Led his people through a severe period of drought and devastating European diseases.',
    ],
    limitations: [
      'Severely underestimated the violent and uncompromising nature of the English colonists under Ralph Lane.',
      'His attempt to organize a coalition of tribes to wipe out the English failed.',
      'Was ambushed and beheaded by the English in 1586, destroying any hope of peace.',
    ],
    quotes: [
      '"(He initially welcomed the English as potential allies against rival tribes, a fatal miscalculation)."',
    ],
  },
];

const dataPath = path.join(__dirname, '..', 'public', 'units', 'eee', 'data.js');
let content = fs.readFileSync(dataPath, 'utf8');

// We need to replace the key_individuals array in the file.
// Since it's a huge JS file, a simple regex might fail due to nested brackets.
// However, in our standard format, it usually looks like:
//   "key_individuals": [
//     ...
//   ],
//   "other_prop": ...
// Or it's at the very end of the file.

const keyIndRegex = /"key_individuals"\s*:\s*\[[\s\S]*?\n\s*\]\s*(,\n|\n})/g;

if (keyIndRegex.test(content)) {
  const replacement =
    '"key_individuals": ' +
    JSON.stringify(enrichedIndividuals, null, 2).replace(/\n/g, '\n  ') +
    '$1';
  content = content.replace(keyIndRegex, replacement);
  fs.writeFileSync(dataPath, content);
  console.log('Successfully enriched key_individuals in eee data.js!');
} else {
  // If we couldn't match, maybe it ends exactly at EOF
  const keyIndRegexEOF = /"key_individuals"\s*:\s*\[[\s\S]*?\]\s*$/;
  if (keyIndRegexEOF.test(content)) {
    const replacement =
      '"key_individuals": ' + JSON.stringify(enrichedIndividuals, null, 2).replace(/\n/g, '\n  ');
    content = content.replace(keyIndRegexEOF, replacement);
    fs.writeFileSync(dataPath, content);
    console.log('Successfully enriched key_individuals in eee data.js (at EOF)!');
  } else {
    console.error('Could not find key_individuals array in data.js');
  }
}
