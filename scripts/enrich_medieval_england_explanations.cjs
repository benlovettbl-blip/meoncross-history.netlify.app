const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const dataJsPath = path.join(__dirname, '..', 'units', 'medieval_england', 'data.js');

// 180 tailored 2-sentence historian explanations for Medieval England
const explanations = {
  // Lesson 0: Anglo-Saxon England & The 1066 Succession Crisis (20 Qs)
  '0.0':
    'The 11th century spanned the years 1001 to 1100, witnessing the momentous Norman Conquest of 1066. This era fundamentally reshaped English language, culture, landownership, and royal governance.',
  0.1: 'The Anglo-Saxons were Germanic peoples who settled in England following the collapse of Roman rule in the 5th century. By 1066, they had established a sophisticated, prosperous Christian kingdom with developed administrative shires.',
  0.2: 'In medieval villages, the parish church stood as the physical and spiritual focal point of community life. Beyond daily religious services, it hosted village meetings, safe storage for grain, and celebrated holy festivals.',
  0.3: "An heir presumptive or apparent is the designated successor entitled to inherit the royal crown upon the reigning monarch's death. The absence of a recognized biological heir in 1066 triggered a catastrophic multi-claimant succession crisis.",
  0.4: 'King Edward the Confessor ruled England from 1042 until his death in January 1066. His deeply pious nature and failure to father an heir left the English crown vulnerable to rival domestic and foreign claimants.',
  0.5: "The Witan (or Witenagemot) was the royal assembly of leading Anglo-Saxon earls, thegns, and bishops who advised the king. Following Edward's death, the Witan exercised its customary constitutional authority by electing Harold Godwinson as king.",
  0.6: 'Norse Vikings raided and colonized parts of northern and eastern England from the late 8th century onward, establishing the Danelaw. In 1066, Norwegian King Harald Hardrada launched a major invasion to reclaim the English throne.',
  0.7: "Normandy is a duchy situated in northern France along the English Channel, founded by Viking Norsemen under Rollo in 911. Duke William utilized Normandy's formidable knightly cavalry and shipbuilding yards to launch his cross-channel invasion.",
  0.8: "Claiming the throne meant formally presenting legal, dynastic, or oath-bound arguments justifying one's right to royal power. In 1066, four different leaders asserted competing legitimate claims to rule England.",
  0.9: "A power vacuum emerges when central political leadership collapses abruptly without an unchallenged successor. Edward the Confessor's death created an immediate power vacuum that plunged northwest Europe into war.",
  '0.10':
    'Harold Godwinson was the Earl of Wessex and the richest, most influential Anglo-Saxon nobleman in the realm. The Witan chose him because he possessed military experience and native English noble backing.',
  0.11: 'Harald Hardrada, King of Norway, was legendary across Europe as a ferocious warrior and veteran of the Byzantine Varangian Guard. He claimed the English throne based on a prior treaty agreed between King Harthacnut and King Magnus of Norway.',
  0.12: "Duke William maintained that during Edward the Confessor's Norman exile, the childless king had personally promised him the succession. William regarded Harold Godwinson's coronation as an illegal usurpation of this sacred promise.",
  0.13: "Harold's housecarls and fyrd had just marched 190 miles south to London in five days immediately after fighting a bloody battle at Stamford Bridge. This grueling forced march left the Anglo-Saxon infantry physically depleted before Hastings.",
  0.14: 'The Anglo-Saxon army locked their heavy wooden, leather-rimmed shields together atop Senlac Hill to form an impenetrable shield wall. This defensive wall repeatedly repelled Norman infantry and cavalry charges for several hours.',
  0.15: 'Seeing rumors of his death panic his men, William removed his helmet to rally his cavalry and ordered feigned retreats. By pretending to flee, the Normans lured undisciplined English militia down the hill, breaking their protective shield wall.',
  0.16: 'Tradition and the Bayeux Tapestry portray King Harold meeting his death after being struck in the eye by a Norman arrow. Deprived of their charismatic leader, the remaining Anglo-Saxon shield wall broke and fled into the woods.',
  0.17: "The Bayeux Tapestry is a 70-meter-long embroidered cloth commissioned by William's half-brother, Bishop Odo of Bayeux, around 1077. It offers an invaluable contemporary Norman perspective on the events leading to the conquest.",
  0.18: "Edward the Confessor's failure to produce an undisputed heir broke the dynastic line of the House of Wessex. His death directly ignited the invasion of Harald Hardrada and Duke William, forever ending Anglo-Saxon rule.",
  0.19: "While Harold's army fought strictly on foot with battleaxes and spears, William brought heavily armored mounted knights and massed archers. Combined-arms coordination between archers and cavalry ultimately gave William the tactical victory.",

  // Lesson 1: The Three Battles of 1066 & Norman Consolidation (20 Qs)
  '1.0':
    'Harold Godwinson claimed that on his deathbed on 5 January 1066, Edward the Confessor had reached out and entrusted the protection of England to him. The Witan confirmed this transfer of authority the following morning.',
  1.1: "Harald Hardrada's claim rested on an agreement made in 1038 between Danish King Harthacnut and King Magnus of Norway, stating that if either died childless, the other would inherit their realm. Hardrada declared that this treaty applied to England.",
  1.2: "William insisted that around 1064, Harold Godwinson was shipwrecked in Ponthieu and swore a holy oath over sacred relics to support William's claim to England. Breaking this oath rendered Harold an apostate and perjurer in the eyes of the Church.",
  1.3: "Learning that Hardrada and Harold's renegade brother Tostig had invaded Yorkshire, King Harold marched his elite housecarls 190 miles north in four days. He caught the Viking army completely by surprise at Stamford Bridge.",
  1.4: 'Harold Godwinson achieved a crushing tactical victory at Stamford Bridge on 25 September 1066, killing both Harald Hardrada and Tostig Godwinson. The Viking slaughter was so total that only 24 of the 300 invasion ships were needed to carry survivors home.',
  1.5: "Having marched north to defeat Hardrada, Harold had to force-march his battered army 250 miles south to meet William's invasion fleet in Sussex. His exhausted soldiers had no time to rest or properly muster regional southern fyrds.",
  1.6: "Taking advantage of southerly winds that shifted on 27 September, William's fleet sailed across the Channel and landed unopposed at Pevensey Bay in Sussex. They immediately fortified the Roman ruins of Pevensey Castle and raided surrounding farmland.",
  1.7: 'Pope Alexander II granted William a papal banner and consecrated ring, officially declaring the invasion a holy crusade against a perjured oath-breaker. This papal sanction attracted mercenaries and aristocratic volunteers from across France and Flanders.',
  1.8: "The Battle of Hastings was fought on 14 October 1066 at Senlac Hill, lasting an unusually long nine hours. William's eventual victory ended five centuries of Anglo-Saxon dominance and began Norman rule.",
  1.9: "The year 1066 remains the most famous date in British history, witnessing three major battles: Fulford (20 Sept), Stamford Bridge (25 Sept), and Hastings (14 Oct). This whirlwind of military violence replaced England's entire ruling class.",
  '1.10':
    'The motte was a large artificial earth mound ranging from 20 to 100 feet in height, topped with a wooden palisade and keep. It provided a commanding defensive vantage point against local Anglo-Saxon insurgencies.',
  1.11: 'The bailey was an enclosed, fortified courtyard situated at the base of the motte, surrounded by a deep ditch and palisade. It housed stables, workshops, barracks, storehouses, and livestock needed by the garrison.',
  1.12: 'Motte-and-bailey castles could be constructed by forced Anglo-Saxon peasant labour in as little as two to three weeks using earth and timber. They allowed a tiny Norman occupying minority to maintain military control over a hostile native population.',
  1.13: 'The Harrying of the North took place during the harsh winter of 1069–1070 in retaliation for persistent northern rebellions and Danish invasions. William methodically destroyed Yorkshire and neighboring counties to ensure they could never rise again.',
  1.14: "William's knights burned villages, slaughtered livestock, salted agricultural fields, and destroyed food stores across the north. Contemporary chronicler Orderic Vitalis recorded that over 100,000 people died of famine, with reports of cannibalism.",
  1.15: 'The Norman invaders introduced Anglo-Norman French as the official language of the court, aristocracy, and legal system, while Latin remained the language of the Church. Native Old English was demoted to the vernacular of illiterate peasants.',
  1.16: 'The Domesday Book of 1086 was a comprehensive inquest that recorded who held every manor in England, its taxable value, tenant populations, livestock, and woodlands. It allowed William to extract maximum taxation and military service.',
  1.17: "The Anglo-Saxons called the survey 'Domesday' because its verdicts on landownership and tax obligations were as absolute and inescapable as the Day of Judgement. No appeal against the king's commissioners was permitted.",
  1.18: 'Under the feudal hierarchy, knights held manors (fiefs) from barons in return for a contracted term of military service (usually 40 days per year). This system supplied the Norman monarchy with a permanent, standing strike force of cavalry.',
  1.19: 'William declared that by right of conquest, all land in England belonged exclusively to the Crown. He confiscated estates from Anglo-Saxon thegns and redistributed them to approximately 200 Norman tenants-in-chief on conditions of feudal loyalty.',

  // Lesson 2: Castles, Domesday & Henry II / Becket Clash (20 Qs)
  '2.0':
    'Duke William of Normandy defeated Harold Godwinson at Hastings and was crowned King of England at Westminster Abbey on Christmas Day 1066. His victory earned him the historic title William the Conqueror.',
  2.1: 'The Normans constructed over 500 motte-and-bailey earthwork castles in the decades following 1066. These prefabricated fortresses could be erected rapidly to secure strategic river crossings, Roman roads, and defiant towns.',
  2.2: 'The motte was a steep, circular earth mound, often surrounded by a ditch, requiring immense manual labor to pile up soil and rock. Atop the motte stood a wooden lookout tower that served as the final redoubt if the bailey fell.',
  2.3: 'William carried out the Harrying of the North with merciless brutality, systematically burning crops, destroying farming implements, and slaughtering herds. It left wide tracts of northern England desolate for generations, as reflected in Domesday records.',
  2.4: "Commissioned at Gloucester at Christmas 1085, the Domesday Book assessed England's taxable capacity following the threat of a Danish invasion. It ensured the King knew exactly how much tax each tenant-in-chief owed to the royal treasury.",
  2.5: 'King Harald Hardrada of Norway was struck in the throat by an arrow and killed during the Battle of Stamford Bridge. His defeat permanently ended Scandinavian attempts to conquer and rule the English kingdom.',
  2.6: 'The initial castles built by Norman conquerors were constructed entirely from wood and earthen ramparts for speed of construction. Only after securing regional control did the Normans rebuild them in permanent stone, like the Tower of London.',
  2.7: 'The bailey was the lower enclosed compound connected to the motte by a wooden drawbridge or steep stairway. It served as the bustling nerve center of castle life, containing granaries, kitchens, smithies, and barracks.',
  2.8: 'Feudalism was a reciprocal socio-political hierarchy where the King granted land (fiefs) to tenants-in-chief in exchange for military service and fealty. The barons in turn sub-let land to knights, who ruled over the unfree peasant workforce.',
  2.9: "Medieval chroniclers like Orderic Vitalis estimated that over 100,000 northern Englishmen perished from starvation and exposure during the Harrying of the North. Entire villages remained uninhabited 'waste' decades later in 1086.",
  '2.10':
    'Henry II resented Church courts because they claimed exclusive jurisdiction over clergy, preventing royal judges from executing common law punishments. Church courts could not impose the death penalty, often giving light penances for serious crimes.',
  2.11: "Before Becket's elevation to the church hierarchy, he served as Henry II's brilliant Chancellor, close confidant, and extravagant companion. Henry assumed that appointing his best friend would give him total royal control over the Church.",
  2.12: 'Upon becoming Archbishop of Canterbury in 1162, Becket underwent an astonishing spiritual conversion, adopting an ascetic lifestyle of fasting and prayer. He discarded his fine silks for a rough horsehair shirt crawling with lice to demonstrate holy piety.',
  2.13: "In 1164, Henry II issued the Constitutions of Clarendon, attempting to force Church clerks accused of felonies to be tried and punished in royal courts. Becket refused to sign the constitutions, insisting on the Church's total independence from royal control.",
  2.14: "Fearing royal imprisonment and treason charges, Becket fled to France in disguise in 1164 and lived in monastic exile for six years under King Louis VII's protection. The dispute paralyzed diplomatic relations between England, France, and the Papacy.",
  2.15: "Upon returning to England in December 1170, Becket immediately published papal bulls excommunicating the Archbishop of York and two other bishops who had officiated at the coronation of Henry's son. This deliberate defiance enraged Henry II.",
  2.16: "Hearing of Becket's excommunications while at his court in Normandy, Henry flew into a violent rage and shouted words to the effect of: 'What miserable drones and traitors have I nurtured that will allow their lord to be treated with such contempt by a low-born cleric?'",
  2.17: "Four royal knights interpreted Henry's outburst as a royal command, rode to Canterbury, and hacked Becket to death inside the cathedral on 29 December 1170. His brain was spilled across the stone pavement near the altar of St. Benedict.",
  2.18: "Following his martyr's death, reports of miraculous healings transformed Becket's tomb into one of the wealthiest and most visited pilgrimage destinations in Christendom. Geoffrey Chaucer's 'Canterbury Tales' was later set on this famous pilgrimage.",
  2.19: "Faced with papal excommunication and widespread public horror, Henry II walked barefoot through the streets of Canterbury in July 1174, dressed in sackcloth. He knelt at Becket's shrine and allowed the cathedral monks to scour his bare back with rods.",

  // Lesson 3: Common Law, Church Courts & Magna Carta (20 Qs)
  '3.0':
    'King Henry II (reigned 1154–1189) transformed English governance by creating the Common Law system, sending itinerant royal judges on circuit to administer standard justice across all shires. This replaced local feudal customs with uniform law.',
  3.1: 'Henry II appointed his royal chancellor Thomas Becket as Archbishop of Canterbury in 1162, hoping to unify royal and ecclesiastical authority. Instead, Becket fiercely defended Church autonomy against royal encroachment.',
  3.2: "Henry II and Becket clashed primarily over the legal privilege of 'benefit of clergy', which shielded clergymen from royal criminal courts. Henry argued that criminous clerks guilty of murder or robbery escaped proper secular punishment.",
  3.3: 'On 29 December 1170, four royal knights—Reginald FitzUrse, Hugh de Moreville, William de Tracy, and Richard le Breton—hacked Becket to death in Canterbury Cathedral. The murder shocked all of Christian Europe and made Becket an international martyr.',
  3.4: 'Pope Alexander III threatened England with an interdict and excommunication of Henry II, forcing the King to renounce the controversial Constitutions of Clarendon. The Church retained the right to try its own clerks in ecclesiastical courts.',
  3.5: "William the Conqueror's decisive victory at Hastings secured the English crown for the Norman dynasty. He instituted a thorough replacement of the Anglo-Saxon ruling elite with continental barons.",
  3.6: 'The Domesday Book of 1086 provided William I with an exhaustive statistical audit of all taxable estates, ploughlands, woodland, and mill revenue in the kingdom. It cemented royal fiscal control over the aristocracy.',
  3.7: "A 'criminous clerk' was an ordained priest, deacon, or lower cleric accused of committing serious secular crimes such as murder, theft, or rape. Because they claimed benefit of clergy, they could only be tried in lenient Church courts.",
  3.8: 'Henry II walked barefoot through Canterbury in July 1174, fasted on bread and water, and submitted to public flogging by Canterbury monks. This dramatic act of penance repaired his damaged royal prestige and lifted papal sanctions.',
  3.9: 'A motte-and-bailey castle consisted of a raised earthen mound (motte) carrying a wooden tower, alongside an attached fortified yard (bailey). It was the primary instrument of rapid Norman military subjugation.',
  '3.10':
    "Between 1202 and 1204, French King Philip Augustus defeated King John's forces and confiscated the ancestral duchy of Normandy, Maine, and Anjou. Losing Normandy dealt a catastrophic blow to John's prestige and treasury.",
  3.11: "King John was nicknamed 'Lackland' because as the youngest of Henry II's sons, he originally received no substantial continental estates. Later in his reign, his critics mockingly revived the name after he lost Normandy to the French.",
  3.12: 'To finance his expensive military campaigns to reclaim lost French territories, John levied arbitrary scutage (shield money) payments eleven times in sixteen years. These excessive financial exactions alienated his leading barons.',
  3.13: 'During an intense dispute over the appointment of Stephen Langton as Archbishop of Canterbury, Pope Innocent III placed England under an interdict in 1208 and excommunicated John in 1209. Church bells fell silent and dead bodies were buried in unhallowed ditches.',
  3.14: 'On 15 June 1215, rebel barons assembled in arms and confronted King John at Runnymede meadow near Windsor Castle. John was compelled to attach the Great Seal to the 63 clauses of Magna Carta.',
  3.15: "'Magna Carta' is Latin for 'The Great Charter', so named to distinguish it from the smaller Charter of the Forest issued shortly after. It became the foundational document of English constitutional liberties.",
  3.16: "Clause 39 of Magna Carta famously declared: 'No free man shall be seized or imprisoned... except by the lawful judgement of his equals or by the law of the land.' This clause established the right to due process and trial by jury.",
  3.17: 'Magna Carta was drafted primarily by and for wealthy barons, knights, and free burgesses, offering almost no legal protections to unfree serfs (villeins). Villeins remained subject to the arbitrary authority of their feudal manorial courts.',
  3.18: 'Within weeks of sealing Magna Carta, King John appealed to Pope Innocent III, who issued a papal bull declaring the charter null, void, and shameful because it was extracted under armed duress. John promptly renounced his promises.',
  3.19: "John's repudiation of Magna Carta triggered the First Barons' War (1215–1217), with rebel barons offering the English crown to Prince Louis of France. The war ended only after John's sudden death from dysentery in October 1216.",

  // Lesson 4: Everyday Life in a Medieval Village & The Church (20 Qs)
  '4.0':
    "Over 90% of England's medieval population lived in agrarian rural villages, labouring on manorial estates to produce food. Towns were small and housed only a tiny mercantile and administrative minority.",
  4.1: "A villein was an unfree peasant bound to the lord's manor, required to perform heavy labor services (week-work and boon-work) on the lord's demesne land. In return, they held small strips of land in the open fields to feed their families.",
  4.2: "Under manorial law, villeins could not leave the estate, marry, educate their sons for the priesthood, or sell livestock without paying a fine and receiving the lord's explicit consent. They lacked freedom of movement.",
  4.3: 'Peasant dwellings were simple single-room huts constructed from timber frames, woven hazel branches (wattle), and daubed with mud, clay, and animal dung. A central open hearth vented smoke through a thatch roof.',
  4.4: 'During freezing winter months, peasant families brought their oxen, pigs, and sheep inside the hut behind a low partition. The shared body heat of the livestock was essential to keep the family from freezing to death.',
  4.5: 'Peasant life was entirely governed by the agricultural calendar and daylight hours, moving from plowing and sowing in spring to weeding in summer and harvesting in autumn. Harsh winters were spent threshing grain and repairing tools.',
  4.6: 'The late summer harvest (August–September) was the most critical moment of the year, requiring every man, woman, and child to gather wheat, rye, and barley before autumn rains rotted the crops. A ruined harvest meant famine.',
  4.7: 'The tithe was a mandatory ecclesiastical tax requiring every parishioner to surrender one-tenth of their annual agricultural produce, wool, and livestock to the parish church. The grain was stored in massive manorial tithe barns.',
  4.8: 'The Roman Catholic Church exerted total control over medieval spiritual life, worldview, and moral behavior. The Church was the sole authority explaining the universe, salvation, sin, and the afterlife.',
  4.9: "Peasants paid tithes religiously because they genuinely believed that refusing to support the Church would doom their souls to eternal torment in Hell. Priests warned that crop failures and illnesses were God's punishment for withholding tithes.",
  '4.10':
    'A Doom Painting was a colossal fresco painted directly onto the church wall above the chancel arch, illustrating the Last Judgement. It presented a vivid, terrifying visualization of Christ judging the saved and the damned.',
  4.11: 'Because almost all medieval peasants were illiterate and church services were conducted in Latin, the Church relied on visual art, stained glass, and wall paintings to teach scripture. Doom Paintings warned parishioners of the consequences of sin.',
  4.12: 'In Doom Paintings, righteous and obedient Christians were depicted dressed in white, being escorted by benevolent angels through the golden gates of the Heavenly Jerusalem. Christ sat enthroned on a rainbow above.',
  4.13: 'Sinners were shown naked, bound in iron chains, and being pitchforked by grotesque, fanged demons into the flaming mouth of Hell (the Hellmouth). Among the damned, painters frequently included dishonest millers, alewives, and corrupt bishops.',
  4.14: 'Purgatory was believed to be an intermediate spiritual realm where souls destined for Heaven underwent agonizing, purifying fire to atone for unconfessed venial sins. Medieval Catholics believed time in Purgatory could last centuries.',
  4.15: 'The Church taught that peasants could reduce their time in Purgatory by purchasing indulgences, paying for soul-masses, obeying parish priests, and going on pilgrimages to saintly shrines. This generated vast revenue for the Church.',
  4.16: 'The parish church was the sole stone structure in most medieval villages, standing as a physical sanctuary and communal hub. In addition to daily Mass, churchyards served as community markets and celebration grounds on saint days.',
  4.17: 'Peasants slaughtered most of their cattle and pigs in late autumn (November) because they could not afford to feed them on scarce hay during winter. Meat was heavily salted or smoked to preserve it for winter consumption.',
  4.18: 'Medieval agriculture had very low yields and virtually no surplus storage from year to year. A single cold, wet summer that destroyed the harvest caused widespread starvation, nutritional diseases, and child mortality across the village.',
  4.19: 'Peasant huts were built using wattle-and-daub—woven wooden lattices smeared with a paste of wet soil, clay, straw, and cow dung. Floors were beaten earth strewn with reeds and rushes that harbored pests.',

  // Lesson 5: Magna Carta & Arrival of the Black Death (20 Qs)
  '5.0':
    "King John (reigned 1199–1216) suffered disastrous military defeats against French King Philip Augustus, losing Normandy, Maine, and Anjou by 1204. These catastrophic losses earned him the derisive nickname 'John Softsword'.",
  5.1: "English chroniclers mockingly called King John 'Softsword' due to his military failures on the continent and inability to protect his ancestral lands in France. It contrasted sharply with his brother Richard the Lionheart's military reputation.",
  5.2: 'The English barons rebelled because John imposed extortionate scutage taxes, abused feudal wardships, and imprisoned noble opponents without fair trials to pay for his wars. His arbitrary financial tyranny pushed the nobility to take up arms.',
  5.3: 'On 15 June 1215, the rebel barons forced King John to grant Magna Carta at Runnymede meadow near Windsor Castle. The charter set legal limits on royal prerogative and established that monarchs must rule according to law.',
  5.4: 'The enduring significance of Magna Carta was the constitutional principle that the law is supreme over the monarch. It established that even the King is bound by legal rules and cannot govern arbitrarily.',
  5.5: 'Thomas Becket was assassinated inside Canterbury Cathedral on 29 December 1170 by four overzealous knights of Henry II. His death caused a European-wide scandal that forced Henry to abandon his legal campaign against Church courts.',
  5.6: 'Excommunication was an ecclesiastical sanction that cut off an individual from the Catholic Church, barring them from sacraments, burial in consecrated ground, and church services. For a king, it released subjects from their feudal oaths of obedience.',
  5.7: 'William the Conqueror introduced motte-and-bailey fortifications to England immediately after landing at Pevensey in September 1066. These earthwork castles could be constructed in a matter of weeks to enforce military dominance.',
  5.8: "The Harrying of the North in the winter of 1069–1070 was William's scorched-earth response to northern rebellions. Norman troops salted fields, burned crops, and slaughtered herds, causing widespread famine that depopulated the region.",
  5.9: "Henry II sought to eliminate 'benefit of clergy', which allowed priests and clerks accused of serious felonies to avoid royal criminal courts. Henry demanded that criminous clerks be tried and punished under the common law of the land.",
  '5.10':
    'The Black Death arrived in England in June 1348 via merchant trade ships docking at the Dorset port of Melcombe Regis (Weymouth). Carried by black rats and fleas on board ship grain, the epidemic spread rapidly along trade routes to London.',
  5.11: 'A bubo is an agonizingly tender, inflamed lymph node that swells to the size of an apple in the groin, armpit, or neck. It was the hallmark clinical symptom of bubonic plague, caused by the bacterium Yersinia pestis.',
  5.12: "Desperate medieval healers attempted bizarre folk cures, including strapping plucked live chickens or toads to buboes to 'draw out the venom', or burning aromatic wood. Without knowledge of bacteria, none of these remedies worked.",
  5.13: "'Miasma theory' was the prevailing medieval medical belief that infectious diseases were caused by breathing 'bad air' or noxious vapors arising from rotting organic matter and swamps. Doctors carried sweet-smelling herbs to ward off miasma.",
  5.14: "Flagellants were bands of religious zealots who walked through European towns whipping themselves with iron-tipped leather scourges to appease God's wrath. They believed voluntary suffering would earn divine mercy and halt the pestilence.",
  5.15: 'Killing between one-third and one-half of the population, the Black Death created an unprecedented national shortage of agricultural laborers. Empty manors and unharvested fields left surviving peasants in an extraordinary position of bargaining power.',
  5.16: 'Recognizing that their labor was desperately needed to prevent harvest collapse, surviving peasants demanded double or triple their pre-plague wages. Many threatened to leave their home manors unless their lords granted freedom and cash wages.',
  5.17: "In 1351, King Edward III's landowner-dominated Parliament passed the Statute of Labourers, ordering that agricultural wages be frozen at 1346 pre-plague rates and penalizing peasants who broke labor contracts. The law caused intense working-class resentment.",
  5.18: 'Faced with labor shortages, feudal lords were forced to commute traditional unpaid labor services into cash wages and let villeins rent land as free tenants. The rigid feudal hierarchy was fatally undermined as peasants gained economic leverage.',
  5.19: 'Because holy prayers and church rituals proved entirely powerless to halt the plague, and thousands of priests abandoned their parishes or died of infection, popular confidence in the clergy was severely shaken. This disillusionment helped spawn early reform movements like the Lollards.',

  // Lesson 6: The Black Death, Poll Tax & Peasants' Revolt (20 Qs)
  '6.0':
    'The Black Death first struck England in the summer of 1348 at Melcombe Regis (Dorset), having originated in Central Asia and swept across Mediterranean trade routes. It decimated English communities over the next eighteen months.',
  6.1: "Demographic historians estimate that the Black Death killed roughly one-third to one-half of England's population, reducing it from roughly 4–5 million to under 2.5 million. Entire villages were wiped out or permanently abandoned.",
  6.2: 'Buboes were painful, dark, pus-filled swellings that appeared in the lymph nodes of the groin, neck, and armpits within days of flea bites. If the infection entered the bloodstream (septicemic plague) or lungs (pneumonic plague), death was almost 100% certain.',
  6.3: 'Medieval medicine lacked any knowledge of germ theory or microscopic bacteria, which were not discovered until the 19th century. Doctors relied on ancient Greek humoral theory, bleeding patients and burning herbs to little effect.',
  6.4: "In the deeply religious medieval worldview, the pandemic was universally interpreted as a divine retribution sent by an angry God to punish humanity's sins. Communities organized penitential processions and prayed for divine forgiveness.",
  6.5: 'Magna Carta was sealed by King John at Runnymede in June 1215 under pressure from armed rebel barons. It established that royal power was subject to law and protected noble liberties from arbitrary monarchical abuse.',
  6.6: 'Thomas Becket was murdered in Canterbury Cathedral on 29 December 1170 by four knights after defying King Henry II over the jurisdiction of Church courts. His murder shocked Europe and made his shrine the premier pilgrimage site in England.',
  6.7: 'King John levied eleven scutage taxes in sixteen years to pay for mercenary armies and failed military campaigns in France. This extortionate fiscal pressure was the primary catalyst for the baronial rebellion of 1215.',
  6.8: 'The Domesday Book of 1086 was an exhaustive land survey commissioned by William the Conqueror to record the wealth and landholders of England. It enabled the Crown to assess tax yields and feudal obligations with total precision.',
  6.9: 'King Harold Godwinson won the Battle of Stamford Bridge on 25 September 1066, routing the Viking invasion of Harald Hardrada. However, the victory was followed just weeks later by his fatal defeat at Hastings.',
  '6.10':
    'The Poll Tax of 1380 was deeply hated because it levied an identical flat rate of three groats (12 pence) on every person over fifteen, regardless of wealth. This meant impoverished serfs paid the exact same tax as wealthy aristocrats.',
  6.11: 'John Ball was a radical priest who had been repeatedly excommunicated and imprisoned for preaching revolutionary sermons against Church wealth and feudal inequality. He was freed by Kentish rebels from Maidstone prison in June 1381.',
  6.12: "John Ball popularized the rhyming couplet: 'When Adam delved and Eve span, who was then the gentleman?', arguing that social rank and serfdom had no basis in God's initial creation. His message ignited widespread peasant rebellion.",
  6.13: "Upon entering London on 13 June 1381, the rebel army burned John of Gaunt's magnificent Savoy Palace, threw tax records into bonfires, and opened the Fleet and Marshalsea prisons. They executed royal tax collectors but prohibited looting.",
  6.14: 'On 14 June, rebels breached the Tower of London and executed Simon of Sudbury, Archbishop of Canterbury and Chancellor, alongside Sir Robert Hales, the Lord Treasurer. Their severed heads were paraded on pikes across London Bridge.',
  6.15: "King Richard II was only 14 years old when the Peasants' Revolt broke out in June 1381. Surrounded by terrified councilors, the young king showed remarkable composure during face-to-face negotiations with the rebels.",
  6.16: 'On 15 June 1381, Richard II agreed to meet Wat Tyler and thousands of armed rebels at Smithfield, outside the London city walls. Tyler rode forward alone to present his sweeping demands for the abolition of serfdom.',
  6.17: 'Wat Tyler demanded the total abolition of serfdom and feudal dues, freedom of contract for all laborers, the confiscation and redistribution of Church lands, and a single legal system across England. It was the most radical social manifesto of the Middle Ages.',
  6.18: "During the tense meeting, Tyler insolently spat on the ground and rinsed his mouth before the King, provoking an altercation with royal escorts. William Walworth, the Mayor of London, drew his cutlass and fatally slashed Tyler's neck.",
  6.19: "As the rebel mob drew their bows to avenge Tyler's death, 14-year-old Richard II courageously spurred his horse forward and shouted: 'I am your King and captain! Follow me!' He led them into the open fields of Clerkenwell, defusing the immediate violence.",

  // Lesson 7: Wars of the Roses & The End of the Middle Ages (20 Qs)
  '7.0':
    'The Wars of the Roses (1455–1487) was a series of intermittent civil wars fought for control of the English throne between rival cadet branches of the royal House of Plantagenet. The conflict ended the Plantagenet dynasty.',
  7.1: 'The conflict pitted the House of Lancaster (descendants of John of Gaunt, third son of Edward III) against the House of York (descendants of Lionel of Antwerp and Edmund of Langley). Both houses claimed legitimate hereditary succession.',
  7.2: "The red rose of Lancaster became an enduring heraldic symbol of the Lancastrian faction, later popularized by Tudor propaganda and William Shakespeare's historical plays. In reality, Lancastrian kings often used the swan or antelope as badges.",
  7.3: "The white rose of York was the personal heraldic badge adopted by Richard, Duke of York, and his son King Edward IV. It gave the civil conflict its romanticized 19th-century name, 'The Wars of the Roses'.",
  7.4: 'The civil wars erupted primarily due to the mental incapacity and political weakness of Lancastrian King Henry VI, who suffered bouts of catatonic mental illness. Powerful nobles exploited his weakness, sparking violent private feuds.',
  7.5: "Under the incompetent rule of Henry VI, England lost virtually all its continental possessions won by Henry V in the Hundred Years' War, retaining only Calais by 1453. Returning defeated soldiers and angry barons destabilized domestic politics.",
  7.6: 'The Yorkist King Edward IV died unexpectedly in April 1483 at the age of 40, leaving his 12-year-old son Edward V to inherit the throne under the regency of his uncle, Richard of Gloucester. This sparked a sudden constitutional crisis.',
  7.7: "Richard, Duke of Gloucester, was the younger brother of Edward IV and had served loyally as Lord of the North. Upon Edward IV's death, he acted swiftly to seize physical custody of young Edward V from the boy's maternal Woodville relatives.",
  7.8: 'Richard of Gloucester placed 12-year-old Edward V and his younger brother, 9-year-old Richard of Shrewsbury, Duke of York, in royal apartments within the Tower of London, ostensibly to prepare for the coronation. The Tower was both a royal palace and fortress.',
  7.9: 'By late summer 1483, the two young princes had vanished completely from public view and were never seen alive again. Rumors quickly spread across England and Europe that their uncle had ordered them secretly murdered.',
  '7.10':
    "In June 1483, Richard declared that Edward IV's marriage to Elizabeth Woodville was invalid due to a pre-contract, rendering the princes illegitimate. Parliament passed the Titulus Regius, and Richard was crowned as King Richard III.",
  7.11: "The mysterious disappearance and presumed murder of the innocent Princes in the Tower alienated moderate Yorkist nobles and poisoned Richard III's reputation. It provided Lancastrian exile Henry Tudor with broad aristocratic support.",
  7.12: "Fought on 22 August 1485 in Leicestershire, the Battle of Bosworth Field was the climactic engagement of the Wars of the Roses. Henry Tudor's invasion force defeated the royal army of Richard III, founding the Tudor dynasty.",
  7.13: 'The Battle of Bosworth took place on 22 August 1485. It marked the violent overthrow of the Yorkist monarchy and the birth of the early modern Tudor state under King Henry VII.',
  7.14: 'Henry Tudor, Earl of Richmond, was an exiled Welsh nobleman with a tenuous Lancastrian claim to the throne through his mother, Margaret Beaufort. He sailed from France with French and Scottish mercenaries to challenge Richard III.',
  7.15: "During the battle, the powerful Stanley family and the Earl of Northumberland held their large contingents in reserve, refusing to assist Richard III. Lord Thomas Stanley finally charged into the fray on Henry Tudor's flank, sealing the King's defeat.",
  7.16: "Richard III was the last English monarch to die in battle, personally leading a desperate cavalry charge into Henry Tudor's bodyguard before being surrounded and cut down. His lost skeleton was famously rediscovered beneath a Leicester car park in 2012.",
  7.17: "Following Richard's death on the battlefield, Lord Stanley retrieved the fallen king's crown from a thorn bush and placed it upon Henry Tudor's head, proclaiming him King Henry VII. Henry ruled for 24 years, establishing the Tudor dynasty.",
  7.18: 'To unite the warring factions, Henry VII married Elizabeth of York, eldest daughter of King Edward IV. He combined the red rose of Lancaster and white rose of York into the iconic Tudor Rose, symbolizing national reconciliation.',
  7.19: 'Historians generally consider the Battle of Bosworth Field in 1485 to mark the transition from the medieval period to the early modern era in England. It ended feudal instability and inaugurated the centralized administrative monarchy of the Tudors.',

  // Lesson 8: Synoptic Review of Medieval England (20 Qs)
  '8.0':
    "The Battle of Hastings on 14 October 1066 decisively replaced Anglo-Saxon royal leadership with the Norman dynasty. It began a comprehensive transformation of England's land tenure, architecture, aristocracy, and language.",
  8.1: 'William the Conqueror built over 500 wooden motte-and-bailey fortresses across England to suppress native insurrections and house garrisoned cavalry. Their rapid construction enabled a tiny Norman minority to police a hostile countryside.',
  8.2: "The Harrying of the North (1069–1070) was William I's systematic campaign of starvation and scorched-earth warfare to crush northern revolts. The resulting devastation depopulated Yorkshire for decades, leaving over 100,000 dead.",
  8.3: 'The Norman Feudal System established that all land in England belonged directly to the Crown by right of conquest. The King leased land (fiefs) to tenants-in-chief in exchange for military service and financial taxes.',
  8.4: 'In return for immense landed estates (fiefs), tenants-in-chief were bound to provide the King with a specified quota of fully armed, mounted knights for 40 days of annual military duty. They also paid feudal dues and attended the royal court.',
  8.5: 'Commissioned at Christmas 1085, the Domesday Book surveyed every landholding in England, detailing tenants, livestock, mills, and annual revenue. It gave William total fiscal oversight of his kingdom and maximized tax collection.',
  8.6: 'Archbishop Thomas Becket was murdered in Canterbury Cathedral in December 1170 by four knights loyal to Henry II following disputes over Church court privileges. His death made him a global martyr and forced the King to do public penance.',
  8.7: 'Papal excommunication cut an individual off from all Church sacraments, holy communion, and Christian burial. Applied to a monarch, it released all vassals and subjects from their sacred oaths of feudal fealty, encouraging rebellion.',
  8.8: 'In June 1215, armed rebel barons forced King John to grant Magna Carta at Runnymede meadow near Windsor. The charter established that royal prerogative was subject to customary law and prevented arbitrary monarchical taxation.',
  8.9: 'Clause 39 of Magna Carta established the foundational constitutional principle of habeas corpus and due process of law: no free man could be imprisoned or dispossessed without lawful trial by his peers. It remains in English law today.',
  '8.10':
    "Clause 61 of Magna Carta, known as the 'Security Clause', created a standing council of 25 barons with the legal right to seize royal castles and lands if the King broke his promises. It was the institutional precursor to parliamentary oversight.",
  8.11: 'The Black Death struck England in 1348, carried by fleas on black rats arriving on merchant ships from Gascony. It wiped out between 30% and 50% of the entire population within two years, causing a massive societal shock.',
  8.12: 'The acute labor shortage caused by the Black Death inverted the economic balance of power, allowing surviving agricultural peasants to demand significantly higher wages and better terms. Lords were forced to compete for scarce workers.',
  8.13: 'The Statute of Labourers of 1351 was an emergency royal law attempting to freeze wages at 1346 pre-plague levels and punish mobile workers who broke contracts. The law failed in practice and fueled deep peasant resentment.',
  8.14: 'The Poll Tax of 1380 required every person over fifteen to pay a flat fee of three groats (12 pence) regardless of wealth. This regressive tax fell disproportionately on impoverished rural peasants, sparking the 1381 revolt in Essex and Kent.',
  8.15: 'Wat Tyler led thousands of armed Kentish and Essex rebels into London in June 1381, capturing the Tower and presenting demands directly to King Richard II. He was assassinated by the Mayor of London at Smithfield.',
  8.16: "Radical priest John Ball provided the theological justification for the Peasants' Revolt, preaching that social inequality and serfdom were artificial human corruptions absent from God's original creation. He was executed after the revolt failed.",
  8.17: "King Richard II was only 14 years old when he defused the Peasants' Revolt at Smithfield after Wat Tyler was slain. He promised to be the rebels' captain, but later revoked all royal charters of freedom and crushed the rebellion.",
  8.18: 'Despite the violent suppression of the 1381 revolt, the economic reality of labor scarcity steadily made serfdom unviable. Over the 15th century, landlords converted labor dues into cash rents, transforming serfs into free wage-earning tenant farmers.',
  8.19: "Medieval English kings were never absolute rulers; they were strictly constrained by the feudal baronage's military force, the universal moral and legal jurisdiction of the Catholic Church, and the necessity of parliamentary consent for taxes.",
};

(async () => {
  try {
    const fileUrl = pathToFileURL(dataJsPath).href;
    const mod = await import(fileUrl);
    const unitData = mod.default || mod.unitData || mod.medieval_england;

    if (!unitData || !unitData.lessons) {
      console.error('❌ Failed to load Medieval England unit data.');
      process.exit(1);
    }

    let enrichedCount = 0;
    unitData.lessons.forEach((lesson, lIdx) => {
      if (!lesson.quiz) return;
      lesson.quiz.forEach((q, qIdx) => {
        const key = `${lIdx}.${qIdx}`;
        const expl = explanations[key];
        if (expl) {
          q.explanation = expl;
          enrichedCount++;
        } else {
          console.warn(
            `⚠️ Missing explanation for Medieval England question ${key}: ${q.q || q.question}`,
          );
        }
      });
    });

    const updatedCode = `const medieval_england = ${JSON.stringify(unitData, null, 2)};\n\nexport const unitData = medieval_england;\nexport default medieval_england;\n`;

    fs.writeFileSync(dataJsPath, updatedCode, 'utf8');
    console.log(
      `\n🎉 Successfully injected ${enrichedCount} historian explanations into units/medieval_england/data.js!`,
    );
  } catch (err) {
    console.error('❌ Error updating Medieval England data:', err);
    process.exit(1);
  }
})();
