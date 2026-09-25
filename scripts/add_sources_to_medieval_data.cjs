/**
 * scripts/add_sources_to_medieval_data.cjs
 * Safely adds MEDIEVAL_LEFT_SOURCES to scripts/medieval_england_textbook_data.cjs
 */

const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'medieval_england_textbook_data.cjs');
let content = fs.readFileSync(dataFile, 'utf8');

const leftSources = {
  p2: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Primary Monastic Chronicle',
      date: 'Written c. 1066–1067',
      title: 'The Anglo-Saxon Chronicle: The Calamity at Hastings',
      text: '"Then Count William came from Normandy into Pevensey... and as soon as they were fit, made a castle at Hastings port. This was made known to King Harold, and he gathered a great army, and came to meet him at the hoary apple tree. And William came against him unawares, before his people were set in order. But the king nevertheless firmly fought against him... There was slain King Harold, and Leofwine the earl, and Gyrth the earl; and the French had possession of the place of slaughter."',
      context:
        'Recorded by English monks shortly after the battle, capturing the shock and despair of the defeated Anglo-Saxon population.',
      hingeQuestion:
        'Why did the Saxon chronicler emphasize that William attacked "unawares, before his people were set in order"?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Visual Forensic Artifact',
      date: 'Commissioned c. 1070s',
      title: 'The Bayeux Tapestry: The Saxon Shield Wall at Senlac Hill',
      image: '/images/battle_of_hastings_bayeux.jpg',
      text: '"Here the English and French fight together in battle: Anglo-Saxon housecarls stand shoulder-to-shoulder behind locked limewood shields, cutting down charging Norman cavalry with two-handed Danish battleaxes while arrows shatter on shields."',
      context:
        'Embroidered in colored wool on linen, commissioned by Bishop Odo of Bayeux to commemorate the Norman victory while honoring Saxon valour.',
      hingeQuestion:
        'How does the tapestry illustrate the formidable defensive strength of the Anglo-Saxon shield wall before it broke?',
    },
  },
  p4: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Primary Forensic Architecture',
      date: 'Constructed late 11th Century',
      title: 'Portchester Castle Keep: The Norman Stone Bastion',
      image: '/images/portchester_castle.jpg',
      text: '"Constructed in the corner of a former Roman Saxon Shore fort on Portsmouth Harbour, the massive limestone keep of Portchester Castle dominated the southern coastline, securing the sea lanes back to Normandy and intimidating the surrounding Hampshire countryside."',
      context:
        'A prime example of Norman military architecture, combining defensive isolation with sweeping administrative control.',
      hingeQuestion:
        'Why were coastal castles like Portchester vital for William’s ability to rule both England and Normandy simultaneously?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Monastic Chronicle',
      date: 'Written c. 1110–1125',
      title: 'Orderic Vitalis: The Harrying of the North',
      text: '"Nowhere else had William shown such cruelty. In his anger he commanded that all crops, herds, chattels, and food of every kind should be brought together and burned with fire, so that the whole of the north should be stripped of all means of survival. More than 100,000 human beings died of hunger... I can find no words to praise a ruler who caused so many to perish of hunger."',
      context:
        'Written by an Anglo-Norman monk of Saint-Évroul, whose mixed English-Norman heritage gave him a unique moral perspective on Norman brutality.',
      hingeQuestion:
        'Why did Orderic Vitalis—a loyal churchman—break with official Norman propaganda to condemn the Harrying as a monstrous sin?',
    },
  },
  p6: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Primary Diplomatic Dispatch',
      date: 'May 1166 • French Exile',
      title: 'Thomas Becket’s Admonition to King Henry II',
      text: '"You are my king, you are my lord, you are my spiritual son... The Church of God consists of two orders: the clergy and the people. Kings receive their power from the Church, not the Church from kings. You have no authority to judge the anointed priests of the Almighty, nor to impose your secular customs upon the bride of Christ."',
      context:
        'Written by Becket from exile at the Cistercian Abbey of Pontigny in France, asserting the absolute supremacy of spiritual law over secular royal courts.',
      hingeQuestion:
        'How did Becket’s claim that "kings receive their power from the Church" directly challenge Henry II’s royal prerogative?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Eyewitness Chronicle',
      date: '29 December 1170',
      title: 'Edward Grim: The Confrontation in Canterbury Cathedral',
      text: '"The four knights rushed into the church with drawn swords, shouting: "Where is Thomas Becket, traitor to the king?" The Archbishop stepped forward, saying: "Here I am, no traitor, but a priest of God." When they seized his cloak, he pulled away, shouting: "Touch me not, Reginald, you pimp! You owe me fealty!" Then they struck him upon the crown of the head, and his brains were scattered on the altar steps."',
      context:
        'Written by a visiting Cambridge clerk who stood beside Becket during the attack, sustaining a broken arm while shielding the Archbishop.',
      hingeQuestion:
        'How does Edward Grim’s eyewitness account portray Becket as a courageous martyr rather than a frightened victim?',
    },
  },
  p8: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Monastic Chronicle',
      date: 'Written c. 1214–1215',
      title: 'Roger of Wendover: Baronial Fury against King John',
      text: '"King John was a tyrant rather than a king, a destroyer rather than a governor. He oppressed his own people, seized the inheritances of his barons, and demanded enormous sums of money for their relief. He laid heavy scutages upon the knights, demanded their sons as hostages, and violated the ancient liberties granted by King Henry I. The nobility would endure his intolerable yoke no longer."',
      context:
        'Written by a monk at St Albans Abbey, reflecting the widespread aristocratic outrage that culminated in the May 1215 baronial rebellion.',
      hingeQuestion:
        'Which specific royal abuses described in Source A were targeted most aggressively by the clauses of Magna Carta?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Diplomatic Annal',
      date: '27 July 1214',
      title: 'The Battle of Bouvines: The Ruin of King John’s Hopes',
      text: '"At Bouvines in Flanders, the French king Philip Augustus engaged the combined forces of the Emperor Otto, the Count of Flanders, and King John’s English knights. By evening, the imperial allies were utterly broken and their leaders captured. When news reached John in Poitou, he threw himself upon his bed, weeping that since he had lost Normandy, fortune had deserted him in everything."',
      context:
        'From the Chronicle of the Kings of France, detailing the decisive battle that destroyed John’s military prestige and triggered Magna Carta.',
      hingeQuestion:
        'Why did a military defeat in northern France immediately provoke an armed baronial rebellion in England?',
    },
  },
  p10: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Primary Manorial Record',
      date: 'Compiled c. 1300',
      title: 'Custumal of the Manor of Battle Abbey: Feudal Services',
      text: '"Every villein who holds a virgate of thirty acres must do two days of week-work every week from Michaelmas to Lammas, ploughing and harrowing the lord’s demesne with his own oxen. At harvest time, he must provide three men to reap the lord’s corn for four days. He may not sell his horse or marry his daughter without the lord’s license, and must pay three pence for pannage of his swine."',
      context:
        'From an official manor roll recording the exact unfree labor obligations owed by serf families to the Benedictine monks of Battle Abbey.',
      hingeQuestion:
        'How does this manorial custumal demonstrate that feudal serfdom was fundamentally an economic system of compulsory labor?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Primary Ecclesiastical Statute',
      date: 'Promulgated c. 1287',
      title: 'Statutes of the Diocese of Exeter: Enforcement of Tithes',
      text: '"We strictly command all parishioners under pain of greater excommunication that they faithfully render unto their parish church the full tenth sheaf of all corn, the tenth fleece of wool, the tenth piglet, and the tenth penny earned by craft or trade. Let no man presume to deduct his expenses before paying God his share, lest his crops be blighted and his soul damned to eternal fire."',
      context:
        'Issued by Bishop Peter Quivel of Exeter, warning peasant villagers that withholding tithes from the Church was a mortal sin against God.',
      hingeQuestion:
        'Why did the medieval Catholic Church use threats of "eternal fire" to enforce what was essentially a civil agricultural tax?',
    },
  },
  p12: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Primary Royal Statute',
      date: 'Promulgated June 1351',
      title: 'The Statute of Labourers: King Edward III',
      text: '"Because that a great part of the people, and especially of workmen and servants, late died of the pestilence, many seeing the necessity of masters and great scarcity of servants, will not serve unless they may receive double or triple the wages they were wont to take... We have ordained that every workman shall be bounden to serve, receiving only the wages accustomed in the twentieth year of our reign."',
      context:
        'Enacted by Parliament in Westminster to prevent surviving peasants from exploiting the post-plague labor shortage to demand higher wages.',
      hingeQuestion:
        'Why were the royal penalties of the Statute of Labourers largely ineffective against the economic reality of supply and demand?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Monastic Chronicle',
      date: 'Written c. 1350',
      title: 'Henry Knighton: The Devastation of Leicestershire',
      text: '"In that year there was a great mortality of men throughout the whole world... Sheep and cattle wandered through fields and among crops, and there was none to drive them or herd them; for lack of servants, wheat rotted in the rain. So great was the scarcity of priests that many churches were left desolate without divine service... A worker who could previously be hired for two pence now refused to work for less than five pence."',
      context:
        'Written by an Augustinian canon at Leicester Abbey, documenting the immediate agricultural collapse and peasant empowerment.',
      hingeQuestion:
        'How does Knighton’s description show that the Black Death damaged the authority of both manorial lords and the Catholic Church?',
    },
  },
  p14: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Contemporary Monastic Chronicle',
      date: 'Written c. 1381–1385',
      title: 'The Anonimalle Chronicle: The Outbreak at Fobbing',
      text: '"On the morrow of the Holy Trinity, John Bampton, justice of the king, sat at Brentwood to inquire into the Poll Tax of the hundred of Barstable. The men of Fobbing came before him and said they would not pay a penny more, for they had already paid their tax and held their acquittance. When Bampton threatened them with prison, they drew their bows and threw stones at him, so that he fled for his life back to London."',
      context:
        'Written in Anglo-Norman French by a monk at St Mary’s Abbey, York, preserving the earliest eyewitness account of the 1381 uprising.',
      hingeQuestion:
        'Why did the aggressive methods of royal tax commissioners trigger immediate armed rebellion in Essex villages?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Radical Sermon Excerpt',
      date: 'Preached 12 June 1381',
      title: 'John Ball’s Sermon at Blackheath: Universal Equality',
      text: '"Ah, ye good people, matters goeth not well to pass in England, nor shall not do till everything be common, and that there be no villeins nor gentlemen, but that we may be all united together, and that the lords be no greater masters than we be. When Adam delved and Eve span, who was then the gentleman? From the beginning all men by nature were created alike, and our bondage came in by the unjust oppression of naughty men."',
      context:
        'Recorded in the Chronicles of Jean Froissart; preached to 60,000 peasants camped at Blackheath before they marched into London.',
      hingeQuestion:
        'Why was John Ball’s sermon considered an act of catastrophic religious heresy and treason by medieval authorities?',
    },
  },
  p16: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Primary Eyewitness Dispatch',
      date: 'Written Autumn 1483',
      title: 'Dominic Mancini: The Disappearance of the Princes',
      text: '"All the attendants who had served the young king Edward V were forbidden his presence... He and his little brother Richard were withdrawn into the inner apartments of the Tower day by day, and through the bars and windows could be seen less and less, until they ceased to be seen altogether. Already there were suspicion and whispers among the people that they had been done away with; and men wept openly in the streets of London."',
      context:
        'Written by an Italian cleric visiting London during Richard III’s usurpation, offering an objective eyewitness report devoid of Tudor bias.',
      hingeQuestion:
        'How did the disappearance of the Princes in the Tower fatally undermine Richard III’s moral legitimacy as king?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Contemporary Monastic Chronicle',
      date: 'Palm Sunday 1461',
      title: 'The Crowland Chronicle: The Bloodbath at Towton',
      text: '"On the day of the Passion of our Lord, the armies of York and Lancaster met in the fields near Towton in Yorkshire. A blinding blizzard of snow blew directly into the faces of the Lancastrians, so that their archers could not see their targets. The slaughter continued without pity for ten hours; the waters of the Cock Beck ran thick with red blood, and the bodies of twenty-eight thousand Christian Englishmen lay unburied upon the snow."',
      context:
        'From the second continuation of the Crowland Abbey Chronicle, recording the horrific human cost of bastard feudalism and civil war.',
      hingeQuestion:
        'Why does the chronicler specifically emphasize that "twenty-eight thousand Christian Englishmen lay unburied"?',
    },
  },
  p18: {
    sourceA: {
      badge: 'SOURCE A',
      type: 'Primary Feudal Oath',
      date: 'August 1086 • Salisbury Plain',
      title: 'The Anglo-Saxon Chronicle: The Oath of Salisbury',
      text: '"After this King William came to Salisbury, and there came to him all his witan, and all the landowning men of property from all over England, whosesoever men they were. And they all submitted to him, and became his men, and swore oaths of fealty to him, that they would be faithful to him against all other men without exception."',
      context:
        'Recording the historic gathering where William forced every significant tenant to swear primary allegiance directly to the Crown.',
      hingeQuestion:
        'How did the Oath of Salisbury establish the principle that loyalty to the King outweighed loyalty to any individual feudal lord?',
    },
    sourceB: {
      badge: 'SOURCE B',
      type: 'Primary Legal Treatise',
      date: 'Written c. 1235',
      title: 'Henry de Bracton: On the Laws and Customs of England',
      text: '"The King must not be under man, but under God and under the law, because law makes the King (<em>lex facit regem</em>). Let him therefore bestow upon the law what the law bestows upon him, namely rule and power. For there is no King where will rules and not law... If the King is unbridled, his barons and the people must put a bridle upon him."',
      context:
        'Written by a royal justice of King Henry III, providing the classical legal definition of limited, lawful English monarchy.',
      hingeQuestion:
        'How does Bracton’s maxim "law makes the King" contrast with the idea of unchecked Divine Right absolutism?',
    },
  },
};

content = content.replace(
  'module.exports = {',
  'const MEDIEVAL_LEFT_SOURCES = ' +
    JSON.stringify(leftSources, null, 2) +
    ';\n\nmodule.exports = {\n  MEDIEVAL_LEFT_SOURCES,',
);

fs.writeFileSync(dataFile, content, 'utf8');
console.log('Successfully injected MEDIEVAL_LEFT_SOURCES into', dataFile);
