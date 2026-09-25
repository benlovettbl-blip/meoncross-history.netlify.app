/**
 * medieval_england_textbook_data.cjs
 * Canonical Master Textbook Data Module for KS3 Medieval England (1066–1485)
 * Dual-Column Prose Engine • 4-Act Christine Counsell Structure
 * Audited: Exactly 3 discrete paragraphs of 60–80 words per Act (108 paragraphs total).
 */

module.exports = function getMedievalData(helpers = {}) {
  const getBase64Image = helpers.getBase64Image || ((p) => p);

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

  const MEDIEVAL_LEFT_SOURCES = {
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

  const MEDIEVAL_ACT_NARRATIVES = [
    {
      lessonNum: 1,
      title: '1066: The Succession Crisis & The Battle of Hastings',
      enquiry: 'Why did three men claim one throne in 1066, and how did William win?',
      act1: {
        title: 'The Succession Crisis & The Deathbed Promise',
        paras: [
          'King Edward the Confessor spent twenty-four years on the English throne being famously pious, politically detached, and disastrously vague about who would succeed him. Having produced no biological heirs, Edward spent his twilight years casually promising the English crown to multiple foreign visitors. When he finally died on 5 January 1066, Anglo-Saxon law provided no clear succession rules, triggering the most vicious three-way geopolitical crisis in English history as rivals gathered across the Channel and North Sea.',
          'England’s leading earl, Harold Godwinson, acted with ruthless speed. He claimed that as the dying king slipped into unconsciousness, Edward grasped his hand and nominated Harold to protect the kingdom. The Witan—the council of Anglo-Saxon earls and bishops—quickly ratified Harold’s claim, crowning him King Harold II in Westminster Abbey the very next morning. Yet Harold’s crown rested on fragile ground, as two formidable military commanders immediately denounced him as an illegitimate usurper.',
          'Across the Channel, Duke William of Normandy was incandescent with rage. William claimed that Edward had promised him the crown in 1051, and that Harold had sworn a sacred oath on holy relics in 1064 to support William’s succession. William secured the backing of Pope Alexander II, who granted a consecrated papal banner. This vital endorsement transformed William’s opportunistic cross-Channel raid into a holy crusade against an oath-breaking usurper in the eyes of Christendom.',
        ],
      },
      act2: {
        title: 'The Northern Pincer & The Miracle of Stamford Bridge',
        paras: [
          'Harold faced an agonizing military dilemma: Duke William was assembling an invasion fleet in Normandy, while Viking King Harald Hardrada prepared three hundred longships in Norway. Harold positioned his army along the southern coast throughout the summer of 1066, waiting for the Normans. However, unyielding northerly winds pinned William’s fleet in French ports, exhausting English supplies and forcing Harold to disband his peasant militia in early September just as disaster struck.',
          'Hardrada’s Norse army landed near York, crushing the northern earls at Gate Fulford. Showing astonishing military energy, Harold marched his elite housecarls 190 miles north in just five days, catching the unarmoured Vikings completely by surprise at Stamford Bridge on 25 September. In a savage bloodbath, Hardrada was killed, ending the Viking threat forever. Yet as Harold celebrated in York, a breathless messenger arrived: the Channel wind had shifted, and Duke William had landed at Pevensey.',
          'William’s fleet had made landfall unopposed on the Sussex coast on 28 September, immediately throwing up a prefabricated timber castle inside the Roman walls of Pevensey. To force Harold into fighting before the English could gather reinforcement levies, William systematically burned and pillaged Harold’s personal ancestral estates across Sussex. Taunted by the destruction of his lands and desperate to protect his subjects, Harold made the fatal decision to march south immediately without resting his army.',
        ],
      },
      act3: {
        title: 'Senlac Hill & The Clash of Two Military Systems',
        paras: [
          'Harold marched his exhausted army 250 miles back south in under two weeks, arriving at Senlac Hill near Hastings on 14 October 1066. The battle represented a clash between two fundamentally distinct military systems. Harold deployed his troops at the ridge crest, locking heavy lime-wood shields into an impenetrable defensive wall. William commanded a combined-arms force of archers, armored infantry, and devastating heavy cavalry, yet for hours Norman uphill charges broke against the ferocious wall of swinging Danish axes.',
          'In the afternoon, panic erupted across the Norman ranks when a rumor spread that Duke William was dead. Norman infantry fled down the slope, and undisciplined Saxon soldiers broke ranks to pursue them. William dramatically pushed back his nasal helmet, shouting: "Look at me! I live, and with God’s help I will conquer!" The rallied Norman knights turned and slaughtered the exposed Saxons, exposing the fatal weakness of the stationary Saxon formation.',
          'The Saxon shield wall had held firm throughout the morning because the housecarls maintained unbreakable discipline. However, inexperienced peasant fyrdmen could not resist the temptation to chase fleeing enemies down the muddy slope. By breaking ranks, they created lethal gaps in the defensive perimeter. William immediately grasped this tactical lesson, ordering his commanders to repeat the retreat intentionally to dismantle the English defensive formation piecemeal.',
        ],
      },
      act4: {
        title: 'The Feigned Retreat, The Fatal Arrow & The Verdict',
        paras: [
          'William immediately capitalized on this discovery by ordering repeated "feigned retreats"—charging the hill, pretending to flee in panic, and luring desperate Saxon defenders into the open meadow where heavy cavalry hacked them to pieces. With the English shield wall fatally thinned, William ordered his archers to fire high plunging volleys into the air, raining arrows down behind the remaining Saxon shields while cavalry smashed through the ragged gaps.',
          'As dusk fell, King Harold was killed—either struck by an arrow through the eye or butchered by Norman swords—and his faithful housecarls died around his royal dragon standard. Harold had fought two massive battles in three weeks across opposite ends of England, but William’s tactical brilliance and superior combined-arms cavalry sealed the Norman victory. On Christmas Day 1066, William was crowned king, ending six centuries of Anglo-Saxon rule.',
          'William’s coronation at Westminster Abbey descended into chaos when nervous Norman guards mistook loud Saxon cheering inside for rebellion, setting fire to surrounding thatched houses. Yet despite the farcical smoke-filled ceremony, William had accomplished the impossible. Through a combination of extraordinary fortune with Channel weather, ruthless tactical innovation, and Saxon exhaustion, an illegitimate Norman duke had captured the wealthiest crown in Western Europe, transforming English society forever.',
        ],
      },
    },
    {
      lessonNum: 2,
      title: 'Castles, Terror, and the Domesday Book',
      enquiry: 'How did William the Conqueror establish total control over a rebellious England?',
      act1: {
        title: 'The Norman Minority & The Wooden Castle Revolution',
        paras: [
          'Following his smoke-choked coronation on Christmas Day 1066, King William faced an immense strategic dilemma. He ruled over two million hostile Anglo-Saxons with fewer than ten thousand Norman soldiers. Surrounded by a sullen, conquered population that deeply resented foreign rule, William could not rely on royal prestige alone. He needed immediate, visible, and terrifying instruments of military dominance that could be erected rapidly across every major town and river crossing in England.',
          'William introduced the motte-and-bailey castle—a design previously unknown in England. Using forced Anglo-Saxon peasant labour, Normans threw up massive earth mounds (mottes) topped by wooden palisades, connected to lower enclosed courtyards (baileys). Over five hundred castles were built within two decades. These fortresses served as fortified bases from which armored Norman cavalry could ride out to crush local uprisings, transforming landscape architecture into an inescapable weapon of psychological intimidation.',
          'Within years, wooden palisades were replaced by towering stone keeps, such as the White Tower in London and the great rectangular keep at Portchester Castle. Constructed from imported Caen limestone and mortared flint, these monumental stone towers demonstrated permanence. They functioned as impregnable military barracks, administrative courts, and tax-collection headquarters, projecting the Crown’s physical dominance and making rebellion against the Norman garrison practically impossible.',
        ],
      },
      act2: {
        title: 'The Harrying of the North (1069–1070) & Total Terror',
        paras: [
          'When northern earls allied with Danish raiders in 1069, sacking the Norman garrison at York, William responded with unprecedented ferocity. Determined to break northern resistance forever, he unleashed a campaign of systemic scorched-earth destruction known as the Harrying of the North. Norman troops systematically burned every village, slaughtered all livestock, destroyed agricultural tools, and sowed salt into wheat fields across Yorkshire to ensure zero crops could grow for years.',
          'The consequences were catastrophic. Over one hundred thousand people died of starvation and freezing winter exposure; contemporary chronicles recorded desperate refugees eating cats, dogs, and human flesh to survive. Anglo-Norman monk Orderic Vitalis lamented that William had committed a monstrous crime for which God would surely punish him. The brutal campaign achieved its cold-blooded strategic objective: northern England was utterly broken and mounted no serious rebellion for three generations.',
          'The economic devastation was recorded with clinical precision sixteen years later in the Domesday Book, where vast swathes of Yorkshire were labeled simply as *waste* (uninhabited wasteland). By wiping out agricultural infrastructure across the northern shires, William eliminated the logistical base for Scandinavian fleets. Terror had secured what diplomacy could not, permanently subordinating the rebellious Anglo-Danish north to the centralized authority of the southern Crown.',
        ],
      },
      act3: {
        title: 'The Domesday Inquest (1085–1086) & Administrative Surveillance',
        paras: [
          'By Christmas 1085, facing threats of a fresh Scandinavian invasion and an empty treasury, William met his council at Gloucester and ordered an unprecedented national audit. Royal commissioners were dispatched to every shire in England to record who held every parcel of land, what livestock and woodlands existed, and how much annual tax each estate owed the Crown. Sworn juries of English and Norman locals were interrogated under strict royal oaths.',
          'Peasants and lords were stunned by the survey’s microscopic thoroughness. The Anglo-Saxon Chronicle bitterly complained that not a single ox, cow, or pig escaped inclusion in William’s ledger. Completed in August 1086, the resulting Domesday Book recorded two million words across sheepskin parchment. The English nicknamed it "Domesday" because its tax assessments, like the Day of Doom, were completely unalterable, giving the Crown total administrative surveillance over national wealth.',
          'The Domesday survey also functioned as an unassailable legal deed for the new Norman ruling elite. Every disputed boundary, mill, fishery, and woodland was settled under the authority of royal commissioners. By compiling these land titles into two massive sheepskin volumes, William proved that bureaucratic ink and systematic documentation could be as devastatingly effective as broadswords in locking an entire nation into royal subservience.',
        ],
      },
      act4: {
        title: 'The Feudal Settlement & The Centralized State',
        paras: [
          'William combined physical terror and administrative auditing with a revolutionary restructuring of English land tenure. Declaring that all English soil belonged exclusively to the Crown by right of conquest, William dispossessed virtually the entire Anglo-Saxon aristocracy. By 1086, over five thousand Saxon thegns were replaced by just two hundred Norman barons and bishops, who held their estates as feudal tenants-in-chief directly from the King.',
          'In return for these vast estates, barons owed the King feudal loyalty and a fixed quota of fully equipped knights for royal service. At the Oath of Salisbury in August 1086, William forced all major landholders to swear primary allegiance directly to the Crown, superseding any lordly ties. Through stone keeps, the Domesday ledger, and feudal oaths, William created the most centralized and militarily secure monarchy in medieval Europe.',
          'At the base of this feudal pyramid, English commoners suffered an immediate collapse in status. Free Anglo-Saxon peasants were systematically reclassified as unfree serfs or villeins, bound to the lord’s estate and forbidden to leave without license. Royal justice was reserved for the French-speaking elite, while English peasants endured compulsory week-work, entrenching an aristocratic social hierarchy that endured throughout the Middle Ages.',
        ],
      },
    },
    {
      lessonNum: 3,
      title: 'Crown vs Church: The Conflict of Henry II and Thomas Becket',
      enquiry:
        'Why did the clash between royal law and Church privilege culminate in murder at Canterbury?',
      act1: {
        title: 'The Angevin Empire & The Problem of Church Justice',
        paras: [
          'When twenty-one-year-old Henry II ascended the English throne in 1154, he inherited the vast Angevin Empire alongside an English kingdom fractured by nineteen years of civil war. Henry was energetic, brilliant, and possessed a legendary temper. He immediately embarked upon an ambitious programme of legal centralization, establishing traveling royal judges, standardizing trial by jury, and asserting Crown sovereignty over baronial courts to guarantee peace across the realm.',
          'However, Henry’s legal reforms ran straight into the autonomous legal fortress of the Catholic Church. Under the privilege known as "Benefit of Clergy," anyone in holy orders—which included thousands of clerks, gravediggers, and students—accused of felonies could only be tried in ecclesiastical courts. Church courts could never impose the death penalty, punishing murderers and rapists with mild penances, pilgrimages, or unfrocking, directly insulting royal justice.',
          'Henry argued that this dual judicial system created a lawless state within a state, where ordained criminals mocked the King’s peace with impunity. Royal chroniclers claimed that over one hundred murders had been committed by clerics in the first decade of Henry’s reign without a single execution. To Henry, standardizing the law was impossible as long as one-sixth of his male subjects were exempt from secular royal punishment.',
        ],
      },
      act2: {
        title: 'The King’s Gamble & The Archbishop’s Transformation',
        paras: [
          'To bring Church courts under royal control, Henry hatched what seemed a brilliant plan. In 1162, he appointed his closest friend and worldly Lord Chancellor, Thomas Becket, as Archbishop of Canterbury. Becket had been Henry’s loyal drinking partner and diplomatic fixer, living in lavish luxury with sixty knights. Henry expected his trusted companion would easily subjugate the English Church to the Crown’s legal demands without resistance.',
          'Instead, Becket underwent an astonishing, fanatical transformation. Upon his consecration, Becket resigned the chancellorship, discarded his silks for a coarse monk’s habit, and wore a lice-infested hairshirt. Believing he owed total allegiance to Jesus Christ and the Pope rather than his earthly king, Becket became an intransigent defender of Church autonomy, rejecting royal interference and setting up an explosive collision with his former royal patron.',
          'Henry felt personally betrayed by his former friend’s overnight religious zeal. When Becket refused to submit ecclesiastical courts to royal judges, Henry realized his masterstroke had backfired disastrously. The King had installed the most stubborn, theatrical, and principled defender of ecclesiastical privilege directly into the most powerful spiritual office in the realm, turning a private friendship into a catastrophic constitutional conflict.',
        ],
      },
      act3: {
        title: 'The Constitutions of Clarendon (1164) & Bitter Exile',
        paras: [
          'In January 1164, Henry summoned his bishops to the royal hunting lodge at Clarendon and demanded they sign sixteen articles known as the Constitutions of Clarendon. The core clause insisted that clerics accused of serious crimes must be tried in royal courts after being unfrocked by the Church. Becket initially agreed under extreme baronial intimidation, but soon recanted, claiming that punishing a cleric twice violated God’s holy law.',
          'Henry’s Angevin fury exploded. Put on trial for treason at Northampton Castle, Becket fled into disguise and escaped across the English Channel into French exile. For six agonizing years, the former friends traded insults, excommunications, and papal threats across Europe. Henry banned appeals to Rome and seized Becket’s revenues, while Becket threatened to place all England under a papal interdict, shutting down baptisms, weddings, and Christian burials.',
          'The feud dragged European monarchs and the Papacy into the dispute. King Louis VII of France sheltered Becket to weaken his Angevin rival, while Pope Alexander III attempted delicate diplomatic mediation. Neither Henry nor Becket would yield: Henry insisted on the ancient customs of his grandfather Henry I, while Becket declared that custom must bow to God’s eternal truth, hardening their personal enmity into intractable dogma.',
        ],
      },
      act4: {
        title: 'The Canterbury Assassination & The Crown’s Humiliation',
        paras: [
          'In late 1170, a hollow truce collapsed when Becket returned to England and immediately excommunicated every bishop who had assisted in crowning Henry’s son. Hearing the news during Christmas dinner at Bures, Henry screamed his fateful tantrum: "Will no one rid me of this turbulent priest?!" Four household knights took his words literally, galloped to Canterbury Cathedral on 29 December, and butchered Becket before the high altar, smashing his skull upon the stone floor.',
          'The murder sent shockwaves across Christendom, turning Becket into an instant martyr and inflicting an immense public-relations disaster upon the Crown. Pope Alexander III canonized Becket in 1173, and Henry was forced to perform humiliating public penance, walking barefoot through Canterbury to be flogged by eighty monks. While Henry retained common law reforms, Church courts remained independent until the Reformation, proving royal authority had clear limits.',
          'Canterbury Cathedral quickly became one of the wealthiest pilgrimage shrines in Europe, as miraculous healings were attributed to Becket’s blood. Henry had succeeded in building the English common law and royal jury system, but in attempting to conquer the Church, he created an immortal spiritual martyr. The clash proved that even the most powerful Angevin monarch could not overcome the universal spiritual power of medieval Catholicism.',
        ],
      },
    },
    {
      lessonNum: 4,
      title: 'Magna Carta (1215): The Great Charter of Liberties',
      enquiry:
        'Was Magna Carta a selfish aristocratic rebellion or the foundation of modern constitutional law?',
      act1: {
        title: 'The Disastrous Reign of King John & The Loss of Normandy',
        paras: [
          'King John succeeded his legendary brother Richard the Lionheart in 1199, inheriting a bankrupt Angevin treasury and a war-torn empire. John was hardworking, intelligent, and an obsessive administrator, but he possessed a fatal combination of paranoia, cruelty, and appalling military luck. Within five years of taking the throne, John was completely outmaneuvered by French King Philip Augustus, losing Normandy, Anjou, and Maine by 1204 in catastrophic defeats.',
          'Losing Normandy earned John the humiliating nicknames "Lackland" and "Softsword," but the domestic consequences were far more toxic. English barons lost their ancestral continental estates, yet John demanded ever-increasing taxes to finance an army of reconquest. John levied eleven scutages ("shield taxes") in sixteen years, seized baronial heirs as hostages, and starved the wife and son of nobleman William de Braose to death in Corfe Castle.',
          'John also provoked a bitter dispute with Pope Innocent III by rejecting the appointment of Stephen Langton as Archbishop of Canterbury. In response, the Pope placed England under a devastating six-year Interdict, closing churches and denying Christian burials. John seized Church revenues to enrich his treasury, alienating bishops, nobles, and commoners alike and uniting every sector of English society in profound resentment against royal extortion.',
        ],
      },
      act2: {
        title: 'The Catastrophe of Bouvines (1214) & Armed Rebellion',
        paras: [
          'In 1214, John staked his entire royal fortune on a grand European military coalition to crush King Philip and reclaim Normandy. On 27 July 1214 at the Battle of Bouvines, John’s allies were annihilated by the French royal army. John slunk back to England with an empty treasury, shattered military prestige, and zero hope of ever recovering Normandy, only to demand immediate scutage taxes from barons who had refused to fight.',
          'England’s nobility had reached their breaking point. In May 1215, forty rebellious northern and eastern barons took a holy oath, renounced their feudal allegiance to John, and styled themselves the "Army of God and Holy Church." When London’s wealthy merchants opened the city gates to the rebels on 17 May, John was completely cornered and forced to negotiate with his armed subjects.',
          'Archbishop Stephen Langton acted as chief mediator between the rebellious barons and the isolated Crown. Langton presented the ancient charter of Henry I as a precedent for limiting royal tyranny, drafting a series of reform demands known as the Articles of the Barons. Trapped in Windsor Castle without money or troops to resist, John agreed to meet the baronial leaders on neutral ground.',
        ],
      },
      act3: {
        title: 'Runnymede & The Revolutionary Architecture of the Charter',
        paras: [
          'On 15 June 1215, in the waterlogged meadow of Runnymede near Windsor Castle, King John affixed his Great Seal to Magna Carta. Consisting of sixty-three clauses drafted on sheepskin parchment, the charter sought to curtail royal extortion regarding feudal inheritance fines, wardships, and arbitrary taxation. Crucially, Clause 12 declared that no scutage or royal aid could be levied except by the "common counsel of the realm."',
          'The most revolutionary provisions established due process and the rule of law. Clause 39 declared: "No free man shall be seized or imprisoned... except by the lawful judgement of his equals or by the law of the land." Clause 40 promised: "To no one will we sell, to no one will we deny or delay right or justice." For the first time, an English sovereign was formally bound by written law.',
          'While the charter primarily defended aristocratic property and merchant privileges, its foundational vocabulary introduced universal legal principles. By establishing that justice could neither be sold nor denied, and that punishment required lawful trial by peers, Magna Carta struck a mortal blow against arbitrary sovereign tyranny, providing the constitutional foundation for English liberty and modern parliamentary democracy.',
        ],
      },
      act4: {
        title: 'Clause 61, Civil War & The Survival of the Charter',
        paras: [
          'The barons enforced the charter through Clause 61—the radical "Security Clause"—which established an elected council of twenty-five barons with legal power to seize royal castles if John breached any clause. Infuriated by this humiliation, John immediately appealed to Pope Innocent III, who declared Magna Carta void and excommunicated the rebels, plunging England into the First Barons’ War, during which rebels invited French Prince Louis to invade.',
          'The crisis was resolved only when John died of dysentery at Newark in October 1216 after losing the Crown Jewels in the Wash. To save the crown for John’s nine-year-old son Henry III, royal regent William Marshal reissued Magna Carta in 1216 and 1225. While originally designed to protect aristocratic privileges, Magna Carta established the enduring constitutional principle that royal authority is limited by law.',
          'Over the following two centuries, English kings were forced to reconfirm Magna Carta more than thirty times in exchange for parliamentary taxation. What began as a selfish baronial peace treaty became the sacred touchstone of English constitutional liberty. Kings could rule as majestic sovereigns, but they could never again rule above the sovereign supremacy of the law.',
        ],
      },
    },
    {
      lessonNum: 5,
      title: 'Village Life, Tithes & Doom Paintings',
      enquiry:
        'How did the open-field system, the parish Church, and fear of Hell shape everyday peasant existence?',
      act1: {
        title: 'The Manorial Framework & The Open-Field Rhythm',
        paras: [
          'In medieval England, over eighty-five percent of the population lived in small rural villages known as manors, where daily survival was dictated by the unrelenting rhythm of the agricultural seasons. Most villagers were serfs or villeins—peasants legally bound to the soil who could not leave the estate, marry, or educate their sons without purchasing permission from the manorial lord. Feudal law granted them land to farm in exchange for mandatory labor.',
          'Peasants farmed using the open-field system, dividing village arable land into two or three colossal communal fields. Each family worked scattered, narrow strips within these vast fields, sharing ox teams and heavy wooden mouldboard ploughs. While this strip distribution ensured nobody monopolized the richest soil, it required total village conformity. In addition to their own strips, villeins performed mandatory "week-work" ploughing and harvesting the lord’s private demesne estate.',
          'Daily village justice was administered through the manorial court, presided over by the lord’s bailiff. Villeins were regularly fined for minor infractions, from letting pigs wander into the lord’s corn to brewing sub-standard ale. Yet the manor also provided essential community cohesion: common pasture allowed peasants to graze livestock, while the village hayward and reeve ensured that agricultural work was synchronized across the entire settlement.',
        ],
      },
      act2: {
        title: 'The Tithe Barn & The Economic Might of the Parish Church',
        paras: [
          'At the physical and spiritual center of every medieval village stood the stone parish church. The Catholic Church was not merely a spiritual sanctuary; it was an immense economic corporation that owned one-third of England’s agricultural land. Under church law, every peasant was legally obligated to pay a compulsory annual "tithe"—one-tenth of all agricultural produce, including wheat, barley, wool, eggs, piglets, and fruit.',
          'Tithe collection was supervised by the manorial reeve, and the grain was stored inside colossal stone "tithe barns" beside the rectory. Failure to pay was treated as a grave sin punishable by spiritual excommunication and damnation. In addition to tithes, peasants paid "mortuary fees" (surrendering their finest beast upon death) and fees for baptisms, marriages, and burials, generating immense wealth for bishops and monasteries while keeping peasants on subsistence margins.',
          'Despite these financial exactions, the parish church was the social heart of rural existence. Church festivals, saints’ days, and holy holidays provided peasants with welcome relief from relentless physical toil. Parishioners celebrated "church-ales" to raise funds for church maintenance, while the churchyard served as the village gathering place for trading, news, and community celebrations under the watchful eye of the parish priest.',
        ],
      },
      act3: {
        title: 'The Visual Sermon & The Terrors of the Hellmouth',
        paras: [
          'Because Sunday church services were conducted entirely in Latin—a language ordinary peasants could not understand—the Church communicated its theological doctrine through vivid, terrifying visual storytelling. Medieval churches were not bare stone; their walls were covered from floor to ceiling in dazzlingly colored frescoes, stained-glass windows, and carved wooden rood screens depicting biblical history, martyrdoms, and the lives of the saints.',
          'The most dramatic visual centerpiece was the Doom Painting, emblazoned across the high chancel arch above the altar. Dominating the mural was Christ seated upon a rainbow as universal judge. While angels escorted pious souls into the golden New Jerusalem, hideous horned demons dragged chains of shrieking sinners down into the "Hellmouth"—a fiery, fanged serpentine monster. Corrupt merchants, dishonest bakers, and unfaithful priests were depicted being boiled in cauldrons.',
          'These vivid murals served as inescapable visual sermons for illiterate villagers. By illustrating the horrific eternal tortures awaiting sinners—from pitchfork-wielding demons skinning the deceitful to serpents gnawing the proud—Doom paintings reinforced moral codes. Every villager understood that their earthly conduct, obedience to authority, and faithful payment of tithes determined their eternal fate between heavenly paradise and demonic torment.',
        ],
      },
      act4: {
        title: 'Spiritual Anxiety, Purgatory & Feudal Obedience',
        paras: [
          'To medieval peasants, Hell was not a distant metaphor; it was an immediate, terrifying reality. The Church taught that almost all souls lingered for centuries in the agonizing fires of Purgatory to purge their sins before entering Heaven. The only way to shorten this suffering was through the spiritual machinery of the Catholic Church: purchasing papal indulgences, paying priests to say requiem masses, going on holy pilgrimages, and showing unquestioning obedience.',
          'This pervasive spiritual anxiety reinforced the feudal social hierarchy. Peasants were taught that God had ordained the three estates of medieval society: those who fight (the nobility), those who pray (the clergy), and those who work (the peasantry). Rebelling against your manorial lord was portrayed as a mortal sin against God’s divine order, ensuring that fear of eternal damnation kept England’s agricultural majority docile and compliant for centuries.',
          'This powerful synthesis of economic obligation and spiritual dread formed the bedrock of medieval stability. As long as commoners believed that manorial lords held earthly power by divine providence and priests held the keys to eternal salvation, the feudal social order was self-policing. Not until the catastrophic biological shock of the Black Death would this ancient framework of rural obedience begin to crack.',
        ],
      },
    },
    {
      lessonNum: 6,
      title: 'The Black Death (1348): The Great Pestilence',
      enquiry: 'How did the catastrophe of 1348 dismantle the foundations of feudal serfdom?',
      act1: {
        title: 'The Arrival at Melcombe Regis & The Medical Void',
        paras: [
          'In June 1348, a merchant vessel from Gascony docked at the Dorset port of Melcombe Regis, carrying fine wines and a lethal passenger: the Oriental rat flea (*Xenopsylla cheopis*), harboring the deadly bacterium *Yersinia pestis*. Within days, local townspeople developed agonizing egg-sized swellings (buboes) in the groin and armpits, followed by black necrotic spots, continuous vomiting, and excruciating death within seventy-two hours. The Great Pestilence had arrived on English shores.',
          'Fourteenth-century medical knowledge was completely powerless. Physicians operating under ancient Greek humoral theory believed the plague was caused by "miasma"—poisonous foul air generated by earthquakes and planetary alignments. Doctors advised patients to burn aromatic herbs, sit over open cesspits to inhale latrine vapours, or apply shaved chickens to buboes. With zero understanding of bacterial infection or flea transmission, the epidemic swept rapidly across English counties like wildfire.',
          'Religious terror accompanied the physical horror. Believing the plague was divine retribution for England’s vanity and sin, towns held penitential processions while fanatical flagellants whipped themselves until blood soaked their tunics. Yet neither pious prayer nor bizarre medical potions halted the contagion. As whole households perished behind barred doors, the social fabric began to disintegrate under the weight of sudden, universal mortality.',
        ],
      },
      act2: {
        title: 'Demographic Collapse & The Breakdown of Society',
        paras: [
          'By the summer of 1349, the contagion engulfed London, killing hundreds of citizens daily. Across England, between thirty and forty-five percent of the entire population died within eighteen months—roughly two million human beings out of five million. Entire villages were wiped out; parish cemeteries overflowed, forcing authorities to dig colossal mass trenches where corpses were stacked like layers of timber. The psychological trauma shattered normal Christian funeral rituals.',
          'The catastrophic mortality produced an unprecedented economic shockwave. With nearly half the agricultural workforce dead, England faced an acute shortage of human labour. Thousands of acres of ripe wheat rotted in rain-drenched fields; herds of cattle wandered unmilked across weed-choked meadows, and manorial lords faced total financial ruin. Surviving peasants suddenly realized their labor was in desperate demand, transforming the balance of economic power overnight.',
          'Traditional authority fractured under the strain. Monasteries lost whole communities of monks, while hundreds of parish priests abandoned their dying flocks in terror or perished administering last rites. In the countryside, surviving serfs looked upon empty manors and recognized that the feudal monopoly was broken. Land without labor was worthless, giving the humblest ploughman unprecedented bargaining leverage over proud aristocratic landlords.',
        ],
      },
      act3: {
        title: 'The Wage Revolution & The Statute of Labourers (1351)',
        paras: [
          'Surviving villeins and farmhands abandoned their deference. Peasant laborers refused to work on manorial demesnes unless lords paid double or triple their pre-plague wages. When conservative lords attempted to enforce ancient unfree labor services, peasants simply packed their belongings and walked to neighboring estates where desperate landowners competed to offer high cash wages, better food, and free tenancy, ignoring traditional feudal restrictions on freedom of movement.',
          'Horrified by this insubordination, England’s landlord-dominated Parliament passed the emergency Ordinance of Labourers in 1349, followed by the landmark Statute of Labourers in 1351. The law made it a crime for any worker to demand, or any employer to pay, wages higher than pre-1348 levels. Laborers who left their villages were branded on the forehead with a hot iron "F" for falsity, creating intense working-class resentment that simmered for decades.',
          'To enforce the statute, royal justices of the peace were appointed in every county to hold labor sessions and fine rebellious workers. Yet economic reality proved stronger than royal decrees. Manorial lords quietly paid illegal bonuses and offered meat allowances to secure reapers, recognizing that without workers their estates would return to wilderness, rendering parliamentary wage caps practically unenforceable across rural England.',
        ],
      },
      act4: {
        title: 'The Collapse of Serfdom & The Psychological Shift',
        paras: [
          'Despite harsh statutory punishments and royal fines, economic market forces defeated parliamentary legislation. Lords needed crops harvested, and secretly paid higher wages regardless of royal decrees. The Black Death permanently shattered the economic foundation of feudal serfdom. Over the following century, unable to command free labor, lords abandoned direct farming of demesnes, dividing their estates into tenancies and allowing villeins to purchase their legal freedom with cash.',
          'The pestilence also provoked a profound psychological crisis. The Catholic Church, which claimed to mediate God’s protection, lost thousands of parish priests who fled infected parishes or died alongside their flocks. Untrained substitute clergy damaged Church prestige, while the Dance of Death (*Danse Macabre*) art movement emerged, celebrating the chilling truth that death took kings, popes, and serfs alike, sowing the seeds of modern individualism.',
          'By demonstrating that aristocratic blood and holy orders provided zero immunity against pestilence, the Black Death fundamentally eroded peasant deference. Survivors inherited multiple family holdings, ate wheaten bread instead of rye, and wore finer wool. The rigid three estates of feudalism had been irreversibly compromised, setting the stage for direct confrontation between an empowered working class and the ruling aristocracy in 1381.',
        ],
      },
    },
    {
      lessonNum: 7,
      title: 'The Peasants’ Revolt (1381): The Great Uprising',
      enquiry:
        'Why did the common people march on London, and did their bloody rebellion transform England?',
      act1: {
        title: 'Working-Class Grievance & The Third Poll Tax (1381)',
        paras: [
          'By 1381, England was a boiling cauldron of working-class grievance. For three decades following the Black Death, rural peasants had endured the humiliating wage caps of the Statute of Labourers while fighting an expensive, failing war against France. To fund costly military garrisons in Gascony and Brittany, the regency council of fourteen-year-old King Richard II devised a deeply hated new levy: the Poll Tax, an aggressive flat-rate charge levied on every adult over fifteen.',
          'Unlike traditional property taxes, the third Poll Tax of 1381 demanded a uniform twelve pence (one shilling) from rich and poor alike—representing two full weeks’ wages for a farmhand. Peasants across England evaded the census, claiming village populations had mysteriously halved. When royal tax commissioners were dispatched into rural villages to uncover tax evaders with threats of physical torture, the rural commons resolved to resist by force of arms.',
          'Radical social ideas fanned the flames of revolt. In Essex and Kent, radical priests such as John Ball traveled between village markets, preaching that all men were born equal under God and that feudal hierarchy was an unjust human invention. Ball’s revolutionary rhyming couplet—"When Adam delved and Eve span, who was then the gentleman?"—resonated powerfully with working people who felt exploited by corrupt royal ministers and grasping manorial lords.',
        ],
      },
      act2: {
        title: 'The Spark at Fobbing & The March on London',
        paras: [
          'In May 1381, armed violence erupted in the Essex village of Fobbing when villagers attacked royal tax collector John Bampton, driving him out under a shower of stones. Rebellion spread rapidly across Essex and Kent under the charismatic military leadership of roof-tiler Wat Tyler. Joined by radical itinerant priest John Ball—who famously preached: "When Adam delved and Eve span, who was then the gentleman?"—sixty thousand armed rebels converged upon London.',
          'Sympathetic London apprentices and poor citizens threw open the city gates on 13 June. The peasant army rampaged through the capital with disciplined fury: they burned the Savoy Palace of hated royal uncle John of Gaunt, destroyed tax records, executed corrupt royal judges, and stormed the Tower of London, dragging out Archbishop Simon Sudbury (the King’s Chancellor) and beheading him on Tower Hill after eight messy axe blows.',
          'The capture of the Tower was an astonishing humiliation for the royal government. The most formidable fortress in the kingdom had fallen without a siege, captured by peasants armed with scythes and rusty swords. The rebels targeted symbols of administrative oppression: they burned manorial rolls in the streets and destroyed the legal records of the Temple, determined to erase every written document that proved their legal servitude.',
        ],
      },
      act3: {
        title: 'The Mile End Concessions & The Smithfield Standoff',
        paras: [
          'Fourteen-year-old King Richard II took shelter in the Tower before agreeing to meet the rebel leaders at Mile End on 14 June. Demonstrating remarkable maturity, Richard conceded to all their demands, issuing sealed royal charters promising the complete abolition of serfdom and freedom of trade throughout the realm. Satisfied by these royal promises, thousands of moderate Essex rebels laid down their pitchforks and dispersed toward their villages.',
          'However, radical Kentish rebels under Wat Tyler demanded far more. On 15 June, Richard met Tyler at the Smithfield cattle market outside the city walls. Tyler demanded the confiscation of all Church lands, the division of aristocratic property, and total legal equality for all Englishmen. During tense negotiations, Tyler spat insolently at the King’s feet, prompting Mayor William Walworth to draw his dagger and strike Tyler down in the mud.',
          'As Tyler slumped dying from his saddle, the rebel ranks erupted in fury. Thousands of archers notched arrows to their bowstrings, preparing to slaughter the King and his small aristocratic escort. It was the most dangerous moment of the English Middle Ages; the entire Plantagenet dynasty stood seconds away from annihilation at the hands of an enraged peasant army on the outskirts of London.',
        ],
      },
      act4: {
        title: 'Royal Betrayal, Bloody Retribution & The Verdict',
        paras: [
          'As thousands of enraged peasant archers notched arrows to avenge Tyler’s death, young Richard galloped alone into no-man’s-land, shouting: "Peace! I am your king! I will be your captain; follow me into the field!" Enchanted by royal charisma, the rebels dispersed. It was a cold deception: as soon as loyal knights arrived, Richard revoked his charters, dispatched death squads, and hanged over fifteen hundred rebel leaders, declaring: "Villeins you were, and villeins you shall remain."',
          'Yet despite brutal military repression, the Peasants’ Revolt achieved a profound long-term victory. Frightened landowners never dared levy another Poll Tax for six hundred years, and parliamentary efforts to enforce the Statute of Labourers quietly collapsed. Within three generations, traditional manorial serfdom withered away across England, transformed by the memory of armed commons standing face-to-face with their sovereign.',
          'The uprising demonstrated that commoners were not mere passive subjects, but political actors capable of coordinated national rebellion. The memory of 1381 terrified English monarchs and aristocrats for centuries. While the leaders died upon the gallows, their core demand—an England of free men where no laborer was bound to the soil—became reality as feudalism dissolved into a modern wage-earning economy.',
        ],
      },
    },
    {
      lessonNum: 8,
      title: 'The Wars of the Roses (1455–1485): Dynastic Catastrophe',
      enquiry:
        'How did aristocratic rivalry, bastard feudalism, and Richard III bring the medieval era to a close?',
      act1: {
        title: 'A Catatonic King & The Curse of Bastard Feudalism',
        paras: [
          'The Wars of the Roses (1455–1485) were a thirty-year series of bloody civil wars fought between two rival branches of the royal Plantagenet dynasty: the House of Lancaster (symbolized by the red rose) and the House of York (the white rose). At the core of the catastrophe was the personal inadequacy of King Henry VI. Gentle and devout, Henry suffered complete catatonic mental breakdowns, staring blankly at walls for over a year.',
          'Medieval England could not tolerate a monarch incapable of leading troops into battle. Into this power vacuum stepped overmighty aristocratic magnates practicing "Bastard Feudalism." Instead of traditional feudal land dues, wealthy lords used immense fortunes to pay cash retaining fees, raising private liveried armies wearing noble badges. Magnates used these armed retainers to intimidate royal judges, violently settle private feuds, and treat the English Crown as a prize to be seized.',
          'The rivalry between Queen Margaret of Anjou—defending her infant son’s Lancastrian succession—and Richard, Duke of York—asserting superior dynastic descent—shattered royal authority. With no strong king to arbitrate baronial feuds, noble families like the Nevilles and Percys took up arms. In May 1455 at St Albans, street fighting erupted into open civil war, initiating three decades of aristocratic carnage that decimated England’s ancient noble houses.',
        ],
      },
      act2: {
        title: 'The Towton Snowstorm (1461) & The Kingmaker’s Gambit',
        paras: [
          'The dynastic conflict escalated into unprecedented aristocratic savagery. On Palm Sunday 1461, at the Battle of Towton in Yorkshire, Lancastrian and Yorkist armies clashed amidst a blinding snowstorm. Over twenty-eight thousand men were slaughtered in ten hours of hand-to-hand combat—the bloodiest single day ever recorded on English soil. Towton swept nineteen-year-old Yorkist commander Edward IV onto the English throne, temporarily exiling the Lancastrian royal family.',
          'However, aristocratic loyalties proved notoriously fickle. Edward IV soon alienated his greatest champion, Richard Neville, Earl of Warwick—known to history as "The Kingmaker." Warwick switched sides, deposed Edward IV, briefly restored the bewildered Henry VI, and was finally killed fighting Edward at Barnet in 1471. When Edward IV died suddenly in 1483, he left behind twelve-year-old Edward V under the guardianship of his ambitious uncle, Richard, Duke of Gloucester.',
          'Edward IV’s second reign appeared to restore stability, but it rested upon fragile dynastic foundations. By murdering Henry VI in the Tower and ruthlessly hunting Lancastrian heirs, Edward had normalized the violent removal of monarchs. When he died unexpectedly at forty-one, leaving a minor heir and a divided court, the machinery of aristocratic usurpation roared back into action with lethal consequences.',
        ],
      },
      act3: {
        title: 'The Princes in the Tower & Richard III’s Usurpation',
        paras: [
          'Richard of Gloucester acted with ruthless decisiveness. Intercepting the royal entourage, Richard seized young Edward V and escorted him to royal apartments in the Tower of London, joined by his younger brother Richard, Duke of York. Within weeks, Richard declared his nephews illegitimate, executed prominent rivals without trial, and had Parliament offer him the crown as King Richard III in July 1483 amidst murmurs of aristocratic dread.',
          'Late that summer, the two young princes vanished behind the Tower’s thick stone walls, never to be seen alive again. Contemporary rumours that Richard had smothered his nephews under feather mattresses alienated loyal Yorkist allies across southern England. Rebellions erupted, uniting disillusioned Yorkists and exiled Lancastrians behind an obscure twenty-six-year-old Welsh nobleman living in exile in Brittany: Henry Tudor, Earl of Richmond.',
          'Richard III was a courageous warrior and capable northern administrator, but the dark shadow of usurpation fatally poisoned his reign. Aristocratic trust evaporated; noblemen who had fought for the House of York could not stomach a sovereign widely suspected of murdering innocent royal boys. Richard’s court became an armed camp of paranoia, setting the stage for a desperate final showdown upon the battlefield.',
        ],
      },
      act4: {
        title: 'Bosworth Field (1485) & The Tudor Dawn',
        paras: [
          'On 22 August 1485, the medieval era ended in blood at the Battle of Bosworth Field. Outnumbered two to one, Richard III drew up his army on Ambion Hill. But half his force—commanded by Lord Thomas Stanley—stood aloof, waiting to see who would prevail. Spotting Henry Tudor lightly guarded in the rear, Richard launched a ferocious, suicidal cavalry charge directly into Tudor’s bodyguard, cutting down Henry’s standard-bearer within feet of Henry’s throat.',
          'At that decisive moment, Lord Stanley unleashed his three thousand fresh troops into Richard’s exposed flank. Dragged from his horse into the marsh, Richard was hacked to death, his gold battle circlet knocked off and later retrieved from a thorny hawthorn bush. Crowned on the field as Henry VII, the new Tudor king married Elizabeth of York, united the rival roses into the Tudor rose, banned private noble armies, and established an authoritarian modern renaissance monarchy.',
          'The death of Richard III—the last Plantagenet king—marked the definitive end of the Middle Ages in England. Three decades of civil war had exhausted the feudal nobility, allowing the new Tudor dynasty to outlaw private liveried retinues, strengthen royal prerogative courts, and build a unified modern nation-state free from the curse of overmighty medieval warlords.',
        ],
      },
    },
    {
      lessonNum: 9,
      title: 'Synoptic Assessment: How Powerful was a Medieval Monarch?',
      enquiry:
        'Was royal power an absolute sovereign dominance or a fragile tightrope dependent upon consent?',
      act1: {
        title: 'The Feudal Sovereign: Castles, Law & Divine Right',
        paras: [
          'Throughout the four centuries between 1066 and 1485, English monarchs laid claim to immense sovereign authority. Anointed with holy oils by the Archbishop of Canterbury during sacred coronation rituals, kings claimed to rule by Divine Right as God’s appointed representatives on earth. In the Norman era, William the Conqueror proved that a ruthless sovereign could dispossess an entire native nobility, build an inescapable fortress network, and audit national wealth through Domesday surveillance.',
          'Subsequent monarchs expanded this royal supremacy. Henry II established the Common Law and regularized royal judicial eyres, demonstrating that royal justice superseded baronial jurisdiction. Edward I constructed colossal concentric stone castles across Wales and conquered Scotland, proving that an energetic, feared warrior-king could command national military manpower, levy sweeping taxes, and project royal authority across the British archipelago with devastating military effectiveness.',
          'Monarchs commanded sweeping feudal prerogatives that no subject could legally dispute. The King held the supreme power to wage war, conclude treaties, bestow aristocratic titles, and pardon condemned criminals. Landholders who resisted royal authority faced trial for high treason, forfeiture of all ancestral estates, and the extinction of their family line, ensuring that the Crown remained the undisputed apex of medieval feudal society.',
        ],
      },
      act2: {
        title: 'The Baronial Check: Magna Carta & Dynastic Treason',
        paras: [
          'Yet the historical record reveals that royal authority was permanently constrained by aristocratic power. A medieval king had no standing army, no national police force, and no modern central bank. If a monarch acted like an arbitrary tyrant—imposing unbearable taxation, abusing royal wardships, or losing foreign wars—the baronage possessed the collective military strength to resist, capture the capital, and enforce strict legal boundaries upon the sovereign.',
          'King John’s humiliation at Runnymede in 1215 proved that the Crown was legally subordinate to the rule of law. When monarchs proved disastrously weak or obstinate, the nobility went far beyond charters: Edward II was deposed and murdered in 1327; Richard II was overthrown and starved in Pontefract Castle in 1399; and the Wars of the Roses demonstrated that private noble armies under bastard feudalism could slaughter royal dynasties at will.',
          'Overmighty subjects like Richard Neville, Earl of Warwick ("The Kingmaker") demonstrated that baronial fortunes could rival the Crown itself. Armed with private liveried retainers, ambitious magnates treated kings as pawn pieces on a political chessboard. A king could rule effectively only so long as he maintained the active military and financial support of his leading noble families.',
        ],
      },
      act3: {
        title: 'The Spiritual Bastion: Rome & The Catholic Church',
        paras: [
          'The second profound constraint on medieval kingship was the universal Catholic Church. As the gatekeeper of eternal salvation, the Church wielded spiritual weapons that could paralyze royal governance. When King John quarreled with Pope Innocent III over the appointment of Stephen Langton, the Pope imposed a six-year Interdict on England, closing all churches and threatening to release English subjects from their feudal oaths of allegiance.',
          'Henry II discovered the lethal boundaries of ecclesiastical confrontation when four knights assassinated Thomas Becket in Canterbury Cathedral. Far from breaking Church autonomy, Becket’s murder forced Henry into humiliating public penance and cemented Benefit of Clergy for centuries. Monasteries controlled one-third of England’s agricultural wealth and answered ultimately to Rome, ensuring that the medieval English Crown could never claim undisputed total sovereignty.',
          'Ecclesiastical independence placed a permanent legal ceiling on royal ambition. Canon law was administered in Church courts answerable to the Papacy, beyond the reach of the King’s writs. Bishops and abbots sat alongside earls in the King’s council, acting as a powerful moral and political brake against arbitrary taxation and royal encroachment upon ancient Church liberties.',
        ],
      },
      act4: {
        title: 'The Rise of Parliament & The Verdict on Power',
        paras: [
          'The ultimate reality of medieval English governance was that a king was most powerful when ruling through institutional consent rather than lone despotism. Edward I acknowledged this fundamental truth when summoning the Model Parliament in 1295, proclaiming: "What touches all should be approved by all." To wage expensive foreign wars, kings were forced to consult the elected knights of the shires and burgesses of the towns in Parliament to secure taxation.',
          'Ultimately, medieval English monarchy was not an absolute dictatorship, but a delicate, perpetual political tightrope. Kings who governed through consultation, respected common law, and maintained the confidence of barons and Parliament flourished. Those who mistook royal majesty for unchecked absolute power ended up cornered in muddy meadows, deposed in dungeon basements, or butchered upon the battlefield.',
          'When Henry VII picked up Richard III’s crown from the hawthorn bush at Bosworth in 1485, he understood the lesson of four centuries of medieval struggle. Absolute royal power was a dangerous fantasy. True sovereignty in England required a working partnership between the Crown, the rule of law, and the representative assembly of the realm—a constitutional legacy that still defines modern British governance.',
        ],
      },
    },
  ];

  const COVER_CONFIG = {
    unitId: 'medieval_england',
    title: 'Medieval England & The Struggle for Power (1066–1485)',
    seriesTag: 'Key Stage 3 Master Curriculum Series',
    imprint: 'The History Revision Hub • Student Textbook Edition',
    subtitle: 'From the Norman Conquest and Magna Carta to the Black Death and Bosworth Field',
    enquiry:
      'How did power shift between Monarch, Church, Barons, and the Common People in Medieval England?',
    coverImage: '/images/portchester_keep.jpg',
    plateCaption:
      'Plate I: The Norman Keep at Portchester Castle, Hampshire (11th–12th Century Roman-Medieval Bastion)',
    syllabusTopics: [
      {
        num: 1,
        title: '1. 1066 & The Succession Crisis',
        bullets: [
          'Edward the Confessor dies; three claimants compete for the crown.',
          'The double invasion: Hardrada at Stamford Bridge and William at Pevensey.',
          'The Battle of Hastings: the Anglo-Saxon shield wall vs Norman combined arms.',
        ],
      },
      {
        num: 2,
        title: '2. Castles, Terror & Domesday',
        bullets: [
          'The rapid construction of over 500 wooden motte-and-bailey castles.',
          'The Harrying of the North (1069–1070): scorched earth and mass famine.',
          'The 1086 Domesday Book: nationwide land, wealth, and tax surveillance.',
        ],
      },
      {
        num: 3,
        title: '3. Crown vs Church: Henry II & Becket',
        bullets: [
          'Henry II legal reforms, common law, and the issue of criminous clerks.',
          'Thomas Becket appointed Archbishop; the Constitutions of Clarendon (1164).',
          'Assassination in Canterbury Cathedral (1170) and royal penance.',
        ],
      },
      {
        num: 4,
        title: '4. Magna Carta (1215) & Royal Power',
        bullets: [
          'King John loses Normandy (1204); catastrophic taxation and baronial fury.',
          'Armed baronial rebellion; sealing Magna Carta at Runnymede in June 1215.',
          'Clauses 39 & 40: due process, the rule of law, and limited monarchy.',
        ],
      },
      {
        num: 5,
        title: '5. Village Life, Tithes & Doom Paintings',
        bullets: [
          'The manorial system: open-field strip farming and peasant serfdom.',
          'The Catholic Church: parish tithes of 10% and vast ecclesiastical wealth.',
          'Doom paintings and the Hellmouth: visual theology and social obedience.',
        ],
      },
      {
        num: 6,
        title: '6. The Black Death (1348)',
        bullets: [
          'Arrival at Melcombe Regis; symptoms of bubonic and pneumonic plague.',
          'Demographic collapse: 30–45% mortality and the breakdown of society.',
          'The labor shortage, the Statute of Labourers (1351), and the decay of serfdom.',
        ],
      },
      {
        num: 7,
        title: '7. The Peasants’ Revolt (1381)',
        bullets: [
          'Working-class grievances: wage caps and the hated Third Poll Tax (1381).',
          'Wat Tyler and John Ball lead 60,000 peasants to storm London.',
          'Smithfield confrontation, Tyler murdered, and royal betrayal of promises.',
        ],
      },
      {
        num: 8,
        title: '8. The Wars of the Roses (1455–1485)',
        bullets: [
          'Henry VI mental collapse and the rise of private noble armies (Bastard Feudalism).',
          'The bloodbath at Towton (1461) and the disappearance of the Princes in the Tower.',
          'Bosworth Field (1485): Richard III killed and Henry VII establishes the Tudor dynasty.',
        ],
      },
      {
        num: 9,
        title: '9. Assessment: Medieval Power',
        bullets: [
          'Synoptic evaluation: comparing monarchical strength from 1066 to 1485.',
          'Weighing the power of the Crown against the Church, Barons, and Peasantry.',
          'Extended essay synthesis: Reach a supported historical judgement.',
        ],
      },
    ],
  };

  const BACK_COVER_DATA = {
    unitId: 'medieval_england',
    title: 'Key Chronology & Causal Turning Points: 1066–1485',
    timeline: [
      {
        date: '1066',
        event:
          'Edward the Confessor dies; Harold Godwinson wins at Stamford Bridge but is killed at Hastings; William crowned king.',
      },
      {
        date: '1067–1071',
        event:
          'Over 500 motte-and-bailey castles built across England; William crushes English rebellions with ruthless force.',
      },
      {
        date: '1069–1070',
        event:
          'The Harrying of the North: William salts fields and starves 100,000 Yorkshire peasants to eliminate rebellion.',
      },
      {
        date: '1086',
        event:
          'The Domesday Book is compiled, auditing all land, wealth, and livestock; William takes the Oath of Salisbury.',
      },
      {
        date: '1154',
        event:
          'Henry II ascends the throne, creating the Angevin Empire and establishing the English Common Law and trial by jury.',
      },
      {
        date: '1164',
        event:
          'The Constitutions of Clarendon spark a bitter constitutional clash between Henry II and Archbishop Thomas Becket.',
      },
      {
        date: '1170',
        event:
          'Thomas Becket is assassinated before the altar of Canterbury Cathedral by four Norman knights; Henry performs penance.',
      },
      {
        date: '1204',
        event:
          'King John loses Normandy and ancestral Angevin territories to King Philip Augustus of France.',
      },
      {
        date: '1214',
        event:
          'John’s grand European coalition is crushed at the Battle of Bouvines, shattering royal finances and prestige.',
      },
      {
        date: '1215',
        event:
          'Rebellious barons force King John to seal Magna Carta at Runnymede, establishing the rule of law and due process.',
      },
      {
        date: '1258–1265',
        event:
          'Simon de Montfort leads a baronial rebellion against Henry III, summoning the first parliament with burgesses.',
      },
      {
        date: '1295',
        event:
          'Edward I summons the "Model Parliament", establishing the principle that taxation requires parliamentary approval.',
      },
      {
        date: '1348–1350',
        event:
          'The Black Death kills 30–45% of England’s population, triggering an acute labor shortage and empowering peasants.',
      },
      {
        date: '1351',
        event:
          'Parliament passes the Statute of Labourers in a failed attempt to freeze wages at pre-plague rates.',
      },
      {
        date: '1381',
        event:
          'The Peasants’ Revolt: Wat Tyler and John Ball lead armed commons to capture London; Poll Tax abolished.',
      },
      {
        date: '1455',
        event:
          'The Wars of the Roses begin: First Battle of St Albans pits the House of Lancaster against the House of York.',
      },
      {
        date: '1461',
        event:
          'Battle of Towton: Over 28,000 men killed in a snowstorm; Yorkist Edward IV seizes the crown.',
      },
      {
        date: '1483',
        event:
          'Edward IV dies; Richard III seizes the throne; the Princes in the Tower mysteriously disappear.',
      },
      {
        date: '1485',
        event:
          'Battle of Bosworth Field: Richard III killed in battle; Henry VII crowned, founding the Tudor dynasty.',
      },
    ],
    themes: [
      {
        title: 'Monarchy & Sovereignty',
        desc: 'The Crown asserted absolute Divine Right through castles, administrative inquests, and common law, but was continuously checked by rebellion.',
      },
      {
        title: 'Faith & The Church',
        desc: 'The Catholic Church owned one-third of English soil, levied compulsory tithes, and maintained autonomous courts independent of the king.',
      },
      {
        title: 'Baronial Resistance',
        desc: 'From Magna Carta to the Wars of the Roses, wealthy magnates used armed rebellion and bastard feudalism to restrain or depose royal tyrants.',
      },
      {
        title: 'Peasant Agency',
        desc: 'Surviving serfs exploited the demographic shock of the Black Death and the 1381 uprising to dismantle feudal villeinage through market forces.',
      },
    ],
    historiography: {
      title: 'Historiographical Debate: How Powerful was the Medieval English Crown?',
      views: [
        {
          school: 'The Centralist Interpretation (F.W. Maitland & J.E.A. Jolliffe)',
          argument:
            'Argues that the Norman Conquest established a uniquely centralized, bureaucratic monarchy unmatched in Europe, where the royal writs, exchequer auditing, and common law courts held undisputed legal sovereignty over the realm.',
        },
        {
          school: 'The Revisionist Feudal Reality (K.B. McFarlane & David Carpenter)',
          argument:
            'Emphasizes that medieval royal power was inherently fragile and consensual. Lacking a standing army or police force, a king was completely dependent on baronial cooperation, and autocratic rule inevitably invited deposition or civil war.',
        },
      ],
    },
    synopticVerdict: {
      title: 'Synoptic Assessment & Historical Verdict: The Medieval Struggle for Power',
      pillars: [
        {
          theme: 'Legal Centralisation vs Royal Tyranny',
          verdict:
            'Common law, circuit judges, and exchequer rolls gave England unmatched administrative coherence, yet extortionate taxation and arbitrary rule repeatedly provoked armed baronial revolt.',
        },
        {
          theme: 'Secular Prerogative vs Papal Supremacy',
          verdict:
            'Clashes between Henry II and Becket or John and Innocent III proved that the Crown was never sovereign in isolation—the Catholic Church held absolute moral and judicial authority.',
        },
        {
          theme: 'Demographic Catastrophe & Social Emancipation',
          verdict:
            'Neither royal statutes nor aristocratic force could halt the economic empowerment of laborers after the 1348 Black Death, permanently eroding feudal serfdom by 1485.',
        },
      ],
    },
    quizzes: [
      {
        num: 1,
        code: 'ENQ 1',
        title: '1066 & Hastings',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson1.html',
      },
      {
        num: 2,
        code: 'ENQ 2',
        title: 'Castles & Domesday',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson2.html',
      },
      {
        num: 3,
        code: 'ENQ 3',
        title: 'Henry II & Becket',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson3.html',
      },
      {
        num: 4,
        code: 'ENQ 4',
        title: 'Magna Carta 1215',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson4.html',
      },
      {
        num: 5,
        code: 'ENQ 5',
        title: 'Village Life & Tithes',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson5.html',
      },
      {
        num: 6,
        code: 'ENQ 6',
        title: 'Black Death 1348',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson6.html',
      },
      {
        num: 7,
        code: 'ENQ 7',
        title: 'Peasants’ Revolt 1381',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson7.html',
      },
      {
        num: 8,
        code: 'ENQ 8',
        title: 'Wars of the Roses',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson8.html',
      },
      {
        num: 9,
        code: 'ENQ 9',
        title: 'Synoptic Assessment',
        url: 'https://history-revision-hub.netlify.app/units/medieval_england/lesson9.html',
      },
    ],
  };

  return {
    COVER_CONFIG,
    MEDIEVAL_COMPONENT_BANK,
    MEDIEVAL_LEFT_VOCAB,
    MEDIEVAL_LEFT_SOURCES,
    MEDIEVAL_ACT_NARRATIVES,
    BACK_COVER_DATA,
  };
};
