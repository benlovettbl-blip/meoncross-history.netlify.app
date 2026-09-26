/**
 * medieval_england_spotlights_and_matrices.cjs
 * Canonical Master Textbook Pedagogical Modules for KS3 Medieval England (1066–1485)
 *
 * Provides:
 * 1. CONCEPT_SPOTLIGHTS: Disciplinary concept boxes for Recto (Right) pages in Act 4.
 * 2. LEFT_ANALYTICAL_MATRICES: Dual-concept comparison cards for Verso (Left) pages in Act 2.
 */

const CONCEPT_SPOTLIGHTS = {
  p3: {
    tag: 'TACTICAL MECHANISM: THE SHIELD WALL',
    category: 'BATTLEFIELD CAUSATION • 14 OCTOBER 1066',
    title: 'The Feigned Retreat: Breaking the Anglo-Saxon Shield Wall',
    body: "The Anglo-Saxon shield wall was an impenetrable defensive phalanx when intact, but possessed zero tactical mobility. When Duke William ordered his Norman cavalry to charge and deliberately simulate a panicked flight, the undisciplined Saxon fyrd broke formation on the ridgeline to pursue them down Senlac Hill. By drawing the defenders into the marshy valley, the Norman heavy cavalry wheeled around, encircled the scattered infantry, and cut them to pieces. This tactical breakthrough exposed King Harold's core housecarl bodyguard, transforming a defensive stalemate into a catastrophic Saxon rout.",
    takeaway:
      'Key Historical Insight: The Battle of Hastings was decided not by superior Norman bravery, but by the tactical flexibility of combined arms exploiting the rigid immobility of the shield wall.',
  },
  p5: {
    tag: 'INSTITUTIONAL MECHANISM: FEUDAL TENURE',
    category: 'ANGLO-NORMAN LAND LAW • 1086',
    title: 'Subinfeudation: Land in Return for Military Service',
    body: 'William the Conqueror confiscated all 20,000 manors in England, claiming total sovereign ownership of the entire kingdom by right of conquest. Under the feudal pyramid, he granted immense estates (fiefs) to roughly 200 Norman tenants-in-chief in exchange for an unalterable quota of armed knights (knight service). These barons subinfeudated parcels to under-tenants, who in turn extracted compulsory agricultural labor from Saxon serfs. Through the Oath of Salisbury in August 1086, William ensured that every landholder swore primary allegiance directly to the King, legally establishing that no lord could command his knights to rebel against the Crown.',
    takeaway:
      'Key Historical Insight: Feudal tenure transformed England from a decentralized collection of earldoms into the most centralized military and fiscal state in Western Europe.',
  },
  p7: {
    tag: 'JURISDICTIONAL CONFLICT: DUAL LEGAL SYSTEMS',
    category: 'CANON LAW VS COMMON LAW • 1164',
    title: 'Benefit of Clergy & The Constitutions of Clarendon',
    body: 'In the 12th century, ordained churchmen accused of serious crimes—including murder, theft, and rape—claimed "benefit of clergy," removing their cases from harsh royal justice into lenient ecclesiastical courts. Under canon law, church courts could not shed blood; convicted murderers were merely defrocked, fined, or sent to monastic penance. Henry II’s 1164 Constitutions of Clarendon demanded that defrocked clerics be handed over to secular royal judges for hanging. Becket rejected this as double jeopardy ("God does not judge twice for the same offense"), precipitating a mortal constitutional struggle over whether the Crown or Rome held supreme judicial sovereignty in England.',
    takeaway:
      'Key Historical Insight: The Becket dispute was not a petty personal squabble, but a foundational constitutional collision between international papal sovereignty and the nascent English nation-state.',
  },
  p9: {
    tag: 'CONSTITUTIONAL TURNING POINT: RULE OF LAW',
    category: 'THE RUNNYMEDE CHARTER • JUNE 1215',
    title: 'Clause 39 & The Invention of Due Process',
    body: 'The most enduring provision of Magna Carta was Clause 39: "No free man shall be seized or imprisoned, or stripped of his rights, except by the lawful judgment of his equals or by the law of the land." King John had routinely imprisoned political rivals without indictment, seized baronial lands without trial, and sold justice to the highest bidder. While the 1215 charter primarily protected the property of twenty-five rebel barons, Clause 39 established the radical constitutional principle that royal power was subordinate to the law. In later centuries, this clause evolved into trial by jury, habeas corpus, and universal constitutional liberty.',
    takeaway:
      'Key Historical Insight: Magna Carta began as an elitist baronial treaty, but permanently bound the English monarchy to the principle of institutional restraint and due process.',
  },
  p11: {
    tag: 'AGRARIAN SYSTEM: MANORIAL ECONOMY',
    category: 'MEDIEVAL SERFDOM & STRIP FARMING',
    title: 'The Open-Field System & The Manorial Court Roll',
    body: "Peasant village agriculture relied on three vast open fields farmed in scattered half-acre strips, ensuring no single family held only fertile or waterlogged soil. Crops were rotated annually between wheat, barley, and fallow to restore soil fertility. Every peasant was bound to the manorial court, where the lord's bailiff enforced compulsory labor services (corvée), collected marriage fines (merchet), and punished encroachments. However, court rolls prove that peasants were not passive victims; villagers used the sworn manorial jury to negotiate custom, protect communal pasture rights, and sue neighbors for boundary disputes.",
    takeaway:
      'Key Historical Insight: The medieval manor was simultaneously a harsh system of feudal exploitation and a cooperative community sustained by rigid communal consensus.',
  },
  p13: {
    tag: 'EPIDEMIOLOGICAL SHOCK: CAUSAL ETIOLOGY',
    category: 'MEDIEVAL MEDICINE & DEMOGRAPHY • 1348',
    title: 'Miasma, Astrology & Divine Wrath: Explaining Pestilence',
    body: "Without germ theory, medieval society explained the arrival of the Black Death through three prevailing frameworks: corrupted air (miasma), celestial alignment, and divine punishment. Doctors believed malodorous vapours from rotting corpses, swamps, and earthquakes unbalanced the bodily humours, prompting people to carry posies of aromatic herbs. Astrologers blamed a planetary conjunction of Saturn, Jupiter, and Mars in Aquarius. Devout Christians viewed the epidemic as God's retribution for human vanity, sparking extremist Flagellant movements who marched through towns whipping themselves with iron-tipped cords to appease divine fury.",
    takeaway:
      'Key Historical Insight: The total failure of Church prayers and Galenic medicine to halt the Black Death severely cracked medieval blind faith in traditional institutional authorities.',
  },
  p15: {
    tag: 'POLITICAL CATALYST: FISCAL EXTORTION',
    category: 'THE 1381 MARCH ON LONDON',
    title: 'The Three Poll Taxes & The Demand for Freedom',
    body: "Between 1377 and 1380, the royal government levied three unprecedented Poll Taxes to finance the Hundred Years' War. Unlike taxes on property, the 1380 Poll Tax was a flat regressive charge of twelve pence on every person over fifteen—equating to two weeks' wages for poor laborers. Across the southeast, communities concealed 450,000 taxpayers in massive tax evasion. When royal commissioners used coercive enforcement, rebellion exploded. Led by Wat Tyler and radical priest John Ball, 60,000 peasants marched on London demanding the complete abolition of serfdom and equality under the law.",
    takeaway:
      "Key Historical Insight: The Peasants' Revolt proved that the post-plague English peasantry understood statutory law and would not tolerate feudal re-enslavement by an extractive aristocracy.",
  },
  p17: {
    tag: 'STRUCTURAL MECHANISM: BASTARD FEUDALISM',
    category: 'DYNASTIC COLLAPSE • 1455–1485',
    title: 'Livery and Maintenance: Private Noble Armies',
    body: 'The dynastic bloodbath of the Wars of the Roses was driven by "bastard feudalism"—a late medieval corruption of traditional land tenure. Instead of granting land in exchange for military service, wealthy magnates like the Earl of Warwick ("The Kingmaker") paid annual cash retaining fees (indentures) to hundreds of gentry. In return, retainers wore the lord\'s heraldic livery badge and fought in his private army. Through "maintenance," magnates illegally bribed and intimidated judges and juries to protect their retainers from criminal prosecution. With weak kings incapable of enforcing royal justice, England fractured into warring private armed factions.',
    takeaway:
      "Key Historical Insight: Bastard feudalism privatized military violence, proving that monarchy collapses whenever private aristocratic wealth overpowers the Crown's monopoly on justice.",
  },
};

const LEFT_ANALYTICAL_MATRICES = {
  p2: {
    header: 'THE FOUR CLAIMANTS TO THE ENGLISH THRONE (1066)',
    items: [
      {
        title: 'Harold Godwinson (Earl of Wessex)',
        text: 'Claimed deathbed nomination by Edward; supported by the Saxon Witan; commanded veteran housecarl infantry.',
      },
      {
        title: 'William, Duke of Normandy',
        text: "Claimed prior promise by Edward in 1051 and Harold's sacred oath; backed by papal crusade banner; cavalry.",
      },
      {
        title: 'Harald Hardrada (King of Norway)',
        text: 'Claimed secret 1038 agreement with King Harthacnut; backed by Tostig; veteran Viking berserker fleet.',
      },
      {
        title: 'Edgar the Atheling',
        text: 'True biological great-nephew of Edward; direct House of Wessex royal bloodline; bypassed due to youth and lack of armies.',
      },
    ],
  },
  p4: {
    header: 'MECHANISMS OF SUBJUGATION: CASTLES VS THE DOMESDAY AUDIT',
    items: [
      {
        title: 'Motte-and-Bailey Castles (Physical Terror)',
        text: 'Constructed within 8 days using forced Saxon labor. Provided permanent military garrisons to dominate strategic river crossings and crush revolts.',
      },
      {
        title: 'The Domesday Survey (Bureaucratic Audit)',
        text: 'Comprehensive assessment of national wealth and tax dues. Eliminated Saxon tax exemptions and legally bound every tenant to royal fiscal control.',
      },
    ],
  },
  p6: {
    header: "DUAL JURISDICTIONS: KING'S COMMON LAW VS PAPAL CANON LAW",
    items: [
      {
        title: 'Royal Courts (King Henry II)',
        text: 'Administered by itinerant royal justices. Secular penalties: execution, hanging, and land forfeiture. Centralized state sovereignty across England.',
      },
      {
        title: 'Ecclesiastical Courts (Archbishop Becket)',
        text: 'Administered under Roman canon law. Bloodless penalties: defrocking, fines, and penance. Created "benefit of clergy" for criminous clerks.',
      },
    ],
  },
  p8: {
    header: 'THE STRUGGLE OVER RUNNYMEDE: BARONIAL DEMANDS VS ROYAL PREROGATIVE',
    items: [
      {
        title: 'The Baronial Demands (1215)',
        text: 'Demanded fixed limits on feudal inheritance fines (relief), an end to arbitrary scutage taxes, and protection against arbitrary royal imprisonment.',
      },
      {
        title: 'King John & The Papacy',
        text: 'John surrendered England to Pope Innocent III as a papal fief to secure papal annulment; declared Magna Carta illegal and extracted civil war.',
      },
    ],
  },
  p10: {
    header: 'THE THREE ESTATES OF MEDIEVAL SOCIETY (TRIPARTITE ORDER)',
    items: [
      {
        title: 'Bellatores (Those Who Fight)',
        text: 'Feudal nobility (barons, knights); held land in exchange for military knight service.',
      },
      {
        title: 'Oratores (Those Who Pray)',
        text: 'Catholic clergy (bishops, monks); held spiritual monopoly on salvation and tithes.',
      },
      {
        title: 'Laboratores (Those Who Work)',
        text: 'Peasant majority (villeins, serfs); bound to compulsory agricultural corvée labour.',
      },
    ],
  },
  p12: {
    header: 'SOCIOECONOMIC IMPACT OF THE BLACK DEATH (1348–1351)',
    items: [
      {
        title: 'Demographic Collapse & Labor Scarcity',
        text: "Between 35% and 50% of England's population died. Surviving agricultural laborers demanded double or triple wages, abandoning feudal estates.",
      },
      {
        title: "The Landlords' Legislative Backlash",
        text: 'Parliament enacted the 1351 Statute of Labourers, freezing wages at 1346 levels and outlawing peasant travel, sparking furious class hostility.',
      },
    ],
  },
  p14: {
    header: 'RADICAL DEMANDS OF THE 1381 REBELS AT MILE END & SMITHFIELD',
    items: [
      {
        title: 'Abolition of Feudal Serfdom',
        text: 'Wat Tyler demanded that all men in England be free from bondage, that land rents be capped at 4 pence per acre, and all manor rolls burned.',
      },
      {
        title: 'Eradication of Church Hierarchy',
        text: 'John Ball demanded the confiscation of all monastic estates, the division of Church wealth among peasants, and only one bishop in England.',
      },
    ],
  },
  p16: {
    header: 'THE RIVAL HOUSES: LANCASTER VS YORK (1455–1485)',
    items: [
      {
        title: 'The House of Lancaster (Red Rose)',
        text: "Descendants of John of Gaunt (Henry IV, V, VI). Beset by Henry VI's mental catatonia and disastrous military losses in France.",
      },
      {
        title: 'The House of York (White Rose)',
        text: 'Descendants of Lionel of Antwerp and Edmund of Langley (Richard Duke of York, Edward IV, Richard III). Claimed superior hereditary legitimacy.',
      },
    ],
  },
};

module.exports = { CONCEPT_SPOTLIGHTS, LEFT_ANALYTICAL_MATRICES };
