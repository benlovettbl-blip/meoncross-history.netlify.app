/**
 * medieval_england_paragraph_enrichments.cjs
 * Canonical Master Textbook PEEL Paragraph Density Enrichments for KS3 Medieval England (1066–1485)
 *
 * Provides:
 * PARAGRAPH_ENRICHMENTS: Calibrated paragraph text for Enquiries 1-8 to guarantee
 * 0px overflow and <= 35px internal prose gap (100% OPTIMAL) across all 20 pages.
 */

const PARAGRAPH_ENRICHMENTS = {
  // Enquiry 1: P2 (OPTIMAL 21px), P3 (OPTIMAL 29px)
  1: {
    act3_p3:
      'The Saxon shield wall had held firm throughout the morning because the veteran housecarls maintained unbreakable tactical discipline. However, inexperienced peasant fyrdmen could not resist the temptation to chase fleeing enemies down the muddy slope. By breaking ranks, they created fatal gaps in the defensive perimeter. William immediately grasped this tactical vulnerability, ordering his cavalry commanders to repeat the retreat intentionally to dismantle the English defensive formation piecemeal and slaughter the exposed Saxon infantry in the marshy valley below.',
    act4_p2:
      'As dusk fell, King Harold was killed—struck by a fatal missile or butchered by Norman broadswords—and his faithful housecarls died fighting to the last man around his royal dragon standard. Harold had fought two massive battles in three weeks across opposite ends of England, but William’s tactical flexibility and devastating heavy cavalry sealed the Norman triumph. On Christmas Day 1066, William was crowned king in Westminster Abbey, formally extinguishing six centuries of Anglo-Saxon political dominance.',
    act4_p3:
      'William’s coronation at Westminster Abbey descended into farcical terror when nervous Norman guards mistook loud Saxon cheering inside for armed rebellion, setting fire to all the surrounding thatched houses to form a smokescreen. Yet despite the choking smoke and chaos, William had accomplished the impossible. Through extraordinary fortune with Channel weather, ruthless tactical innovation, and Saxon exhaustion, an illegitimate Norman duke had captured the wealthiest crown in Western Europe, transforming English governance and language forever.',
  },

  // Enquiry 2: P4 (OPTIMAL 28px), P5 (OPTIMAL 28px)
  2: {
    act2_p1:
      'When northern earls allied with Danish raiders in 1069, capturing the Norman garrison at York, William responded with terrifying, calculated ferocity. Determined to crush northern resistance forever, he unleashed a scorched-earth campaign known as the Harrying of the North, systematically burning agricultural villages, slaughtering all herds, and salting wheat fields across Yorkshire to ensure zero crops could grow for years.',
    act2_p2:
      'The human toll was catastrophic. Over one hundred thousand people died of starvation and winter exposure; chroniclers recorded refugees eating cats, dogs, and human flesh. Orderic Vitalis lamented that William committed a monstrous crime for which God would surely judge him. Northern England was completely broken and mounted no serious rebellion for three generations.',
    act2_p3:
      'The economic devastation was recorded sixteen years later in Domesday, where vast swathes of Yorkshire were labeled simply as wasta (wasteland). By eliminating the logistical base for invading Scandinavian fleets, ruthless terror secured what diplomacy could not, permanently subordinating the rebellious Anglo-Danish north to the centralized authority of the southern Norman Crown.',
    act4_p1:
      'William combined physical terror and administrative auditing with a revolutionary restructuring of English land tenure. Declaring that all English soil belonged exclusively to the Crown by right of conquest, William dispossessed virtually the entire Anglo-Saxon aristocracy. By 1086, over five thousand Saxon thegns were replaced by just two hundred Norman barons and bishops, who held their vast estates as feudal tenants-in-chief directly from the King in exchange for military service and knights.',
    act4_p2:
      'In return for these vast estates, barons owed the King feudal loyalty and a fixed quota of fully equipped knights for royal service. At the Oath of Salisbury in August 1086, William forced all major landholders to swear primary allegiance directly to the Crown, superseding any lordly ties. Through stone keeps, the Domesday ledger, and feudal oaths, William created the most centralized and militarily secure monarchy in medieval Europe.',
    act4_p3:
      'At the base of this feudal pyramid, English commoners suffered an immediate, permanent collapse in social status. Free Anglo-Saxon peasants were systematically reclassified as unfree serfs or villeins, bound to the lord’s estate and forbidden to leave without costly licenses. Royal justice was reserved for the French-speaking elite, while English peasants endured compulsory week-work, entrenching an aristocratic social hierarchy that endured throughout the entire Middle Ages across all English counties.',
  },

  // Enquiry 3: P6 (OPTIMAL 18px), P7 (OPTIMAL 26px)
  3: {
    act1_p2:
      'However, Henry’s legal reforms ran straight into the autonomous legal fortress of the Catholic Church. Under the ancient privilege known as "Benefit of Clergy," anyone in holy orders—which included thousands of clerks, gravediggers, and scholars—accused of felonies could only be tried in ecclesiastical courts. Church courts could never shed blood or impose the death penalty, punishing murderers and rapists with mild penances, pilgrimages, or unfrocking, directly insulting royal justice across the English shires.',
    act2_p2:
      'Instead, Becket underwent an astonishing, fanatical transformation that shocked the royal court. Upon his consecration, Becket resigned the chancellorship, discarded his silks for a coarse monk’s habit, and wore a lice-infested hairshirt. Believing he owed total allegiance to Jesus Christ and the Pope rather than his earthly king, Becket became an intransigent defender of Church autonomy, rejecting royal interference and setting up an explosive collision with his former royal benefactor.',
    act2_p3:
      'Henry felt personally betrayed by his former friend’s overnight religious zeal. When Becket adamantly refused to submit ecclesiastical courts to royal judges, Henry realized his masterstroke had backfired disastrously. The King had installed the most stubborn, theatrical, and principled defender of ecclesiastical privilege directly into the most powerful spiritual office in the realm, turning a private friendship into a catastrophic, irreconcilable constitutional conflict.',
  },

  // Enquiry 4: P8 (OPTIMAL 22px), P9 (OPTIMAL 25px)
  4: {
    act2_p2:
      'England’s nobility had reached their breaking point under John’s ceaseless extortion. In May 1215, forty rebellious northern and eastern barons took a holy oath, renounced their feudal allegiance to John, and styled themselves the "Army of God and Holy Church." When London’s wealthy merchants opened the city gates to the rebels on 17 May, John was completely cornered, cut off from his revenues, and forced to negotiate directly with his armed subjects.',
    act2_p3:
      'Archbishop Stephen Langton acted as chief mediator between the rebellious barons and the isolated Crown. Langton presented the ancient coronation charter of Henry I as a lawful precedent for limiting royal tyranny, drafting a series of reform demands known as the Articles of the Barons. Trapped in Windsor Castle without sufficient money or loyal troops to resist, John agreed to meet the baronial leaders on neutral water-meadows near the River Thames.',
    act3_p1:
      'On 15 June 1215, in the waterlogged meadow of Runnymede near Windsor Castle, King John affixed his Great Seal to Magna Carta. Consisting of sixty-three legal clauses drafted on sheepskin parchment, the charter sought to curtail royal extortion regarding feudal inheritance fines, wardships, and arbitrary taxation. Crucially, Clause 12 declared that no scutage or royal aid could be levied except by the "common counsel of the realm," giving barons a constitutional veto over Crown taxation.',
    act3_p3:
      'While the charter primarily defended aristocratic property and merchant privileges, its foundational vocabulary introduced universal legal principles. By establishing that justice could neither be sold nor denied, and that punishment required lawful trial by peers, Magna Carta struck a mortal blow against arbitrary sovereign tyranny, providing the enduring constitutional foundation for English common law, individual liberty, and modern parliamentary democracy.',
    act4_p1:
      'The barons enforced the charter through Clause 61—the radical "Security Clause"—which established an elected council of twenty-five barons with legal power to seize royal castles and possessions if John breached any clause. Infuriated by this sovereign humiliation, John immediately sent couriers to Pope Innocent III, who issued a papal bull declaring Magna Carta null, void, and shameful forever, excommunicating the rebel barons and plunging England into immediate, bloody civil war.',
    act4_p2:
      'The crisis was resolved only when John died of violent dysentery at Newark Castle in October 1216 after losing the Crown Jewels in the tidal Wash. To save the crown for John’s nine-year-old son Henry III, royal regent William Marshal reissued Magna Carta in 1216 and 1225 with papal approval. While originally designed to protect aristocratic privileges, Magna Carta established the enduring constitutional principle that royal authority is limited by law and subject to the consent of the realm.',
    act4_p3:
      'Over the following two centuries, English kings were forced to reconfirm Magna Carta more than thirty times in exchange for parliamentary taxation. What began as a selfish baronial peace treaty became the sacred touchstone of English constitutional liberty. Kings could rule as majestic sovereigns, but they could never again rule above the sovereign supremacy of the law without facing legitimate baronial resistance from the assembled realm.',
  },

  // Enquiry 5: P10 (OPTIMAL 12px), P11 (OPTIMAL 32px)
  5: {
    act3_p1:
      'Because Sunday church services were conducted entirely in Latin—a language ordinary peasants could not understand—the Church communicated its theological doctrine through vivid, terrifying visual storytelling. Medieval churches were not bare stone; their walls were covered from floor to ceiling in dazzlingly colored frescoes, stained-glass windows, and carved wooden rood screens depicting biblical history, horrific martyrdoms, and the lives of the holy saints.',
    act3_p3:
      'These vivid murals served as inescapable visual sermons for illiterate villagers. By illustrating the horrific eternal tortures awaiting sinners—from pitchfork-wielding demons skinning the deceitful to serpents gnawing the proud—Doom paintings reinforced moral codes. Every villager understood that their earthly conduct, obedience to authority, and faithful payment of tithes determined their eternal fate between heavenly paradise and demonic torment in the world to come.',
    act4_p2:
      'This pervasive spiritual anxiety reinforced the feudal social hierarchy. Peasants were taught that God had ordained the three estates of medieval society: those who fight (the nobility), those who pray (the clergy), and those who work (the peasantry). Rebelling against your manorial lord was portrayed as a mortal sin against God’s divine order, ensuring that fear of eternal damnation kept England’s agricultural majority docile and compliant for centuries.',
    act4_p3:
      'This powerful synthesis of economic obligation and spiritual dread formed the bedrock of medieval stability. As long as commoners believed that manorial lords held earthly power by divine providence and priests held the keys to eternal salvation, the feudal social order was self-policing. Not until the catastrophic biological shock of the Black Death would this ancient framework of rural obedience begin to crack and collapse under sudden labor scarcity.',
  },

  // Enquiry 6: P12 (OPTIMAL 29px), P13 (OPTIMAL 31px)
  6: {
    act2_p2:
      'The catastrophic mortality produced an unprecedented economic shockwave across the kingdom. With nearly half the agricultural workforce dead, England faced an acute, desperate shortage of human labour. Thousands of acres of ripe wheat rotted in rain-drenched fields; herds of cattle wandered unmilked across weed-choked meadows, and manorial lords faced total financial ruin. Surviving peasants suddenly realized their labor was in immense demand, transforming the balance of economic power overnight.',
    act2_p3:
      'Traditional authority fractured under the strain of sudden mortality. Monasteries lost whole communities of monks, while hundreds of parish priests abandoned their dying flocks in terror or perished administering last rites. In the countryside, surviving serfs recognized that land without labor was worthless, giving humble ploughmen unprecedented bargaining leverage over proud landlords and fatally undermining compulsory feudal serfdom.',
  },

  // Enquiry 7: P14 (OPTIMAL 35px), P15 (OPTIMAL 24px)
  7: {
    act4_p1:
      'On 15 June 1381 at Smithfield, Wat Tyler met the young King Richard II in full view of the royal retinue. Tyler boldly demanded total freedom for all Englishmen, the abolition of all game and forest laws, the confiscation and division of all Church lands among the peasantry, and the complete destruction of aristocratic hierarchy. When an altercation erupted, the Mayor of London, William Walworth, drew his cutlass and struck Tyler down.',
    act4_p2:
      'The royal retaliation was swift, brutal, and completely merciless. King Richard II and his council reneged on all promises made at Mile End and Smithfield, declaring that concessions made under duress were completely void. Royal judicial commissions toured Essex and Kent with mobile gallows, hanging over one thousand five hundred suspected rebel leaders, including John Ball, whose severed head was displayed on London Bridge as a terrifying warning to all commoners.',
    act4_p3:
      'Yet despite the bloody suppression of the rebel vanguard, the Peasants’ Revolt achieved a profound, lasting psychological victory. Parliament never dared to levy another direct poll tax for three hundred years. Shaken by the vulnerability of their London palaces and the ferocity of working-class anger, manorial lords gradually allowed villeinage to wither away, recognizing that attempting to enforce feudal serfdom risked provoking fresh, uncontrollable peasant uprisings across the realm.',
  },

  // Enquiry 8: P16 (OPTIMAL 28px), P17 (OPTIMAL 19px)
  8: {
    act4_p3:
      'The Battle of Bosworth Field on 22 August 1485 marked the definitive end of the Plantagenet dynasty and the dawn of the early modern era. Crowned King Henry VII on the battlefield, the new Tudor monarch married Elizabeth of York, uniting the warring red and white roses into the Tudor rose. Henry systematically outlawed private livery and maintenance, heavily fined unruly magnates, and established the Court of Star Chamber, ending bastard feudalism and securing the English throne.',
  },
};

module.exports = { PARAGRAPH_ENRICHMENTS };
