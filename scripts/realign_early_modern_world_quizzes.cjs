const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function seededShuffle(arr, seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    hash = Math.sin(hash++) * 10000;
    const j = Math.floor((hash - Math.floor(hash)) * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

function q(question, answer, explanation, distractors, seed) {
  const options = seededShuffle([answer, ...distractors], seed || question);
  return {
    question: question,
    q: question,
    options: options,
    answer: answer,
    a: answer,
    explanation: explanation,
  };
}

const LESSON_QUIZZES = {
  lesson_1: [
    // Core Knowledge (1-10)
    q(
      'Which imperial dynasty ruled China in 1450, renowned for its immense wealth, porcelain, and global prestige?',
      'The Ming Dynasty',
      'The Ming Dynasty (1368–1644) ruled a sophisticated empire of over 100 million people, producing world-renowned blue-and-white porcelain and silk.',
      ['The Qing Dynasty', 'The Song Dynasty', 'The Tang Dynasty'],
      'em_l1_1',
    ),
    q(
      'Who was the legendary Chinese Muslim admiral who commanded seven massive treasure fleet expeditions between 1405 and 1433?',
      'Zheng He',
      'Admiral Zheng He commanded fleets of up to 300 ships—some over 100 metres long—sailing across the Indian Ocean to India, Arabia, and East Africa.',
      ['Kublai Khan', 'Sun Tzu', 'Hongwu'],
      'em_l1_2',
    ),
    q(
      'Which transformative historical event took place in May 1453, ending the Byzantine Empire?',
      'The Fall of Constantinople',
      'Sultan Mehmed II conquered the Byzantine capital of Constantinople in 1453, renaming it Istanbul and securing Ottoman control over Eurasian trade.',
      ['The Fall of Rome', 'The Battle of Lepanto', 'The Siege of Vienna'],
      'em_l1_3',
    ),
    q(
      "Which Ottoman Sultan, known as 'The Conqueror', captured Constantinople in 1453?",
      'Sultan Mehmed II',
      'At just 21 years old, Sultan Mehmed II led an Ottoman army of 80,000 men and massive bronze cannons to breach the legendary Theodosian walls.',
      ['Suleiman the Magnificent', 'Selim I', 'Osman I'],
      'em_l1_4',
    ),
    q(
      'What valuable West African kingdom was celebrated across Europe and the Islamic world for its immense gold wealth?',
      'The Kingdom of Benin and the Mali Empire',
      'West African empires controlled vast trans-Saharan gold mines, making monarchs like Mansa Musa legendary for their unimaginable riches.',
      ['The Zulu Kingdom', 'The Kingdom of Aksum', 'The Swahili City-States'],
      'em_l1_5',
    ),
    q(
      'What precious cast-metal artworks demonstrated the sophisticated artistic and technical skill of West Africa before European arrival?',
      'The Benin Bronzes',
      'Crafted in the Kingdom of Benin using the lost-wax casting technique, the Benin Bronzes depicted the Oba (king), royal court life, and Portuguese traders.',
      ['The Rosetta Stone', 'The Terracotta Army', 'The Elgin Marbles'],
      'em_l1_6',
    ),
    q(
      "Why was Western Europe considered a peripheral 'outpost' in the global economy of 1450?",
      'It produced few luxury goods that wealthy Asian and Middle Eastern empires desired.',
      "In 1450, European kingdoms were recovering from the Black Death and the Hundred Years' War, producing mostly wool, grain, and timber.",
      [
        'It lacked navigable rivers or coastal access to the sea.',
        'It had been completely conquered by the Mongol Empire.',
        'Its population was less than 5 million people.',
      ],
      'em_l1_7',
    ),
    q(
      'What crucial geographic barrier forced European merchants to seek direct ocean routes to the spices of Asia?',
      'Ottoman control of the eastern Mediterranean and overland Silk Road routes.',
      'Following 1453, the Ottoman Empire controlled eastern trade passages, charging heavy customs taxes on silk, cinnamon, and pepper entering Europe.',
      [
        'A massive ice sheet blocking all northern European ports.',
        'The destruction of the Italian merchant fleet by Venice.',
        'The complete drying up of the Indian Ocean spice trade.',
      ],
      'em_l1_8',
    ),
    q(
      'Which Italian city-state dominated European trade with the Ottoman Empire in the 15th century?',
      'Venice',
      'The Republic of Venice held a near-monopoly on importing oriental luxuries into Europe, negotiating special trading privileges with Ottoman sultans.',
      ['Florence', 'Rome', 'Milan'],
      'em_l1_9',
    ),
    q(
      'What title was given to the divine hereditary king of the Kingdom of Benin?',
      'The Oba',
      'The Oba was the spiritual and political ruler of the Kingdom of Benin, residing in a vast, fortified palace complex in modern-day Nigeria.',
      ['The Mansa', 'The Pharaoh', 'The Caliph'],
      'em_l1_10',
    ),

    // Mastery Challenge (11-20)
    q(
      "Why did the Ming Dynasty abruptly halt Zheng He's treasure fleet voyages after 1433?",
      'Confucian court officials believed the voyages were wastefully expensive and prioritized defending the northern land border.',
      "Following the Yongle Emperor's death, Confucian scholar-officials dismantled the treasure fleet to fund border fortifications and the Great Wall against Mongol raids.",
      [
        'The entire fleet was destroyed by a catastrophic typhoon in the Indian Ocean.',
        'European naval forces defeated Zheng He in the South China Sea.',
        'China ran out of timber and silk to sustain overseas trade.',
      ],
      'em_l1_11',
    ),
    q(
      'How did Hungarian cannon founder Urban assist Mehmed II during the 1453 siege of Constantinople?',
      "He cast giant bronze 'super-cannons' capable of firing 600-pound granite balls against the ancient city walls.",
      "Urban's massive 27-foot bombard, named the 'Basilica', battered the triple stone walls of Constantinople that had withstood sieges for over a thousand years.",
      [
        'He designed wooden siege towers covered in iron plating.',
        'He dug subterranean gunpowder tunnels beneath the Hagia Sophia.',
        'He constructed ironclad warships to bypass the Golden Horn boom chain.',
      ],
      'em_l1_12',
    ),
    q(
      'What tactical maneuver allowed Mehmed II to bypass the massive iron chain guarding the Golden Horn harbor?',
      'He had his fleet hauled overland across greased wooden logs on dry land behind the city.',
      'On the night of 21–22 April 1453, thousands of Ottoman soldiers pulled around 70 galleys across greased logs over the hills of Galata into the Golden Horn.',
      [
        'He used gunpowder divers to sever the chain links underwater.',
        'He bombarded the chain with specialized incendiary shells.',
        'He waited for winter ice to freeze the harbor water solid.',
      ],
      'em_l1_13',
    ),
    q(
      'How did European eyewitness Nicolo Barbaro describe the fall of Constantinople in his diary?',
      'As a catastrophic tragedy where the streets ran red with blood like rainwater.',
      'Venetian physician Nicolo Barbaro recorded the terror of the final assault on 29 May 1453, documenting the breach of the walls and the death of Emperor Constantine XI.',
      [
        'As a peaceful, bloodless transition of municipal governance.',
        'As a triumph of European Christian diplomacy over eastern forces.',
        'As a minor skirmish that had no impact on Venetian trade.',
      ],
      'em_l1_14',
    ),
    q(
      'In 1450, what was the estimated global population of Ming China compared to England?',
      'Ming China had over 100 million people, while England had approximately 3 million.',
      'China was an economic colossus whose population and domestic economy dwarfed every European state combined.',
      [
        'Both had roughly 15 million people.',
        'England had 25 million people, while Ming China had 10 million.',
        'Ming China had 10 million people, while England had 20 million.',
      ],
      'em_l1_15',
    ),
    q(
      'What sophisticated urban feature surprised early European visitors to the capital of the Kingdom of Benin?',
      'Vast, illuminated streets with underground drainage, running water, and complex earthwork defensive walls.',
      'Benin City featured wide streets lit by palm-oil lanterns, clean drainage systems, and the Benin Moats—the largest earthwork structure built in pre-modern history.',
      [
        'Multi-storey stone cathedrals designed in the Gothic style.',
        'A network of steam-powered textile manufacturing mills.',
        'Paved highways reserved exclusively for horse-drawn stagecoaches.',
      ],
      'em_l1_16',
    ),
    q(
      'According to the historical verdict, what was the primary catalyst driving European maritime exploration after 1453?',
      'Desperation to bypass Ottoman commercial middlemen and find direct oceanic trade routes to Asian spice markets.',
      'Western Europe did not sail because it was wealthy or powerful; it sailed out of geopolitical vulnerability and economic desperation.',
      [
        'A desire to abandon European cities due to uncontrollable plague outbreaks.',
        "An official United Nations resolution to map the world's coastlines.",
        'A surplus of gold that European kings needed to invest in foreign lands.',
      ],
      'em_l1_17',
    ),
    q(
      'What technological maritime innovation adopted from the Arab world enabled European caravels to sail into the wind?',
      'The triangular lateen sail',
      'Combined with the square rig, the lateen sail allowed Portuguese and Spanish caravels to tack against prevailing headwinds along the African coast.',
      ['The steam turbine', 'The iron rudder chain', 'The water-cooled paddlewheel'],
      'em_l1_18',
    ),
    q(
      'Which Portuguese prince established a navigation and cartography research center at Sagres to explore the West African coast?',
      'Prince Henry the Navigator',
      'Prince Henry financed expeditions down the Sahara coast, driven by desires to locate the source of African gold and find an ocean passage to India.',
      ['King Ferdinand of Aragon', 'King Manuel I', 'Prince Philip II'],
      'em_l1_19',
    ),
    q(
      'Which Asian commodity was worth its weight in gold in 15th-century Europe due to its ability to preserve meat and disguise foul tastes?',
      'Black Pepper',
      'Pepper, cloves, nutmeg, and cinnamon from India and the Maluku Islands were vital for food preservation in winter, commanding astronomical prices in European markets.',
      ['Refined cane sugar', 'Raw tobacco leaves', 'Cotton textiles'],
      'em_l1_20',
    ),
  ],

  lesson_2: [
    // Core Knowledge (1-10)
    q(
      'In what year did German monk Martin Luther post his 95 Theses, launching the Protestant Reformation?',
      '1517',
      "In October 1517, Martin Luther attacked the Catholic Church's sale of indulgences, triggering a religious schism that permanently divided Europe.",
      ['1492', '1588', '1603'],
      'em_l2_1',
    ),
    q(
      'Which English monarch broke with Rome in 1534 to establish the Church of England?',
      'King Henry VIII',
      'Henry VIII passed the Act of Supremacy in 1534, making himself Supreme Head of the Church of England after the Pope refused to annul his marriage.',
      ['King James I', 'King Edward VI', 'King Charles I'],
      'em_l2_2',
    ),
    q(
      'What 1494 treaty negotiated by Pope Alexander VI divided all non-Christian lands between Spain and Portugal?',
      'The Treaty of Tordesillas',
      'The Treaty of Tordesillas drew an imaginary meridian 370 leagues west of Cape Verde, giving Spain the Americas and Portugal Africa and Asia.',
      ['The Peace of Westphalia', 'The Treaty of Utrecht', 'The Edict of Nantes'],
      'em_l2_3',
    ),
    q(
      "What Spanish nickname, meaning 'The Dragon', was given to English privateer Sir Francis Drake?",
      'El Draque',
      "Spanish colonists and sailors feared Francis Drake as 'El Draque' for his daring raids on Spanish silver shipments along the Pacific coast.",
      ['El Conquistador', 'El Diablo', 'El Corsario'],
      'em_l2_4',
    ),
    q(
      'Between 1577 and 1580, what historic maritime feat did Sir Francis Drake accomplish aboard the Golden Hind?',
      'He completed the first English circumnavigation of the globe.',
      "Drake returned to Plymouth with immense Spanish plunder, earning Queen Elizabeth I over £160,000—more than the Crown's entire annual revenue.",
      [
        'He mapped the entire coastline of Antarctica.',
        'He discovered the Northwest Passage across Canada.',
        'He established the first English colony in Australia.',
      ],
      'em_l2_5',
    ),
    q(
      'In what year did King Philip II of Spain send the Great Armada to invade England?',
      '1588',
      'Philip II assembled a fleet of over 130 ships and 30,000 men to overthrow Protestant Queen Elizabeth I and return England to Catholicism.',
      ['1517', '1534', '1605'],
      'em_l2_6',
    ),
    q(
      'Which decisive naval engagement in August 1588 forced the Spanish Armada to break its crescent formation?',
      'The Battle of Gravelines',
      'English fireships launched at Calais panicked the Spanish, and the following morning at Gravelines, English long-range guns battered the Spanish fleet.',
      ['The Battle of Lepanto', 'The Battle of Trafalgar', 'The Battle of the Nile'],
      'em_l2_7',
    ),
    q(
      'What tactical weapon did the English fleet use at Calais to throw the anchored Spanish Armada into panic?',
      'Hellburners / Fireships',
      'On the night of 7 August 1588, eight burning ships packed with pitch and gunpowder were steered into the Spanish fleet, causing captains to cut their anchor cables.',
      ['Explosive underwater mines', 'Steam-powered rams', 'Poison gas canisters'],
      'em_l2_8',
    ),
    q(
      'What devastating nutritional disease afflicted sailors on long oceanic voyages due to a lack of Vitamin C?',
      'Scurvy',
      'Scurvy caused lethargy, bleeding gums, tooth loss, reopening of old wounds, and eventually death from internal hemorrhaging.',
      ['Dysentery', 'Smallpox', 'Yellow Fever'],
      'em_l2_9',
    ),
    q(
      "In the famous Armada Portrait, where is Queen Elizabeth I's hand placed as a visual symbol of global ambition?",
      'Resting directly on a globe covering the Americas.',
      "The 1588 Armada Portrait depicts Elizabeth with her fingers covering North America, signaling England's intent to build a worldwide maritime empire.",
      [
        'Holding an open Bible written in Latin.',
        'Gripping a sword pointed at the King of France.',
        'Resting on a chest overflowing with Spanish gold coins.',
      ],
      'em_l2_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Why did Protestant England view Spanish expansion in the Americas as an existential threat?',
      'They believed Spanish silver was financing the Catholic Counter-Reformation to eradicate Protestantism in Europe.',
      'Wealth extracted from the Potosi silver mines allowed Philip II to finance Catholic armies in the Netherlands, France, and against Protestant England.',
      [
        'Spain had completely banned all English wool exports from entering Europe.',
        'English merchants were forced to pay rent on every ship passing through the English Channel.',
        'The Spanish King claimed hereditary ownership of the English Crown through Henry VII.',
      ],
      'em_l2_11',
    ),
    q(
      'What was the legal difference between a privateer like Francis Drake and a common pirate?',
      "A privateer held an official royal 'Letter of Marque' authorizing attacks on enemy shipping during wartime.",
      'While Spain condemned Drake as a pirate, Queen Elizabeth secretly backed his voyages, taking a 50% cut of the plunder while maintaining plausible deniability.',
      [
        'Privateers were only allowed to operate within British coastal waters.',
        'Pirates were strictly forbidden from carrying firearms aboard ship.',
        'Privateers were required to return all captured silver directly to the Pope.',
      ],
      'em_l2_12',
    ),
    q(
      'What massive Spanish silver galleon did Francis Drake capture off Ecuador in 1579, yielding 26 tons of silver?',
      'The Nuestra Señora de la Concepción (nicknamed Cacafuego)',
      'The capture of the Cacafuego yielded 80 pounds of gold, 26 tons of silver bullion, and thousands of coins, taking four days to transfer to the Golden Hind.',
      ['The San Salvador', 'The Santa Maria', 'The San Martin'],
      'em_l2_13',
    ),
    q(
      'What critical naval design advantage did English warships have over the Spanish galleons in 1588?',
      "English ships were lower, faster 'race-built' galleons equipped with culverins that could reload and fire from a distance.",
      'Designed by Sir John Hawkins, English ships avoided close-quarters boarding combat, using superior gunnery to pound Spanish ships from long range.',
      [
        'English ships were built from iron plates that repelled Spanish cannonballs.',
        'English vessels used steam-powered auxiliary wheels to outmaneuver the Spanish.',
        'English galleons carried twice as many soldiers for hand-to-hand boarding assaults.',
      ],
      'em_l2_14',
    ),
    q(
      'Why was the Duke of Medina Sidonia considered an unusual choice to command the Spanish Armada?',
      'He was a wealthy aristocrat who admitted he had no naval experience and suffered from severe seasickness.',
      'Following the death of the brilliant Admiral Santa Cruz, Philip II appointed Medina Sidonia, who wrote back begging to be excused due to his total lack of naval knowledge.',
      [
        'He was a French Protestant prince who had recently converted to Catholicism.',
        'He was only 17 years old and had never commanded a military unit.',
        'He had spent ten years imprisoned in the Tower of London for treason.',
      ],
      'em_l2_15',
    ),
    q(
      "What meteorological phenomenon did Queen Elizabeth celebrate with the medal inscription 'God blew and they were scattered'?",
      'The ferocious Atlantic storms that wrecked dozens of retreating Spanish ships off the coasts of Scotland and Ireland.',
      "The 'Protestant Wind' blew the surviving Armada north around the British Isles, where jagged Atlantic reefs and gales wrecked over 40 Spanish ships.",
      [
        'A sudden heatwave that evaporated the drinking water on Spanish galleons.',
        'A dense fog that caused Spanish ships to collide with each other in the English Channel.',
        'A hurricane in the Caribbean that destroyed the Spanish treasure fleet before departure.',
      ],
      'em_l2_16',
    ),
    q(
      'According to historical estimates, approximately how many European sailors died from scurvy during the Age of Sail?',
      'Over 2 million sailors.',
      'Historians calculate that scurvy killed more sailors than naval battles, shipwrecks, storms, and all other maritime diseases combined.',
      ['Approximately 50,000 sailors.', 'Around 200,000 sailors.', 'Fewer than 10,000 sailors.'],
      'em_l2_17',
    ),
    q(
      'Which Scottish naval surgeon proved in 1747 that citrus fruit could cure and prevent scurvy?',
      'Dr. James Lind',
      'Dr. Lind conducted one of the first controlled clinical trials in medical history aboard HMS Salisbury, proving oranges and lemons rapidly cured scorbutic sailors.',
      ['Dr. William Harvey', 'Dr. Edward Jenner', 'Dr. John Snow'],
      'em_l2_18',
    ),
    q(
      'Why did Queen Elizabeth deliver her famous Tilbury speech in armor to her troops in August 1588?',
      'To project fearless royal leadership and unite her subjects against foreign Catholic invasion.',
      "Elizabeth famously proclaimed: 'I know I have the body of a weak and feeble woman; but I have the heart and stomach of a king, and of a king of England too.'",
      [
        'To personally lead a cavalry charge against the landed Spanish soldiers.',
        'To announce that she was abdicating the throne in favor of King James of Scotland.',
        'To order the immediate execution of all Catholic prisoners held in London.',
      ],
      'em_l2_19',
    ),
    q(
      "What long-term geopolitical consequence followed England's victory over the Spanish Armada in 1588?",
      'It established England as a rising Protestant naval power, emboldening private investors to establish overseas trading companies.',
      'While the war dragged on until 1604, the defeat of the Armada shattered the myth of Spanish naval invincibility and opened the Atlantic to English colonization.',
      [
        'It resulted in the immediate conquest and annexation of Spain by English forces.',
        'It led King Philip II to convert Spain to Protestantism.',
        'It completely eliminated all piracy and privateering in the Atlantic Ocean.',
      ],
      'em_l2_20',
    ),
  ],

  lesson_3: [
    // Core Knowledge (1-10)
    q(
      'What type of commercial business model allowed English investors to pool capital and share financial risk for overseas trade?',
      'The Joint-Stock Company',
      'Joint-stock companies sold shares to multiple merchants, spreading the risk of shipwreck or loss while pooling large amounts of capital for long-distance voyages.',
      ['The Guild Monopoly', 'The Feudal Manor', 'The State Treasury'],
      'em_l3_1',
    ),
    q(
      'In what year did Queen Elizabeth I grant a Royal Charter to found the East India Company (EIC)?',
      '1600',
      "On 31 December 1600, Elizabeth I chartered 'The Governor and Company of Merchants of London trading into the East Indies', granting a 15-year monopoly on English trade east of the Cape of Good Hope.",
      ['1588', '1607', '1649'],
      'em_l3_2',
    ),
    q(
      'What was the name of the first permanent English settlement established in North America in 1607?',
      'Jamestown',
      'Named after King James I, Jamestown was founded in Virginia by the Virginia Company, surviving extreme starvation, disease, and conflict with native tribes.',
      ['Plymouth', 'Roanoke', 'Boston'],
      'em_l3_3',
    ),
    q(
      'Which high-value cash crop saved the Jamestown colony from economic collapse and drove intense expansion onto indigenous lands?',
      'Tobacco',
      'Introduced by John Rolfe in 1612, sweet Caribbean tobacco became wildly popular in England, turning Virginia into a lucrative commercial agricultural hub.',
      ['Sugar cane', 'Cotton', 'Tea leaves'],
      'em_l3_4',
    ),
    q(
      'Who was the English diplomat sent by King James I to the Mughal Empire between 1615 and 1619?',
      'Sir Thomas Roe',
      'Sir Thomas Roe spent four years at the court of Emperor Jahangir, securing formal commercial treaties allowing the East India Company to build fortified trading posts.',
      ['Sir Francis Drake', 'Captain John Smith', 'Robert Clive'],
      'em_l3_5',
    ),
    q(
      'Which powerful Asian empire, ruled by Emperor Jahangir, controlled the Indian subcontinent in the early 17th century?',
      'The Mughal Empire',
      "The Mughal Empire ruled over 100 million people and accounted for roughly 25% of the world's GDP, making England appear tiny and impoverished by comparison.",
      ['The Ottoman Empire', 'The Safavid Empire', 'The Ming Dynasty'],
      'em_l3_6',
    ),
    q(
      'What term describes fortified trading warehouses established by the East India Company in ports like Surat, Madras, and Calcutta?',
      'Factories',
      "Run by 'factors' (mercantile agents), these compounds were walled warehouses where European goods were exchanged for Indian calico, silk, and saltpetre.",
      ['Plantations', 'Barracks', 'Missions'],
      'em_l3_7',
    ),
    q(
      'In what year did the first recorded ship carrying captive Africans arrive in the English colony of Virginia?',
      '1619',
      'In August 1619, the privateer ship White Lion traded approximately 20 captive Angolans to Jamestown settlers in exchange for food, beginning chattel slavery in British North America.',
      ['1607', '1642', '1707'],
      'em_l3_8',
    ),
    q(
      'Which indigenous confederacy fought the English settlers of Jamestown in the Anglo-Powhatan Wars?',
      'The Powhatan Confederacy',
      'Led initially by Chief Wahunsenacawh (Powhatan), the confederacy initially traded food with settlers but resisted relentless English encroachment on their ancestral lands.',
      ['The Iroquois League', 'The Cherokee Nation', 'The Sioux Tribe'],
      'em_l3_9',
    ),
    q(
      'What decisive battle in 1757 transformed the East India Company from a peaceful trading company into the territorial master of Bengal?',
      'The Battle of Plassey',
      "Led by Robert Clive, the EIC defeated Nawab Siraj-ud-Daulah at Plassey, seizing the immense tax revenues of Bengal and launching the company's military conquest of India.",
      ['The Battle of Gravelines', 'The Battle of Naseby', 'The Battle of Blenheim'],
      'em_l3_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'What crucial advice did Sir Thomas Roe give the East India Company regarding military conquest in 1616?',
      "'A war and traffic [trade] are incompatible... Let this be received as a rule, that if you will profit, seek it at sea, and in quiet trade.'",
      'Roe observed that the Portuguese and Dutch spent all their profits on expensive forts and garrisons, urging the EIC to remain humble merchants beneath the Mughal Emperor.',
      [
        "'We must conquer the Mughal capital of Delhi within three years.'",
        "'Trade is useless without a standing army of 100,000 European soldiers.'",
        "'The English Crown should immediately annex the entire coastline of India.'",
      ],
      'em_l3_11',
    ),
    q(
      'What biological devastation was caused by European domesticated pigs brought to Virginia by Jamestown settlers?',
      'Feral pigs escaped into the forests, rapidly reproducing and destroying indigenous food crops, clam beds, and forest ecosystems.',
      'European pigs rooted up native cornfields and ate the wild tubers and shellfish relied upon by the Powhatan people, severely destabilizing native food security.',
      [
        'Pigs transmitted bubonic plague to native wolves.',
        'Pigs ate the wooden palisade walls of native villages.',
        'Pigs trampled the tobacco crops, forcing settlers to abandon farming.',
      ],
      'em_l3_12',
    ),
    q(
      'Why was early English colonization fundamentally different from Spanish colonization?',
      'English colonization was privately funded by profit-seeking merchants and joint-stock corporations rather than the royal crown.',
      'While Spanish conquests were financed and controlled directly by the monarchy, English ventures were commercial investments seeking corporate shareholder profits.',
      [
        'The English never used violence or weapons against indigenous populations.',
        'The English strictly forbade religious conversion in their colonies.',
        'The English monarchy banned all private trade in the Atlantic Ocean.',
      ],
      'em_l3_13',
    ),
    q(
      "During the horrific 'Starving Time' in Jamestown (winter 1609–1610), what percentage of the English settlers perished?",
      'Approximately 80% to 85% of the settlers died from starvation and disease.',
      'Trapped inside their fort by Powhatan warriors and lacking supplies, settlers ate horses, dogs, snakes, and even practiced cannibalism; only 60 of 500 survived.',
      ['Around 10% died.', 'Exactly 50% died.', 'Virtually all survived by hunting local deer.'],
      'em_l3_14',
    ),
    q(
      'How did Emperor Jahangir view King James I and the gifts brought by Sir Thomas Roe in 1615?',
      'As relatively unimpressive trinkets from a poor, cold, and distant realm on the edge of the world.',
      'Ruling an empire of unimaginable wealth and sophisticated art, Jahangir was unimpressed by English clocks and woolens, viewing Roe with polite condescension.',
      [
        'As sacred treasures sent by the true Christian God.',
        'As dangerous weapons that threatened to overthrow the Mughal throne.',
        'As the greatest collection of art ever seen in the subcontinent.',
      ],
      'em_l3_15',
    ),
    q(
      'What was the demographic consequence of virgin-soil epidemics (such as smallpox) introduced by English settlers to the Chesapeake native peoples?',
      'Native populations dropped by an estimated 70% to 90% within decades due to lack of immunity.',
      'Unintentionally introduced pathogens decimated indigenous communities, disrupting social hierarchies, alliances, and defense against English territorial expansion.',
      [
        'Indigenous birth rates skyrocketed to replace lost hunters.',
        'Native tribes quickly developed complete genetic immunity within two years.',
        'The diseases only affected European settlers, sparing native Americans.',
      ],
      'em_l3_16',
    ),
    q(
      'What legal arrangement did the Virginia Company use to attract poor English laborers to America before chattel slavery became dominant?',
      'Indentured servitude',
      'Poor Britons signed contracts agreeing to work without wages for 4 to 7 years in exchange for transatlantic passage, food, and freedom dues.',
      ['Military conscription', 'Corporate shareholding', 'Feudal serfdom'],
      'em_l3_17',
    ),
    q(
      'What economic mechanism caused the East India Company to abandon peaceful trade and turn to military force by the 1750s?',
      'The collapse of central Mughal authority and fierce military competition with the French East India Company.',
      "As the Mughal Empire fragmented after Aurangzeb's death, regional nawabs clashed, prompting the British and French to recruit sepoys and seize territory.",
      [
        'A direct order from the Pope commanding the conversion of Asia.',
        'The discovery of gold mines in the foothills of the Himalayas.',
        'The complete refusal of Indian weavers to sell cotton to European merchants.',
      ],
      'em_l3_18',
    ),
    q(
      'What title was given to the native Indian soldiers recruited, uniformed, and trained by the East India Company?',
      'Sepoys',
      "Derived from the Persian word 'sipahi', sepoys formed the overwhelming majority of the East India Company's private army in India.",
      ['Janissaries', 'Cossacks', 'Ghurkas'],
      'em_l3_19',
    ),
    q(
      'According to the historical verdict, what was the defining paradox of early English imperial encounters between 1600 and 1750?',
      'England began as humble, submissive traders pleading for commercial access, but transformed into aggressive military rulers extracting vast colonial wealth.',
      'Neither in Virginia nor in India did the English start as conquerors; their empire grew out of commercial greed, local opportunism, and systemic violence.',
      [
        'England conquered all of North America without firing a single weapon.',
        'The British Empire was completely bankrupt and generated no revenue for London.',
        'English settlers completely assimilated into indigenous American and Indian cultures.',
      ],
      'em_l3_20',
    ),
  ],

  lesson_4: [
    // Core Knowledge (1-10)
    q(
      'In what year did Catholic conspirators attempt to assassinate King James I in the Gunpowder Plot?',
      '1605',
      'On 5 November 1605, authorities discovered Guy Fawkes guarding 36 barrels of gunpowder beneath the House of Lords.',
      ['1588', '1603', '1642'],
      'em_l4_1',
    ),
    q(
      'Who was the charismatic Catholic gentleman who masterminded and led the Gunpowder Plot conspiracy?',
      'Robert Catesby',
      'While Guy Fawkes became famous, Robert Catesby was the operational mastermind who recruited the conspirators and devised the plan.',
      ['Guy Fawkes', 'Thomas Percy', 'Francis Tresham'],
      'em_l4_2',
    ),
    q(
      'What alias did Guy Fawkes adopt while guarding the gunpowder barrels in the cellar beneath Parliament?',
      'John Johnson',
      'Fawkes posed as the servant of co-conspirator Thomas Percy, adopting the alias John Johnson to avoid suspicion while moving supplies into the cellar.',
      ['Robert Poley', 'Richard Topcliffe', 'John Smith'],
      'em_l4_3',
    ),
    q(
      'Which prominent Catholic peer received the anonymous warning letter on 26 October 1605 advising him to avoid Parliament?',
      'Lord Monteagle',
      "Lord Monteagle received the mysterious letter while dining in Hoxton, immediately handing it over to the King's chief minister, Robert Cecil.",
      ['The Duke of Buckingham', 'The Earl of Essex', 'Lord Darnley'],
      'em_l4_4',
    ),
    q(
      "Who was King James I's cunning Secretary of State and spymaster who directed the investigation into the plot?",
      'Robert Cecil, Earl of Salisbury',
      'Robert Cecil managed an extensive network of domestic and international spies, deciphering the Monteagle letter to uncover the cellar barrels.',
      ['Francis Walsingham', 'Oliver Cromwell', 'Sir Walter Raleigh'],
      'em_l4_5',
    ),
    q(
      'What term was used to describe English Catholics who refused to attend compulsory Protestant Church of England Sunday services?',
      'Recusants',
      'Under Elizabethan and Jacobean law, recusants faced crippling monthly fines, asset forfeiture, and imprisonment for refusing to attend Anglican worship.',
      ['Levellers', 'Puritans', 'Diggers'],
      'em_l4_6',
    ),
    q(
      'What harsh punishment did King James I enforce against Catholic priests caught practicing in England?',
      'Hanging, drawing, and quartering as traitors.',
      'Catholic priests, especially Jesuits, were viewed as agents of foreign Catholic invasion and subjected to the gruesome punishment for high treason.',
      [
        'Fines of five shillings per sermon.',
        'Immediate banishment to the American colonies.',
        'Life imprisonment in a monastery.',
      ],
      'em_l4_7',
    ),
    q(
      'Where did the surviving conspirators make their desperate final armed stand on 8 November 1605?',
      'Holbeche House in Staffordshire',
      "Surrounded by the Sheriff of Worcester's men, Catesby and Percy were shot dead by a single musket ball while clutching images of the Virgin Mary.",
      ['The Tower of London', 'Fotheringhay Castle', 'Warwick Castle'],
      'em_l4_8',
    ),
    q(
      'What gruesome torture device in the Tower of London was used to extract a confession from Guy Fawkes?',
      'The Rack',
      "James I authorized 'gentler tortures first, et sic per gradus ad ima tendatur' (and so by degrees to the worst), stretching Fawkes on the rack until he signed.",
      ['The Iron Maiden', 'The Guillotine', "The Scavenger's Daughter"],
      'em_l4_9',
    ),
    q(
      "What national holiday was established by Parliament in 1606 to celebrate the King's miraculous deliverance from the plot?",
      'Bonfire Night (The Thanksgiving Act)',
      'The Observance of 5th November Act 1605 mandated annual church sermons, ringing bells, and bonfires burning effigies of the Pope and Guy Fawkes.',
      ["St. George's Day", 'Trafalgar Day', 'Commonwealth Day'],
      'em_l4_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Why were English Catholics particularly devastated and disillusioned by the accession of James I in 1603?',
      'James had promised religious tolerance while in Scotland, but intensified recusancy fines and expelled Catholic priests once crowned.',
      'Catholics had hoped the son of Mary, Queen of Scots would restore religious liberty, but James succumbed to Puritan pressure and reinforced anti-Catholic laws.',
      [
        'James declared Catholicism the compulsory state religion of England.',
        'James married a Spanish Catholic princess, angering the conspirators.',
        'James completely abolished Parliament and ruled as an absolute monarch.',
      ],
      'em_l4_11',
    ),
    q(
      "What was the conspirators' ultimate political plan once King James I and Parliament were blown up?",
      'To kidnap Princess Elizabeth, place her on the throne as a puppet Catholic queen, and spark a nationwide Catholic rebellion.',
      'While Fawkes lit the powder, Catesby and Digby organized a hunting party in the Midlands to seize nine-year-old Princess Elizabeth from Coombe Abbey.',
      [
        'To invite the Spanish army to permanently annex and govern England.',
        'To restore direct rule by the Pope from Rome.',
        'To establish a democratic republic with universal male voting rights.',
      ],
      'em_l4_12',
    ),
    q(
      'What suspicious detail about the cellar beneath the House of Lords has led some revisionist historians to suspect government entrapment?',
      'The cellar was leased by conspirator Thomas Percy directly from John Whynniard, a royal official closely connected to Robert Cecil.',
      "Skeptics argue that Cecil's spy network knew about the plot from the beginning, allowing it to develop so Cecil could manipulate it to crush Catholicism forever.",
      [
        'The cellar was guarded day and night by 50 royal soldiers.',
        'The cellar was completely flooded with Thames river water in November.',
        "The cellar was located directly inside the King's private bedchamber.",
      ],
      'em_l4_13',
    ),
    q(
      'How did Robert Cecil utilize the discovery of the Gunpowder Plot to reshape British foreign and domestic policy?',
      'He used the national wave of anti-Catholic hysteria to crush the Catholic gentry and secure massive parliamentary taxation for King James I.',
      "The plot eliminated all royal sympathy for Catholics, cemented England's Protestant identity, and established severe Penal Laws that lasted for over two centuries.",
      [
        'He signed a military alliance with the Pope against Spain.',
        'He abolished the Church of England and established Presbyterianism.',
        'He granted full civil and voting rights to all religious dissenters.',
      ],
      'em_l4_14',
    ),
    q(
      "What dramatic evidence of physical torture is visible on Guy Fawkes' signed confessions in the National Archives?",
      "His first signature ('Guido') is a faint, broken scrawl, while his later signature ('Guido Fawkes') shows restored strength after recovery.",
      'The jagged, trembling signature from 9 November reflects the severe joint dislocation and agony inflicted by the rack in the Tower.',
      [
        'The document is covered in drops of candle wax and blood.',
        'The signature was written entirely in backward mirror script.',
        'The confession was written in French rather than English.',
      ],
      'em_l4_15',
    ),
    q(
      'What critical piece of physical evidence was found on Guy Fawkes when he was arrested around midnight on 4 November 1605?',
      'A pocket watch, touchwood (slow match), and dark lantern.',
      'Fawkes was dressed in boots and spurs, prepared to sprint to a waiting boat on the River Thames as soon as the 15-minute fuse was ignited.',
      [
        'A signed letter from the King of Spain authorizing the explosion.',
        'A map detailing the exact location of Catholic hiding holes in London.',
        'A ceremonial gold dagger engraved with the papal seal.',
      ],
      'em_l4_16',
    ),
    q(
      'What happened to the conspirators when gunpowder they were drying in front of an open fireplace accidentally ignited at Holbeche House?',
      'Several conspirators, including Catesby, were severely burned and blinded, which they interpreted as divine punishment from God.',
      'Attempting to dry damp gunpowder on a metal platter by the hearth, a spark ignited the bag, singeing Catesby and convincing them their cause was doomed.',
      [
        'The entire manor house collapsed, killing all 13 conspirators instantly.',
        "The explosion alerted the King's army to their exact hiding location.",
        'The blast destroyed their horses, preventing their escape to Scotland.',
      ],
      'em_l4_17',
    ),
    q(
      'What oath did Parliament introduce in 1606 forcing all English Catholics to swear allegiance to King James over the Pope?',
      'The Oath of Allegiance',
      "The 1606 Oath forced Catholics to explicitly deny the Pope's authority to depose excommunicated monarchs or release subjects from their allegiance.",
      ['The Solemn League and Covenant', 'The Act of Supremacy', 'The Test Act'],
      'em_l4_18',
    ),
    q(
      'What hidden architectural features were built in Elizabethan and Jacobean Catholic country houses to conceal outlawed priests?',
      'Priest holes (priestholes)',
      'Master carpenter Saint Nicholas Owen built tiny secret spaces hidden inside chimneys, beneath floorboards, and within double walls where priests hid for days.',
      ['Underground moat tunnels', 'Stone torture dungeons', 'Disguised bell towers'],
      'em_l4_19',
    ),
    q(
      'According to the historical consensus, what is the most accurate verdict on the Gunpowder Plot?',
      'It was a genuine, desperate terror plot by radical Catholic gentry, which Robert Cecil skillfully monitored, timed, and exploited for maximum political advantage.',
      'While Cecil may not have invented the conspiracy, his spymaster instincts allowed him to stage a dramatic eleventh-hour rescue of the King and Parliament.',
      [
        'It was a complete fabrication manufactured entirely by Robert Cecil with zero Catholic involvement.',
        'It was a foreign military operation commanded and funded directly by the King of France.',
        'It was an accidental chemical explosion that had nothing to do with religion or politics.',
      ],
      'em_l4_20',
    ),
  ],

  lesson_5: [
    // Core Knowledge (1-10)
    q(
      'What was the eleven-year period (1629–1640) during which King Charles I ruled England without summoning Parliament called?',
      "The Eleven Years' Tyranny (or Personal Rule)",
      'Charles dissolved Parliament in 1629 after bitter disputes over taxation, religion, and royal favorites, resolving to govern solely through divine royal prerogative.',
      ['The Restoration', 'The Commonwealth', 'The Glorious Revolution'],
      'em_l5_1',
    ),
    q(
      'Which contentious royal tax, traditionally levied only on coastal port towns in wartime, did Charles I impose on inland counties during peacetime?',
      'Ship Money',
      "By levying Ship Money on inland counties like Buckinghamshire in peacetime, Charles circumvented Parliament's constitutional power to approve taxes.",
      ['Tonnage and Poundage', 'The Poll Tax', 'The Hearth Tax'],
      'em_l5_2',
    ),
    q(
      'Who was the Buckinghamshire MP who famously refused to pay Ship Money in 1637, becoming a hero of parliamentary resistance?',
      'John Hampden',
      'Hampden was brought to trial before the Court of Exchequer; although the royal judges narrowly ruled against him (7 to 5), his defiance sparked nationwide tax resistance.',
      ['John Pym', 'Oliver Cromwell', 'Thomas Wentworth'],
      'em_l5_3',
    ),
    q(
      'What religious doctrine claimed that monarchs derive their royal authority directly from God and are accountable to no earthly power?',
      'The Divine Right of Kings',
      "Charles I firmly believed that as God's appointed lieutenant on earth, his royal commands could not be questioned, resisted, or checked by Parliament.",
      ['The Social Contract', 'Parliamentary Sovereignty', 'Popish Infallibility'],
      'em_l5_4',
    ),
    q(
      'What was the name of the professional, highly disciplined standing army created by Parliament in 1645 with meritocratic promotion?',
      'The New Model Army',
      'Formed under Sir Thomas Fairfax and Oliver Cromwell, the New Model Army replaced local militia with full-time, disciplined, deeply religious professional soldiers.',
      ['The Continental Army', 'The Redcoats', 'The Royal Yeomanry'],
      'em_l5_5',
    ),
    q(
      "Which decisive battle in June 1645 shattered King Charles I's main royalist army, effectively deciding the First Civil War?",
      'The Battle of Naseby',
      "Cromwell's Ironside cavalry crushed the Royalist wings at Naseby, capturing Charles's artillery, baggage train, and private letters revealing he was seeking foreign Catholic troops.",
      ['The Battle of Marston Moor', 'The Battle of Edgehill', 'The Battle of Worcester'],
      'em_l5_6',
    ),
    q(
      "What dramatic military intervention in December 1648 purged moderate Presbyterian MPs from Parliament, leaving behind the 'Rump Parliament'?",
      "Pride's Purge",
      'Colonel Thomas Pride stationed soldiers at the doors of the House of Commons, barring or arresting over 100 MPs who favored negotiating a settlement with King Charles.',
      ['The Gunpowder Plot', 'The Exclusion Crisis', "The Bishops' Wars"],
      'em_l5_7',
    ),
    q(
      'On what exact date was King Charles I publicly beheaded outside the Banqueting House in Whitehall, London?',
      '30 January 1649',
      "Dressed in two shirts so he would not shiver and appear afraid, Charles declared himself a 'martyr of the people' before being executed for high treason.",
      ['5 November 1605', '23 October 1642', '29 May 1660'],
      'em_l5_8',
    ),
    q(
      'What title did Oliver Cromwell adopt in 1653 as the head of state of the English republic?',
      'Lord Protector',
      "Under the Instrument of Government—Britain's first written constitution—Cromwell ruled England, Scotland, and Ireland as Lord Protector until his death in 1658.",
      ['Prime Minister', 'President', 'Supreme General'],
      'em_l5_9',
    ),
    q(
      'What radical democratic political movement in the New Model Army demanded universal male suffrage, equality under law, and religious liberty?',
      'The Levellers',
      "Led by John Lilburne and Richard Overton, the Levellers drafted 'An Agreement of the People', arguing that government legitimacy derives entirely from the consent of the governed.",
      ['The Diggers', 'The Fifth Monarchists', 'The Ranters'],
      'em_l5_10',
    ),

    // Mastery Challenge (11-20)
    q(
      "Which controversial Archbishop of Canterbury did Charles I appoint to enforce 'high church' ritualism, alienating Puritan Protestants?",
      'Archbishop William Laud',
      'Laud restored altar rails, church decorations, and Catholic-style ceremonial vestments, leading critics to accuse Charles and Laud of secretly plotting to restore Roman Catholicism.',
      ['Archbishop Thomas Cranmer', 'Archbishop Matthew Parker', 'Archbishop John Tillotson'],
      'em_l5_11',
    ),
    q(
      'What catastrophic blunder did Charles I commit on 4 January 1642, making civil war virtually unavoidable?',
      'He entered the House of Commons with 400 armed soldiers to personally arrest five leading MPs for high treason.',
      "Speaker William Lenthall famously defied the King, saying he had 'neither eyes to see nor tongue to speak' except as directed by the House; the five MPs had already fled by river.",
      [
        'He surrendered the Tower of London to French Catholic mercenaries.',
        'He ordered the immediate execution of John Pym and John Hampden without trial.',
        'He abolished the English common law and imposed Spanish Inquisition courts.',
      ],
      'em_l5_12',
    ),
    q(
      'What was the constitutional significance of the trial of King Charles I in January 1649?',
      'It established that a reigning monarch is not above the law and can be held criminally accountable for treason against his own subjects.',
      "The High Court of Justice condemned Charles as a 'tyrant, traitor, murderer, and public enemy to the good people of this nation.'",
      [
        'It transferred all Crown lands directly to the Catholic Pope in Rome.',
        'It ruled that Parliament had no legal authority to create courts of law.',
        'It declared that all future monarchs must be elected by universal public referendum.',
      ],
      'em_l5_13',
    ),
    q(
      'Why did King Charles wear two shirts on the cold morning of his execution on 30 January 1649?',
      'He feared the winter cold would make him shiver, and enemies would claim he was trembling with fear of death.',
      "Charles told his attendant: 'The season is so sharp as probably may make me shake... I would have no such imputation. I will not have my enemies think it fear.'",
      [
        'It was a royal tradition mandated for all sovereign coronations and executions.',
        'His executioners required him to wear two layers to absorb blood.',
        'He hid a secret steel breastplate beneath his linen to survive the axe blow.',
      ],
      'em_l5_14',
    ),
    q(
      'What famous 1647 political debate in a London church saw New Model Army officers and soldiers debate the future of English democracy?',
      'The Putney Debates',
      "At St Mary's Church in Putney, Colonel Thomas Rainsborough argued: 'The poorest he that is in England hath a life to live, as the greatest he', demanding universal male voting.",
      ['The Hampton Court Conference', 'The Westminster Assembly', 'The Oxford Parliament'],
      'em_l5_15',
    ),
    q(
      "How did Oliver Cromwell and Henry Ireton respond to the Levellers' demands for universal male voting at Putney?",
      'They rejected it, arguing that only men with permanent fixed property (landowners) should have the right to vote.',
      'Ireton argued that giving landless men the vote would lead to the destruction of private property and an anarchy where the poor would vote to confiscate the wealth of the rich.',
      [
        'They immediately agreed and wrote universal suffrage into the law.',
        'They arrested and executed Thomas Rainsborough on the spot.',
        'They proposed giving the vote exclusively to women and university scholars.',
      ],
      'em_l5_16',
    ),
    q(
      "What radical egalitarian group, led by Gerrard Winstanley, began digging and planting vegetables on common land at St George's Hill in 1649?",
      'The Diggers (True Levellers)',
      "Winstanley argued that the earth was a 'common treasury for all' and that private property was a form of royal tyranny; the commune was soon violently dispersed by landowners.",
      ['The Quakers', 'The Puritans', 'The Lollards'],
      'em_l5_17',
    ),
    q(
      'What military campaign conducted by Oliver Cromwell between 1649 and 1650 remains deeply controversial due to massacres at Drogheda and Wexford?',
      'The Cromwellian Conquest of Ireland',
      'Cromwell brutally crushed Royalist and Catholic confederates, resulting in mass casualties, the confiscation of Catholic lands, and centuries of bitter Anglo-Irish trauma.',
      ['The Scottish Covenanter Campaign', 'The Anglo-Dutch Naval War', 'The Peninsular War'],
      'em_l5_18',
    ),
    q(
      'In what year was the English monarchy restored under King Charles II, bringing an end to the Commonwealth republic?',
      '1660',
      "Following the death of Oliver Cromwell and the collapse of his son Richard's protectorate, General George Monck marched on London, inviting Charles II back from exile.",
      ['1649', '1653', '1688'],
      'em_l5_19',
    ),
    q(
      'According to the historical verdict, what was the lasting ideological legacy of the 1649 Regicide?',
      'It permanently shattered royal absolutism in Britain, proving that sovereign power ultimately rests on the consent of the political nation.',
      'Although the monarchy returned in 1660, no British king could ever again claim absolute divine right or rule without summoning Parliament.',
      [
        'It resulted in Britain being permanently governed as a military dictatorship.',
        'It eliminated all religious conflict and established total secularism.',
        'It caused Britain to lose all its overseas colonies and global trade routes.',
      ],
      'em_l5_20',
    ),
  ],

  lesson_6: [
    // Core Knowledge (1-10)
    q(
      'What 1651 statute passed by Oliver Cromwell mandated that colonial goods could only be imported on English-built and English-crewed ships?',
      'The Navigation Act',
      'The 1651 Navigation Act struck directly at Dutch dominance of global shipping, ensuring that trade profits from the colonies flowed exclusively through English ports.',
      ['The Stamp Act', 'The Declaratory Act', 'The Molasses Act'],
      'em_l6_1',
    ),
    q(
      'What dominant economic theory asserted that global wealth was finite and a nation grew powerful by maximizing exports and hoarding bullion?',
      'Mercantilism',
      'Mercantilism treated commerce as economic warfare; nations used protective tariffs, monopolies, and colonial extraction to maintain a positive balance of trade.',
      ['Free Trade Capitalism', 'Feudalism', 'Laissez-faire Socialism'],
      'em_l6_2',
    ),
    q(
      "Which European maritime republic was England's primary commercial rival, leading to three naval wars between 1652 and 1674?",
      'The Dutch Republic (The Netherlands)',
      "With the world's largest merchant fleet and banking center in Amsterdam, the Dutch dominated carrying trade, fish, and spice transport until English naval challenges.",
      ['The Kingdom of Spain', 'The Kingdom of France', 'The Republic of Venice'],
      'em_l6_3',
    ),
    q(
      'In what year was the Bank of England founded by royal charter to raise £1.2 million for the war against France?',
      '1694',
      'Founded by Scottish merchant William Paterson and London financiers, the Bank of England created the modern National Debt and issued banknotes backed by government credit.',
      ['1660', '1688', '1720'],
      'em_l6_4',
    ),
    q(
      'What major constitutional event in 1688 replaced the Catholic King James II with William of Orange and Queen Mary II?',
      'The Glorious Revolution',
      'Parliament invited William and Mary to take the throne, signing the 1689 Bill of Rights and binding the Crown to rule through parliamentary consent.',
      ['The Restoration', "Pride's Purge", 'The English Civil War'],
      'em_l6_5',
    ),
    q(
      'Which royal corporate monopoly, chartered in 1672 and led by the Duke of York, transported more captive Africans to the Americas than any other single institution?',
      'The Royal African Company',
      "Between 1672 and 1731, the Royal African Company shipped over 212,000 enslaved Africans, branding them with 'DY' (Duke of York) or 'RAC' before loading them into holds.",
      ['The East India Company', 'The Virginia Company', 'The South Sea Company'],
      'em_l6_6',
    ),
    q(
      'What popular social institutions in 17th-century London became vibrant hubs for news, political debate, shipping intelligence, and stock speculation?',
      'Coffee Houses',
      "Known as 'Penny Universities' because a cup of coffee cost one penny and bought hours of intellectual discourse, coffee houses birthed institutions like Lloyd's of London.",
      ['Taverns and Gin Shops', 'Monastic Chapter Houses', 'Royal Palace Salons'],
      'em_l6_7',
    ),
    q(
      "Which famous global insurance market originated in Edward Lloyd's London coffee house in the 1680s?",
      "Lloyd's of London",
      "Shipowners, merchants, and underwriters gathered at Lloyd's to share maritime intelligence and insure risky overseas cargo voyages against shipwreck and privateers.",
      ['The Bank of England', 'The London Stock Exchange', 'Barclays Bank'],
      'em_l6_8',
    ),
    q(
      'What term describes the massive expansion of imported luxury goods (sugar, tea, tobacco, coffee, silk) consumed by ordinary Britons between 1660 and 1750?',
      'The Consumer Revolution',
      'Goods once reserved for royalty became everyday household necessities for the growing middle and working classes, funded by Atlantic trade and colonial plantations.',
      ['The Industrial Revolution', 'The Agricultural Revolution', 'The Digital Revolution'],
      'em_l6_9',
    ),
    q(
      'What iconic London commercial building, rebuilt after the Great Fire of 1666, served as the physical center of European merchandise trade?',
      'The Royal Exchange',
      "Founded by Sir Thomas Gresham, merchants gathered daily on the courtyard floor of the Royal Exchange, partitioned into distinct 'walks' for trade with Turkey, Jamaica, and India.",
      ["St Paul's Cathedral", 'Westminster Abbey', 'The Tower of London'],
      'em_l6_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Why was the creation of the National Debt in 1694 considered a revolutionary transformation in state power?',
      "It allowed the government to borrow massive funds for war at low interest rates, backed by the credibility of Parliament rather than a mortal king's personal wealth.",
      "Unlike absolute monarchs like Louis XIV who defaulted on royal loans, Britain's parliamentary-backed debt gave it an insurmountable financial advantage in global conflicts.",
      [
        'It eliminated all taxes on property and food across the British Isles.',
        'It made the British government dependent on loans from the Catholic Pope.',
        'It forced the British Crown to auction off all its royal palaces to private merchants.',
      ],
      'em_l6_11',
    ),
    q(
      'What famous 1720 financial disaster occurred when wild speculation in colonial trade shares collapsed, bankrupting thousands of British investors?',
      'The South Sea Bubble',
      'Shares in the South Sea Company skyrocketed from £128 to £1,000 on speculative fever before crashing catastrophically, forcing Sir Robert Walpole to stabilize public finances.',
      ['The Wall Street Crash', 'The Tulip Mania', 'The Great Panic of 1825'],
      'em_l6_12',
    ),
    q(
      "How did the Dutch invention of the 'Fluyt' cargo ship give them a commercial advantage over English shipping before 1651?",
      'It had a vast pear-shaped hull that maximized cargo space while requiring a crew of only 10 to 12 men, slashing maritime freight costs.',
      'Built cheaply of pine and armed with few guns, the Dutch fluyt undercut English freight rates across Europe, provoking the protectionist Navigation Acts.',
      [
        'It was powered by early steam engines that ignored wind patterns.',
        'It was constructed entirely from impenetrable iron plates.',
        'It was equipped with specialized cranes that loaded cargo in minutes.',
      ],
      'em_l6_13',
    ),
    q(
      "What catastrophic royal event in 1672, known as the 'Stop of the Exchequer', ruined London goldsmith-bankers and underscored the instability of royal credit?",
      'King Charles II suspended repayment on all royal debts to fund a war against the Dutch.',
      'Charles defaulted on £1.3 million of loans, demonstrating to financiers that lending money to absolute kings was suicidal without parliamentary guarantees.',
      [
        'The Great Fire destroyed all paper receipts in the Treasury.',
        'Dutch privateers seized the entire royal gold reserve in the Thames.',
        'Parliament confiscated all Crown funds and transferred them to Scotland.',
      ],
      'em_l6_14',
    ),
    q(
      'What was the political ideology of the Whigs regarding commerce, religion, and the monarchy after 1688?',
      'They championed parliamentary supremacy, Protestant succession, financial expansion, and war against Catholic France.',
      'The Whig party represented urban merchants, the Bank of England, and low-church Protestants, dominating British politics throughout the early 18th century.',
      [
        'They favored absolute divine royal monarchy and return to Catholicism.',
        'They demanded the immediate abolition of the British Empire and Royal Navy.',
        'They sought to abolish private banking and ban colonial imports.',
      ],
      'em_l6_15',
    ),
    q(
      'What role did the Duke of York (later King James II) play in institutionalizing the Transatlantic Slave Trade?',
      'He served as Governor of the Royal African Company, actively investing his royal fortune in human trafficking.',
      'James owned substantial stock in the RAC; profits from the purchase, branding, and sale of captive Africans flowed directly into the royal household.',
      [
        'He passed laws banning the slave trade from all British colonies.',
        'He commanded Royal Navy warships to intercept slave vessels in the Atlantic.',
        'He founded the first abolitionist society in the British Parliament.',
      ],
      'em_l6_16',
    ),
    q(
      'How did the import of cheap Indian cotton calicoes impact domestic English wool weavers in the early 1700s?',
      'English weavers rioted in London, prompting Parliament to pass the Calico Acts banning the use and wear of printed Indian cottons.',
      'The Calico Acts of 1700 and 1721 protected the traditional wool and silk industries, accidentally stimulating domestic British inventors to mechanize cotton spinning.',
      [
        'English wool weavers universally abandoned sheep farming to become overseas merchants.',
        'The English government forced every citizen to wear calico by law.',
        'Indian cotton was so expensive that only the King could afford to purchase it.',
      ],
      'em_l6_17',
    ),
    q(
      "Why were women largely excluded from London's 17th-century coffee houses?",
      'Coffee houses were strictly coded as masculine spaces of business, political debate, and commerce, where respectable women were not admitted.',
      "In 1674, frustrated women published 'The Women's Petition Against Coffee', protesting that coffee made their husbands idle, gossiping, and physically impotent.",
      [
        'The King issued a royal decree making it a capital crime for women to drink coffee.',
        'Coffee was medically believed to cause permanent blindness in women.',
        'Only women with parliamentary voting rights were legally permitted inside.',
      ],
      'em_l6_18',
    ),
    q(
      'What was the primary difference between early 17th-century luxury trade and mid-18th-century colonial commerce?',
      'Trade shifted from low-volume exotic luxuries for the ultra-rich to high-volume bulk commodities consumed by millions of ordinary working people.',
      'Sugar, tobacco, tea, and rum ceased to be medicines for aristocrats; they became cheap, highly addictive daily fuels for the emerging industrial working class.',
      [
        'Trade completely ceased with the Americas and focused solely on Russia.',
        'All international trade was conducted using barter rather than paper money.',
        'European nations stopped using ocean ships and relied exclusively on canal barges.',
      ],
      'em_l6_19',
    ),
    q(
      "According to the historical verdict, what was the dark paradox underpinning Britain's 'Financial Revolution'?",
      "Britain's modern institutions of liberty (parliamentary rule, rule of law, banking, and insurance) were financed and sustained by the violent exploitation of transatlantic chattel slavery.",
      'The capital that funded the Bank of England, built country mansions, and expanded the Royal Navy was soaked in the profits of Caribbean sugar plantations and the slave trade.',
      [
        'Britain became the poorest and most indebted nation in Europe by 1750.',
        'The British economy collapsed completely, leading to the re-establishment of feudal serfdom.',
        'All British merchants went bankrupt due to the South Sea Bubble.',
      ],
      'em_l6_20',
    ),
  ],

  lesson_7: [
    // Core Knowledge (1-10)
    q(
      'What was the vast, circular maritime commercial network connecting Europe, Africa, and the Americas called?',
      'The Triangular Trade',
      'Manufactured goods sailed from Britain to Africa; enslaved Africans sailed to the Americas; slave-grown sugar, tobacco, and cotton sailed back to Britain.',
      ['The Silk Road', 'The Hanseatic League', 'The Columbian Loop'],
      'em_l7_1',
    ),
    q(
      'What term describes the subterranean coastal dungeons in West African forts like Cape Coast Castle where captives were held before shipment?',
      'The Slave Dungeons (Slave Castles)',
      'Thousands of captive men, women, and children were imprisoned in pitch-black, suffocating stone dungeons for weeks until slave ships arrived.',
      ['Barracoons', 'Hulks', 'Citadels'],
      'em_l7_2',
    ),
    q(
      'What was the horrific second leg of the Triangular Trade across the Atlantic Ocean called?',
      'The Middle Passage',
      'The 4,000-mile voyage across the Atlantic took between 6 to 12 weeks, during which millions of Africans suffered unimaginable physical and psychological torment.',
      ['The Golden Route', 'The Cape Passage', 'The North Atlantic Drift'],
      'em_l7_3',
    ),
    q(
      'What was the name of the famous Liverpool slave ship whose 1788 stowage diagram became an iconic visual weapon of the abolitionist campaign?',
      'The Brookes',
      'The Brookes diagram depicted hundreds of human beings crammed side-by-side like cargo, exposing the cold, calculated inhumanity of the trade.',
      ['The Zong', 'The Golden Hind', 'The Mayflower'],
      'em_l7_4',
    ),
    q(
      "What was the difference between 'tight packing' and 'loose packing' aboard slave ships?",
      "'Tight packing' crammed maximum captives into holds expecting high mortality, while 'loose packing' gave slightly more space hoping more would survive.",
      'Most British captains chose tight packing, calculating that carrying 500 people with 20% dying yielded more profit than carrying 300 with 10% dying.',
      [
        'Tight packing used iron chains, while loose packing used rope ties.',
        'Tight packing was only used for female captives, loose packing for men.',
        'Tight packing referred to packing cargo barrels, loose packing to crew hammocks.',
      ],
      'em_l7_5',
    ),
    q(
      "Which deadly gastrointestinal bacterial disease, nicknamed the 'bloody flux', killed thousands of captives on the Middle Passage?",
      'Dysentery',
      'Caused by contaminated drinking water and sickeningly unhygienic hold conditions, dysentery dehydrated victims rapidly, spreading violently in the cramped holds.',
      ['Scurvy', 'Malaria', 'Yellow Fever'],
      'em_l7_6',
    ),
    q(
      'What horrific method of selling enslaved people involved buyers rushing into an enclosure to physically grab the captives they wanted?',
      "A 'Scramble'",
      'Upon a drum roll or signal, planters dashed into the yard with lengths of cloth to claim terrified captives, tearing families apart in minutes.',
      ['An English Auction', 'A Dutch Auction', 'A Sealed-Bid Auction'],
      'em_l7_7',
    ),
    q(
      'What permanent, painful marking was burned onto the skin of enslaved Africans using red-hot silver or iron stamps?',
      'Branding',
      "Captives were branded on the chest or shoulder with the initials of the trading company (e.g. 'RAC') or private plantation owner to mark them as legal chattel.",
      ['Tattooing', 'Scarification', 'Piercing'],
      'em_l7_8',
    ),
    q(
      'Which British Caribbean island became the wealthiest sugar-producing colony in the British Empire in the 18th century?',
      'Jamaica',
      'Captured from Spain in 1655, Jamaica was turned into an industrial agro-export machine dominated by hundreds of massive, brutally run sugar plantations.',
      ['Barbados', 'Trinidad', 'Antigua'],
      'em_l7_9',
    ),
    q(
      'What was the average life expectancy of an enslaved African arriving on a Jamaican sugar plantation in the 18th century?',
      'Approximately 7 to 10 years.',
      'The brutal labor regimen of 18-hour days in boiling houses and cane fields, combined with malnutrition and torture, wore enslaved workers to death rapidly.',
      ['25 to 30 years.', 'Over 40 years.', 'Less than 6 months.'],
      'em_l7_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'How did the legal status of an enslaved African differ fundamentally from an indentured servant?',
      "Enslaved Africans were classified as 'chattel'—permanent, inheritable property with zero legal rights for themselves or their descendants.",
      'While indentured servants served temporary contracts with eventual legal freedom, chattel slavery was racialized, hereditary, and lifelong.',
      [
        'Indentured servants were never allowed to leave Britain.',
        'Enslaved Africans were paid monthly cash wages fixed by Parliament.',
        'There was no legal difference between the two systems.',
      ],
      'em_l7_11',
    ),
    q(
      'What gruesome daily exercise routine were captive Africans forced to perform on ship decks at gunpoint to prevent atrophy?',
      "'Dancing the slaves'",
      "Chained together in leg irons, captives were forced to jump to a drum or bagpipe under threat of the cat-o'-nine-tails whip, their irons tearing into their ankles.",
      ['Military marching', 'Rowing auxiliary oars', 'Swimming alongside the hull'],
      'em_l7_12',
    ),
    q(
      'Why did slave ships routinely travel accompanied by schools of sharks across the Atlantic?',
      'Sharks learned to follow slave vessels to feed on the bodies of captives thrown overboard daily due to disease or execution.',
      'Captains routinely discarded dead and dying Africans overboard to avoid feeding them or spreading contagion, turning the Atlantic into an underwater graveyard.',
      [
        'Captains used shark liver oil to treat shipboard scurvy.',
        'Sharks were caught by crew members to provide fresh meat for the captives.',
        'Sharks helped sailors navigate by following the Gulf Stream current.',
      ],
      'em_l7_13',
    ),
    q(
      "What was the terrifying physical feature of the 'Door of No Return' at Cape Coast Castle?",
      'A narrow stone portal opening directly onto the roaring Atlantic surf, through which captives passed to canoes, never to see Africa again.',
      'Once an African passed through the Door of No Return, their homeland, family, language, and ancestral freedom were permanently extinguished.',
      [
        'A massive iron vault door inscribed with the Ten Commandments.',
        'A trapdoor dropping directly into a water-filled shark pit.',
        'A gate where captives were forced to sign legal contracts in English.',
      ],
      'em_l7_14',
    ),
    q(
      'What horrific atrocity occurred aboard the British slave ship Zong in 1781?',
      "The captain threw 133 living enslaved Africans overboard to fraudulently claim insurance payouts for 'lost cargo'.",
      'Captain Luke Collingwood claimed water was running short; back in London, the court treated the case as a commercial insurance dispute over livestock, sparking national outrage.',
      [
        'The enslaved crew successfully seized the ship and sailed back to Ghana.',
        'The ship was sunk by a French privateer in the English Channel.',
        'The captain freed all captives and granted them land in Jamaica.',
      ],
      'em_l7_15',
    ),
    q(
      'What hazardous, industrial machinery on sugar plantations frequently crushed and severed the arms of exhausted enslaved workers?',
      'The three-roller cane-crushing mill.',
      "Operating day and night during harvest, rollers crushed raw sugarcane; if an exhausted worker's fingers caught, a hatchet was kept nearby to sever the arm before they were pulled in.",
      [
        'The steam-powered cotton gin.',
        'The mechanized threshing drum.',
        'The hydraulic grain pestle.',
      ],
      'em_l7_16',
    ),
    q(
      'What was the demographic reality of sugar plantations in Jamaica by 1750?',
      'Enslaved Black people outnumbered white planters and overseers by roughly ten to one.',
      'Terrified of a bloody slave rebellion, white oligarchs enforced total control through savage legal codes, sadistic physical torture, and armed militia patrols.',
      [
        "White settlers made up over 80% of the island's total population.",
        'The population was evenly split between Europeans, Africans, and indigenous Taíno.',
        'Plantations were operated entirely by free white wage-laborers.',
      ],
      'em_l7_17',
    ),
    q(
      'Which British port cities grew fabulously wealthy directly from their involvement in the Transatlantic Slave Trade?',
      'Liverpool and Bristol',
      'By 1795, Liverpool controlled 80% of the British slave trade and 40% of the European trade, its banks, docks, and public buildings built entirely on slave capital.',
      ['Manchester and Birmingham', 'Edinburgh and Glasgow', 'Oxford and Cambridge'],
      'em_l7_18',
    ),
    q(
      'What legal doctrine in the 1696 Jamaican Slave Code established that killing an enslaved person was not murder?',
      'Enslaved people were classified as property, meaning an owner killing an enslaved person incurred only a minor monetary fine, not a murder trial.',
      'The law ensured that white masters could whip, dismember, burn, or execute enslaved people with total legal impunity to maintain discipline.',
      [
        'The doctrine of Habeas Corpus.',
        'The Magna Carta protection of freemen.',
        'The Bill of Rights religious exemption.',
      ],
      'em_l7_19',
    ),
    q(
      "According to the historical verdict, why did Caribbean planters prefer 'buying' new enslaved people rather than allowing populations to reproduce naturally?",
      'It was cheaper to work enslaved people to death within a decade and buy fresh young captives from Africa than to care for children and pregnant mothers.',
      'This calculated, profit-maximizing brutality required the constant importation of hundreds of thousands of newly captured Africans to sustain plantation output.',
      [
        'The British Crown banned African children from being born in the Caribbean.',
        'Plantation soil was contaminated with chemicals that caused total infertility.',
        'All enslaved women were immediately returned to West Africa after five years.',
      ],
      'em_l7_20',
    ),
  ],

  lesson_8: [
    // Core Knowledge (1-10)
    q(
      'What term describes the broad spectrum of daily ways enslaved people fought back, from subtle sabotage to armed rebellion?',
      'The Spectrum of Resistance',
      'Resistance was not limited to armed revolts; it included covert acts like breaking tools, feigning sickness, singing subversive songs, and preserving African culture.',
      ['The Middle Passage', 'The Abolition Doctrine', 'The Mercantilist Policy'],
      'em_l8_1',
    ),
    q(
      'Who was the brilliant military and spiritual leader of the Jamaican Windward Maroons who defeated British troops in the 1730s?',
      'Queen Nanny (Nanny of the Maroons)',
      'An Asante military genius and national hero of Jamaica, Queen Nanny led Maroon guerrillas in the Blue Mountains, forcing the British Crown to sign a peace treaty in 1739.',
      ['Harriet Tubman', 'Sojourner Truth', 'Phillis Wheatley'],
      'em_l8_2',
    ),
    q(
      'What carved cow-horn musical instrument was used by Jamaican Maroons to transmit coded tactical messages across mountain valleys?',
      'The Abeng',
      'Heard over miles of rugged terrain, the abeng allowed Maroons to coordinate ambushes, warn of advancing redcoats, and communicate in an impenetrable acoustic language.',
      ['The Djembe', 'The Balafon', 'The Kora'],
      'em_l8_3',
    ),
    q(
      'What term was given to formerly enslaved Africans who escaped plantations and established independent, self-governing communities in remote mountains and swamps?',
      'Maroons',
      "Derived from the Spanish 'cimarrón' (meaning wild or untamed), Maroons built fortified towns in the Jamaican mountains, surviving for generations.",
      ['Privateers', 'Indentured Servants', 'Yeomen'],
      'em_l8_4',
    ),
    q(
      "What famous 1739 armed insurrection in South Carolina saw twenty enslaved Africans march toward Spanish Florida shouting 'Liberty!'?",
      'The Stono Rebellion',
      'Led by an enslaved Angolan named Jemmy, rebels raided a store for weapons and marched toward freedom in Florida before being suppressed by the colonial militia.',
      ['The Nat Turner Rebellion', 'The Peterloo Uprising', "Bacon's Rebellion"],
      'em_l8_5',
    ),
    q(
      'Who was the formerly enslaved African whose bestselling 1789 autobiography became a powerful weapon in the British abolitionist movement?',
      'Olaudah Equiano (Gustavus Vassa)',
      "Equiano's firsthand account of his kidnapping in Igboland, the horrors of the Middle Passage, and his purchase of his own freedom electrified the British public.",
      ['Ignatius Sancho', 'Ottobah Cugoano', 'Frederick Douglass'],
      'em_l8_6',
    ),
    q(
      "What was the name of Britain's first Black political organization, co-founded by Olaudah Equiano and Ottobah Cugoano in London in the 1780s?",
      'The Sons of Africa',
      'The Sons of Africa wrote letters to newspapers, petitioned members of Parliament, and gave public speeches demanding the immediate end to the slave trade.',
      [
        "The London Working Men's Association",
        'The African National Congress',
        'The Society of Friends',
      ],
      'em_l8_7',
    ),
    q(
      'What form of everyday resistance allowed enslaved people to subtly damage plantation profits without risking execution?',
      'Breaking tools, working slowly, feigning ignorance, or sabotaging cane fires.',
      'Overseers dismissed these acts as laziness, failing to recognize them as deliberate, coordinated acts of economic sabotage against their enslavers.',
      [
        'Writing formal petitions to the King of England.',
        'Purchasing shares in the East India Company.',
        'Filing lawsuits in London common courts.',
      ],
      'em_l8_8',
    ),
    q(
      'What cultural weapon did enslaved Africans use to preserve human dignity, communicate secretly, and mock their white enslavers?',
      'Spiritual songs, work chants, and trickster folklore (like Anansi the Spider).',
      'West African oral traditions survived in music and folktales, embedding coded messages of escape and resistance right under the noses of overseers.',
      [
        'Latin choral hymns approved by the Archbishop.',
        'Classical European violin sonatas.',
        'Written legal diaries published in London.',
      ],
      'em_l8_9',
    ),
    q(
      'What treaty did the British government sign with the Jamaican Maroons in 1739 after failing to defeat them militarily?',
      'The 1739 Maroon Treaty',
      'The treaty recognized Maroon freedom and granted them 1,500 acres of land, but controversially required them to return future runaway slaves to the British.',
      ['The Treaty of Tordesillas', 'The Treaty of Paris', 'The Treaty of Utrecht'],
      'em_l8_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'How did Queen Nanny and her Maroon warriors utilize the terrain of the Blue Mountains to defeat British soldiers?',
      'They perfected camouflage using vines and leaves, blending invisibly into the jungle to stage devastating hit-and-run ambushes in narrow gorges.',
      'British soldiers marching in heavy red wool coats were easy targets for concealed Maroon snipers who struck and vanished into the impenetrable mountain ridges.',
      [
        'They built stone castles modeled on European fortresses.',
        'They fought British troops in traditional open-field cavalry charges.',
        'They dug miles of Western Front-style trenches across the beaches.',
      ],
      'em_l8_11',
    ),
    q(
      'Why was Spanish Florida a major destination for escaping enslaved people in the 1730s?',
      'The Spanish King promised freedom and land to any British runaway slave who converted to Catholicism and helped defend the colony.',
      'Spain established the free Black settlement of Fort Mose near St Augustine in 1738, creating a magnetic beacon of liberty that helped spark the Stono Rebellion.',
      [
        'Florida had abolished all taxation on sugar production.',
        'Spain offered free transatlantic passage back to Africa from Florida.',
        'Florida was completely unpopulated and had no government authority.',
      ],
      'em_l8_12',
    ),
    q(
      'What gruesome punishment did colonial authorities inflict on captured rebels following the 1739 Stono Rebellion?',
      'They severed their heads and mounted them on mileposts along the road to terrorize other enslaved people into submission.',
      'South Carolina also passed the brutal Negro Act of 1740, banning enslaved people from learning to read, assembling in groups, or playing drums.',
      [
        'They deported the rebels to French sugar plantations in Martinique.',
        'They released them after a public apology to the governor.',
        'They required them to pay a fine of twenty shillings.',
      ],
      'em_l8_13',
    ),
    q(
      'How did Olaudah Equiano successfully purchase his own legal freedom in 1766?',
      'He traded small goods like fruit and glassware in the Caribbean, saving £40 to buy his freedom from his Quaker master.',
      'Equiano was an astute businessman who mastered arithmetic, navigation, and commercial trading while working on merchant ships.',
      [
        'He won a lawsuit against his master in the London High Court.',
        'He was granted freedom by a royal decree from King George III.',
        'He escaped into the Blue Mountains and joined the Maroons.',
      ],
      'em_l8_14',
    ),
    q(
      "Why was Equiano's published autobiography uniquely persuasive to the 18th-century British reading public?",
      'It proved that an African was capable of supreme literary elegance, shattering white racist myths that Africans were intellectually inferior beings.',
      'Equiano wrote with emotional power, moral authority, and deep Christian conviction, humanizing the millions who had suffered the horrors of the trade.',
      [
        'It was written in ancient Greek and dedicated to the Pope.',
        'It praised the slave trade for civilizing African people.',
        'It provided maps showing secret Spanish gold mines in South America.',
      ],
      'em_l8_15',
    ),
    q(
      "What controversial compromise did the 1739 Maroon Treaty impose on Queen Nanny and Cudjoe's communities?",
      'The Maroons agreed to capture and return newly escaped plantation runaways in exchange for British recognition of their own independence.',
      'This bitter clause divided Maroons from plantation slaves, creating complex tensions that colonial officials deliberately exploited to prevent unified island revolts.',
      [
        'The Maroons agreed to pay all British land taxes in gold bullion.',
        'The Maroons were forced to convert entirely to the Church of England.',
        'The Maroons were required to serve as crew on British slave ships.',
      ],
      'em_l8_16',
    ),
    q(
      'What was the estimated frequency of shipboard rebellions aboard transatlantic slave vessels during the Middle Passage?',
      'Rebellions erupted on approximately 1 in every 10 voyages.',
      'Despite being kept in chains below deck, captives revolted frequently whenever deck security lapsed, forcing captains to spend thousands on armaments and nets.',
      [
        'Rebellions occurred on virtually every single voyage.',
        'Only one single rebellion was recorded in 300 years of the slave trade.',
        'Rebellions occurred on roughly half of all voyages.',
      ],
      'em_l8_17',
    ),
    q(
      'How did the Jamaican landscape (such as the Cockpit Country) uniquely favor Maroon guerrilla resistance?',
      'The Cockpit Country was a maze of sheer limestone sinkholes, razor-sharp karst ridges, and secret caves where European troops suffered heatstroke and disorientation.',
      "Known as the 'Land of Look Behind' because redcoats constantly had to watch their backs, the terrain neutralized British artillery and cavalry superiority.",
      [
        'It was a flat desert where British troops could not find drinking water.',
        'It was an open grassland where Maroon horses could outrun foot soldiers.',
        'It was an icy mountain range where British weapons froze.',
      ],
      'em_l8_18',
    ),
    q(
      "Which former enslaved African intellectual in London, a friend of Equiano, authored 'Thoughts and Sentiments on the Evil of Slavery' in 1787?",
      'Ottobah Cugoano',
      'Kidnapped from modern-day Ghana, Cugoano published a radical abolitionist manifesto arguing that enslaved people had a moral duty to rebel against their captors.',
      ['Ignatius Sancho', 'Olaudah Equiano', 'Samuel Coleridge-Taylor'],
      'em_l8_19',
    ),
    q(
      'According to the historical verdict, what is the crucial flaw in the traditional white-savior narrative of British abolition?',
      'It credited wealthy white MPs like William Wilberforce while completely ignoring that centuries of relentless Black resistance made the slave system untenable.',
      'Abolition was not a gift bestowed by benevolent British politicians; it was won through the courage of African rebels, Maroon warriors, and Black intellectuals who fought the trade at every step.',
      [
        'The British government never actually passed an act abolishing the slave trade.',
        'White politicians were the only individuals who cared about human rights in the 18th century.',
        'Enslaved Africans accepted their condition willingly until told to revolt by Londoners.',
      ],
      'em_l8_20',
    ),
  ],

  lesson_9: [
    // Core Knowledge (1-10)
    q(
      "What landmark 1689 constitutional statute permanently limited the powers of the Crown and established Parliament's legislative authority?",
      'The Bill of Rights',
      "The 1689 Bill of Rights barred monarchs from suspending laws, raising standing armies, or levying taxes without Parliament's consent, establishing constitutional monarchy.",
      ['Magna Carta', 'The Act of Settlement', 'The Great Reform Act'],
      'em_l9_1',
    ),
    q(
      'What term described corrupt parliamentary constituencies with minuscule electorates controlled by wealthy aristocratic landlords?',
      'Rotten Boroughs (or Pocket Boroughs)',
      'Boroughs like Old Sarum (an uninhabited hill with 7 voters) sent two MPs to Parliament, while industrial boomtowns like Manchester sent zero.',
      ['Free Boroughs', 'Charter Cities', 'Royal Shires'],
      'em_l9_2',
    ),
    q(
      "Who is widely recognized as Britain's first official Prime Minister, dominating parliamentary politics between 1721 and 1742?",
      'Sir Robert Walpole',
      'Walpole governed from 10 Downing Street for 21 years as leader of the Whigs, stabilizing the economy after the South Sea Bubble and avoiding costly foreign wars.',
      ['William Pitt the Elder', 'The Duke of Newcastle', 'Lord North'],
      'em_l9_3',
    ),
    q(
      'What was the popular name for the massive expansion of English criminal law that made over 200 property offenses punishable by death?',
      'The Bloody Code',
      'Passed to protect the property of the ruling elite, the Bloody Code prescribed execution for cutting down cherry trees, stealing 40 shillings, or poaching deer.',
      ['The Penal Code', 'The Black Act', 'The Star Chamber'],
      'em_l9_4',
    ),
    q(
      'Which famous satirical print by William Hogarth in 1751 illustrated the catastrophic social ruin, addiction, and infant neglect caused by cheap spirits in London?',
      'Gin Lane',
      "Hogarth contrasted the horrors of 'Gin Lane' (starvation, suicide, infanticide) with the prosperous, wholesome industry of 'Beer Street'.",
      ["A Rake's Progress", 'Marriage A-la-Mode', 'The Four Stages of Cruelty'],
      'em_l9_5',
    ),
    q(
      'Approximately what percentage of the adult male population had the right to vote in British general elections in 1750?',
      'Less than 5% of adult men.',
      'Voting was strictly tied to substantial property ownership; women, working-class men, farm laborers, and Catholics were completely disenfranchised.',
      ['Approximately 50% of adult men.', 'Over 80% of adult men.', 'Exactly 25% of adult men.'],
      'em_l9_6',
    ),
    q(
      'What 1707 constitutional treaty formally united the kingdoms of England and Scotland into a single sovereign state called Great Britain?',
      'The Act of Union',
      'Passed by the Scottish and English parliaments, the union created a single Parliament of Great Britain at Westminster and a shared commercial empire.',
      ['The Treaty of Edinburgh', 'The Solemn League and Covenant', 'The Declaration of Breda'],
      'em_l9_7',
    ),
    q(
      'What major naval policy ensured the Royal Navy became the most powerful military instrument on earth by 1750?',
      'The aggressive expansion of state dockyards and permanent fleet dominance over European rivals.',
      'Dockyards like Portsmouth and Chatham turned Britain into an industrial naval machine, allowing it to protect its global trade routes and blockade enemies.',
      [
        'A total ban on warships operating in the Atlantic.',
        'Relying solely on hired Dutch merchant vessels in wartime.',
        'A treaty agreeing to split all naval bases with France.',
      ],
      'em_l9_8',
    ),
    q(
      'Which royal dynasty from Germany inherited the British throne in 1714 under the Act of Settlement?',
      'The Hanoverians (House of Hanover)',
      'King George I spoke little English when he took the throne, relying heavily on Whig ministers like Robert Walpole, which unintentionally strengthened parliamentary cabinet rule.',
      ['The Stuarts', 'The Tudors', 'The Plantagenets'],
      'em_l9_9',
    ),
    q(
      'What was the primary economic reality for millions of rural and urban working-class Britons in 1750?',
      'Extreme poverty, child labor, short life expectancies, and total exclusion from political power.',
      'While London merchants built grand neoclassical mansions, agricultural laborers and slum dwellers lived in squalor, vulnerable to poor harvests and epidemic disease.',
      [
        'Widespread home ownership and free university education.',
        'Six-hour workdays with guaranteed state pensions.',
        'Complete economic equality across all social classes.',
      ],
      'em_l9_10',
    ),

    // Mastery Challenge (11-20)
    q(
      'Why did the 1689 Bill of Rights and the 1701 Act of Settlement strictly bar Roman Catholics from ever inheriting the British Crown?',
      'To prevent a return to absolute divine-right monarchy and align the Crown permanently with Protestant constitutional rule.',
      'Having deposed James II, Parliament ensured that the monarch must always be in communion with the Protestant Church of England, a law that remains in force today.',
      [
        'Because the Pope refused to recognize the British pound as currency.',
        'To force the British monarch to marry French Catholic royalty.',
        'Because Catholics had refused to pay taxes on land ownership.',
      ],
      'em_l9_11',
    ),
    q(
      "How did the 1723 'Black Act' demonstrate the class bias of Britain's 18th-century ruling elite?",
      "It made poaching deer, fishing in private rivers, or disguising one's face in the woods capital crimes punishable by public hanging.",
      'Wealthy landowners criminalized traditional peasant foraging and hunting rights to protect their private game estates and enclosed woodlands.',
      [
        'It abolished all private property ownership for aristocrats.',
        'It made it illegal for wealthy nobles to purchase land in London.',
        'It required all MPs to give half their income to the rural poor.',
      ],
      'em_l9_12',
    ),
    q(
      'What major public health crisis gripped London between 1720 and 1751, prompting Parliament to pass the Gin Acts?',
      "The 'Gin Craze'",
      'Cheap, unregulated grain spirits flooded London, leading to widespread alcoholism, rising crime rates, and soaring infant mortality in overcrowded slums like St Giles.',
      ['The Great Plague of London', 'The London Cholera Epidemic', 'The Black Death Resurgence'],
      'em_l9_13',
    ),
    q(
      "What was the nature of British political power between 1714 and 1760, known by historians as the 'Whig Oligarchy'?",
      'A tight clique of wealthy aristocrats and landed gentry who controlled Parliament through royal patronage, family connections, and pocket boroughs.',
      "Although Britain was celebrated as 'free' compared to France, genuine power was held by fewer than 200 noble families who owned most of the kingdom's land.",
      [
        'A direct democracy where all adult citizens voted weekly in open forums.',
        'A military dictatorship governed solely by army generals.',
        'A socialist republic that redistributed wealth from aristocrats to peasants.',
      ],
      'em_l9_14',
    ),
    q(
      'How did the Jacobite Risings (notably 1715 and 1745) challenge the political settlement of early modern Britain?',
      'They sought to restore the exiled Catholic Stuart dynasty (Bonnie Prince Charlie) to the throne, threatening Protestant parliamentary rule.',
      'The 1745 uprising reached Derby before retreating; its defeat at Culloden (1746) led to the brutal pacification of the Scottish Highlands by British redcoats.',
      [
        'They demanded the abolition of the British navy.',
        'They were led by American colonists demanding independence.',
        'They sought to unite Britain with the Spanish Empire.',
      ],
      'em_l9_15',
    ),
    q(
      'What was the global economic reality of Britain by 1750 compared to its position in 1450?',
      "In 1450 Britain was an impoverished outpost on Europe's edge; by 1750 it was the financial, naval, and commercial epicenter of a worldwide empire.",
      'The shift of global trade from the Mediterranean to the Atlantic placed Britain at the very center of maritime commerce, poised on the brink of the Industrial Revolution.',
      [
        'Britain had lost all its overseas territories and returned to isolation.',
        'Britain had become completely dependent on agricultural aid from China.',
        "Britain's population had declined by 50% due to ongoing civil wars.",
      ],
      'em_l9_16',
    ),
    q(
      "What was the fundamental limitation of the 'liberty' celebrated by 18th-century British writers and politicians?",
      'British liberty was exclusively enjoyed by wealthy property-owning men, while being actively denied to women, the working class, and millions of enslaved Africans.',
      "The same nation that sang 'Rule, Britannia! Britons never will be slaves' was the world's greatest trafficker of enslaved human beings across the Atlantic.",
      [
        'British citizens were forbidden from criticizing the King in private.',
        'Parliament was dissolved every year and had no permanent authority.',
        'No books or newspapers were legally permitted to be published in England.',
      ],
      'em_l9_17',
    ),
    q(
      "Why did the British state establish the 'Bloody Code' during an era of unprecedented imperial and commercial expansion?",
      'Rapid urbanization and wealth inequality eroded traditional village social controls, leading the wealthy to rely on terror and capital punishment to protect private property.',
      'Without a professional police force, the ruling class used public hangings at Tyburn as theatrical spectacles to terrorize the destitute into respecting aristocratic property.',
      [
        'The King personally hated the poor and ordered mass executions for pleasure.',
        'It was required by an international treaty signed with European kingdoms.',
        'Crime had been completely eliminated, so only minor offenses remained.',
      ],
      'em_l9_18',
    ),
    q(
      'How did the growth of consumerism in Britain between 1700 and 1750 directly connect ordinary domestic households with imperial violence abroad?',
      'Daily domestic rituals—sweetening tea with Jamaican sugar, smoking Virginia tobacco, wearing Indian cotton—were sustained entirely by enslaved and colonial labour.',
      'Every sip of sweetened tea in an English parlor linked British families directly to the whip, the boiling house, and the atrocities of Caribbean chattel slavery.',
      [
        'Consumers were required to serve one year aboard a slave vessel to buy goods.',
        'All colonial goods were smuggled into Britain illegally without government knowledge.',
        'British families were legally forbidden from consuming domestic agricultural produce.',
      ],
      'em_l9_19',
    ),
    q(
      "According to the final historical verdict, how 'modern' was Britain by 1750?",
      'Britain possessed modern financial, parliamentary, and naval structures, but remained an aristocratic, oligarchic society deeply entrenched in violent colonial exploitation and domestic inequality.',
      'It stood at the threshold of the modern world: constitutionally advanced compared to European autocracies, but morally compromised by its imperial foundations.',
      [
        'Britain was fully modern with universal democracy and total civil rights for all citizens.',
        'Britain had made zero progress since 1450 and remained completely medieval in every respect.',
        'Britain was an anarchic society with no laws, government, or economic system.',
      ],
      'em_l9_20',
    ),
  ],
};

async function run() {
  const dataJsPath = path.join(__dirname, '..', 'units', 'early_modern_world', 'data.js');
  const mod = await import(require('url').pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  console.log('Injecting 20-question 4-act calibrated quizzes into early_modern_world...');

  unitData.lessons.forEach((l, idx) => {
    const quiz = LESSON_QUIZZES[l.id];
    if (!quiz) {
      throw new Error(`Missing quiz for lesson ID: ${l.id}`);
    }
    if (quiz.length !== 20) {
      throw new Error(`Quiz for ${l.id} has ${quiz.length} questions instead of 20!`);
    }
    l.quiz = quiz;
    console.log(`✅ Lesson ${idx + 1} (${l.id}) updated: 20 questions (10 Core, 10 Mastery).`);
  });

  const fileContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\nexport default unitData;\n`;
  fs.writeFileSync(dataJsPath, fileContent, 'utf8');
  console.log('Saved updated early_modern_world/data.js.');

  execSync(`node --check "${dataJsPath}"`, { stdio: 'inherit' });
  console.log('✅ Syntax check passed.');
}

run().catch((err) => {
  console.error('❌ Error updating early_modern_world quizzes:', err);
  process.exit(1);
});
