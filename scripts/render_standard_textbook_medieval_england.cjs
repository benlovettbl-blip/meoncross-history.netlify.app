/**
 * History Revision Hub — Publisher-Level Standard Textbook Engine
 *
 * Target: units/medieval_england (KS3 Year 7: Medieval England & The Struggle for Power, 1066–1485)
 * Output: public/pdfs/medieval_england_textbook_PUBLISHER.pdf
 * HTML:   public/units/medieval_england/textbook_PUBLISHER.html
 *
 * Architectural Standards Enforced:
 * 1. Commercial Independence: Strict institutional neutrality; 0 prohibited school identifiers.
 * 2. Exact 20-Page Budget:
 *    - Page 1:  Master Front Cover (98mm uncropped photographic plate, syllabus matrix)
 *    - Pages 2–19: 9 Double-Page Enquiry Spreads (2 pages per lesson)
 *    - Page 20: Master Back Cover (1066–1485 Chronological Sequence, Disciplinary Glossary & Essay Matrix)
 * 3. Base64 Image Inlining for 100% offline and Puppeteer fidelity.
 * 4. Counsellian Voice: Woven teacherly wit, human irony, and disciplinary rigor throughout core prose.
 * 5. High-Yield Component Bank with "Archival Oddities & Medieval Curiosities" on all right-hand pages.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT_DIR = path.join(__dirname, '..');
const dataPath = path.join(ROOT_DIR, 'public', 'units', 'medieval_england', 'data.js');

if (!fs.existsSync(dataPath)) {
  console.error('Data file not found:', dataPath);
  process.exit(1);
}

// Parse public/units/medieval_england/data.js
const dataContent = fs.readFileSync(dataPath, 'utf8');
const startIndex = dataContent.indexOf('{');
const endIndex = dataContent.lastIndexOf('}');
const unitData = eval('(' + dataContent.substring(startIndex, endIndex + 1) + ')');

const lessons = unitData.lessons || [];
console.log(`Loaded ${lessons.length} Medieval England lessons for publisher textbook.`);

/**
 * Base64 Image Inliner
 */
function getBase64Image(relPath) {
  if (!relPath) return null;
  const clean = relPath.replace(/^\//, '');
  const candidates = [
    path.join(ROOT_DIR, 'public', clean),
    path.join(ROOT_DIR, clean),
    path.join(ROOT_DIR, 'public', 'images', path.basename(clean)),
    path.join(ROOT_DIR, 'units', 'medieval_england', 'assets', path.basename(clean)),
    path.join(ROOT_DIR, 'public', 'units', 'medieval_england', 'assets', path.basename(clean)),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      const ext = path.extname(cand).toLowerCase();
      let mime = 'image/jpeg';
      if (ext === '.png') mime = 'image/png';
      else if (ext === '.webp') mime = 'image/webp';
      else if (ext === '.svg') mime = 'image/svg+xml';
      const buf = fs.readFileSync(cand);
      return `data:${mime};base64,${buf.toString('base64')}`;
    }
  }
  return null;
}

function formatText(text) {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>');
}

// High-Yield Component Bank for Medieval England Right-Hand Pages
const MEDIEVAL_COMPONENT_BANK = {
  // Page 3: Lesson 1 (1066 & Hastings)
  p3: {
    keyFigure: {
      name: 'Duke William of Normandy ("The Conqueror")',
      lifespan: 'c. 1028–1087',
      role: 'Duke of Normandy (1035–1087) & King of England (1066–1087)',
      significance:
        'Conquered England at Hastings, ending 600 years of Anglo-Saxon rule and establishing a centralized Anglo-Norman feudal state.',
      actions: [
        'Secured papal backing with a consecrated papal banner, turning his opportunistic invasion into a holy crusade against oath-breaker Harold.',
        'Famously pushed back his helmet during the panic on Senlac Hill, shouting: "I live, and with God’s help I will conquer!"',
        'Crowned King of England in Westminster Abbey on Christmas Day 1066 amid smoke and rioting outside the abbey walls.',
      ],
      image: getBase64Image('/images/william_the_conqueror.jpg'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'The Smoke-Filled Coronation: Panic at the Abbey',
      date: '25 December 1066',
      text: 'William’s coronation at Westminster Abbey was meant to be a triumph of divine majesty; instead, it descended into farcical chaos. When the Norman bishop asked the English congregation whether they accepted William as king, the Saxons roared their approval in their native tongue. Hearing the loud shouts inside, the jittery Norman cavalry guarding the exterior panicked, assumed a violent rebellion had erupted, and immediately began setting fire to all the surrounding thatched houses in order to create a smokescreen! As parishioners fled the burning abbey in terror, William was left shivering on the throne before a terrified Archbishop Ealdred, clutching his holy oils and desperately rushing through the royal oaths in an empty church choked with blinding smoke.',
      shelfmark: 'ORDERIC VITALIS • ECCLESIASTICAL HISTORY (BOOK III)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Visual Forensic Artifact</span>
          </div>
          <span class="source-date-micro">c. 1070s</span>
        </div>
        <div class="archival-title">The Bayeux Tapestry: The Fatal Arrow &amp; Senlac Chaos</div>
        <img class="archival-image" src="${getBase64Image('/images/battle_of_hastings_bayeux.jpg')}" alt="Bayeux Tapestry Harold Death">
        <div class="archival-body">
          "Here King Harold is slain: stitched in dyed wool, the tapestry captures the pivotal turning point on Senlac Hill. While nineteenth-century historians insisted Harold was blinded by an arrow through the eye, forensic textile analysis reveals the figure pulling an arrow from his helmet was heavily repaired in Victorian times. Whether struck by an arrow or hacked to pieces by Norman cavalry, the death of Harold decapitated Saxon command and doomed the kingdom."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">Commissioned by William's half-brother, Bishop Odo of Bayeux, to celebrate Norman legitimacy while honoring the ferocious courage of English housecarls.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> Why did the Norman conquerors choose to depict King Harold fighting bravely rather than cowering as a coward?</div>
        </div>
        <div class="archival-footer">
          <span>Bayeux Museum • Normandy, France</span>
          <span>Anglo-Norman Romanesque Embroidery</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Explain why King Harold decided to march immediately south to Hastings rather than resting his army in London.',
      q2: 'How did Duke William exploit the Saxon shield wall’s lack of discipline using the feigned retreat tactic?',
      q3: '"William’s victory was secured by weather and Saxon exhaustion, not Norman military genius." Evaluate this verdict.',
    },
  },

  // Page 5: Lesson 2 (Castles, Terror & Domesday)
  p5: {
    keyFigure: {
      name: 'Orderic Vitalis',
      lifespan: '1075–c. 1142',
      role: 'Anglo-Norman Monk, Chronicler & Historian',
      significance:
        'Authored the *Ecclesiastical History*, providing our most searing, vivid critique of Norman brutality and the human toll of the Harrying of the North.',
      actions: [
        'Born in Shropshire to an English mother and a Norman father, giving him a unique dual perspective on the Conquest.',
        'Wrote candidly that God would punish William for starving 100,000 Yorkshire peasants to death during the Harrying.',
        'Recorded the meticulous administrative terror of William’s tax inquests across the English shires.',
      ],
      image: getBase64Image('/images/portchester_keep.jpg'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: '"Not Even One Pig Escaped": The Terror of Domesday',
      date: 'Christmas 1085 – August 1086',
      text: 'To English peasants, William’s 1086 survey felt like the end of the world. Inquisitors arrived in every village, forcing sworn juries of Normans and Saxons under threat of torture to declare every acre of wheat, every mill, every fishpond, and every cow. The contemporary Anglo-Saxon Chronicle recorded the humiliation with bitter wonder: "So narrowly did he cause the survey to be made, that there was not one single hide nor a yard of land, nor—it is shameful to tell, but he thought it no shame to do—an ox, nor a cow, nor a swine was left that was not set down in his writ." The Saxons nicknamed it "Domesday" because its tax judgements, like the Day of Doom, were completely unalterable—once written in William’s ledger, your taxes were fixed for eternity.',
      shelfmark: 'THE ANGLO-SAXON CHRONICLE (DOMESDAY AUDIT ANNAL)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Administrative Manuscript</span>
          </div>
          <span class="source-date-micro">Compiled 1086</span>
        </div>
        <div class="archival-title">The Great Domesday Book: Folio 44 (Hampshire Shire Inquest)</div>
        <img class="archival-image" src="${getBase64Image('/images/domesday_book.jpg')}" alt="Domesday Book Manuscript">
        <div class="archival-body">
          "In Fareham, King William holds the manor... There are 30 villeins and 15 smallholders with 18 ploughs. There are 2 mills of 25 shillings, and 3 fisheries of 8 shillings, and woodland for 20 pigs. Its total value in the time of King Edward was £40; now £30."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">Written in abbreviated Latin on sheepskin parchment by a single master scribe at Winchester, summarizing two million words of regional inquest data.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> Why did the value of southern manors drop between 1066 and 1086 despite Norman efficiency?</div>
        </div>
        <div class="archival-footer">
          <span>The National Archives • Kew, London • E 31/2/2</span>
          <span>Domesday Folio Record</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why were timber motte-and-bailey castles far more effective for immediate conquest than stone keeps?',
      q2: 'Explain how the Harrying of the North broke Anglo-Saxon military resistance for three generations.',
      q3: 'Which weapon of control was ultimately more powerful: the Norman castle keep or the Domesday Book?',
    },
  },

  // Page 7: Lesson 3 (Crown vs Church: Henry II & Becket)
  p7: {
    keyFigure: {
      name: 'Thomas Becket',
      lifespan: '1119/20–1170',
      role: 'Lord Chancellor of England (1155–1162) & Archbishop of Canterbury (1162–1170)',
      significance:
        'Defended ecclesiastical autonomy against Henry II’s legal centralization; his dramatic assassination transformed him into Europe’s most revered martyr.',
      actions: [
        'Transformed overnight from a luxury-loving courtier who kept sixty knights into a severe, ascetic monk wearing a lice-infested hairshirt.',
        'Rejected the Constitutions of Clarendon (1164), asserting that secular royal judges had zero jurisdiction over ordained Church clerics.',
        'Murdered at the altar of Canterbury Cathedral by four overzealous Norman knights on 29 December 1170.',
      ],
      image: getBase64Image('/images/henry_becket_dispute.jpg'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'The Catastrophic Dinner Tantrum: Four Very Literal Knights',
      date: 'Christmas 1170 • Bures, Normandy',
      text: 'Henry II was famous across Europe for his terrifying Angevin temper; when thwarted, he would scream, claw at his face, and roll on the rushes tearing at the carpet with his teeth. Over Christmas dinner at Bures in Normandy, hearing that Becket had just excommunicated the Archbishop of York for crowning the young prince, Henry burst into an apoplectic fury before his assembled barons: "A curse! A curse upon all the false varlets I have nourished, who will leave me to be the mock of this low-born clerk! Will no one rid me of this turbulent priest?!" Henry meant it as an exasperated theatrical rant. But four of his fiercest household knights—Reginald FitzUrse, Hugh de Morville, William de Tracy, and Richard le Breton—took it as a direct royal assassination contract. They slipped out into the winter night, galloped across northern France, took ship to Dover, and rode straight into Canterbury Cathedral with drawn broadswords, delivering the English Crown the most humiliating PR disaster of the Middle Ages.',
      shelfmark: 'EDWARD GRIM • VITA SANCTI THOMAE (EYEWITNESS DISPATCH)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Illuminated Manuscript Record</span>
          </div>
          <span class="source-date-micro">c. 1250</span>
        </div>
        <div class="archival-title">Matthew Paris: The Assassination in Canterbury Transept</div>
        <img class="archival-image" src="${getBase64Image('/images/becket_murder.jpg')}" alt="Murder of Thomas Becket">
        <div class="archival-body">
          "The knights struck with such ferocity that Richard le Breton broke his broadsword on the cathedral flagstones, severing the crown of the Archbishop’s head. Monks fled in darkness, while Edward Grim stood fast holding the cross until his arm was shattered. Henry was forced to walk barefoot through Canterbury in sackcloth, allowing eighty monks to flog his bare back with birch twigs."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">From the Chronica Majora of Matthew Paris, preserving the visual trauma of Becket's martyrdom for European pilgrims.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> Why was Henry II forced to undergo public flogging if he had never formally ordered Becket's assassination?</div>
        </div>
        <div class="archival-footer">
          <span>British Library • London • Royal MS 2 A XXII</span>
          <span>Canterbury Martyrdom Folio</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why was the legal concept of "Benefit of Clergy" such an intolerable threat to King Henry II’s authority?',
      q2: 'Explain why Thomas Becket’s personality made compromise with Henry II virtually impossible.',
      q3: '"By dying at the altar, Becket won a total victory over the English Crown." To what extent do you agree?',
    },
  },

  // Page 9: Lesson 4 (Magna Carta 1215)
  p9: {
    keyFigure: {
      name: 'King John ("Lackland" / "Softsword")',
      lifespan: '1166–1216',
      role: 'King of England, Duke of Normandy & Lord of Ireland (1199–1216)',
      significance:
        'His catastrophic military defeats in France and ruthless fiscal extortion provoked the baronial rebellion that forced the sealing of Magna Carta.',
      actions: [
        'Lost the ancestral duchy of Normandy and Anjou to King Philip Augustus of France by 1204, bankrupting the Angevin empire.',
        'Extorted massive inheritance fines, seized baronial heirs as hostages, and starved the wife and son of William de Braose to death in Corfe Castle.',
        'Forced to attach his Great Seal to Magna Carta at Runnymede in June 1215, then immediately persuaded the Pope to declare it void.',
      ],
      image: getBase64Image('/images/king_john_matthew_paris.jpg'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'Straw-Chewing, Mud & Peaches: The Undoing of a Tyrant',
      date: 'June 1215 – October 1216',
      text: 'King John was an obsessive micromanager who spent his days checking treasury receipts and tormenting his nobility. When forty rebellious barons cornered him at Runnymede in June 1215, John was surrounded by armed knights and had zero choice. Chronicler Roger of Wendover recorded that after sealing Magna Carta with a forced courtly smile, John returned to his chambers at Windsor, collapsed onto the stone floor, and spent the night chewing furiously on straws and sticks, screaming that his crown had been stolen. His karma caught up with him fifteen months later: while fleeing northern rebels across the tidal estuary of The Wash, his baggage train misjudged the incoming tide, dumping the entire Crown Jewels, royal wardrobe, and golden plates into the quicksands. Broken and enraged, John arrived at Newark Castle, ate a gluttonous feast of fresh cider and green peaches, and died of violent dysentery at the age of forty-nine.',
      shelfmark: 'ROGER OF WENDOVER • FLOWERS OF HISTORY (MATTHEW PARIS MS)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Constitutional Statute</span>
          </div>
          <span class="source-date-micro">15 June 1215</span>
        </div>
        <div class="archival-title">Magna Carta: Clauses 39 &amp; 40 (The Foundation of Liberty)</div>
        <div class="archival-body">
          "Clause 39: No free man shall be seized or imprisoned, or stripped of his rights or possessions, or outlawed or exiled... except by the lawful judgement of his equals or by the law of the land.<br>
          Clause 40: To no one will we sell, to no one will we deny or delay right or justice."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">Drafted in formal Latin on sheepskin parchment at Runnymede; of its 63 clauses, only three remain on the British statute book today.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> Who did the barons mean by "free men" in 1215, and how did this exclude 80% of England's population?</div>
        </div>
        <div class="archival-footer">
          <span>The British Library • Cotton MS Augustus ii. 106</span>
          <span>The Great Charter of Liberties</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why did the loss of Normandy in 1204 directly trigger the baronial rebellion against King John in England?',
      q2: 'Explain the purpose of Clause 61 (the "Security Clause") in Magna Carta. Why did John find it so insulting?',
      q3: 'Was Magna Carta a selfish power grab by wealthy barons or a genuine foundation of universal human rights?',
    },
  },

  // Page 11: Lesson 5 (Village Life, Tithes & Doom Paintings)
  p11: {
    keyFigure: {
      name: 'The Manorial Reeve',
      lifespan: '13th–14th Century',
      role: 'Peasant Supervisor & Village Foreman of the Lord’s Demesne',
      significance:
        'Elected by his fellow serfs but answerable to the bailiff, the reeve balanced the daily survival of villagers against the lord’s demands.',
      actions: [
        'Supervised compulsory week-work, ensuring peasants ploughed, sowed, and harvested the lord’s strips before tending their own.',
        'Inspected tithe deliveries to the parish church, ensuring every tenth sheaf of wheat was delivered to the rector’s barn.',
        'Reported village infractions to the manorial court, from stray pigs rooting in barley to brewers selling sour ale.',
      ],
      image: getBase64Image('/images/medieval_church_interior.jpg'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'Hellmouth & The Sour-Ale Fines: The Village Sins',
      date: 'c. 1300–1400',
      text: 'Every Sunday morning, illiterate peasant farmers filed into their parish church and stared up in terror at the chancel arch, dominated by a vivid, blood-soaked Doom Painting. Christ sat on a rainbow, sending saints to Heaven and sinners tumbling into Hell. At the bottom right lurked the "Hellmouth"—a terrifying, fanged, serpentine monster vomiting smoke and pitchfork-wielding demons. To medieval peasants, this was not metaphor; it was immediate reality. The demons were shown shoving corrupt village characters into the monster’s fiery belly: dishonest bakers who put sawdust in bread, crooked butchers who sold rotten meat, and "alewives" who watered down beer. Meanwhile on Mondays, the manorial court handed out real-world penalties: Alice the Brewer fined 3 pence for sour ale, and John le Ploughman fined 6 pence because his pigs broke into the lord’s beans.',
      shelfmark: 'PARISH CHURCH OF ST THOMAS • SALISBURY • DOOM MURAL',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Medieval Fresco</span>
          </div>
          <span class="source-date-micro">c. 1470</span>
        </div>
        <div class="archival-title">The Doom Painting: St Thomas Becket Church, Salisbury</div>
        <img class="archival-image" src="${getBase64Image('/images/doom_painting.jpg')}" alt="Doom Painting">
        <div class="archival-body">
          "Painted across the chancel arch above the altar, this massive mural showed peasants exactly what awaited them at the Last Judgement. Demons with claws and horns haul chains of naked souls—including kings, bishops, and alewives—directly into the fiery maw of Hell, while angels usher the faithful into the golden New Jerusalem."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">Painted in chalk and earth pigments; during the Reformation it was whitewashed over, only to be rediscovered in 1881.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> How did the Church use visual art to control a population that could not read Latin?</div>
        </div>
        <div class="archival-footer">
          <span>St Thomas Church • Salisbury, Wiltshire</span>
          <span>Chancel Arch Doom Fresco</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Explain how the three-field open-strip farming system prevented any individual peasant from starving.',
      q2: 'Why was the payment of the tithe (10% of all produce) such a heavy financial burden on medieval villeins?',
      q3: 'How did fear of Purgatory and Hell reinforce the feudal social hierarchy of medieval England?',
    },
  },

  // Page 13: Lesson 6 (The Black Death 1348)
  p13: {
    keyFigure: {
      name: 'Henry Knighton',
      lifespan: 'Died c. 1396',
      role: 'Augustinian Canon of St Mary de Pratis Abbey, Leicester',
      significance:
        'Eyewitness chronicler of the Black Death; recorded both the horrifying mortality rate and the sudden economic empowerment of surviving labourers.',
      actions: [
        'Documented the terrifying speed of bubonic and pneumonic infection as it swept through Leicestershire in 1348–49.',
        'Recorded the agricultural standstill: unharvested wheat rotting in rain-soaked fields and cattle wandering through towns.',
        'Wrote indignantly of surviving peasants who refused to work unless paid double or triple their pre-plague wages.',
      ],
      image: getBase64Image('/images/plague_burial.jpg'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'Shaved Chickens, Latrine Pits & Flagellants',
      date: 'Autumn 1348 – Summer 1349',
      text: 'Confronted with a pandemic that killed within seventy-two hours, medieval physicians were utterly clueless. Operating under Galenic miasma theory, they believed plague was caused by "bad air" stirred up by earthquakes or planetary alignments. Doctors advised patients to carry sweet-smelling posies of herbs or—in bizarre desperation—to sit over open cesspits to inhale latrine vapours, believing "strong foul air would drive out weaker plague air." Another popular folk remedy was the "chicken cure": pluck the feathers off the backside of a live chicken and strap it directly to an agonizing, egg-sized bubo in the groin until the bird died, supposedly drawing out the venom. Meanwhile through the muddy streets stumbled processions of Flagellants—fanatical religious zealots who whipped their bare shoulders with iron-tipped scourges until blood drenched their robes, screaming that the apocalypse had arrived and God was punishing England for vanity.',
      shelfmark: 'HENRY KNIGHTON • CHRONICON (LEICESTER ABBEY MANUSCRIPT)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Illuminated Chronicle</span>
          </div>
          <span class="source-date-micro">c. 1350</span>
        </div>
        <div class="archival-title">Gilles li Muisis: Mass Plague Burials in Tournai</div>
        <img class="archival-image" src="${getBase64Image('/images/danse_macabre.jpg')}" alt="Plague Burial Miniature">
        <div class="archival-body">
          "No bells tolled, and no one wept; for almost all expected death... People said and believed: 'This is the end of the world.' So many died that trenches had to be dug in cemeteries and bodies piled forty deep. A dead man was then of no more account than a dead goat."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">From the Annals of Abbot Gilles li Muisis, documenting the psychological collapse and breakdown of Christian funeral rites.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> How did the collapse of normal burial ceremonies shatter medieval religious certainty?</div>
        </div>
        <div class="archival-footer">
          <span>Bibliothèque Royale de Belgique • Brussels • MS 13076</span>
          <span>Chronicle of Gilles li Muisis</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why did the death of 30–45% of England’s population create a catastrophic labour shortage for manorial lords?',
      q2: 'Explain why Parliament passed the Statute of Labourers in 1351. Why were peasants so furious about it?',
      q3: '"The Black Death destroyed the feudal system far more effectively than any army." Assess this judgement.',
    },
  },

  // Page 15: Lesson 7 (The Peasants' Revolt 1381)
  p15: {
    keyFigure: {
      name: 'Wat Tyler & John Ball',
      lifespan: 'Tyler (d. 1381) • Ball (c. 1338–1381)',
      role: 'Leaders of the 1381 Great Uprising',
      significance:
        'Led England’s first major popular revolution, capturing London and demanding the total abolition of serfdom and equality under the law.',
      actions: [
        'John Ball preached radical equality at Blackheath: "When Adam delved and Eve span, who was then the gentleman?"',
        'Tyler led 60,000 peasants from Kent and Essex into London, burning the Savoy Palace and executing the King’s treasurer.',
        'Met King Richard II at Mile End and Smithfield, demanding the end of villeinage and freedom of trade across England.',
      ],
      image: getBase64Image('/images/tyler_death.png'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'A Severed Head at the Tower & A 14-Year-Old’s Cynical Oath',
      date: '14–15 June 1381 • London',
      text: 'When the peasant army flooded London, they bypassed the royal guards at the Tower of London and dragged out Archbishop Sudbury (who was also the King’s Chancellor responsible for the hated Poll Tax). Taking eight messy axe blows to sever his head, the rebels paraded it through Cheapside on a pike before supposedly playing a game of football with it in the gutter. The next afternoon at Smithfield, fourteen-year-old King Richard II faced Wat Tyler. Tyler, emboldened by power, rode up, spat water at the King’s feet, and washed his mouth in beer. London Mayor William Walworth, furious at such peasant disrespect, drew his baselard dagger and slashed Tyler across the neck. As the peasant archers notched their arrows to slaughter the royal party, young Richard galloped alone toward the angry rebels, shouting: "I am your king! I will be your captain! Follow me into the field!" The peasants cheered, believed him, and went home in peace. Within a month, Richard sent royal judges and soldiers to hang 1,500 rebels, delivering his infamous verdict: "Villeins you were, and villeins you shall remain."',
      shelfmark: 'THE ANONIMALLE CHRONICLE OF ST MARY’S • YORK (c. 1390)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Illuminated Chronicle</span>
          </div>
          <span class="source-date-micro">c. 1470s</span>
        </div>
        <div class="archival-title">Jean Froissart: The Murder of Wat Tyler at Smithfield</div>
        <img class="archival-image" src="${getBase64Image('/images/peasants_revolt.jpg')}" alt="Peasants Revolt Froissart">
        <div class="archival-body">
          "Tyler said to the King: 'Thinkest thou that I will take thy word?' The Mayor of London drew his sword and struck Tyler such a blow on the head that he fell from his horse to the ground... The King said: 'Sirs, will you shoot your King? I am your captain, follow me!'"
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">From the Chronicles of Jean Froissart, an aristocrat-friendly chronicler who portrayed the peasants as unruly beasts.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> How does Froissart's wealthy background bias his description of Wat Tyler's actions?</div>
        </div>
        <div class="archival-footer">
          <span>British Library • London • Royal MS 18 E. I</span>
          <span>Froissart's Chronicles of England and France</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Why did the Poll Taxes of 1377–1381 trigger far greater fury than traditional taxes on land and property?',
      q2: 'Explain why the peasants burned legal manorial court rolls and tax ledgers when they reached London.',
      q3: 'Did the Peasants’ Revolt achieve anything, or was it an utter failure crushed by royal betrayal?',
    },
  },

  // Page 17: Lesson 8 (Wars of the Roses 1455–1485)
  p17: {
    keyFigure: {
      name: 'King Richard III',
      lifespan: '1452–1485',
      role: 'Last Plantagenet King of England (Reigned 1483–1485)',
      significance:
        'His usurpation of the throne and the mysterious disappearance of the Princes in the Tower alienated Yorkist allies, leading to his dramatic death at Bosworth.',
      actions: [
        'Served loyally as Lord of the North for his brother Edward IV, establishing a reputation for military courage and fairness.',
        'Seized the young Edward V on his way to his coronation in 1483, declared his nephews illegitimate, and took the crown for himself.',
        'Cut down in a desperate, ferocious cavalry charge targeting Henry Tudor at the Battle of Bosworth Field on 22 August 1485.',
      ],
      image: getBase64Image('/images/richard_iii.png'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'The Crown in a Hawthorn Bush & The King Under the Car Park',
      date: '22 August 1485 • Market Bosworth & August 2012 • Leicester',
      text: 'The death of the medieval era was as dramatic as it was undignified. At Bosworth Field in August 1485, seeing his rearguard under the treacherous Lord Stanley refuse to fight, Richard III launched a heroic, suicidal cavalry charge directly at Henry Tudor. Richard killed Tudor’s giant standard-bearer and fought within sword’s reach of Henry before being surrounded and hacked to death in the boggy marsh, his heavy gold battle circlet knocked off his helmet and later retrieved from a thorny hawthorn bush. Stripped naked, slung over a horse, and buried in an unadorned grave at Greyfriars Priory in Leicester, Richard’s memory was rewritten by Tudor propagandists as a deformed child-murdering villain. Five hundred and twenty-seven years later, in August 2012, archaeologists dug through the asphalt of a Leicester city council parking lot and uncovered his curved spine directly beneath parking bay letter "R"—complete with eleven battle wounds and a dagger thrust through his skull.',
      shelfmark: 'POLYDORE VERGIL • ANGLICA HISTORIA & UNIVERSITY OF LEICESTER (2012)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Renaissance Battle Record</span>
          </div>
          <span class="source-date-micro">Published 1534</span>
        </div>
        <div class="archival-title">Polydore Vergil: The Death of Richard III at Bosworth Field</div>
        <img class="archival-image" src="${getBase64Image('/images/bosworth_battle.jpg')}" alt="Bosworth Battle Scene">
        <div class="archival-body">
          "King Richard, alone, was killed fighting manfully in the thickest press of his enemies... He rushed into the midst of the foe, killed William Brandon the standard-bearer, unhorsed John Cheney, and fought hand to hand until overwhelmed by numbers. Henry was proclaimed king on the field with Richard's battered crown."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">Commissioned by King Henry VII (Henry Tudor) to record official Tudor history; highly critical of Richard's tyranny but unable to deny his battlefield valour.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> Why was it vital for Henry VII to portray Richard III as an illegitimate monster rather than an anointed king?</div>
        </div>
        <div class="archival-footer">
          <span>Polydore Vergil • Anglica Historia (Book XXV)</span>
          <span>Official Tudor Chronicle Record</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'How did the system of "Bastard Feudalism" (paying cash retainers for private noble armies) cause the Wars of the Roses?',
      q2: 'Explain why the disappearance of the Princes in the Tower fatally weakened Richard III’s hold on the English throne.',
      q3: 'Why is the Battle of Bosworth Field (1485) considered by historians to mark the end of the Middle Ages in England?',
    },
  },

  // Page 19: Lesson 9 (Assessment: How Powerful was a Monarch?)
  p19: {
    keyFigure: {
      name: 'King Edward I ("Longshanks")',
      lifespan: '1239–1307',
      role: 'King of England, Lord of Ireland & Duke of Aquitaine (1272–1307)',
      significance:
        'The archetype of a successful medieval monarch; combined ferocious military power with regular parliamentary taxation to build English statehood.',
      actions: [
        'Summoned the "Model Parliament" in 1295, declaring: "What touches all should be approved by all" to raise taxes for his wars.',
        'Crushed Welsh independence and constructed an "iron ring" of state-of-the-art concentric stone castles (Caernarfon, Conwy, Harlech).',
        'Demonstrated that a king was most powerful not when ruling as a lone tyrant, but when consulting his barons and commons in Parliament.',
      ],
      image: getBase64Image('/images/portchester_seawards.jpg'),
    },
    archivalOddity: {
      badge: 'ARCHIVAL ODDITY & CURIOUS REALITY',
      title: 'The Crown on a Tightrope: Divine Right on an Empty Stomach',
      date: '1066–1485 Historical Synthesis',
      text: 'The greatest irony of medieval English history is that monarchs claimed to rule by absolute Divine Right—anointed with holy oils by the Archbishop as God’s representative on earth—yet spent their entire lives walking an impossible political tightrope. A medieval king had no permanent police force, no standing professional army, and no modern central bank. If he ran out of money, he had to beg his barons for cash; if he fought a war, he had to rely on knights who might decide mid-battle to switch sides (as Lord Stanley did to Richard III at Bosworth). Kings who forgot this reality and acted like absolute tyrants (John, Edward II, Richard II) ended up cornered in muddy meadows, deposed, starved in dungeon basements, or murdered with red-hot pokers. Successful kings (William I, Edward I, Henry V) realized that real power was not about being feared in isolation, but about forging a ruthless partnership with the Church and the nobility.',
      shelfmark: 'HENRY DE BRACTON • DE LEGIBUS ET CONSUETUDINIBUS ANGLIAE (c. 1235)',
    },
    archivalDispatch: `
      <div class="archival-source-box">
        <div class="archival-header">
          <div class="source-identity">
            <span class="source-badge">SOURCE C</span>
            <span class="source-type">Constitutional Treatise</span>
          </div>
          <span class="source-date-micro">Written c. 1471</span>
        </div>
        <div class="archival-title">Sir John Fortescue: The Governance of England</div>
        <div class="archival-body">
          "The King of England cannot rule his people by other laws than such as they themselves assent unto... He cannot at his pleasure lay taxes upon them, nor alter their laws, without the consent of the whole realm in Parliament assembled. This is a political and royal dominion, far superior to absolute tyranny."
        </div>
        <div class="archival-context-box">
          <p class="archival-context-text">Written by the former Lord Chief Justice of the King's Bench during the Wars of the Roses, contrasting English limited monarchy against French royal absolutism.</p>
          <div class="archival-hinge-q"><strong>Hinge Question:</strong> How does Fortescue's fifteenth-century view of monarchy differ from William the Conqueror's rule in 1066?</div>
        </div>
        <div class="archival-footer">
          <span>Sir John Fortescue • Chief Justice of the King's Bench</span>
          <span>Constitutional Analysis of the English Crown</span>
        </div>
      </div>
    `,
    bottomEnquiry: {
      q1: 'Compare how William I maintained royal control in 1066 with how King John lost control in 1215.',
      q2: 'Which social group posed the greatest continuous threat to royal power: the Catholic Church, the Barons, or the Peasantry?',
      q3: '"A medieval monarch was only as powerful as their barons allowed them to be." Reach a final reasoned historical judgement.',
    },
  },
};

// Vocabulary Decks for Medieval England Left-Hand Pages
const MEDIEVAL_LEFT_VOCAB = {
  p2: [
    {
      term: 'Succession Crisis',
      def: 'A dangerous political vacuum caused when a monarch dies without leaving a clear, uncontested biological heir.',
    },
    {
      term: 'The Witan',
      def: 'The council of Anglo-Saxon earls and bishops with the ancient constitutional authority to elect and advise the King.',
    },
    {
      term: 'Housecarls',
      def: 'Elite, full-time professional Anglo-Saxon bodyguard warriors trained to swing lethal two-handed Danish battleaxes.',
    },
    {
      term: 'Feigned Retreat',
      def: 'A high-risk military tactic where troops pretend to flee in panic to lure a defensive enemy out of an impenetrable formation.',
    },
  ],
  p4: [
    {
      term: 'Motte-and-Bailey',
      def: 'An early Norman wooden fortification consisting of a raised earth mound (motte) and an enclosed lower courtyard (bailey).',
    },
    {
      term: 'Harrying of the North',
      def: 'William I’s 1069–70 brutal scorched-earth campaign that salted fields and starved 100,000 Yorkshire peasants to crush rebellion.',
    },
    {
      term: 'Domesday Book',
      def: 'The unprecedented 1086 nationwide land, population, and wealth audit ordered by William I to maximize royal taxation.',
    },
    {
      term: 'Villein (Serf)',
      def: 'A peasant legally bound to the land of a feudal manorial lord, forbidden to leave or marry without official permission.',
    },
  ],
  p6: [
    {
      term: 'Benefit of Clergy',
      def: 'A medieval legal privilege allowing ordained clerics accused of felonies to be tried in lenient Church courts instead of royal courts.',
    },
    {
      term: 'Constitutions of Clarendon',
      def: 'Henry II’s 1164 sixteen-point royal statute attempting to assert secular Crown supremacy over the English Catholic Church.',
    },
    {
      term: 'Excommunication',
      def: 'The severe spiritual penalty of expulsion from the Catholic Church, cutting off a Christian from the sacraments and salvation.',
    },
    {
      term: 'Papal Interdict',
      def: 'A papal decree shutting down all church services, baptisms, and Christian burials across an entire rebellious nation.',
    },
  ],
  p8: [
    {
      term: 'Scutage',
      def: 'A financial payment ("shield money") paid by barons to the Crown to excuse them from personal military feudal service.',
    },
    {
      term: 'Due Process',
      def: 'The fundamental legal principle that no free person can be punished except through fair, lawful judicial proceedings.',
    },
    {
      term: 'Security Clause (Clause 61)',
      def: 'Magna Carta’s radical mechanism establishing a council of 25 barons with legal power to seize royal castles if John broke the charter.',
    },
    {
      term: 'Angevin Empire',
      def: 'The vast collection of territories ruled by Henry II and Richard I stretching from the Scottish borders to the Pyrenees.',
    },
  ],
  p10: [
    {
      term: 'Open-Field System',
      def: 'The agricultural system where peasant villagers farmed scattered narrow strips of land across two or three huge communal fields.',
    },
    {
      term: 'Tithe',
      def: 'A compulsory tax of one-tenth (10%) of all agricultural crops, livestock, and wool paid annually to the parish Church.',
    },
    {
      term: 'Doom Painting',
      def: 'A dramatic, terrifying mural painted on the chancel arch depicting Christ judging souls into Heaven or the mouth of Hell.',
    },
    {
      term: 'Demesne',
      def: 'The land on a medieval manor kept by the lord for his own private use and farmed using compulsory peasant labor.',
    },
  ],
  p12: [
    {
      term: 'Bubonic Plague',
      def: 'A lethal bacterial infection caused by *Yersinia pestis*, transmitted by black rat fleas and causing swollen, agonizing buboes.',
    },
    {
      term: 'Miasma Theory',
      def: 'The prevailing medieval medical belief that infectious diseases were caused by poisonous, foul vapors rising from rotting matter.',
    },
    {
      term: 'Statute of Labourers (1351)',
      def: 'A harsh parliamentary law passed by landowning lords attempting to freeze peasant wages at pre-plague 1346 levels.',
    },
    {
      term: 'Danse Macabre',
      def: 'The post-plague cultural motif ("Dance of Death") showing personified Death dancing with popes, kings, and peasants alike.',
    },
  ],
  p14: [
    {
      term: 'Poll Tax',
      def: 'A flat-rate direct tax levied on every individual adult regardless of wealth, triggering universal working-class fury in 1381.',
    },
    {
      term: 'Sumptuary Laws',
      def: 'Parliamentary statutes regulating the clothing, furs, and food different social classes were legally permitted to consume.',
    },
    {
      term: 'Manorial Rolls',
      def: 'Vellum legal court registers recording the names, land debts, and villeinage obligations of peasants, burned by 1381 rebels.',
    },
    {
      term: 'Egalitarianism',
      def: 'The radical political philosophy preached by John Ball asserting that all human beings are created naturally equal by God.',
    },
  ],
  p16: [
    {
      term: 'Bastard Feudalism',
      def: 'The late-medieval practice where wealthy lords paid cash retaining fees to contract private armies of liveried soldiers.',
    },
    {
      term: 'Livery and Maintenance',
      def: 'The unlawful aristocratic practice of providing private badges to thugs and intimidating royal judges to protect retainers.',
    },
    {
      term: 'Usurpation',
      def: 'The act of seizing the sovereign royal throne by military force or conspiracy without a direct lawful hereditary claim.',
    },
    {
      term: 'Tudor Settlement',
      def: 'The political compromise in 1485 where Henry VII married Elizabeth of York, combining the rival roses and ending civil war.',
    },
  ],
  p18: [
    {
      term: 'Royal Prerogative',
      def: 'The traditional discretionary rights and powers possessed exclusively by the monarch without parliamentary consent.',
    },
    {
      term: 'Feudal Inquest',
      def: 'A formal royal investigation into the wealth, property rights, and military obligations of subjects across the realm.',
    },
    {
      term: 'Constitutional Monarchy',
      def: 'A system of government where the sovereign monarch’s power is strictly limited by the rule of law and parliamentary consent.',
    },
    {
      term: 'Sovereignty',
      def: 'The supreme, ultimate authority to govern, enact laws, levy taxes, and wage war within a territorial state.',
    },
  ],
};

/**
 * Builds the complete 20-Page HTML Textbook for Medieval England
 */
async function buildPublisherTextbookHtmlMedievalEngland() {
  const coverImgData = getBase64Image(unitData.cover_image || '/images/portchester_keep.jpg');

  // Build the 9 Double-Page Enquiry Spreads (Pages 2–19)
  let lessonsHtml = '';

  for (let i = 0; i < 9; i++) {
    const lesson = lessons[i] || {};
    const pageLeft = (i + 1) * 2;
    const pageRight = pageLeft + 1;
    const keyLeft = `p${pageLeft}`;
    const keyRight = `p${pageRight}`;

    const rightBank = MEDIEVAL_COMPONENT_BANK[keyRight] || {};
    const leftVocab = MEDIEVAL_LEFT_VOCAB[keyLeft] || [];

    // Narrative Blocks Extraction
    const blocks = lesson.narrative_blocks || [];
    const b0 = blocks[0] || {};
    const b1 = blocks[1] || {};
    const b2 = blocks[2] || {};
    const b3 = blocks[3] || {};

    // Source A & B on Left Page
    const srcA = b0.source || (lesson.sources && lesson.sources[0]) || null;
    const srcB = b1.source || (lesson.sources && lesson.sources[1]) || null;

    // Build Left Page (Verso)
    lessonsHtml += `
    <!-- PAGE ${pageLeft}: Lesson ${i + 1} Verso -->
    <div class="textbook-page" data-page="${pageLeft}">
      <div class="page-flex-full">
        <!-- Top Running Header -->
        <div class="page-running-header">
          <span class="prh-unit">MEDIEVAL ENGLAND (1066–1485)</span>
          <span class="prh-enquiry">ENQUIRY ${i + 1} &bull; ${lesson.title ? lesson.title.replace(/^Lesson \d+:\s*/i, '').toUpperCase() : ''}</span>
          <span class="prh-page">Page ${pageLeft}</span>
        </div>

        <div class="page-body-stretch">
          <!-- Enquiry Banner -->
          <div class="lesson-enquiry-banner">
            <div class="leb-badge">ENQUIRY ${i + 1} &bull; CORE SPECIFICATION THEME</div>
            <h2 class="leb-title">${lesson.title || `Lesson ${i + 1}`}</h2>
          </div>

          <!-- Section 1: Context & Catalyst -->
          <div class="narrative-section">
            <div class="section-banner">
              <span class="sb-num">1</span>
              <span class="sb-title">${b0.title || 'Context & Catalyst: Setting the Stage'}</span>
            </div>
            <div class="narrative-p">${formatText(b0.text || '')}</div>
          </div>

          <!-- Primary Source Box A -->
          ${
            srcA
              ? `
          <div class="archival-source-box">
            <div class="archival-header">
              <div class="source-identity">
                <span class="source-badge">SOURCE A</span>
                <span class="source-type">${srcA.type === 'visual' ? 'Visual Forensic Artifact' : 'Primary Archival Record'}</span>
              </div>
              <span class="source-date-micro">${srcA.caption ? (srcA.caption.match(/\d{4}/) ? srcA.caption.match(/\d{4}/)[0] : 'Historical Record') : 'Primary Source'}</span>
            </div>
            <div class="archival-title">${srcA.caption || 'Primary Historical Evidence'}</div>
            ${srcA.type === 'visual' && srcA.source ? `<img class="archival-image" src="${getBase64Image(srcA.source)}" alt="${srcA.caption || 'Source Image'}">` : ''}
            <div class="archival-body">"${srcA.content || srcA.text || ''}"</div>
            <div class="archival-context-box">
              <p class="archival-context-text">${srcA.source_context ? formatText(srcA.source_context) : 'Verbatim primary testimony from the period.'}</p>
              ${srcA.provenance_clue ? `<div class="archival-hinge-q"><strong>Provenance Clue:</strong> ${formatText(srcA.provenance_clue)}</div>` : ''}
            </div>
            <div class="archival-footer">
              <span>Primary Archival Record</span>
              <span>English Monastic &amp; Administrative Archives</span>
            </div>
          </div>
          `
              : ''
          }

          <!-- Section 2: Escalation & Conflict -->
          <div class="narrative-section">
            <div class="section-banner">
              <span class="sb-num">2</span>
              <span class="sb-title">${b1.title || 'Escalation & Mechanism'}</span>
            </div>
            <div class="narrative-p">${formatText(b1.text || '')}</div>
          </div>

          <!-- Primary Source Box B -->
          ${
            srcB
              ? `
          <div class="archival-source-box">
            <div class="archival-header">
              <div class="source-identity">
                <span class="source-badge">SOURCE B</span>
                <span class="source-type">${srcB.type === 'visual' ? 'Visual Evidence' : 'Contemporary Chronicler'}</span>
              </div>
              <span class="source-date-micro">${srcB.caption ? (srcB.caption.match(/\d{4}/) ? srcB.caption.match(/\d{4}/)[0] : 'Historical Record') : 'Primary Source'}</span>
            </div>
            <div class="archival-title">${srcB.caption || 'Contemporary Perspective'}</div>
            ${srcB.type === 'visual' && srcB.source ? `<img class="archival-image" src="${getBase64Image(srcB.source)}" alt="${srcB.caption || 'Source Image'}">` : ''}
            <div class="archival-body">"${srcB.content || srcB.text || ''}"</div>
            <div class="archival-context-box">
              <p class="archival-context-text">${srcB.source_context ? formatText(srcB.source_context) : 'Contemporary documentation detailing key political actions.'}</p>
              ${srcB.provenance_clue ? `<div class="archival-hinge-q"><strong>Provenance Clue:</strong> ${formatText(srcB.provenance_clue)}</div>` : ''}
            </div>
            <div class="archival-footer">
              <span>Primary Forensic Source</span>
              <span>Ecclesiastical &amp; Royal Dispatch</span>
            </div>
          </div>
          `
              : ''
          }

          <!-- Disciplinary Vocabulary Deck -->
          <div class="vocab-deck-box">
            <div class="vdb-header">
              <span class="vdb-title">TASK 2 &bull; CORE DISCIPLINARY VOCABULARY</span>
              <span class="vdb-sub">Key Terms for Historical Argumentation</span>
            </div>
            <div class="vdb-grid">
              ${leftVocab
                .map(
                  (v) => `
                <div class="vdb-item">
                  <strong>${v.term}:</strong> ${v.def}
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Page Footer -->
        <div class="page-footer">
          <span>The History Revision Hub &bull; Student Textbook Edition</span>
          <span>Medieval England (1066–1485)</span>
          <span>Page ${pageLeft}</span>
        </div>
      </div>
    </div>

    <!-- PAGE ${pageRight}: Lesson ${i + 1} Recto -->
    <div class="textbook-page" data-page="${pageRight}">
      <div class="page-flex-full">
        <!-- Top Running Header -->
        <div class="page-running-header">
          <span class="prh-unit">MEDIEVAL ENGLAND (1066–1485)</span>
          <span class="prh-enquiry">ENQUIRY ${i + 1} &bull; PRIMARY SOURCES &amp; HISTORICAL VERDICT</span>
          <span class="prh-page">Page ${pageRight}</span>
        </div>

        <div class="page-body-stretch">
          <!-- Section 3: Turning Point / Climax -->
          <div class="narrative-section">
            <div class="section-banner">
              <span class="sb-num">3</span>
              <span class="sb-title">${b2.title || 'Turning Point & Archival Evidence'}</span>
            </div>
            <div class="narrative-p">${formatText(b2.text || '')}</div>
          </div>

          <!-- Archival Dispatch Source C -->
          ${rightBank.archivalDispatch || ''}

          <!-- "Archival Oddities & Medieval Curiosities" Callout Box -->
          ${
            rightBank.archivalOddity
              ? `
          <div class="archival-oddity-box">
            <div class="aob-header">
              <div class="aob-identity">
                <span class="aob-badge">${rightBank.archivalOddity.badge}</span>
                <span class="aob-date">${rightBank.archivalOddity.date}</span>
              </div>
              <span class="aob-shelfmark">${rightBank.archivalOddity.shelfmark}</span>
            </div>
            <h4 class="aob-title">${rightBank.archivalOddity.title}</h4>
            <div class="aob-body">${formatText(rightBank.archivalOddity.text)}</div>
          </div>
          `
              : ''
          }

          <!-- Key Figure Profile Card -->
          ${
            rightBank.keyFigure
              ? `
          <div class="key-figure-card">
            <div class="kfc-top">
              ${rightBank.keyFigure.image ? `<img class="kfc-img" src="${rightBank.keyFigure.image}" alt="${rightBank.keyFigure.name}">` : ''}
              <div class="kfc-meta">
                <div class="kfc-badge">KEY HISTORICAL FIGURE</div>
                <h4 class="kfc-name">${rightBank.keyFigure.name}</h4>
                <div class="kfc-role">${rightBank.keyFigure.role} (${rightBank.keyFigure.lifespan})</div>
                <div class="kfc-significance">${formatText(rightBank.keyFigure.significance)}</div>
              </div>
            </div>
            <ul class="kfc-actions">
              ${rightBank.keyFigure.actions.map((act) => `<li>${formatText(act)}</li>`).join('')}
            </ul>
          </div>
          `
              : ''
          }

          <!-- Section 4: If Present -->
          ${
            b3.text
              ? `
          <div class="narrative-section">
            <div class="section-banner">
              <span class="sb-num">4</span>
              <span class="sb-title">${b3.title || 'Historical Significance'}</span>
            </div>
            <div class="narrative-p">${formatText(b3.text)}</div>
          </div>
          `
              : ''
          }

          <!-- Disciplinary Enquiry Synthesis Deck -->
          ${
            rightBank.bottomEnquiry
              ? `
          <div class="bottom-enquiry-box">
            <div class="beb-title">DISCIPLINARY ENQUIRY DECK &bull; HISTORICAL VERDICT &amp; SYNTHESIS</div>
            <div class="beb-grid">
              <div class="beb-item"><strong>1. Analysis:</strong> ${rightBank.bottomEnquiry.q1}</div>
              <div class="beb-item"><strong>2. Causation:</strong> ${rightBank.bottomEnquiry.q2}</div>
              <div class="beb-item"><strong>3. Judgement:</strong> ${rightBank.bottomEnquiry.q3}</div>
            </div>
          </div>
          `
              : ''
          }
        </div>

        <!-- Page Footer -->
        <div class="page-footer">
          <span>The History Revision Hub &bull; Student Textbook Edition</span>
          <span>Medieval England (1066–1485)</span>
          <span>Page ${pageRight}</span>
        </div>
      </div>
    </div>
    `;
  }

  // Assemble Master 20-Page HTML Document
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KS3 Medieval England: The Struggle for Power (1066–1485) — Publisher Textbook</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600;1,700&display=swap');

    @page {
      size: A4 portrait;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    html, body {
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      font-family: 'Newsreader', Georgia, serif;
      color: #0f172a;
    }

    .textbook-page {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      background: #ffffff;
      margin: 0 auto 10mm auto;
      padding: 9mm 11mm 8mm 11mm;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      page-break-after: always;
      break-after: page;
    }

    @media print {
      body { background: #ffffff; }
      .textbook-page {
        margin: 0;
        page-break-after: always;
        break-after: page;
      }
    }

    .page-flex-full {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    .page-body-stretch {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin: 2px 0;
    }

    /* Running Header */
    .page-running-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #0f172a;
      padding-bottom: 2px;
      margin-bottom: 3px;
      font-family: 'Inter', sans-serif;
      font-size: 6.2pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #475569;
      flex-shrink: 0;
    }
    .prh-unit { color: #831843; }
    .prh-enquiry { font-weight: 800; color: #0f172a; }
    .prh-page { color: #64748b; }

    /* Enquiry Banner */
    .lesson-enquiry-banner {
      background: #fdfaf6;
      border-left: 3.5px solid #831843;
      border-top: 1px solid #fed7aa;
      border-right: 1px solid #fed7aa;
      border-bottom: 1px solid #fed7aa;
      padding: 3px 6px;
      margin-bottom: 3px;
      border-radius: 2px;
    }
    .leb-badge {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 900;
      color: #831843;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
    .leb-title {
      font-family: 'Cinzel', 'Playfair Display', serif;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0 0 0;
      line-height: 1.15;
    }

    /* Narrative Sections */
    .narrative-section {
      margin-bottom: 2px;
    }
    .section-banner {
      display: flex;
      align-items: center;
      gap: 5px;
      background: #f8fafc;
      border-left: 2.5px solid #0f172a;
      padding: 1.5px 5px;
      margin-bottom: 2px;
    }
    .sb-num {
      background: #0f172a;
      color: #ffffff;
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 900;
      padding: 0 3px;
      border-radius: 1.5px;
    }
    .sb-title {
      font-family: 'Cinzel', serif;
      font-size: 7.2pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .narrative-p {
      font-size: 7.2pt;
      line-height: 1.32;
      color: #1e293b;
      margin: 0;
      text-align: justify;
      hyphens: auto;
    }

    /* Archival Source Box */
    .archival-source-box {
      background: #fdfaf6;
      border: 1px solid #e7e5e4;
      border-left: 3px solid #831843;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 3px 0;
      break-inside: avoid;
    }
    .archival-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .source-badge {
      font-size: 5.8pt;
      font-weight: 900;
      color: #fff;
      background: #831843;
      padding: 1px 4px;
      border-radius: 2px;
    }
    .source-type {
      font-size: 5.8pt;
      font-weight: 700;
      color: #78716c;
      text-transform: uppercase;
      margin-left: 4px;
    }
    .source-date-micro {
      font-size: 5.8pt;
      font-weight: 600;
      color: #78716c;
    }
    .archival-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 2px;
      line-height: 1.15;
    }
    .archival-image {
      width: 100%;
      max-height: 90px;
      object-fit: contain;
      border-radius: 2px;
      margin-bottom: 2px;
      display: block;
      background: #fafaf9;
    }
    .archival-body {
      font-size: 7.0pt;
      line-height: 1.28;
      color: #292524;
      font-style: italic;
      margin-bottom: 2px;
    }
    .archival-context-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-left: 2.5px solid #0284c7;
      padding: 2.5px 5px;
      margin: 2px 0;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
    }
    .archival-context-text {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #334155;
      margin: 0;
    }
    .archival-hinge-q {
      font-size: 5.8pt;
      line-height: 1.22;
      color: #0f172a;
      background: #f0f9ff;
      padding: 1.5px 4px;
      border-radius: 2px;
      margin-top: 2px;
    }
    .archival-hinge-q strong {
      color: #0369a1;
      text-transform: uppercase;
      font-size: 5.4pt;
      letter-spacing: 0.04em;
    }
    .archival-footer {
      border-top: 1px dashed #d6d3d1;
      padding-top: 1.5px;
      margin-top: 1.5px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.4pt;
      color: #78716c;
    }

    /* "Archival Oddities & Medieval Curiosities" Callout Box */
    .archival-oddity-box {
      background: #fffbeb;
      border: 1.2px solid #fde68a;
      border-left: 3.5px solid #b45309;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 3px 0;
      break-inside: avoid;
    }
    .aob-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .aob-badge {
      font-size: 5.6pt;
      font-weight: 900;
      color: #ffffff;
      background: #b45309;
      padding: 1px 4px;
      border-radius: 1.5px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .aob-date {
      font-size: 5.6pt;
      font-weight: 700;
      color: #78350f;
    }
    .aob-shelfmark {
      font-size: 5.2pt;
      font-family: 'Inter', sans-serif;
      color: #92400e;
      text-transform: uppercase;
    }
    .aob-title {
      font-family: 'Cinzel', serif;
      font-size: 7.6pt;
      font-weight: 800;
      color: #78350f;
      margin: 1px 0 2px 0;
      line-height: 1.15;
    }
    .aob-body {
      font-size: 6.9pt;
      line-height: 1.28;
      color: #451a03;
      text-align: justify;
      hyphens: auto;
    }

    /* Key Figure Card */
    .key-figure-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 3px solid #0f172a;
      border-radius: 3px;
      padding: 4px 6px;
      margin: 3px 0;
      break-inside: avoid;
    }
    .kfc-top {
      display: flex;
      gap: 6px;
      align-items: flex-start;
      margin-bottom: 2px;
    }
    .kfc-img {
      width: 42px;
      height: 48px;
      object-fit: cover;
      border-radius: 2px;
      border: 1px solid #94a3b8;
      flex-shrink: 0;
    }
    .kfc-meta { flex: 1; }
    .kfc-badge {
      font-family: 'Inter', sans-serif;
      font-size: 5.4pt;
      font-weight: 900;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .kfc-name {
      font-family: 'Cinzel', serif;
      font-size: 7.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 1px 0 0 0;
      line-height: 1.15;
    }
    .kfc-role {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 1.5px;
    }
    .kfc-significance {
      font-size: 6.6pt;
      line-height: 1.25;
      color: #334155;
    }
    .kfc-actions {
      margin: 2px 0 0 0;
      padding-left: 12px;
      font-size: 6.5pt;
      line-height: 1.25;
      color: #1e293b;
    }
    .kfc-actions li { margin-bottom: 1px; }

    /* Vocab & Enquiry Decks */
    .vocab-deck-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #0f172a;
      padding: 3px 5px;
      margin-top: 2px;
      border-radius: 2px;
    }
    .vdb-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2px;
      font-family: 'Inter', sans-serif;
    }
    .vdb-title {
      font-size: 5.6pt;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
    .vdb-sub {
      font-size: 5.4pt;
      color: #64748b;
    }
    .vdb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px;
      font-size: 6.2pt;
      line-height: 1.25;
      color: #334155;
    }
    .vdb-item strong { color: #0f172a; }

    .bottom-enquiry-box {
      background: #fdfaf6;
      border: 1px solid #cbd5e1;
      border-top: 2px solid #831843;
      padding: 3px 5px;
      margin-top: 2px;
      border-radius: 2px;
    }
    .beb-title {
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 2px;
    }
    .beb-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 6px;
      font-size: 6.2pt;
      line-height: 1.25;
      color: #334155;
    }

    .page-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 1.5px;
      margin-top: 2px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 5.6pt;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }

    /* Cover Page */
    .cover-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 16px 20px 14px 20px;
      box-sizing: border-box;
    }
    .cover-top { text-align: center; }
    .cover-dept-banner {
      display: inline-block;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 12px;
      border-radius: 2px;
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .cover-series {
      font-family: 'Inter', sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 2px;
    }
    .cover-title {
      font-family: 'Cinzel', serif;
      font-size: 21pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.15;
      margin: 4px 0 3px 0;
      text-transform: uppercase;
    }
    .cover-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 11pt;
      font-style: italic;
      color: #475569;
      margin-bottom: 6px;
    }
    .cover-plate-wrapper {
      text-align: center;
      margin: 4px 0;
    }
    .cover-plate-img {
      max-height: 114mm;
      max-width: 100%;
      object-fit: contain;
      border: 1px solid #cbd5e1;
      border-radius: 2px;
    }
    .cover-plate-caption {
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      color: #64748b;
      margin-top: 3px;
      font-style: italic;
    }
    .cover-enquiry-box {
      background: #fdfaf6;
      border-left: 3.5px solid #831843;
      border-top: 1px solid #fed7aa;
      border-right: 1px solid #fed7aa;
      border-bottom: 1px solid #fed7aa;
      padding: 7px 10px;
      margin: 6px 0;
      border-radius: 2px;
    }
    .ceb-label {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    .ceb-text {
      font-size: 8.6pt;
      font-style: italic;
      color: #1e293b;
      line-height: 1.35;
      margin-top: 2px;
    }
    .cover-matrix-table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      margin: 6px 0;
    }
    .cover-matrix-table th {
      background: #0f172a;
      color: #ffffff;
      padding: 4.5px 6px;
      text-align: left;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .cover-matrix-table td {
      padding: 4px 6px;
      border-bottom: 1px solid #e2e8f0;
      color: #334155;
    }
    .cover-matrix-table tr:nth-child(even) td { background: #f8fafc; }
    .cover-footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
      font-size: 6.5pt;
      color: #64748b;
      font-weight: 600;
    }

    /* Back Cover */
    .back-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 2px solid #0f172a;
      padding: 12px 16px 10px 16px;
      box-sizing: border-box;
    }
    .back-title {
      font-family: 'Cinzel', serif;
      font-size: 12.5pt;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      text-align: center;
      margin-bottom: 1px;
    }
    .back-subtitle {
      font-family: 'Newsreader', Georgia, serif;
      font-size: 8.2pt;
      font-style: italic;
      color: #64748b;
      text-align: center;
      margin-bottom: 4px;
    }
    .back-section-title {
      font-family: 'Inter', sans-serif;
      font-size: 6.8pt;
      font-weight: 900;
      color: #831843;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      border-bottom: 1.5px solid #831843;
      padding-bottom: 1px;
      margin: 4px 0 3px 0;
    }
    .back-timeline-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3.5px;
      font-size: 5.9pt;
      line-height: 1.2;
    }
    .bt-card {
      background: #f8fafc;
      border-left: 2.5px solid #831843;
      padding: 2.5px 4px;
      border-radius: 0 2px 2px 0;
    }
    .bt-card strong { color: #831843; }
    .back-vocab-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      font-size: 5.8pt;
      line-height: 1.22;
      margin-bottom: 3px;
    }
    .bv-item {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      padding: 2.5px 4px;
      border-radius: 2px;
    }
    .bv-item strong { color: #831843; display: block; }
    .back-framework-box {
      background: #fdfaf6;
      border: 1px solid #fed7aa;
      border-left: 3.5px solid #831843;
      padding: 4px 6px;
      margin-top: 3px;
      border-radius: 2px;
    }
    .bf-title {
      font-size: 6.6pt;
      font-weight: 800;
      color: #831843;
      text-transform: uppercase;
      margin-bottom: 1.5px;
      font-family: 'Inter', sans-serif;
    }
    .bf-body {
      font-size: 6.2pt;
      line-height: 1.25;
      color: #334155;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: Front Cover -->
  <div class="textbook-page" data-page="1">
    <div class="cover-container">
      <div class="cover-top">
        <div class="cover-dept-banner" data-department-name="The History Department">
          <span class="school-brand-target">The History Department</span>
        </div>
        <div class="cover-series">Key Stage 3 Master Curriculum Series</div>
        <h1 class="cover-title">Medieval England &amp; The Struggle for Power (1066–1485)</h1>
        <div class="cover-subtitle">From the Norman Conquest to Bosworth Field: Monarchs, Barons, the Church, and the Peasantry</div>
      </div>

      <div class="cover-plate-wrapper">
        ${coverImgData ? `<img class="cover-plate-img" src="${coverImgData}" alt="Portchester Castle Roman-Norman Keep">` : ''}
        <div class="cover-plate-caption">Primary Artifact: The monumental Norman Keep at Portchester Castle, Hampshire, demonstrating the military architecture of Norman royal power.</div>
      </div>

      <div class="cover-enquiry-box">
        <div class="ceb-label">Overarching Historical Enquiry:</div>
        <div class="ceb-text">"How did power shift in Medieval England between 1066 and 1485? Was the Crown all-powerful, or was royal authority repeatedly constrained by barons, bishops, and popular revolt?"</div>
      </div>

      <table class="cover-matrix-table">
        <thead>
          <tr>
            <th style="width: 12%;">Lesson</th>
            <th style="width: 48%;">Historical Enquiry &amp; Narrative Focus</th>
            <th style="width: 25%;">Primary Source Core</th>
            <th style="width: 15%;">Page Ref</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Lesson 1</strong></td>
            <td>1066: Why Did Three Men Claim One Throne &amp; How Did William Win?</td>
            <td>Bayeux Tapestry &amp; Saxon Chronicle</td>
            <td>pp. 2–3</td>
          </tr>
          <tr>
            <td><strong>Lesson 2</strong></td>
            <td>Castles, Terror, &amp; The Domesday Book: How Did William Control England?</td>
            <td>Orderic Vitalis &amp; Domesday Folio</td>
            <td>pp. 4–5</td>
          </tr>
          <tr>
            <td><strong>Lesson 3</strong></td>
            <td>Crown vs Church: Why Did Henry II Clash With Thomas Becket?</td>
            <td>Constitutions of Clarendon &amp; Grim</td>
            <td>pp. 6–7</td>
          </tr>
          <tr>
            <td><strong>Lesson 4</strong></td>
            <td>Magna Carta (1215): Triumph of Liberty or Selfish Baronial Grab?</td>
            <td>Magna Carta 1215 &amp; Matthew Paris</td>
            <td>pp. 8–9</td>
          </tr>
          <tr>
            <td><strong>Lesson 5</strong></td>
            <td>Doom Paintings &amp; Tithes: What Was Life Like in a Medieval Village?</td>
            <td>Luttrell Psalter &amp; Salisbury Doom</td>
            <td>pp. 10–11</td>
          </tr>
          <tr>
            <td><strong>Lesson 6</strong></td>
            <td>1348: How Did the Black Death Shatter the Medieval Social Order?</td>
            <td>Knighton Chronicle &amp; Statute 1351</td>
            <td>pp. 12–13</td>
          </tr>
          <tr>
            <td><strong>Lesson 7</strong></td>
            <td>1381: Why Did the Peasants Revolt, and Did They Achieve Anything?</td>
            <td>John Ball Sermon &amp; Froissart</td>
            <td>pp. 14–15</td>
          </tr>
          <tr>
            <td><strong>Lesson 8</strong></td>
            <td>The Wars of the Roses (1455–1485): How Did the Era End in Blood?</td>
            <td>Paston Letters &amp; Bosworth Field</td>
            <td>pp. 16–17</td>
          </tr>
          <tr>
            <td><strong>Lesson 9</strong></td>
            <td>Assessment: How Powerful Was a Medieval Monarch?</td>
            <td>Fortescue Governance &amp; Great Seal</td>
            <td>pp. 18–19</td>
          </tr>
        </tbody>
      </table>

      <div class="cover-footer">
        <span>The History Revision Hub &bull; Student Textbook Edition</span>
        <span>Verified Print Publication &bull; September 2026</span>
      </div>
    </div>
  </div>

  <!-- PAGES 2–19: Core Lessons (20-Page Budget) -->
  ${lessonsHtml}

  <!-- PAGE 20: Back Cover -->
  <div class="textbook-page" data-page="20">
    <div class="back-container">
      <div>
        <h2 class="back-title">Medieval England &bull; Chronology &amp; Disciplinary Guide</h2>
        <div class="back-subtitle">Master Sequence of Events, Core Terminology &amp; Historical Analysis Framework</div>

        <div class="back-section-title">Master Chronological Sequence (1066–1485)</div>
        <div class="back-timeline-grid">
          <div class="bt-card"><strong>5 Jan 1066:</strong> Edward the Confessor dies; Harold Godwinson crowned.</div>
          <div class="bt-card"><strong>20 Sept 1066:</strong> Battle of Gate Fulford; Vikings defeat northern earls.</div>
          <div class="bt-card"><strong>25 Sept 1066:</strong> Battle of Stamford Bridge; Harold defeats Hardrada.</div>
          <div class="bt-card"><strong>14 Oct 1066:</strong> Battle of Hastings; William of Normandy defeats Harold.</div>
          <div class="bt-card"><strong>25 Dec 1066:</strong> William crowned at Westminster Abbey amid panic and fires.</div>
          <div class="bt-card"><strong>1069–1070:</strong> Harrying of the North; 100,000 perish in scorched-earth terror.</div>
          <div class="bt-card"><strong>1086:</strong> The Domesday Survey completed; nationwide fiscal audit recorded.</div>
          <div class="bt-card"><strong>25 Nov 1120:</strong> White Ship disaster drowns Prince William; leads to The Anarchy.</div>
          <div class="bt-card"><strong>19 Dec 1154:</strong> Henry II ascends throne, establishing Angevin legal reforms.</div>
          <div class="bt-card"><strong>29 Dec 1170:</strong> Archbishop Thomas Becket murdered in Canterbury Cathedral.</div>
          <div class="bt-card"><strong>12 July 1174:</strong> Henry II undergoes barefoot public scourging at Canterbury.</div>
          <div class="bt-card"><strong>1204:</strong> King John loses Normandy; begins extortionate scutage taxation.</div>
          <div class="bt-card"><strong>15 June 1215:</strong> Magna Carta sealed at Runnymede, binding the Crown by law.</div>
          <div class="bt-card"><strong>Nov 1295:</strong> Edward I summons Model Parliament ("What touches all...").</div>
          <div class="bt-card"><strong>1348–1350:</strong> Black Death arrives; 30–45% die; feudal labor crisis erupts.</div>
          <div class="bt-card"><strong>1351:</strong> Statute of Labourers attempts to freeze peasant wages at 1346 rates.</div>
          <div class="bt-card"><strong>June 1381:</strong> Peasants' Revolt storms London; Tyler slain at Smithfield.</div>
          <div class="bt-card"><strong>1455:</strong> Wars of the Roses ignite between Lancaster and York.</div>
          <div class="bt-card"><strong>29 Mar 1461:</strong> Battle of Towton; bloodiest clash in snow with 28,000 dead.</div>
          <div class="bt-card"><strong>June 1483:</strong> Princes in the Tower vanish; Richard III usurps the throne.</div>
          <div class="bt-card"><strong>22 Aug 1485:</strong> Richard III slain at Bosworth; Henry VII begins Tudor dynasty.</div>
        </div>

        <div class="back-section-title" style="margin-top: 5px;">Core Specification Disciplinary Glossary</div>
        <div class="back-vocab-grid">
          <div class="bv-item"><strong>Feudalism</strong> Hierarchical social contract: land exchanged for military service.</div>
          <div class="bv-item"><strong>Benefit of Clergy</strong> Privilege of churchmen to be tried only in lenient canon courts.</div>
          <div class="bv-item"><strong>Scutage</strong> Cash "shield tax" paid by barons to excuse feudal military duty.</div>
          <div class="bv-item"><strong>Due Process</strong> Constitutional principle: no free man punished without lawful trial.</div>
          <div class="bv-item"><strong>Demesne</strong> Land kept by manorial lord for private use using forced serf labor.</div>
          <div class="bv-item"><strong>Miasma</strong> Medieval belief that bad smells and poisoned air caused pestilence.</div>
          <div class="bv-item"><strong>Bastard Feudalism</strong> Late-medieval practice of paying cash retainers for private noble armies.</div>
          <div class="bv-item"><strong>Sovereignty</strong> Supreme legal authority to enact law, levy taxes, and govern the realm.</div>
        </div>

        <div class="back-section-title" style="margin-top: 5px;">Key Conceptual Threads for KS3 Historical Explanation</div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; font-size: 5.9pt; line-height: 1.2;">
          <div style="background: #f8fafc; border-left: 2.5px solid #831843; padding: 2.5px 4px;">
            <strong style="color: #831843; display: block;">1 &bull; Feudal Hierarchy</strong>
            The pyramid of land, military dues, and oaths connecting King, Barons, Knights, and Villeins.
          </div>
          <div style="background: #f8fafc; border-left: 2.5px solid #831843; padding: 2.5px 4px;">
            <strong style="color: #831843; display: block;">2 &bull; Crown vs Church</strong>
            The permanent tension between royal courts and canon law over taxes, criminous clerks, and papal authority.
          </div>
          <div style="background: #f8fafc; border-left: 2.5px solid #831843; padding: 2.5px 4px;">
            <strong style="color: #831843; display: block;">3 &bull; Peasant Agency</strong>
            How the 1348 Black Death created labor scarcity, empowering serfs to challenge villeinage in 1381.
          </div>
          <div style="background: #f8fafc; border-left: 2.5px solid #831843; padding: 2.5px 4px;">
            <strong style="color: #831843; display: block;">4 &bull; Royal Limits</strong>
            Why claiming Divine Right meant nothing without money; how bad kings faced Magna Carta and civil war.
          </div>
        </div>

        <div class="back-framework-box">
          <div class="bf-title">Key Historiographical Perspectives on Medieval Royal Power</div>
          <div class="bf-body">
            <strong>Whig Interpretation (The March of Liberty):</strong> Celebrates Magna Carta (1215) and the Model Parliament (1295) as the heroic, inevitable birth of English constitutional democracy and the rule of law over royal tyranny.<br>
            <strong>Revisionist &amp; Social Interpretation:</strong> Emphasizes that medieval politics was driven by cynical aristocratic self-interest, financial extortion, and factional vendettas that left 85% of ordinary peasant serfs completely disenfranchised.
          </div>
        </div>
      </div>

      <div class="cover-footer">
        <span>Medieval England (1066–1485) &bull; Master Specification Review Index</span>
        <span>Page 20 of 20</span>
      </div>
    </div>
  </div>

</body>
</html>`;
}

/**
 * Main execution runner
 */
async function runMedievalEngland() {
  console.log('🚀 Compiling Publisher-Level Standard Textbook for Medieval England...');

  const htmlContent = await buildPublisherTextbookHtmlMedievalEngland();

  const htmlOutputDir = path.join(ROOT_DIR, 'public', 'units', 'medieval_england');
  if (!fs.existsSync(htmlOutputDir)) fs.mkdirSync(htmlOutputDir, { recursive: true });
  const htmlPath = path.join(htmlOutputDir, 'textbook_PUBLISHER.html');
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  console.log(`✅ Saved HTML companion to: ${htmlPath}`);

  const pdfOutputDir = path.join(ROOT_DIR, 'public', 'pdfs');
  if (!fs.existsSync(pdfOutputDir)) fs.mkdirSync(pdfOutputDir, { recursive: true });
  const pdfPath = path.join(pdfOutputDir, 'medieval_england_textbook_PUBLISHER.pdf');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(120000);
  await page.goto(require('url').pathToFileURL(htmlPath).href, { waitUntil: 'networkidle2' });

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
  });

  console.log(`🎉 Masterpiece PDF Textbook Medieval England successfully compiled!`);
  console.log(`📄 PDF Output: ${pdfPath}`);

  await page.close();
  await browser.close();

  // Synchronize HTML companion to standard unit textbook.html paths
  const prodHtml1 = path.join(ROOT_DIR, 'public', 'units', 'medieval_england', 'textbook.html');
  const prodHtml2 = path.join(ROOT_DIR, 'units', 'medieval_england', 'textbook.html');
  fs.writeFileSync(prodHtml1, htmlContent, 'utf8');
  fs.writeFileSync(prodHtml2, htmlContent, 'utf8');
  console.log(`✅ Synchronized to production textbook HTML: ${prodHtml1}`);

  // Synchronize PDF outputs
  const prodPdfV17 = path.join(
    ROOT_DIR,
    'public',
    'pdfs',
    'medieval_england_textbook_FINAL_V17.pdf',
  );
  const prodPdf = path.join(ROOT_DIR, 'public', 'pdfs', 'medieval_england_textbook.pdf');
  const distPdfV17 = path.join(ROOT_DIR, 'dist', 'pdfs', 'medieval_england_textbook_FINAL_V17.pdf');
  const distPdf = path.join(ROOT_DIR, 'dist', 'pdfs', 'medieval_england_textbook.pdf');

  fs.mkdirSync(path.dirname(distPdfV17), { recursive: true });
  fs.copyFileSync(pdfPath, prodPdfV17);
  fs.copyFileSync(pdfPath, prodPdf);
  fs.copyFileSync(pdfPath, distPdfV17);
  fs.copyFileSync(pdfPath, distPdf);
  console.log(`✅ Synchronized to production V17 PDF: ${prodPdfV17}`);
  console.log(`✅ Synchronized to dist PDF: ${distPdfV17}`);

  // Synchronize to Google Drive Department File (if connected)
  const candidateFolders = [
    'G:\\My Drive\\AAMX\\Dep File\\Year 7\\Medieval England',
    'G:\\My Drive\\AAMX\\Dep File\\Year 8\\Medieval England',
    'G:\\My Drive\\AAMX\\RESOURCES\\pdfs',
  ];
  for (const gDriveFolder of candidateFolders) {
    if (fs.existsSync(gDriveFolder)) {
      try {
        const gDriveMaster = path.join(gDriveFolder, 'Medieval England Master Textbook.pdf');
        const gDriveV17 = path.join(gDriveFolder, 'medieval_england_textbook_FINAL_V17.pdf');
        fs.copyFileSync(pdfPath, gDriveMaster);
        fs.copyFileSync(pdfPath, gDriveV17);
        console.log(`✅ Synchronized Master Textbook to Google Drive: ${gDriveMaster}`);
      } catch (gErr) {
        console.warn(
          `⚠️ Warning: Could not write Master Textbook to Google Drive (${gDriveFolder}):`,
          gErr.message,
        );
      }
    }
  }
}

if (require.main === module) {
  runMedievalEngland().catch((err) => {
    console.error('Fatal textbook compilation error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildPublisherTextbookHtmlMedievalEngland,
  runMedievalEngland,
  run: runMedievalEngland,
};
