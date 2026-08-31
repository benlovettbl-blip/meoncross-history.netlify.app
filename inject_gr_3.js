const fs = require('fs');
let data = fs.readFileSync('early_modern_world/data.js', 'utf8');

const guidedReadingData = [
  {
    lesson_index: 0,
    book_title: 'Lesson 1: Who held global power in 1450?',
    author: 'Text Type: Stone Inscription (Admiral Zheng He, 1431)',
    cover_image: '',
    author_context: 'Before European empires dominated the globe, Ming Dynasty China was the unquestioned superpower. Between 1405 and 1433, Admiral Zheng He led massive fleets of \'Treasure Ships\' across the Indian Ocean to Africa and the Middle East. Before his final voyage, he carved this inscription into a stone pillar in Fujian, China.',
    extract: 'The Imperial Ming dynasty in unifying seas and continents, surpassing the three dynasties even goes beyond the Han and Tang dynasties. The countries beyond the horizon and from the ends of the earth have all become subjects and to the most western of the western or the most northern of the northern countries, however far they may be, the distance and the routes may be calculated.\n\nThus the barbarians from beyond the seas, though their countries are truly distant, have come to audience bearing precious objects and presents.\n\nThe Emperor, approving of their loyalty and sincerity, has ordered us, Zheng He and others at the head of several tens of thousands of officers and flag-troops to ascend more than a hundred large ships to go and confer presents on them in order to make manifest the transforming power of the imperial virtue and to treat distant people with kindness.',
    questions: [
      'Think: According to this inscription, why has the Emperor sent Zheng He and tens of thousands of troops on these massive ships?',
      'Pair: Look at how Zheng He describes the other countries of the world (\'barbarians... have come to audience bearing precious objects\'). Discuss with your partner how China viewed itself compared to the rest of the globe in 1431.',
      'Share: Based on this text, did China explore the oceans to conquer new lands by force, or for a different reason?'
    ],
    hinge_question: 'Based on this text, did China explore the oceans to conquer new lands by force, or for a different reason?',
    is_adapted: false,
    glossary: [
      { term: 'Manifest', definition: 'To show or demonstrate something very clearly.' },
      { term: 'Imperial virtue', definition: 'The supreme moral goodness and authority of the Chinese Emperor.' },
      { term: 'Confer', definition: 'To grant or give (a gift, honor, or title).' }
    ]
  },
  {
    lesson_index: 1,
    book_title: 'Lesson 2: How did religious conflict trigger global exploration (1517–1588)?',
    author: 'Text Type: Political Treatise (Richard Hakluyt, 1584)',
    cover_image: '',
    author_context: 'Following the Reformation, Catholic Spain and Protestant England became bitter enemies. In 1584, Richard Hakluyt wrote a secret report for Queen Elizabeth I, urging her to establish colonies in America. He argued that exploration was not just about money—it was a religious war against Catholic Spain.',
    extract: 'That this westerne discoverie will be greately for the inlargemente of the gospell of Christe whereunto the Princes of the refourmed relligion are chefely bounde amongest whome her Majestie is principall.\n\n...It is necessarye for the salvation of the soundry people of those idoles, that the truth of the gospell of Christe be preached unto them, and the errours of the false relligion of the greate Antichriste of Rome be rooted out...\n\nIf you touche him [the King of Spain] in the Indies, you touche the apple of his eye; for take away his treasure, which is the synewe of his warres, and which is the roote of all his mischiefe, and you shall ruine him altogether.',
    questions: [
      'Think: What does Hakluyt call the Pope (\'the greate...\') and what does this reveal about his religious hatred?',
      'Pair: Look at the last paragraph. Discuss how Hakluyt plans to defeat the King of Spain. What is the \'apple of his eye\' and the \'synewe of his warres\'?',
      'Share: How does this text prove that the early British Empire was driven just as much by religious hatred of Spain as it was by a desire to explore?'
    ],
    hinge_question: 'How does this text prove that the early British Empire was driven just as much by religious hatred of Spain as it was by a desire to explore?',
    is_adapted: false,
    glossary: [
      { term: 'Reformed relligion', definition: 'Protestantism (which had "reformed" or broken away from the Catholic Church).' },
      { term: 'Antichriste of Rome', definition: 'An extreme, insulting term used by extreme Protestants to describe the Catholic Pope.' },
      { term: 'Synewe (Sinew)', definition: 'A piece of tough tissue connecting muscle to bone. Here, it means the fundamental strength or funding of Spain\'s military power.' }
    ]
  },
  {
    lesson_index: 2,
    book_title: 'Lesson 3: Trade or takeover: How did early encounters turn into empire?',
    author: 'Text Type: Scientific Report (Thomas Hariot, 1588)',
    cover_image: '',
    author_context: 'Thomas Hariot was an English scientist who travelled to the Roanoke colony in North America in 1585. He traded peacefully with the Algonquin Native Americans, but soon noticed a terrifying, unintended consequence of the English arrival.',
    extract: 'There was no towne where we had any subtile devise practised against us, we leaving it unpunished or not revenged (because wee sought by all meanes possible to win them by gentlenesse) but that within a few dayes after our departure from everie such towne, the people began to die very fast, and many in short space; in some townes about twentie, in some fourtie, in some sixtie, & in one sixe score, which in trueth was very manie in respect of their numbers.\n\nThis happened in no place that wee coulde learne but where wee had bene... The disease also so strange, that they neither knew what it was, nor how to cure it; the like by report of the oldest men in the countrey never happened before, time out of minde.',
    questions: [
      'Think: What happens to the Native American towns a \'few dayes\' after the English leave them?',
      'Pair: The English had immunity to European diseases like smallpox and influenza, but the Native Americans did not. Discuss how the Native Americans, who \'neither knew what it was, nor how to cure it,\' might have explained this sudden wave of death.',
      'Share: How did the accidental spread of European diseases make the transition from \'peaceful trade\' to \'colonial takeover\' much easier for the Europeans?'
    ],
    hinge_question: 'How did the accidental spread of European diseases make the transition from \'peaceful trade\' to \'colonial takeover\' much easier for the Europeans?',
    is_adapted: false,
    glossary: [
      { term: 'Subtile devise', definition: 'A sneaky trick, trap, or plot.' },
      { term: 'Gentlenesse', definition: 'Kindness and peaceful behavior.' },
      { term: 'Sixe score', definition: '120 people (a "score" is 20).' }
    ]
  },
  {
    lesson_index: 3,
    book_title: 'Lesson 4: James I and the Gunpowder Plot: Why was religious division so volatile?',
    author: 'Text Type: Anonymous Warning Letter (26 October 1605)',
    cover_image: '',
    author_context: 'On October 26, 1605, a Catholic nobleman named Lord Monteagle received this anonymous, cryptically written letter. He immediately took it to King James I\'s chief minister. It led directly to the discovery of Guy Fawkes beneath the Houses of Parliament.',
    extract: 'My lord, out of the love i bear to some of your friends, i have a care of your preservation, therefore i would advise you as you tender your life to devise some excuse to shift of your attendance at this parliament, for god and man hath concurred to punish the wickedness of this time,\n\nand think not slightly of this advertisement, but retire yourself into your country, where you may expect the event in safety, for though there be no appearance of any stir, yet i say they shall receive a terrible blow this parliament and yet they shall not see who hurts them...\n\nthe danger is passed as soon as you have burnt the letter.',
    questions: [
      'Think: Pick out the exact phrase in the letter that hints at an explosion.',
      'Pair: The author says, \'they shall not see who hurts them.\' Discuss with your partner why the plotters felt they had to use a hidden bomb rather than fighting King James I in an open rebellion.',
      'Share: Lord Monteagle was a Catholic, just like the terrorists who wrote this letter. What does the fact that he handed it straight to the Protestant King tell us about how divided English Catholics were at this time?'
    ],
    hinge_question: 'Lord Monteagle was a Catholic, just like the terrorists who wrote this letter. What does the fact that he handed it straight to the Protestant King tell us about how divided English Catholics were at this time?',
    is_adapted: false,
    glossary: [
      { term: 'Preservation', definition: 'Your survival or safety.' },
      { term: 'Concurred', definition: 'Agreed or worked together.' },
      { term: 'Advertisement', definition: 'A warning or notification.' }
    ]
  },
  {
    lesson_index: 4,
    book_title: 'Lesson 5: Who controlled Britain? The Ideological Battle',
    author: 'Text Type: Royal Speech (King James I, 1610)',
    cover_image: '',
    author_context: 'In 1610, King James I gave a speech to Parliament explaining the "Divine Right of Kings." This was the ideology that Kings were chosen by God and answered to no one else. This exact mindset would eventually cause his son, Charles I, to lose his head in the English Civil War.',
    extract: 'The state of monarchy is the supremest thing upon earth; for kings are not only God\'s lieutenants upon earth, and sit upon God\'s throne, but even by God himself they are called gods.\n\nThere be three principal similitudes that illustrate the state of monarchy: one taken out of the word of God; and the two other out of the grounds of policy and philosophy. In the Scriptures kings are called gods, and so their power after a certain relation compared to the divine power. Kings are also compared to fathers of families: for a king is truly Parens patriae, the politic father of his people. And lastly, kings are compared to the head of this microcosm of the body of man.\n\n...As to dispute what God may do is blasphemy... so is it sedition in subjects to dispute what a king may do in the height of his power.',
    questions: [
      'Think: Write down the three things King James compares a King to.',
      'Pair: Look at the final sentence. If it is "blasphemy" to question God, what does James say it is to question a King? Discuss how a Member of Parliament might react to hearing this.',
      'Share: If a King genuinely believes he is God\'s lieutenant on earth, how will he respond when Parliament tells him he is running the country badly?'
    ],
    hinge_question: 'If a King genuinely believes he is God\'s lieutenant on earth, how will he respond when Parliament tells him he is running the country badly?',
    is_adapted: false,
    glossary: [
      { term: 'Similitudes', definition: 'Comparisons or metaphors.' },
      { term: 'Blasphemy', definition: 'Speaking sacrilegiously or disrespectfully about God.' },
      { term: 'Sedition', definition: 'Conduct or speech encouraging people to rebel against the authority of a state or monarch.' }
    ]
  },
  {
    lesson_index: 5,
    book_title: 'Lesson 6: Who controlled Britain? The Economic Shift',
    author: 'Text Type: Economic Treatise (Thomas Mun, c. 1630)',
    cover_image: '',
    author_context: 'By the 1600s, power in Britain was shifting away from the old land-owning lords and towards wealthy merchants. Thomas Mun was a director of the powerful East India Company. He wrote this text explaining that true national power no longer came from castles and armies, but from global trade and cash.',
    extract: 'The ordinary means therefore to encrease our wealth and treasure is by Forraign Trade, wherein wee must ever observe this rule; to sell more to strangers yearly than wee consume of theirs in value.\n\nFor suppose that when this Kingdom is plentifully served with the Cloth, Lead, Tinn, Iron, Fish and other native commodities, we doe yearly export the overplus to forraign Countreys to the value of twenty two hundred thousand pounds; by which means we are enabled beyond the Seas to buy and bring in forraign wares for our use and Consumptions, to the value of twenty hundred thousand pounds;\n\nBy this order duly kept in our trading, we may rest assured that the Kingdom shall be enriched yearly two hundred thousand pounds, which must be brought to us in so much Treasure; because that part of our stock which is not returned to us in wares must necessarily be brought home in treasure.',
    questions: [
      'Think: What is the one simple "rule" Mun says England must observe to increase its wealth?',
      'Pair: Look at the maths in the second paragraph. Discuss with your partner how England ends up "enriched" by two hundred thousand pounds in this example.',
      'Share: How does this text prove that the people who really controlled Britain\'s growing power in the world were no longer Kings and Queens, but businessmen and merchants?'
    ],
    hinge_question: 'How does this text prove that the people who really controlled Britain\'s growing power in the world were no longer Kings and Queens, but businessmen and merchants?',
    is_adapted: false,
    glossary: [
      { term: 'Forraign (Foreign) Trade', definition: 'Buying and selling goods with other countries.' },
      { term: 'Overplus', definition: 'The surplus; whatever is left over after you have used what you need.' },
      { term: 'Treasure', definition: 'In this context, hard currency (gold and silver coin).' }
    ]
  },
  {
    lesson_index: 6,
    book_title: 'Lesson 7: What were the mechanics of the Transatlantic Slave Trade?',
    author: 'Text Type: Autobiography (Olaudah Equiano, 1789)',
    cover_image: '',
    author_context: 'Olaudah Equiano was kidnapped from West Africa as a child, enslaved, and eventually bought his freedom in London. In 1789, he published his autobiography, providing the British public with a rare, firsthand account of the absolute horror of the \'Middle Passage\' aboard a slave ship.',
    extract: 'The stench of the hold while we were on the coast was so intolerably loathsome, that it was dangerous to remain there for any time... but now that the whole ship’s cargo were confined together, it became absolutely pestilential. The closeness of the place, and the heat of the climate, added to the number in the ship, which was so crowded that each had scarcely room to turn himself, almost suffocated us.\n\nThis produced copious perspirations, so that the air soon became unfit for respiration, from a variety of loathsome smells, and brought on a sickness among the slaves, of which many died, thus falling victims to the improvident avarice, as I may call it, of their purchasers.\n\nThis wretched situation was again aggravated by the galling of the chains, now become insupportable; and the filth of the necessary tubs, into which the children often fell, and were almost suffocated. The shrieks of the women, and the groans of the dying, rendered the whole a scene of horror almost inconceivable.',
    questions: [
      'Think: Identify the phrase Equiano uses to describe the extreme overcrowding on the slave ship.',
      'Pair: Discuss why Equiano blames the deaths of the enslaved Africans specifically on the "avarice" (greed) of the purchasers. What mechanical choice did the ship captains make that caused this?',
      'Share: Why was publishing a firsthand account like this in London in 1789 so much more dangerous to the slave trade than a politician giving a speech against it?'
    ],
    hinge_question: 'Why was publishing a firsthand account like this in London in 1789 so much more dangerous to the slave trade than a politician giving a speech against it?',
    is_adapted: false,
    glossary: [
      { term: 'Pestilential', definition: 'Deadly, diseased, and foul-smelling.' },
      { term: 'Copious', definition: 'Plentiful; in large amounts.' },
      { term: 'Improvident avarice', definition: 'Short-sighted, thoughtless greed. (Equiano is saying the slave traders were so greedy they packed the ship too tightly, causing the very \'cargo\' they wanted to sell to die).' }
    ]
  },
  {
    lesson_index: 7,
    book_title: 'Lesson 8: How did enslaved Africans resist the Transatlantic Slave Trade?',
    author: 'Text Type: Ship Captain\'s Account (William Snelgrave, 1734)',
    cover_image: '',
    author_context: 'Enslaved Africans constantly resisted. Mutinies on slave ships were common but rarely succeeded due to European firepower. William Snelgrave was a British slave ship captain. In this text, he interrogates a group of enslaved men who had just attempted a bloody mutiny aboard his ship.',
    extract: 'I asked them, \'What had induced them to mutiny?\' They answered, \'I was a great Rogue to buy them, in order to carry them away from their own Country; and that they were resolved to regain their Liberty if possible.\' I replied, \'That they had forfeited their Freedom before I bought them, either by Crimes or by being taken in War.\'\n\n...Then I observed to them, \'That the Custom of their Country was to Murder them; whereas I bought them with a Design to preserve them.\' They answered, \'They were sorry they had not killed me... and that they did not believe I bought them to preserve them, but to kill and eat them; for it was a saying amongst them, That the white Men were Eaters of human Flesh.\'\n\n...I told them, \'They were only the worse used for their Mutinying; for if they would be peaceable, they should be freed from their Irons.\' ...This had the desired Effect, and they submitted.',
    questions: [
      'Think: What is the primary reason the enslaved men give for rebelling? Write down their exact quote.',
      'Pair: Look at Captain Snelgrave\'s justification for buying them. Discuss with your partner how Snelgrave is trying to make himself sound like the "good guy" in this terrifying situation.',
      'Share: The enslaved men believed the white men were going to "kill and eat them." Based on the horrors of the Middle Passage you learned about in the last lesson, why was this a completely logical thing for them to believe?'
    ],
    hinge_question: 'The enslaved men believed the white men were going to "kill and eat them." Based on the horrors of the Middle Passage you learned about in the last lesson, why was this a completely logical thing for them to believe?',
    is_adapted: false,
    glossary: [
      { term: 'Mutiny', definition: 'An open rebellion against the proper authorities, especially by sailors or prisoners against their officers.' },
      { term: 'Forfeited', definition: 'Lost or surrendered as a penalty for wrongdoing.' },
      { term: 'Induced', definition: 'Convinced or caused someone to do something.' }
    ]
  },
  {
    lesson_index: 8,
    book_title: 'Lesson 9: How \'modern\' was Britain by 1750? (Synthesis & Assessment)',
    author: 'Text Type: Travel Book / Journal (Daniel Defoe, 1724–1727)',
    cover_image: '',
    author_context: 'Between 1724 and 1727, the author Daniel Defoe travelled across Great Britain. When he arrived in Yorkshire (Halifax), he was stunned. The medieval farming villages were gone. In their place, he saw the explosive beginnings of the Industrial Revolution, fueled by global trade.',
    extract: 'The nearer we came to Halifax, we found the houses thicker, and the villages greater in every bottom; and not only so, but the sides of the hills, which were very steep every way, were spread with houses, and that very thick...\n\nWe found the country, in short, one continued village, tho\' mountainous every way, as before; hardly a house standing out of a speaking distance from another, and (which soon told us their business) the day clearing up, and the sun shining, we could see that almost at every house there was a tenter, and almost on every tenter a piece of cloth, or kersie, or shalloon, for they are the three articles of that country\'s labour...\n\n...This is the reason why we saw so few people without doors; but if we knock\'d at the door of any of the master manufacturers, we presently saw a house full of lusty fellows, some at the dye-vat, some dressing the cloths, some in the loom... all hard at work, and full employed upon the manufacture, and all seeming to have sufficient business.',
    questions: [
      'Think: Look at the landscape Defoe describes. Why are the houses built so close together, and what is sitting outside almost every single house?',
      'Pair: Defoe says he saw very few people outdoors, but inside the houses, he saw "a house full of lusty fellows... all hard at work." Discuss how this compares to the life of the medieval ploughman we studied in the last unit.',
      'Share: Defoe is describing an explosion of cloth manufacturing. Thinking back over this unit (exploration, the empire, the slave trade), where is all this newly manufactured British cloth being shipped and sold? How did global encounters make this industrial boom possible?'
    ],
    hinge_question: 'Defoe is describing an explosion of cloth manufacturing. Thinking back over this unit (exploration, the empire, the slave trade), where is all this newly manufactured British cloth being shipped and sold? How did global encounters make this industrial boom possible?',
    is_adapted: false,
    glossary: [
      { term: 'Tenter', definition: 'A wooden frame used to stretch and dry newly manufactured cloth.' },
      { term: 'Kersie / Shalloon', definition: 'Types of woven woollen cloth.' },
      { term: 'Lusty', definition: 'Healthy, strong, and full of energy.' }
    ]
  }
];

const insertIdx = data.indexOf('"timeline": [');
if (insertIdx !== -1) {
    data = data.slice(0, insertIdx) + '"guided_reading": ' + JSON.stringify(guidedReadingData, null, 2) + ',\n  ' + data.slice(insertIdx);
    fs.writeFileSync('early_modern_world/data.js', data, 'utf8');
    console.log('Successfully injected guided reading into early_modern_world');
} else {
    console.log('Could not find "timeline": [');
}
