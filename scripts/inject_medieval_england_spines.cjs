const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'units', 'medieval_england', 'data.js');

const spinesByLessonId = {
  lesson_1: {
    title: '1066 & The Battle of Hastings: Chronology Spine',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: 'Jan 1066',
        title: 'Death of Edward the Confessor & Succession Void',
        actor: 'Edward the Confessor & The Witan',
        tag: '👑 SUCCESSION CRISIS',
        trigger:
          'King Edward the Confessor died in January 1066 without leaving a direct heir, ending the House of Wessex and creating an immediate power vacuum.',
        connective:
          'Prompted the Anglo-Saxon Witan council to swiftly elect Harold Godwinson, triggering furious invasion preparations from rival claimants in Norway and Normandy.',
        question: 'Why did the death of Edward the Confessor trigger a succession crisis?',
      },
      {
        step: 2,
        date: '1066',
        title: 'Three Rivals Contend for the English Crown',
        actor: 'Harold Godwinson, Harald Hardrada & Duke William',
        tag: '⚔️ THREE CLAIMANTS',
        trigger:
          'Harold Godwinson seized the crown, but faced rival claims from Viking King Harald Hardrada and Duke William of Normandy, who claimed Edward had promised him the throne.',
        connective:
          'Forced England into a two-front defence, forcing Harold to guard the southern coast against Normandy while Viking invaders massed across the North Sea.',
        question: 'Who were the three rival claimants contending for the English crown?',
      },
      {
        step: 3,
        date: 'Sept 1066',
        title: 'Stamford Bridge & The 200-Mile Forced March',
        actor: 'King Harold & Harald Hardrada',
        tag: '🛡️ NORTHERN CRUCIBLE',
        trigger:
          'King Harold marched his army 200 miles north in four days, catching Harald Hardrada by surprise at Stamford Bridge and annihilating the Viking invasion army.',
        connective:
          'Eliminated the Viking threat, but left Harold’s elite housecarls decimated and forced a gruelling return march south just as Duke William landed at Pevensey.',
        question: 'How did the Battle of Stamford Bridge exhaust King Harold’s northern forces?',
      },
      {
        step: 4,
        date: '14 Oct 1066',
        title: 'The Anglo-Saxon Shield Wall on Senlac Hill',
        actor: 'Saxon Fyrd & Norman Combined Arms',
        tag: '🛡️ SENLAC RIDGE',
        trigger:
          'King Harold deployed his exhausted army atop the steep ridge of Senlac Hill, forming a dense, interlocking shield wall of wooden round shields and two-handed battleaxes.',
        connective:
          'Repulsed wave after wave of Norman cavalry and infantry charges for over six hours, threatening Duke William with catastrophic tactical failure.',
        question:
          'How did the Anglo-Saxon shield wall withstand repeated Norman charges on Senlac Hill?',
      },
      {
        step: 5,
        date: 'Oct 1066',
        title: 'The Feigned Retreat & Norman Triumph',
        actor: 'Duke William & Norman Cavalry',
        tag: '🐎 FEIGNED RETREAT',
        trigger:
          'Duke William ordered his cavalry to feign retreat downhill, luring undisciplined Saxon fyrdmen into breaking their defensive formation to pursue.',
        connective:
          'Decimated the fractured shield wall, killed King Harold, and decisively handed the English Crown to William the Conqueror.',
        question:
          'How did the feigned retreat tactic break the shield wall and secure Norman victory?',
      },
    ],
  },
  lesson_2: {
    title: 'Castles, Terror & Domesday (1066–1086)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1066–1068',
        title: 'The Motte-and-Bailey Castle Blitz',
        actor: 'Norman Colonists & Anglo-Saxon Labour',
        tag: '🏰 TIMBER STRONGHOLDS',
        trigger:
          'Fewer than 10,000 Norman invaders erected over 500 earthen motte-and-bailey castles across England in under twenty years using forced Saxon labour.',
        connective:
          'Allowed tiny garrisons of heavily armed knights to dominate vast hostile populations, surveil river routes, and rapidly crush local insurgencies.',
        question:
          'How did the motte-and-bailey blitz allow 10,000 Normans to dominate 2 million Saxons?',
      },
      {
        step: 2,
        date: '1069–1070',
        title: 'The Scorched-Earth Harrying of the North',
        actor: 'William the Conqueror & Northern Rebels',
        tag: '🔥 STATE TERROR',
        trigger:
          'After northern English rebels slaughtered the Norman garrison at York, William unleashed a systematic campaign of scorched-earth terror across Yorkshire.',
        connective:
          'Burned crops, slaughtered herds, and salted fields, causing over 100,000 peasants to starve and permanently eliminating the North as a centre of rebellion.',
        question: 'Why did William unleash the brutal scorched-earth Harrying of the North?',
      },
      {
        step: 3,
        date: '1070–1100',
        title: 'Stone Keeps & Portchester Castle',
        actor: 'Anglo-Norman Architects & Garrison Troops',
        tag: '🏛️ STONE MASTERY',
        trigger:
          'The Normans replaced temporary timber forts with towering stone keeps, building Portchester Castle’s monumental limestone keep directly inside Roman coastal walls.',
        connective:
          'Projected permanent imperial authority over strategic harbours, ensuring sea communications with the Duchy of Normandy remained secure.',
        question:
          'How did massive stone keeps like Portchester Castle project permanent imperial permanence?',
      },
      {
        step: 4,
        date: '1085–1086',
        title: 'The Great Domesday Book Audit',
        actor: 'William I & Royal Commissioners',
        tag: '📖 DOMESDAY SURVEY',
        trigger:
          'Facing the threat of a combined Viking invasion, King William commissioned an exhaustive land and wealth audit across every shire in England at Gloucester.',
        connective:
          'Catalogued every hide of land, mill, pig, and ox, providing the Crown with an inescapable tax ledger and sealing Norman administrative dominance.',
        question: 'Why did William commission the exhaustive Domesday Book audit at Gloucester?',
      },
      {
        step: 5,
        date: '1086',
        title: 'Feudal Hierarchy & Land Dispossession',
        actor: 'Norman Barons & Dispossessed Thegns',
        tag: '⚖️ FEUDAL SUBJUGATION',
        trigger:
          'The Domesday survey codified the near-total dispossession of the Anglo-Saxon aristocracy, transferring over 90% of English land to fewer than 200 Norman barons.',
        connective:
          'Enshrined the feudal pyramid where all land belonged to the Crown, locking the English peasantry into centuries of manorial serfdom.',
        question:
          'What does the local Domesday hundred reveal about Anglo-Saxon land dispossession?',
      },
    ],
  },
  lesson_3: {
    title: 'Crown vs Church: Henry II & Thomas Becket (1154–1174)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1154–1162',
        title: 'Worldly Chancellor to Archbishop of Canterbury',
        actor: 'King Henry II & Chancellor Thomas Becket',
        tag: '👑 ROYAL APPOINTMENT',
        trigger:
          'King Henry II appointed his worldly hunting companion, chancellor, and drinking friend Thomas Becket as Archbishop of Canterbury in 1162.',
        connective:
          'Sought to install a pliable royal puppet who would bring the wealthy English Catholic Church firmly under royal Crown control.',
        question: 'Why did Henry II appoint his worldly drinking companion Becket as Archbishop?',
      },
      {
        step: 2,
        date: '1162',
        title: 'Becket’s Metamorphosis & Spiritual Allegiance',
        actor: 'Archbishop Thomas Becket',
        tag: '✝️ SPIRITUAL CONVERSION',
        trigger:
          'Upon consecration, Becket dramatically discarded his rich silk robes, donned an austere goat hairshirt, and dedicated his total allegiance solely to God and the Pope.',
        connective:
          'Shattered Henry’s political strategy, turning his closest royal friend into an unbending champion of papal independence and ecclesiastical immunity.',
        question: 'How did Becket’s sudden spiritual transformation shock King Henry?',
      },
      {
        step: 3,
        date: '1164',
        title: 'Constitutions of Clarendon & ‘Criminous Clerks’',
        actor: 'Henry II, Becket & The Royal Council',
        tag: '📜 CLARENDON DISPUTE',
        trigger:
          'Henry issued the Constitutions of Clarendon, demanding that "criminous clerks" who committed felonies be stripped of holy orders and punished by royal judges.',
        connective:
          'Provoked Becket to refuse royal jurisdiction, triggering a constitutional crisis that forced Becket to flee secretly into a six-year French exile.',
        question:
          'Why did the Constitutions of Clarendon and ‘criminous clerks’ provoke an open rift?',
      },
      {
        step: 4,
        date: '29 Dec 1170',
        title: 'Murder in Canterbury Cathedral',
        actor: 'Four Norman Knights & Archbishop Becket',
        tag: '🗡️ CATHEDRAL REGICIDE',
        trigger:
          'Four knights took Henry II’s furious outburst literally, riding to Canterbury and murdering Archbishop Becket with swords before the cathedral altar.',
        connective:
          'Shocked Christian Europe, turned Becket into an instant international martyr, and severely endangered Henry II’s continental empire with excommunication.',
        question: 'How did royal rage culminate in brutal murder in Canterbury Cathedral?',
      },
      {
        step: 5,
        date: '1170–1174',
        title: 'Barefoot Royal Penance & Papal Compromise',
        actor: 'King Henry II & The Monks of Canterbury',
        tag: '🏛️ ROYAL PENANCE',
        trigger:
          'In 1174, King Henry II walked barefoot in sackcloth through Canterbury streets, weeping at Becket’s tomb and submitting to a public flogging by eighty monks.',
        connective:
          'Secured papal absolution, but forced the Crown to abandon the Constitutions of Clarendon and left Church courts exempt from royal control until the Tudors.',
        question: 'Why was Henry II forced to perform barefoot public penance at Canterbury?',
      },
    ],
  },
  lesson_4: {
    title: 'Magna Carta & Medieval Kingship (1199–1216)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1199–1204',
        title: 'Loss of Normandy & ‘Softsword’ Humiliation',
        actor: 'King John & King Philip II of France',
        tag: '🏰 LOSS OF NORMANDY',
        trigger:
          'King Philip II of France drove King John’s armies out of Normandy in 1204, earning John the mocking baronial nickname ‘Softsword’.',
        connective:
          'Deprived the English Crown of its ancestral continental heartland and made John fanatically obsessed with wringing silver from English barons to fund reconquest.',
        question: 'Why did the loss of Normandy earn King John the mocking nickname ‘Softsword’?',
      },
      {
        step: 2,
        date: '1205–1213',
        title: 'Scutage Extortion & The Papal Interdict',
        actor: 'King John & Pope Innocent III',
        tag: '💰 SCUTAGE EXTORTION',
        trigger:
          'John levied unprecedented scutage (shield-tax) rates eleven times in sixteen years while feuding with Pope Innocent III, who placed England under a five-year Interdict.',
        connective:
          'Silenced church bells, left the dead unburied in ditches, and pushed deeply religious barons toward active conspiracy and open rebellion.',
        question: 'How did scutage tax extortion and the papal interdict alienate the realm?',
      },
      {
        step: 3,
        date: '1214',
        title: 'Catastrophe at the Battle of Bouvines',
        actor: 'King John’s Coalition & French Crown',
        tag: '⚔️ BOUVINES DISASTER',
        trigger:
          'King John’s expensive international mercenary coalition was crushed by French royal forces at the Battle of Bouvines in Flanders.',
        connective:
          'Emptied the royal treasury, obliterated John’s military prestige, and left him bankrupt and helpless when armed barons captured London in May 1215.',
        question:
          'How did the catastrophic defeat at the Battle of Bouvines shatter John’s authority?',
      },
      {
        step: 4,
        date: '15 June 1215',
        title: 'Runnymede & The Rule of Law (Clause 39)',
        actor: 'King John & The Rebel Barons',
        tag: '📜 THE GREAT CHARTER',
        trigger:
          'On 15 June 1215 at Runnymede, King John affixed the Great Seal to Magna Carta, agreeing that no free man could be imprisoned without lawful judgment of his peers.',
        connective:
          'Established the revolutionary constitutional principle that the monarch is subject to the law, permanently restricting arbitrary royal tyranny.',
        question: 'What revolutionary legal principle was enshrined in Clause 39 at Runnymede?',
      },
      {
        step: 5,
        date: '1215–1216',
        title: 'Papal Annulment & The First Barons’ War',
        actor: 'King John, Pope Innocent III & Prince Louis',
        tag: '⚡ BARONS’ WAR',
        trigger:
          'Pope Innocent III annulled Magna Carta as a shameful treaty signed under duress, prompting John to plunge the kingdom into civil war against rebel barons.',
        connective:
          'Prompted rebel barons to invite Prince Louis of France to take the throne, ending only with John’s sudden death and the charter’s reissuing by the regency.',
        question: 'Why did the First Barons’ War erupt immediately after the charter was sealed?',
      },
    ],
  },
  lesson_5: {
    title: 'The Black Death & The Peasants’ Revolt (1348–1381)',
    subtitle: 'Key Turning Points & Causal Dominoes (5-Stage Framework)',
    stages: [
      {
        step: 1,
        date: '1348–1349',
        title: 'Arrival of the Plague at Melcombe Regis',
        actor: 'Yersinia pestis & The English Population',
        tag: '💀 THE BLACK DEATH',
        trigger:
          'In the summer of 1348, a merchant vessel docked at Melcombe Regis carrying bubonic plague, which spread rapidly across England and killed 35–50% of the population.',
        connective:
          'Decimated agricultural villages, emptied manors, and created an acute, unprecedented national labour shortage across the feudal countryside.',
        question: 'How did the Black Death wipe out nearly half the population of England?',
      },
      {
        step: 2,
        date: '1349–1351',
        title: 'Labour Shortage & The Economic Revolution',
        actor: 'Surviving Peasants & Landlords',
        tag: '🌾 PEASANT LEVERAGE',
        trigger:
          'With fields left unploughed and crops rotting, surviving serfs and day-labourers discovered they could demand double wages or abandon their feudal manors.',
        connective:
          'Permanently weakened the economic grip of feudal landlords, giving ordinary peasants unprecedented bargaining power and social mobility.',
        question: 'Why did demographic collapse trigger an unprecedented economic power shift?',
      },
      {
        step: 3,
        date: '1351–1377',
        title: 'The Statute of Labourers & Sumptuary Resistance',
        actor: 'The Royal Parliament & Defiant Workers',
        tag: '⚖️ STATUTE OF LABOURERS',
        trigger:
          'Parliament passed the 1351 Statute of Labourers to freeze wages at pre-plague rates and enacted sumptuary laws to forbid peasants from wearing fine fabrics.',
        connective:
          'Provoked bitter generational class resentment among rural workers, who defied the wage caps and forged underground networks of mutual resistance.',
        question:
          'How did the Statute of Labourers and sumptuary laws provoke bitter class resentment?',
      },
      {
        step: 4,
        date: '1377–1381',
        title: 'The Regressive Poll Taxes & Brentwood Spark',
        actor: 'King Richard II, John Bampton & Essex Villagers',
        tag: '🔥 POLL TAX UPRISING',
        trigger:
          'To finance the costly Hundred Years’ War, Parliament imposed three regressive Poll Taxes, forcing impoverished peasants to pay the exact same twelve pence as wealthy lords.',
        connective:
          'Ignited armed insurrection when villagers drove royal tax collector John Bampton out of Brentwood, sparking a coordinated march on London.',
        question: 'Why did the regressive Poll Taxes of 1377–1381 spark armed peasant uprising?',
      },
      {
        step: 5,
        date: 'June 1381',
        title: 'Showdown at Smithfield & The End of Serfdom',
        actor: 'Wat Tyler, Preacher John Ball & King Richard II',
        tag: '🪓 THE PEASANTS’ REVOLT',
        trigger:
          'Thousands of rebels stormed London, burning tax rolls and confronting fourteen-year-old King Richard II at Smithfield, where Wat Tyler was killed by the Mayor.',
        connective:
          'Although Richard revoked his promises of freedom, Parliament abandoned future Poll Taxes, and serfdom withered away over the next century.',
        question:
          'How did the showdown at Smithfield shatter the myth of unquestioned feudal authority?',
      },
    ],
  },
};

let content = fs.readFileSync(dataPath, 'utf8');

for (const [lessonId, spineData] of Object.entries(spinesByLessonId)) {
  const lessonRegex = new RegExp(
    `(\\bid:\\s*['"]${lessonId}['"](?:(?!\\bid:\\s*['"])[\\s\\S])*?)(did_you_know:\\s*)`,
  );
  const match = content.match(lessonRegex);
  if (match) {
    if (match[1].includes('causal_domino_spine:')) {
      console.log(`ℹ️ causal_domino_spine already present for ${lessonId}, skipping`);
      continue;
    }
    const formattedSpine = `causal_domino_spine: ${JSON.stringify(spineData, null, 6)},\n      $2`;
    content = content.replace(lessonRegex, `$1${formattedSpine}`);
    console.log(`✅ Injected causal_domino_spine for ${lessonId}`);
  } else {
    console.warn(`⚠️ Could not find injection point for ${lessonId}`);
  }
}

fs.writeFileSync(dataPath, content, 'utf8');
console.log('🎉 Successfully processed milestone spines for units/medieval_england/data.js');
