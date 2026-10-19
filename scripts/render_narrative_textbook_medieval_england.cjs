/**
 * render_narrative_textbook_medieval_england.cjs
 *
 * PURE NARRATIVE CLASSROOM TEXTBOOK (12-Page Saddle-Stitch Model)
 * Conforms strictly to the KS3 Classroom Textbook Engine Standard:
 * - 100% Pure narrative text (zero primary sources, zero vocab boxes, zero QR codes/ledgers)
 * - Large, comfortable, high-legibility typography for Year 7 reading (11.5pt body, 1.6 line-height)
 * - Exactly 12 pages (3 folded A3 sheets, saddle-stitch reprographics compatible)
 * - 5 Canonical Enquiries across 5 flat double-page spreads (Verso + Recto)
 * - Explicit paragraph referencing [1.1] to [5.5] matching pupil workbook citations
 * - Minimalist, dignified front cover (Portchester Keep, clean title, zero clutter)
 * - Classical publisher book synopsis back cover (narrative blurb, 5-enquiry overview, colophon)
 * - 100% Institutional Neutrality (strictly "The History Revision Hub")
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { auditPageBudget, printSpaceAuditReport } = require('./audit_page_budget.cjs');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to convert local image to Base64 data URI for zero-latency rendering
function getBase64Image(relativePath) {
  try {
    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const fullPath = path.join(ROOT_DIR, cleanPath);
    if (!fs.existsSync(fullPath)) return null;
    const ext = path.extname(fullPath).toLowerCase();
    const mime =
      ext === '.png'
        ? 'image/png'
        : ext === '.jpg' || ext === '.jpeg'
          ? 'image/jpeg'
          : ext === '.webp'
            ? 'image/webp'
            : 'image/jpeg';
    const data = fs.readFileSync(fullPath).toString('base64');
    return `data:${mime};base64,${data}`;
  } catch (err) {
    return null;
  }
}

// Markdown bold and italics parser for clean prose typography
function formatMarkdown(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// ============================================================================
// CANONICAL 5-ENQUIRY PURE NARRATIVE TEXT (Expanded for 11.5pt Full-Page Flow)
// ============================================================================
const ENQUIRIES = [
  // -------------------------------------------------------------------------
  // ENQUIRY 1 (pp. 2–3)
  // -------------------------------------------------------------------------
  {
    num: 1,
    title: '1066: The Succession Crisis & The Battle of Hastings',
    enquiry:
      'Why did three men claim one throne in 1066, and how did William secure victory at Hastings?',
    versoSubtitle: 'The Crisis of Three Rivals & The Northern Crucible',
    rectoSubtitle: 'The Senlac Ridge, Battlefield Tactics & The Feigned Retreat',

    // Verso: Block 1 & Block 2 (~380 words)
    block1: {
      ref: '1.1',
      date: 'January 1066',
      title: 'The Succession Void & The Confessor’s Death',
      paras: [
        'On 5 January 1066, King Edward the Confessor died after reigning for twenty-four pious but politically fragile years. Having fathered no biological heirs, Edward plunged the English realm into an immediate constitutional crisis. In Anglo-Saxon England, royal blood did not automatically guarantee succession to the throne: supreme authority rested with the **Witan**—a national council of senior earls, thegns, and bishops empowered to elect the man best qualified to defend the kingdom.',
        'Within twenty-four hours of Edward’s burial in Westminster Abbey, the Witan swiftly elected England’s wealthiest and most powerful nobleman, **Harold Godwinson**, Earl of Wessex. Harold had himself crowned King Harold II the very next morning. Yet his crown rested on razor-thin legitimacy: across the sea, two formidable foreign military commanders immediately denounced him as a treacherous usurper and prepared devastating invasion fleets to seize the English throne by force.',
      ],
    },
    block2: {
      ref: '1.2',
      date: 'Spring 1066',
      title: 'Three Rivals, Broken Oaths & The Papal Banner',
      paras: [
        'In Normandy, **Duke William** reacted with fury to the news of Harold’s coronation. William insisted that King Edward had personally promised him the English crown as early as 1051, and that Harold himself had sworn a sacred oath upon holy saintly relics in 1064 pledging to support William’s royal claim. Armed with this grievance, William secured the formal blessing of Pope Alexander II, receiving a consecrated **Papal Banner** that transformed his opportunistic military invasion into a holy crusade against a perjured oath-breaker.',
        'Simultaneously across the North Sea, the ferocious Viking warrior-king **Harald Hardrada** of Norway staked a rival claim based on an earlier agreement with previous Danish rulers of England. Joined by Harold’s vengeful, exiled brother Tostig, Hardrada assembled a fleet of three hundred longships. King Harold II was forced to mobilize the entire defensive apparatus of Anglo-Saxon England, stationing troops along the southern coast while watching the northern horizon for an unprecedented two-front invasion.',
      ],
    },

    // Recto: Blocks 3, 4 & 5 (~500 words)
    block3: {
      ref: '1.3',
      date: 'September 1066',
      title: 'Stamford Bridge & The 190-Mile Forced March',
      paras: [
        'The first blow fell in the north. In early September 1066, Hardrada’s armada landed in Yorkshire, smashing the northern earls at the Battle of Gate Fulford and occupying York. In response, King Harold performed one of the greatest military feats of the Middle Ages: he marched his elite housecarls and infantry 190 miles north from London in just four days, catching the unarmoured Vikings completely by surprise at **Stamford Bridge** on 25 September.',
        'In a desperate, bloody engagement, Hardrada was killed by an arrow through the throat, and Tostig was slain. The Viking army was so utterly annihilated that of three hundred ships that arrived, only twenty-four were needed to carry the survivors home, ending the Viking threat to England forever. Yet Harold’s triumph was tragically brief: two days later, the Channel wind changed, and Duke William landed his invasion fleet unopposed at Pevensey Bay in Sussex.',
      ],
    },
    block4: {
      ref: '1.4',
      date: '14 October 1066',
      title: 'The Shield Wall on Senlac Hill',
      paras: [
        'Refusing to rest his exhausted soldiers in London, Harold forced his army another 250 miles south to confront the invaders. At dawn on 14 October 1066, the two armies met at **Senlac Hill** near Hastings. Harold deployed his men in a dense, interlocking **shield wall** across the high ridge, with professional battle-axe-wielding **housecarls** in the front ranks and local peasant militia (**the fyrd**) packed tightly behind them.',
        'For five exhausting hours, the Saxon shield wall held firm against repeated Norman assaults. Heavy cavalry charges stalled on the steep, slippery incline, while Norman archers fired blind uphill into a wall of oak and iron. When a rumour spread that Duke William had been killed, the Norman left flank broke and fled down the hillside in total panic.',
      ],
    },
    block5: {
      ref: '1.5',
      date: 'Afternoon 1066',
      title: 'The Feigned Retreat & Anglo-Saxon Defeat',
      paras: [
        'Seeing the disaster, William dramatically removed his helmet to show his face, roaring: *"Look at me! I live, and with God’s help I shall conquer!"* Turning panic into a masterstroke of battlefield tactics, William ordered repeated **feigned retreats**: charging the ridge, then pretending to flee in terror. Tempted by the illusion of victory, undisciplined Saxon fyrdmen broke formation and surged down the hill, where Norman heavy cavalry wheeled around, surrounded them on open ground, and slaughtered them.',
        'With the shield wall fatally fractured, Norman archers fired high-angled volleys into the dense Saxon ranks. King Harold was killed—traditionally struck in the eye by an arrow—and his personal bodyguards died fighting around his fallen dragon standard. William was crowned King of England in Westminster Abbey on Christmas Day 1066, sealing the Norman Conquest.',
      ],
    },
  },

  // -------------------------------------------------------------------------
  // ENQUIRY 2 (pp. 4–5)
  // -------------------------------------------------------------------------
  {
    num: 2,
    title: 'Castles, Terror & Domesday: How Did the Normans Subjugate England?',
    enquiry:
      'How did a minority Norman elite of fewer than 10,000 soldiers control two million hostile Anglo-Saxons?',
    versoSubtitle: 'The Motte-and-Bailey Blitz & The Scorched Earth of the North',
    rectoSubtitle: 'Imperial Stone Keeps, Portchester Castle & The Domesday Survey',

    // Verso: Block 1 & Block 2 (~390 words)
    block1: {
      ref: '2.1',
      date: '1066–1070',
      title: 'The Minority Dilemma & The Motte-and-Bailey Blitz',
      paras: [
        'Following his Christmas coronation, William faced an existential military dilemma: fewer than ten thousand French-speaking Norman soldiers had to impose permanent control over two million hostile Anglo-Saxons. If the native English united in coordinated rebellion, the conquerors would be overwhelmed. William’s immediate solution was a revolutionary fortress campaign, constructing over five hundred **motte-and-bailey** castles across England within two decades.',
        'These timber fortresses were instruments of rapid physical and psychological domination. Featuring a steep artificial earth mound (**motte**) topped by a wooden keep, and an enclosed ditch-surrounded courtyard (**bailey**), a motte-and-bailey could be erected in just eight to fourteen days using conscripted Saxon forced labour. Built at vital river crossings, ancient Roman crossroads, and rebellious towns, a tiny garrison of forty mounted knights could patrol, intimidate, and subdue an entire surrounding shire.',
      ],
    },
    block2: {
      ref: '2.2',
      date: 'Winter 1069–1070',
      title: 'Scorched Earth: The Harrying of the North',
      paras: [
        'When northern earls allied with Danish invasion fleets in 1069, wiping out the Norman garrison at York, William unleashed a campaign of deliberate, total devastation known as the **Harrying of the North**. Dividing his mounted forces into mobile raiding columns, William spent the bitter winter systematically torching every village, food store, and grain harvest between the River Humber and the River Tees. Farm tools were smashed, livestock slaughtered, and fields salted.',
        'Over one hundred thousand human beings died of starvation and exposure in the freezing snow. Contemporary Anglo-Norman chronicler Orderic Vitalis condemned the atrocities: *"I can praise William for many things, but for this brutal slaughter I cannot forgive him, for he laid waste whole shires and starved innocent women and children to death."* When the Domesday survey audited Yorkshire sixteen years later, vast swathes of northern land were still recorded as unpopulated *waste*.',
      ],
    },

    // Recto: Blocks 3, 4 & 5 (~510 words)
    block3: {
      ref: '2.3',
      date: '1070–1100',
      title: 'Stone Keeps & The Bastion of Portchester Castle',
      paras: [
        'Once initial Saxon rebellions were crushed, William replaced vulnerable timber structures with colossal stone keeps designed to project permanent, unshakeable imperial majesty. A prime example was **Portchester Castle** in Hampshire. Rather than constructing a new fortress from scratch, the Normans built a towering four-storey limestone keep directly into the north-west corner of an ancient 3rd-century Roman Saxon Shore fort.',
        'This site was strategically vital: it commanded the deep-water anchorage of Portsmouth Harbour, protected the Solent against rival fleets, and provided a secure coastal bridgehead through which William could rapidly ship troops, horses, and treasure between his English capitals at Winchester and London and his ancestral duchy in Normandy.',
      ],
    },
    block4: {
      ref: '2.4',
      date: 'Christmas 1085 – 1086',
      title: 'The Great Domesday Book Survey at Gloucester',
      paras: [
        'Facing the threat of another massive Danish invasion in 1085, William met with his royal council at Gloucester. To finance a massive mercenary army, he needed to know the exact taxable wealth and resource output of his conquered realm. He dispatched royal commissioners into every English shire to compile the unprecedented administrative audit known as the **Domesday Book** (1086).',
        'Inquisitors summoned sworn juries of local Normans and Saxons in every hundred and parish, recording the exact acreage of arable land, woodland, watermills, fishponds, and livestock. So meticulous was the survey that the Anglo-Saxon Chronicle noted bitterly: *"Not one single hide of land, nor an ox, nor a cow, nor a swine was left out."* Once entered into the royal parchment ledgers, the valuations were permanent and legally unappealable.',
      ],
    },
    block5: {
      ref: '2.5',
      date: 'August 1086',
      title: 'Feudal Hegemony & Saxon Dispossession',
      paras: [
        'The Domesday survey revealed the staggering completeness of Anglo-Saxon dispossession. Across England, over 80% of all land was confiscated from English owners and granted to fewer than two hundred Norman **tenants-in-chief** in return for military knight-service and fiscal tribute. In the local Hampshire Hundred of Fareham, Saxon thegns who had farmed their ancestral manors for generations were entirely erased, replaced by Norman castellans.',
        'This land redistribution formed the backbone of the **feudal system**. Native Anglo-Saxons were reduced to bonded **villeins** (unfree serfs), tied to manorial estates, forced to work their lord’s land without wages, and forbidden from leaving the manor without written permission. Through castles, scorched earth, and fiscal audit, William bound England into permanent subjugation.',
      ],
    },
  },

  // -------------------------------------------------------------------------
  // ENQUIRY 3 (pp. 6–7)
  // -------------------------------------------------------------------------
  {
    num: 3,
    title: 'Crown vs Church: Why Did Henry II Clash With Thomas Becket?',
    enquiry:
      'Was the murder of Thomas Becket a calculated defense of royal law or a catastrophic abuse of monarchical tyranny?',
    versoSubtitle: 'Two Sovereign Realms, Criminous Clerks & The Constitutions of Clarendon',
    rectoSubtitle: 'Six Years of Bitter Exile, The Christmas Rage & Martyrdom at Canterbury',

    // Verso: Block 1 & Block 2 (~390 words)
    block1: {
      ref: '3.1',
      date: '1154–1162',
      title: 'From Drinking Companion to Lord Chancellor',
      paras: [
        'When twenty-one-year-old **King Henry II** inherited the English crown in 1154, he found royal governance shattered by nineteen years of civil war known as the Anarchy. Energetic and legally brilliant, Henry resolved to restore order. To assist him, he appointed a charismatic London merchant’s son, **Thomas Becket**, as Lord Chancellor of England.',
        'The two men became inseparable partners in power: hunting, dining, and reforming royal justice together. Becket lived in ostentatious magnificence, maintaining a lavish household that rivalled the King’s, enforcing royal taxation with ruthless efficiency, and even commanding knights in Henry’s continental campaigns in France. Henry believed he had found the perfect administrative lieutenant.',
      ],
    },
    block2: {
      ref: '3.2',
      date: '1162–1164',
      title: 'Becket’s Metamorphosis & The Clash at Clarendon',
      paras: [
        'In 1162, the Archbishopric of Canterbury became vacant. Henry saw a golden opportunity: by placing his loyal friend at the head of the English Church, the King hoped to merge ecclesiastical power with royal prerogative, bringing Church courts and tax wealth under Crown control. Becket warned the King: *"If I become Archbishop, our love will turn to bitter hatred."*',
        'Upon his consecration, Becket underwent an astonishing spiritual conversion: he resigned the Chancellorship, donned a coarse hairshirt crawling with lice, and dedicated himself totally to defending the spiritual independence of the Roman Catholic Church. The inevitable conflict erupted over **criminous clerks**—priests accused of crimes such as rape and murder who claimed exemption from royal courts under Church **Canon Law**, escaping with mere defrocking. In the **Constitutions of Clarendon (1164)**, Henry demanded that guilty clergy be handed over to royal judges for execution. Becket furiously refused.',
      ],
    },

    // Recto: Blocks 3, 4 & 5 (~500 words)
    block3: {
      ref: '3.3',
      date: '1164–1170',
      title: 'Six Years of Exile & Papal Warfare',
      paras: [
        'Fearing treason charges and imprisonment after rejecting the Clarendon decrees, Becket fled in disguise across the English Channel, finding sanctuary in France under the protection of King Louis VII. Supported by Pope Alexander III, Becket waged a six-year diplomatic and ecclesiastical campaign against Henry.',
        'Henry retaliated with petty cruelty, expelling Becket’s entire extended family from England into the winter cold. The conflict deepened into an existential feud in 1170 when Henry had his eldest son crowned by the Archbishop of York, directly violating Canterbury’s ancient constitutional monopoly on royal coronations. Becket responded by dramatically excommunicating the bishops involved, consigning their souls to eternal damnation.',
      ],
    },
    block4: {
      ref: '3.4',
      date: 'December 1170',
      title: 'The Fatal Rage: "What Miserable Drones"',
      paras: [
        'Although a fragile reconciliation was brokered in Normandy in late 1170, Becket returned to England unyielding, immediately publishing papal letters of excommunication against the King’s loyal bishops. When the humiliated bishops crossed the Channel to Henry’s Christmas court at Bures in Normandy, the King exploded into a blind, uncontrollable fury.',
        'Henry screamed his infamous outburst: *"What miserable drones and traitors have I nourished and promoted in my household, that they let their lord be mocked with such insolent contempt by a low-born clerk?"* Four Anglo-Norman knights (Reginald FitzUrse, Hugh de Morville, William de Tracy, and Richard le Breton) took the King’s words as a royal execution order, slipping away into the night to catch the tide for England.',
      ],
    },
    block5: {
      ref: '3.5',
      date: '29 December 1170 – 1174',
      title: 'Sacrilege in Canterbury & Royal Penance',
      paras: [
        'On the evening of 29 December 1170, the four armed knights burst into Canterbury Cathedral during evening vespers. Cornering Becket beside the Altar of St Benedict, they demanded he rescind the excommunications. Becket refused, declaring: *"For the name of Jesus and the protection of the Church, I am ready to embrace death."* The knights drew their broadswords and hacked the Archbishop to death, slicing off the top of his skull and scattering his brains on the cathedral floor.',
        'The sacrilegious murder shocked Christian Europe. Becket was canonized a martyr in 1173, and Canterbury became one of Europe’s greatest pilgrimage sites. Terrified of papal excommunication and national rebellion, King Henry II walked barefoot through Canterbury in July 1174, weeping at Becket’s tomb while monks scourged his bare back with eighty lashes, a dramatic surrender to the spiritual power of the Church.',
      ],
    },
  },

  // -------------------------------------------------------------------------
  // ENQUIRY 4 (pp. 8–9)
  // -------------------------------------------------------------------------
  {
    num: 4,
    title: 'Magna Carta (1215) & Medieval Kingship: Liberty or Barons’ Power Grab?',
    enquiry:
      'Did Magna Carta establish the universal rule of law or was it merely a self-interested treaty protecting aristocratic privileges?',
    versoSubtitle: 'John ‘Softsword’, Fiscal Cruelty & The Interdict',
    rectoSubtitle: 'The Disaster at Bouvines, Runnymede & Clause 39',

    // Verso: Block 1 & Block 2 (~380 words)
    block1: {
      ref: '4.1',
      date: '1199–1204',
      title: 'King John ‘Softsword’ & The Loss of Normandy',
      paras: [
        'King John succeeded his legendary warrior-brother Richard the Lionheart in 1199, inheriting the vast continental **Angevin Empire** stretching from the Scottish border to the Pyrenees. But unlike Richard, John lacked battlefield charisma, military luck, and diplomatic skill. In 1204, French King Philip Augustus launched a relentless offensive that stripped John of Normandy, Anjou, and Maine.',
        'The loss of ancestral Normandy was a national humiliation: it shattered the cross-Channel estates that Anglo-Norman baronial families had held for 140 years. Mocked across Europe as **King John ‘Softsword’** and ‘Lackland’, John became obsessively fixated on reconquering his lost French territories at any financial, legal, or moral cost.',
      ],
    },
    block2: {
      ref: '4.2',
      date: '1205–1213',
      title: 'Scutage Extortion, Cruelty & The Papal Interdict',
      paras: [
        'To finance a massive mercenary army to invade France, John transformed the royal tax system into an engine of extortion. He levied **scutage** ("shield money"—a cash tax paid by barons in place of military service) eleven times in sixteen years, demanding crippling fines from baronial widows and orphans before permitting them to inherit family estates.',
        'John’s rule was poisoned by cruelty: when noblewoman Matilda de Braose accused him of murdering his teenage nephew Arthur of Brittany, John had Matilda and her eldest son starved to death in a dungeon at Corfe Castle. Furthermore, John quarreled with Pope Innocent III over who should be Archbishop of Canterbury. The Pope placed England under a terrifying six-year **Papal Interdict**, closing church doors, silencing bells, and leaving dead bodies to rot unburied in ditches without Christian rites.',
      ],
    },

    // Recto: Blocks 3, 4 & 5 (~500 words)
    block3: {
      ref: '4.3',
      date: '1214–1215',
      title: 'The Catastrophe at Bouvines & Open Rebellion',
      paras: [
        'In 1214, John launched his grand allied offensive to reconquer France. While John advanced from the south, his imperial allies met King Philip at the **Battle of Bouvines** in Flanders. The battle was a catastrophic defeat: John’s coalition was annihilated, his treasury emptied, and his continental ambitions destroyed forever.',
        'John returned to England bankrupt, discredited, and politically isolated. Refusing to pay further taxes, a coalition of northern and eastern barons took up arms under the banner of *"The Army of God and Holy Church"*. In May 1215, rebel barons marched on London; sympathetic London merchants opened the gates, trapping King John at Windsor Castle.',
      ],
    },
    block4: {
      ref: '4.4',
      date: '15 June 1215',
      title: 'Runnymede: Clause 39 & The Rule of Law',
      paras: [
        'Left without military options, John rode out on 15 June 1215 to a meadow beside the River Thames at **Runnymede**. Surrounded by armed barons and guided by Archbishop Stephen Langton, John affixed his Great Seal to a peace charter of sixty-three clauses known as **Magna Carta** (The Great Charter).',
        'While many clauses settled baronial complaints about debt, royal forests, and fish-weirs, **Clause 39** established a revolutionary constitutional principle: *"No free man shall be seized, imprisoned, or stripped of his rights except by the lawful judgment of his equals or by the law of the land."* For the first time in European history, the sovereign monarch was declared subject to the **Rule of Law**.',
      ],
    },
    block5: {
      ref: '4.5',
      date: '1215–1216',
      title: 'Civil War, Death of John & The Survival of Liberty',
      paras: [
        'King John had no intention of keeping his word. As soon as the barons dispersed, John secretly appealed to Pope Innocent III, who issued a papal bull declaring Magna Carta null, void, and shameful. Civil war erupted across England. The desperate barons invited Prince Louis of France to take the English crown, and French troops occupied London.',
        'The kingdom was only saved when King John died suddenly of dysentery at Newark in October 1216. Royal regents swiftly reissued Magna Carta in the name of his nine-year-old son, King Henry III. By reissuing the charter to secure national unity, the crown permanently transformed an emergency peace treaty into the cornerstone of English constitutional liberty.',
      ],
    },
  },

  // -------------------------------------------------------------------------
  // ENQUIRY 5 (pp. 10–11)
  // -------------------------------------------------------------------------
  {
    num: 5,
    title:
      'The Black Death (1348) & The Peasants’ Revolt (1381): How Did Plague and Rebellion Shatter Feudalism?',
    enquiry:
      'Did demographic catastrophe and popular rebellion permanently overthrow feudal serfdom, or did royal repression keep the peasantry subjugated?',
    versoSubtitle: 'The Pestilence of 1348, Labour Scarcity & The Statute of Labourers',
    rectoSubtitle: 'The Poll Tax Sparks, The March on London & The Smithfield Climax',

    // Verso: Block 1 & Block 2 (~390 words)
    block1: {
      ref: '5.1',
      date: '1348–1349',
      title: 'The Great Pestilence: The Black Death Catastrophe',
      paras: [
        'In the sweltering summer of 1348, an unimaginable horror arrived aboard a merchant ship docking at Melcombe Regis in Dorset. Caused by the bacterium *Yersinia pestis* living in rat fleas, the **Black Death** swept across England with terrifying speed. Victims suffered fever, vomiting, egg-sized black buboes in the armpits and groin, and coughing of blood, usually dying in agony within three to five days.',
        'Medieval medicine was powerless: physicians blamed foul air (**miasma**), planetary alignments, or divine retribution for human sin. Within eighteen months, between 35% and 50% of England’s entire population—nearly two million people—perished. Whole villages were abandoned, untended crops rotted in fields, and churchyards overflowed into mass burial plague pits.',
      ],
    },
    block2: {
      ref: '5.2',
      date: '1349–1351',
      title: 'The Demographic Shock & The Statute of Labourers',
      paras: [
        'The death of half the workforce triggered a profound economic revolution. Surviving peasants suddenly realized that their agricultural labour was in desperate demand. Bonded villeins demanded double and triple wages, refusing to perform unfree feudal duties unless paid cash wages, or walked off manors to work for rival lords competing for reapers.',
        'Terrified of losing their social dominance, the landlord-dominated Parliament and King Edward III passed the **Statute of Labourers (1351)**. The law made it a crime to pay or accept wages higher than pre-plague 1346 levels, forbade peasants from travelling in search of work, and ordered runaway workers to be branded on the forehead with a hot iron ‘F’ for falsity. This draconian law bred thirty years of burning resentment among English labourers.',
      ],
    },

    // Recto: Blocks 3, 4 & 5 (~500 words)
    block3: {
      ref: '5.3',
      date: '1377–1381',
      title: 'The Poll Tax Catalyst & The Radical Preaching of John Ball',
      paras: [
        'By 1381, England was exhausted by the expensive, failing Hundred Years’ War against France. To fund military garrisons, the regency council of 14-year-old King Richard II introduced a hated **Poll Tax** in 1377, 1379, and 1381. Unlike land taxes, the Poll Tax demanded twelve groats (three silver shillings) from every person over fifteen, regardless of whether they were a wealthy merchant or a starving peasant.',
        'Radical hedge-priests like **John Ball** gave the mounting fury a revolutionary voice, preaching social equality to crowds: *"When Adam delved and Eve span, who was then the gentleman? From the beginning all men by nature were created alike, and our bondage came in by the unjust oppression of wicked men."*',
      ],
    },
    block4: {
      ref: '5.4',
      date: 'June 1381',
      title: 'The March on London & The Sacking of Savoy Palace',
      paras: [
        'Rebellion erupted in May 1381 when royal tax commissioner John Bampton was attacked in Brentwood, Essex. Led by an experienced ex-soldier named **Wat Tyler**, thirty thousand armed rebels from Kent and Essex marched on London. Sympathetic London apprentices opened the city gates on 13 June, allowing the rebel army to pour into the capital.',
        'The rebels unleashed disciplined, targeted retribution: they stormed the Tower of London, dragged out and beheaded Archbishop Simon Sudbury (the Chancellor who created the Poll Tax), and burned the Duke of Lancaster’s lavish Savoy Palace to the ground, throwing gold into the Thames to prove they were seekers of justice, not common thieves.',
      ],
    },
    block5: {
      ref: '5.5',
      date: '15 June 1381',
      title: 'The Climax at Smithfield & The End of Feudal Serfdom',
      paras: [
        'On 15 June 1381, young King Richard II rode out to meet Wat Tyler at Smithfield. Tyler demanded the total abolition of serfdom, the repeal of all labour laws, and the equality of all Englishmen under the King. An altercation broke out: London Mayor William Walworth drew his dagger and slashed Tyler across the throat, while royal squires finished him off.',
        'Seeing their leader fall, peasant archers drew their bows. Showing astonishing courage, 14-year-old Richard galloped toward the armed crowd, crying: *"I will be your king and leader! Follow me!"* Richard promised royal pardons and charters of freedom, but once the rebels dispersed, he revoked all charters and executed fifteen hundred leaders. Yet the revolt achieved its goal: parliament never levied a poll tax again, and within a century, feudal serfdom in England had withered into total extinction.',
      ],
    },
  },
];

// ============================================================================
// HTML GENERATOR FUNCTION
// ============================================================================
function buildNarrativeTextbookHtml() {
  const coverImgData =
    getBase64Image('/images/portchester_keep.jpg') || '/images/portchester_keep.jpg';

  let spreadsHtml = '';

  ENQUIRIES.forEach((enquiry) => {
    const num = enquiry.num;
    const versoPage = num * 2;
    const rectoPage = num * 2 + 1;

    spreadsHtml += `
    <!-- =========================================================
         PAGE ${versoPage} (VERSO): ENQUIRY ${num} PART I
         ========================================================= -->
    <div class="a4-page verso textbook-page" data-page="${versoPage}" id="page-${versoPage}">
      
      <!-- Running Header -->
      <header class="page-running-header">
        <span class="rh-left">KEY STAGE 3 DISCIPLINARY HISTORY</span>
        <span class="rh-right">ENQUIRY 0${num} &bull; PART I</span>
      </header>

      <!-- Enquiry Title Banner -->
      <div class="enquiry-title-banner">
        <div class="enquiry-meta-row">
          <span class="enquiry-badge">ENQUIRY 0${num} &bull; YEAR 7</span>
          <span class="enquiry-subtitle-tag">${enquiry.versoSubtitle}</span>
        </div>
        <h1 class="enquiry-main-title">${enquiry.title}</h1>
        <div class="enquiry-question-box">
          <span class="eq-icon">&sect;</span>
          <span class="eq-text"><strong>Key Enquiry Question:</strong> ${enquiry.enquiry}</span>
        </div>
      </div>

      <!-- Main Prose Reading Area (2-Column Flow for Blocks 1 & 2) -->
      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <!-- Block 1 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block1.ref}]</span>
              <span class="block-date">${enquiry.block1.date}</span>
              <h2 class="block-title">${enquiry.block1.title}</h2>
            </div>
            ${enquiry.block1.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block1.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 2 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block2.ref}]</span>
              <span class="block-date">${enquiry.block2.date}</span>
              <h2 class="block-title">${enquiry.block2.title}</h2>
            </div>
            ${enquiry.block2.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block2.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

        </div>
      </main>

      <!-- Running Footer -->
      <footer class="page-running-footer">
        <span>Medieval England (1066&ndash;1381) &bull; Enquiry 0${num} Part I</span>
        <span class="page-num">${versoPage}</span>
      </footer>

    </div>

    <!-- =========================================================
         PAGE ${rectoPage} (RECTO): ENQUIRY ${num} PART II
         ========================================================= -->
    <div class="a4-page recto textbook-page" data-page="${rectoPage}" id="page-${rectoPage}">
      
      <!-- Running Header -->
      <header class="page-running-header">
        <span class="rh-left">MEDIEVAL ENGLAND (1066&ndash;1381)</span>
        <span class="rh-right">ENQUIRY 0${num} &bull; PART II</span>
      </header>

      <!-- Recto Section Header -->
      <div class="recto-header-banner">
        <span class="recto-part-tag">PART II: CLIMAX, TURNING POINTS &amp; HISTORICAL CONSEQUENCE</span>
        <span class="recto-subhead">${enquiry.rectoSubtitle}</span>
      </div>

      <!-- Main Prose Reading Area (2-Column Continuous Flow for Blocks 3, 4 & 5) -->
      <main class="page-prose-body">
        <div class="prose-two-column">
          
          <!-- Block 3 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block3.ref}]</span>
              <span class="block-date">${enquiry.block3.date}</span>
              <h2 class="block-title">${enquiry.block3.title}</h2>
            </div>
            ${enquiry.block3.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block3.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 4 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block4.ref}]</span>
              <span class="block-date">${enquiry.block4.date}</span>
              <h2 class="block-title">${enquiry.block4.title}</h2>
            </div>
            ${enquiry.block4.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block4.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

          <!-- Block 5 -->
          <section class="narrative-block">
            <div class="block-header">
              <span class="block-ref">[${enquiry.block5.ref}]</span>
              <span class="block-date">${enquiry.block5.date}</span>
              <h2 class="block-title">${enquiry.block5.title}</h2>
            </div>
            ${enquiry.block5.paras
              .map(
                (p) => `
            <p class="prose-p"><span class="para-pill">[${enquiry.block5.ref}]</span> ${formatMarkdown(p)}</p>`,
              )
              .join('')}
          </section>

        </div>
      </main>

      <!-- Running Footer -->
      <footer class="page-running-footer">
        <span>Medieval England (1066&ndash;1381) &bull; Enquiry 0${num} Part II</span>
        <span class="page-num">${rectoPage}</span>
      </footer>

    </div>
    `;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Medieval England (1066–1381) — Classroom Reading Anthology</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
  <style>
    :root {
      --ink-primary: #0f172a;
      --ink-secondary: #334155;
      --ink-muted: #64748b;
      --crimson-accent: #991b1b;
      --crimson-dark: #7f1d1d;
      --navy-deep: #0f284e;
      --gold-royal: #b45309;
      --parchment-bg: #fdfbf7;
      --border-soft: #cbd5e1;
      --font-display: 'Cinzel', serif;
      --font-body: 'Lora', Georgia, serif;
      --font-sans: 'Inter', -apple-system, sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background: #e2e8f0;
      color: var(--ink-primary);
      font-family: var(--font-body);
      font-size: 11.5pt;
      line-height: 1.6;
      margin: 0;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* Screen Quick Control Bar */
    .screen-control-bar {
      width: 210mm;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 6px;
      margin-bottom: 20px;
      font-family: var(--font-sans);
      font-size: 8.5pt;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .screen-control-bar .badge-hub {
      background: var(--crimson-accent);
      color: #ffffff;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .screen-control-bar button {
      background: #1e293b;
      color: #f8fafc;
      border: 1px solid #475569;
      padding: 5px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 8pt;
    }
    .screen-control-bar button:hover {
      background: #334155;
    }

    /* =============================================================
       A4 PAGE ARCHITECTURE (210mm x 297mm)
       ============================================================= */
    .a4-page {
      width: 210mm;
      height: 297mm;
      background: #ffffff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 14mm 16mm 11mm 16mm;
      page-break-after: always;
      break-after: always;
    }

    /* =============================================================
       PAGE 1: MASTER FRONT COVER (Minimalist & Dignified)
       ============================================================= */
    .a4-page.front-cover {
      background: #090d16;
      color: #ffffff;
      padding: 16mm 20mm 12mm 20mm;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3.5mm;
    }
    .cover-top-masthead {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      padding-bottom: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #cbd5e1;
    }
    .cover-hero-artwork-frame {
      margin: 2mm 0 0 0;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 4px 4px 0 0;
      overflow: hidden;
      background: #000000;
      box-shadow: 0 12px 30px rgba(0,0,0,0.6);
      height: 198mm;
      display: block;
    }
    .cover-hero-artwork-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
      display: block;
    }
    .cover-artwork-caption {
      background: rgba(15, 23, 42, 0.95);
      padding: 2.2mm 4mm;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
      border: 1px solid rgba(255,255,255,0.15);
      border-top: none;
      border-radius: 0 0 4px 4px;
      margin-bottom: 2mm;
    }
    .cover-artwork-caption strong {
      color: #f1f5f9;
    }
    .cover-title-group {
      text-align: center;
      margin: 2mm 0 2mm 0;
    }
    .cover-title-group h1 {
      font-family: var(--font-display);
      font-size: 26pt;
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1.1;
      color: #ffffff;
      margin-bottom: 1.5mm;
      text-shadow: 0 2px 6px rgba(0,0,0,0.5);
    }
    .cover-title-group .cover-date-pill {
      display: inline-block;
      background: var(--crimson-accent);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      padding: 2px 10px;
      border-radius: 3px;
      margin-bottom: 2.5mm;
    }
    .cover-title-group p {
      font-family: var(--font-body);
      font-size: 10.5pt;
      font-style: italic;
      color: #cbd5e1;
      max-width: 85%;
      margin: 0 auto;
      line-height: 1.35;
    }
    .cover-footer-meta {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 3mm;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      font-family: var(--font-sans);
      font-size: 7pt;
      color: #94a3b8;
    }

    /* =============================================================
       PAGES 2–11: SPREAD RUNNING HEADERS & FOOTERS
       ============================================================= */
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-soft);
      padding-bottom: 2mm;
      margin-bottom: 3.5mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--ink-muted);
      text-transform: uppercase;
    }
    .page-running-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border-soft);
      padding-top: 2.5mm;
      margin-top: 3.5mm;
      font-family: var(--font-sans);
      font-size: 7.2pt;
      color: var(--ink-muted);
    }
    .page-running-footer .page-num {
      font-weight: 800;
      color: var(--ink-primary);
      font-size: 8.5pt;
    }

    /* =============================================================
       VERSO ENQUIRY HEADER
       ============================================================= */
    .enquiry-title-banner {
      margin-bottom: 4mm;
    }
    .enquiry-meta-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1.5mm;
    }
    .enquiry-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 2px 7px;
      border-radius: 2px;
    }
    .enquiry-subtitle-tag {
      font-family: var(--font-sans);
      font-size: 7pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .enquiry-main-title {
      font-family: var(--font-display);
      font-size: 15.5pt;
      font-weight: 800;
      color: var(--ink-primary);
      line-height: 1.2;
      margin-bottom: 2mm;
    }
    .enquiry-question-box {
      background: #f8fafc;
      border-left: 3px solid var(--crimson-accent);
      padding: 3mm 4mm;
      border-radius: 0 3px 3px 0;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .eq-icon {
      color: var(--crimson-accent);
      font-weight: 800;
      font-size: 9.5pt;
    }
    .eq-text {
      font-family: var(--font-body);
      font-size: 9.2pt;
      font-style: italic;
      color: var(--ink-secondary);
      line-height: 1.35;
    }
    .eq-text strong {
      font-style: normal;
      font-family: var(--font-sans);
      font-size: 8pt;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }

    /* =============================================================
       RECTO RUNNING SUBHEAD
       ============================================================= */
    .recto-header-banner {
      background: #f8fafc;
      border-bottom: 2px solid var(--navy-deep);
      padding: 2mm 3.5mm;
      margin-bottom: 4mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
    }
    .recto-part-tag {
      font-size: 6.8pt;
      font-weight: 800;
      color: var(--navy-deep);
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .recto-subhead {
      font-size: 7.2pt;
      font-weight: 600;
      color: var(--ink-muted);
      font-style: italic;
    }

    /* =============================================================
       PROSE BODY & TWO-COLUMN ARCHITECTURE (11pt Reading Grade)
       ============================================================= */
    .page-prose-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .prose-two-column {
      column-count: 2;
      column-gap: 22px;
      column-fill: balance;
      height: 100%;
    }
    .narrative-block {
      break-inside: auto;
      margin-bottom: 10px;
    }
    .block-header {
      break-after: avoid;
      break-inside: avoid;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 2px;
      margin-bottom: 3px;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 6px;
    }
    .block-ref {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--crimson-accent);
      letter-spacing: 0.04em;
    }
    .block-date {
      font-family: var(--font-sans);
      font-size: 6.8pt;
      font-weight: 600;
      color: var(--ink-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .block-title {
      font-family: var(--font-sans);
      font-size: 8.8pt;
      font-weight: 800;
      color: var(--ink-primary);
      width: 100%;
      margin-top: 1px;
      line-height: 1.25;
    }
    .prose-p {
      font-size: 11pt;
      line-height: 1.58;
      color: #1e293b;
      text-align: justify;
      hyphens: auto;
      text-justify: inter-word;
      margin-bottom: 6px;
    }
    .para-pill {
      font-family: var(--font-sans);
      font-size: 7.2pt;
      font-weight: 800;
      color: var(--navy-deep);
      background: #e2e8f0;
      padding: 1px 4px;
      border-radius: 2px;
      margin-right: 4px;
      vertical-align: 1px;
    }
    .prose-p strong {
      color: var(--ink-primary);
      font-weight: 700;
    }

    /* =============================================================
       PAGE 12: MASTER CLASSROOM BACK COVER (Dignified Book Synopsis)
       ============================================================= */
    .a4-page.back-cover {
      background: var(--parchment-bg);
      padding: 12mm 16mm 10mm 16mm;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      gap: 3.2mm;
    }
    .back-header-strip {
      border-bottom: 2px solid var(--crimson-accent);
      padding-bottom: 2.6mm;
      text-align: center;
    }
    .back-series-badge {
      background: var(--navy-deep);
      color: #ffffff;
      font-family: var(--font-sans);
      font-size: 7.8pt;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 2.5px 10px;
      border-radius: 3px;
      display: inline-block;
      margin-bottom: 1.6mm;
    }
    .back-volume-title {
      font-family: var(--font-display);
      font-size: 20pt;
      font-weight: 800;
      color: var(--ink-primary);
      line-height: 1.15;
      margin-bottom: 1.2mm;
    }
    .back-volume-subtitle {
      font-family: var(--font-body);
      font-size: 10pt;
      font-style: italic;
      color: var(--ink-muted);
    }
    .back-body-prose {
      display: flex;
      flex-direction: column;
      gap: 3.2mm;
    }
    .back-synopsis-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 4.5mm 6mm;
      box-shadow: 0 2px 5px rgba(0,0,0,0.03);
    }
    .back-synopsis-card h3 {
      font-family: var(--font-sans);
      font-size: 8.8pt;
      font-weight: 800;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 1.8mm;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.1mm;
    }
    .back-synopsis-card p {
      font-size: 10.2pt;
      line-height: 1.54;
      color: var(--ink-secondary);
      margin-bottom: 2.4mm;
      text-align: justify;
    }
    .back-synopsis-card p:last-child {
      margin-bottom: 0;
    }
    .back-enquiries-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3.8mm 5.8mm;
    }
    .back-enquiries-box h3 {
      font-family: var(--font-sans);
      font-size: 8.4pt;
      font-weight: 800;
      color: var(--navy-deep);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 1.8mm;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.9mm;
      display: flex;
      justify-content: space-between;
    }
    .back-enquiry-list {
      display: flex;
      flex-direction: column;
      gap: 4.5px;
    }
    .back-enquiry-item {
      display: flex;
      align-items: baseline;
      gap: 8px;
      font-family: var(--font-sans);
      font-size: 7.7pt;
      color: var(--ink-secondary);
      line-height: 1.3;
    }
    .back-enquiry-num {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      color: var(--navy-deep);
      font-weight: 800;
      padding: 1.5px 5px;
      border-radius: 2px;
      font-size: 6.8pt;
      flex-shrink: 0;
    }
    .back-perspectives-box {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      padding: 3.8mm 5.8mm;
    }
    .back-perspectives-box h3 {
      font-family: var(--font-sans);
      font-size: 8.4pt;
      font-weight: 800;
      color: var(--crimson-accent);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 1.8mm;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.9mm;
      display: flex;
      justify-content: space-between;
    }
    .back-perspective-list {
      display: flex;
      flex-direction: column;
      gap: 4.2px;
    }
    .back-perspective-item {
      font-family: var(--font-sans);
      font-size: 7.5pt;
      color: var(--ink-secondary);
      line-height: 1.33;
    }
    .back-perspective-item strong {
      color: var(--ink-primary);
    }
    .back-themes-strip {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 2.8mm 3.8mm;
      font-family: var(--font-sans);
      font-size: 7.3pt;
      color: var(--ink-muted);
      text-align: center;
      line-height: 1.4;
    }
    .back-themes-strip strong {
      color: var(--ink-primary);
    }
    .back-colophon {
      border-top: 1px solid #cbd5e1;
      padding-top: 2.8mm;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-sans);
      font-size: 7pt;
      color: var(--ink-muted);
    }

    /* Print media overrides */
    @media print {
      body {
        background: transparent !important;
        padding: 0 !important;
      }
      .screen-control-bar {
        display: none !important;
      }
      .a4-page {
        box-shadow: none !important;
        margin: 0 !important;
      }
    }
  </style>
</head>
<body>

  <!-- Screen Only Quick Control Bar -->
  <div class="screen-control-bar">
    <div style="display: flex; align-items: center; gap: 10px;">
      <span class="badge-hub">The History Revision Hub</span>
      <span>Medieval England (1066&ndash;1381) &bull; Master Classroom Reading Anthology (12 Pages)</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button onclick="window.print()">Print / Save as PDF</button>
    </div>
  </div>

  <div class="anthology-book-container">

    <!-- =========================================================
         PAGE 1: MASTER FRONT COVER
         ========================================================= -->
    <div class="a4-page front-cover cover-page textbook-page" data-page="1" id="page-1">
      <div class="cover-top-masthead">
        <span>The History Revision Hub &bull; Master Curriculum Series</span>
        <span>Key Stage 3 Disciplinary History</span>
      </div>

      <div class="cover-hero-artwork-frame">
        <img src="${coverImgData}" alt="Portchester Castle Norman Keep" />
      </div>
      <div class="cover-artwork-caption">
        <span><strong>Cover Plate:</strong> Portchester Castle Norman Royal Keep inside 3rd-Century Roman Shore Fort</span>
        <span>Historic England Scheduled Ancient Monument</span>
      </div>

      <div class="cover-title-group">
        <span class="cover-date-pill">1066 &ndash; 1381</span>
        <h1>Medieval England</h1>
        <p>The Struggle for Power: Monarchy, Church &amp; Popular Rebellion</p>
      </div>

      <div class="cover-footer-meta">
        <span>The History Revision Hub &bull; Commercial Educational Publishing</span>
        <span>Classroom Reading Edition &bull; 12-Page Saddle-Stitch Format</span>
      </div>
    </div>

    <!-- =========================================================
         PAGES 2–11: 5 CANONICAL ENQUIRY SPREADS
         ========================================================= -->
    ${spreadsHtml}

    <!-- =========================================================
         PAGE 12: MASTER CLASSROOM BACK COVER (Book Synopsis)
         ========================================================= -->
    <div class="a4-page back-cover textbook-page" data-page="12" id="page-12">
      
      <div class="back-header-strip">
        <span class="back-series-badge">KEY STAGE 3 DISCIPLINARY HISTORY</span>
        <h2 class="back-volume-title">Medieval England: 1066&ndash;1381</h2>
        <p class="back-volume-subtitle">The Struggle for Power, Authority &amp; Popular Rebellion</p>
      </div>

      <div class="back-body-prose back-body-content">
        
        <div class="back-synopsis-card">
          <h3>Volume Overview</h3>
          <p>
            From the catastrophic clash of Saxon shield wall and Norman heavy cavalry on Senlac Ridge in October 1066 to the armed peasant rebellion marching upon London in June 1381, this reading anthology charts three turbulent centuries in which monarchical authority, spiritual hegemony, and popular resistance forged the medieval English realm.
          </p>
          <p>
            Engineered specifically as a durable classroom companion for Key Stage 3 historical scholarship, this pure narrative anthology provides pupils with continuous, rigorous historical prose. Across five canonical enquiries, students trace the causal chains transforming an occupied Anglo-Saxon realm into an Anglo-Norman feudal empire, witnessing the clash between King Henry II and Thomas Becket at Canterbury, the birth of the rule of law at Runnymede, and the systemic crisis unleashed by the Black Death.
          </p>
          <p>
            Structured specifically for paired oral reading and close disciplinary textual analysis, every enquiry is organized into chronologically sequenced, numbered paragraph blocks ([1.1] to [5.5]). This explicit referencing architecture enables pupils to locate evidence swiftly during paired reading, support oral argumentation, and cite historical developments directly in their analytical essay writing.
          </p>
        </div>

        <div class="back-enquiries-box">
          <h3>
            <span>Curriculum Enquiries in This Volume</span>
            <span>Five Historical Threads</span>
          </h3>
          <div class="back-enquiry-list">
            <div class="back-enquiry-item">
              <span class="back-enquiry-num">01</span>
              <span><strong>1066 &amp; The Battle of Hastings:</strong> The succession void, three rival claimants, the northern invasion, Harold's forced march to Stamford Bridge, Senlac Ridge shield wall, and the Norman feigned retreat.</span>
            </div>
            <div class="back-enquiry-item">
              <span class="back-enquiry-num">02</span>
              <span><strong>Castles, Terror &amp; Domesday:</strong> Motte-and-bailey fortresses, scorched earth during the Harrying of the North, Portchester Castle's stone keep, and the unprecedented 1086 fiscal land audit.</span>
            </div>
            <div class="back-enquiry-item">
              <span class="back-enquiry-num">03</span>
              <span><strong>Crown vs Church:</strong> Henry II, Lord Chancellor Becket's conversion, the Clarendon clash over criminous clerks, six years of exile, and sacrilegious martyrdom in Canterbury Cathedral.</span>
            </div>
            <div class="back-enquiry-item">
              <span class="back-enquiry-num">04</span>
              <span><strong>Magna Carta (1215):</strong> John ‘Softsword’, the loss of Normandy, scutage extortion, papal interdict, catastrophic defeat at Bouvines, and Clause 39 liberties sealed at Runnymede.</span>
            </div>
            <div class="back-enquiry-item">
              <span class="back-enquiry-num">05</span>
              <span><strong>The Black Death &amp; Peasants’ Revolt:</strong> The 1348 pandemic, devastating labour shortages, the Ordinance of Labourers, regressive Poll Taxes, and Wat Tyler's 1381 peasant rebellion.</span>
            </div>
          </div>
        </div>

        <div class="back-perspectives-box">
          <h3>
            <span>Historiographical Enquiries &amp; Core Debates</span>
            <span>Disciplinary Focus</span>
          </h3>
          <div class="back-perspective-list">
            <div class="back-perspective-item">
              &bull; <strong>The Norman Yoke vs European Synthesis:</strong> Did 1066 inflict the brutal destruction of Anglo-Saxon liberty and culture, or integrate England into dynamic continental intellectual and legal networks?
            </div>
            <div class="back-perspective-item">
              &bull; <strong>Crown vs Church &mdash; Prerogative vs Autonomy:</strong> Was the clash between Henry II and Thomas Becket a necessary defense of royal law against 'criminous clerks', or a tyrannical monarchical assault on the Church?
            </div>
            <div class="back-perspective-item">
              &bull; <strong>Magna Carta (1215) &mdash; Feudal Shield vs Liberty:</strong> Did the Great Charter merely defend the selfish financial privileges of twenty-five rebel barons, or establish the foundational principle that the Crown is bound by law?
            </div>
            <div class="back-perspective-item">
              &bull; <strong>The Peasants' Revolt (1381) &mdash; Despair vs Political Awakening:</strong> Were the rebels an unruly mob reacting blindly to economic distress, or disciplined political actors demanding human dignity and the abolition of serfdom?
            </div>
          </div>
        </div>

        <div class="back-themes-strip">
          <strong>Core Disciplinary Strands:</strong> Monarchical Sovereignty &bull; Feudal Land Tenure &bull; The Rule of Law &bull; Ecclesiastical Immunity &bull; Epidemic Demography &bull; Popular Agency &bull; Historiographical Interpretation
        </div>

      </div>

      <footer class="back-colophon page-footer">
        <span>&copy; The History Revision Hub &bull; Commercial Educational Publishing</span>
        <span>Institutional Neutrality &bull; Classroom Reference Edition &bull; Page 12 of 12</span>
      </footer>

    </div>

  </div>

</body>
</html>`;
}

// ============================================================================
// MAIN EXECUTION & PDF GENERATION
// ============================================================================
async function run() {
  console.log('Building 12-Page Pure Narrative Classroom Textbook HTML...');
  const html = buildNarrativeTextbookHtml();

  const publicHtmlPath = path.join(
    ROOT_DIR,
    'public',
    'units',
    'medieval_england',
    'textbook.html',
  );
  fs.writeFileSync(publicHtmlPath, html, 'utf8');
  console.log('HTML saved to:', publicHtmlPath);

  // Synchronize to root units copy
  const rootHtmlPath = path.join(ROOT_DIR, 'units', 'medieval_england', 'textbook.html');
  fs.writeFileSync(rootHtmlPath, html, 'utf8');

  console.log('Launching Puppeteer to audit and compile 12-page PDF...');
  const chromePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : undefined);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: chromePath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Page Overflow Audit
  const auditResults = await page.evaluate(() => {
    const pages = document.querySelectorAll('.a4-page');
    return Array.from(pages).map((p, index) => {
      const pageNum = p.getAttribute('data-page') || index + 1;
      const scrollH = p.scrollHeight;
      const clientH = p.clientHeight;
      return {
        page: pageNum,
        scrollHeight: scrollH,
        clientHeight: clientH,
        overflow: scrollH > clientH + 4,
        diff: scrollH - clientH,
      };
    });
  });

  console.log(`Rendered exactly ${auditResults.length} pages.`);
  const overflows = auditResults.filter((r) => r.overflow);
  if (overflows.length > 0) {
    console.warn('WARNING: Pages with height overflows:', overflows);
  } else {
    console.log('PERFECT: All 12 pages have 0px overflow!');
  }

  // Audit Page Budget
  console.log('\nAuditing Page Budget...');
  try {
    const report = await auditPageBudget(page, {
      pageSelector: '.a4-page, .textbook-page',
      underflowThresholdPx: 45,
      minUtilizationPct: 85,
      maxGapAboveFooterPx: 25,
      maxInterTaskGapPx: 35,
    });
    printSpaceAuditReport(report, 'textbook.html');
  } catch (err) {
    console.warn('Audit warning:', err.message);
  }

  // Compile PDF
  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) {
    fs.mkdirSync(pdfOutputDir, { recursive: true });
  }

  const pdfPath = path.join(pdfOutputDir, 'medieval_england_textbook_FINAL_V17.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    preferCSSPageSize: true,
  });

  console.log('Master 12-Page Textbook PDF compiled to:', pdfPath);
  await browser.close();

  console.log('Compilation completed successfully.');
}

run().catch((err) => {
  console.error('Fatal error during compilation:', err);
  process.exit(1);
});
