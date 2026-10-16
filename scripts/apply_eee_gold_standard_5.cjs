/**
 * History Revision Hub — Early Elizabethan England, 1558–1588
 * Migration: Key Topics 1, 2, and 3 to 5-Act Gold Standard & Digital Spine Parity
 *
 * Converts all 12 lessons in units/eee/data.js:
 * 1. Structures narrative_blocks into 5 chronological Acts with [X.1] and [X.2] decimal badges.
 * 2. Maps authentic primary visual sources to their respective Acts with targeted Hinge Questions.
 * 3. Injects 5-stage `workbook_stages` matching EEE_ENQUIRY_CONFIGS.
 * 4. Injects 5-stage `causal_domino_spine` with domino triggers, consequences, actors, and tags.
 * 5. Aligns `timeline_anchor` to 5 stages.
 * 6. Updates `teacher_notes` with 5 structured objectives & hinge questions.
 */

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'eee', 'data.js');
const raw = require(dataFilePath);
const unitData = raw.default || raw;

const configs = require('./components/eee_enquiry_configs.cjs').EEE_ENQUIRY_CONFIGS;
const allConfigs = [...configs.KT1, ...configs.KT2, ...configs.KT3];
const configMap = {};
allConfigs.forEach((c) => {
  configMap[c.id] = c;
});

console.log('Loaded eee unitData with', unitData.lessons.length, 'lessons.');

const EEE_SOURCE_METADATA = {
  lesson_1_1: {
    act: 1,
    id: 'source_a_elizabeth_coronation',
    letter: 'A',
    title: 'Source A: The Coronation Portrait of Queen Elizabeth I (1559)',
    src: '/images/elizabeth_coronation_portrait.jpg',
    source: '/images/elizabeth_coronation_portrait.jpg',
    image: '/images/elizabeth_coronation_portrait.jpg',
    caption:
      'Queen Elizabeth I in her coronation robes patterned with Tudor roses and holding the orb and sceptre, projecting royal majesty.',
    desc: 'Official coronation portrait of Queen Elizabeth I in 1559.',
    provenance:
      'Official portrait of Queen Elizabeth I in coronation robes, c. 1559. National Portrait Gallery, London (NPG 5175).',
    citation: 'National Portrait Gallery, NPG 5175, Elizabeth I Coronation Portrait.',
    question:
      'How does Source A illustrate how Elizabeth used visual majesty and Tudor symbolism to overcome doubts about female rule?',
    hinge_question:
      'How does Source A illustrate how Elizabeth used visual majesty and Tudor symbolism to overcome doubts about female rule?',
    source_context:
      'Official portrait of Queen Elizabeth I in her gold cloth of estate coronation robes, holding the orb and sceptre to signify divinely ordained monarchical power. Hinge Question: How does Source A illustrate how Elizabeth used visual majesty and Tudor symbolism to overcome doubts about female rule?',
    context:
      'Official coronation portrait of Queen Elizabeth I holding the orb and sceptre in 1559.',
  },
  lesson_1_2: {
    act: 2,
    id: 'source_a_act_of_supremacy',
    letter: 'A',
    title: 'Source A: The Act of Supremacy (May 1559)',
    src: '/images/act_of_supremacy.jpg',
    source: '/images/act_of_supremacy.jpg',
    image: '/images/act_of_supremacy.jpg',
    caption:
      'The printed frontispiece of the 1559 Elizabethan Act of Supremacy, declaring the monarch Supreme Governor of the Church of England.',
    desc: 'Parliamentary statute frontispiece of the 1559 Act of Supremacy.',
    provenance:
      'Parliamentary Archives, London, An Acte restoring to the Crowne the auncient Jurisdiction over the State Ecclesiasticall, 1559.',
    citation: 'Parliamentary Archives, HL/PO/PU/1/1558/1Eliz1n1, Act of Supremacy 1559.',
    question:
      'How does the terminology in Source A reflect a deliberate political compromise to satisfy moderate Catholics while securing royal authority?',
    hinge_question:
      'How does the terminology in Source A reflect a deliberate political compromise to satisfy moderate Catholics while securing royal authority?',
    source_context:
      'Frontispiece of the parliamentary statute of May 1559 establishing Elizabeth as Supreme Governor rather than Supreme Head of the Church of England. Hinge Question: How does the terminology in Source A reflect a deliberate political compromise to satisfy moderate Catholics while securing royal authority?',
    context: 'Parliamentary statute frontispiece of the 1559 Act of Supremacy.',
  },
  lesson_1_3: {
    act: 3,
    id: 'source_a_edmund_campion',
    letter: 'A',
    title: 'Source A: Father Edmund Campion, English Jesuit Martyr (c. 1581)',
    src: '/images/edmund_campion.jpg',
    source: '/images/edmund_campion.jpg',
    image: '/images/edmund_campion.jpg',
    caption:
      'Edmund Campion, the charismatic English Jesuit priest who returned secretly to England to minister to recusants before his capture and execution.',
    desc: 'Archival portrait print of Jesuit priest Edmund Campion.',
    provenance:
      'Contemporary engraving of Edmund Campion, Jesuit Archives, Rome / British Museum Department of Prints and Drawings.',
    citation: 'British Museum 1848,0911.455, Edmund Campion portrait.',
    question:
      'Why did the Elizabethan government view missionary priests like Campion depicted in Source A as foreign political agents of treason rather than simple men of God?',
    hinge_question:
      'Why did the Elizabethan government view missionary priests like Campion depicted in Source A as foreign political agents of treason rather than simple men of God?',
    source_context:
      'Contemporary portrait engraving of Father Edmund Campion, the brilliant Oxford scholar turned Jesuit missionary who returned secretly to England in 1580 to administer Catholic sacraments before being captured and executed at Tyburn. Hinge Question: Why did the Elizabethan government view missionary priests like Campion depicted in Source A as foreign political agents of treason rather than simple men of God?',
    context: 'Archival portrait print of Jesuit missionary Edmund Campion.',
  },
  lesson_1_4: {
    act: 1,
    id: 'source_a_mary_qos',
    letter: 'A',
    title: 'Source A: Mary, Queen of Scots in Captivity (c. 1578)',
    src: '/images/mary_queen_of_scots_mary_stuart.jpg',
    source: '/images/mary_queen_of_scots_mary_stuart.jpg',
    image: '/images/mary_queen_of_scots_mary_stuart.jpg',
    caption:
      'Mary, Queen of Scots wearing dark mourning dress and a crucifix during her long captivity in English country houses under the Earl of Shrewsbury.',
    desc: 'Archival portrait of Mary, Queen of Scots during her English captivity.',
    provenance:
      'Portrait of Mary, Queen of Scots by Nicholas Hilliard or follower, c. 1578. National Portrait Gallery, London (NPG 429).',
    citation: 'National Portrait Gallery, NPG 429, Mary, Queen of Scots.',
    question:
      'How does Source A illustrate why Mary, Queen of Scots remained a permanent, dangerous figurehead for Catholic rebellion throughout her imprisonment?',
    hinge_question:
      'How does Source A illustrate why Mary, Queen of Scots remained a permanent, dangerous figurehead for Catholic rebellion throughout her imprisonment?',
    source_context:
      'Portrait of Mary, Queen of Scots painted during her confinement in England, depicting her in solemn black velvet with a rosary and crucifix, asserting her Catholic piety and legitimate claim to the English crown. Hinge Question: How does Source A illustrate why Mary, Queen of Scots remained a permanent, dangerous figurehead for Catholic rebellion throughout her imprisonment?',
    context: 'Archival portrait of Mary, Queen of Scots during her English confinement.',
  },
  lesson_2_1: {
    act: 4,
    id: 'source_a_anthony_babington',
    letter: 'A',
    title: 'Source A: Anthony Babington and the Catholic Conspirators (1586)',
    src: '/images/anthony_babington.jpg',
    source: '/images/anthony_babington.jpg',
    image: '/images/anthony_babington.jpg',
    caption:
      'Anthony Babington, the young Derbyshire Catholic noble whose coded correspondence with Mary, Queen of Scots led directly to her trial and execution.',
    desc: 'Archival engraving of Catholic conspirator Anthony Babington.',
    provenance:
      'Contemporary Dutch engraving of Anthony Babington and his co-conspirators, 1586. British Museum Department of Prints and Drawings.',
    citation: 'British Museum 1868,0808.3292, Anthony Babington.',
    question:
      'How does the discovery of the Babington Plot depicted in Source A provide decisive evidence of Francis Walsingham’s intelligence supremacy?',
    hinge_question:
      'How does the discovery of the Babington Plot depicted in Source A provide decisive evidence of Francis Walsingham’s intelligence supremacy?',
    source_context:
      'Engraving of young Catholic gentleman Anthony Babington, whose ciphered letters hidden in beer barrels to Mary, Queen of Scots were intercepted and decoded by Walsingham’s codebreaker Thomas Phelippes. Hinge Question: How does the discovery of the Babington Plot depicted in Source A provide decisive evidence of Francis Walsingham’s intelligence supremacy?',
    context: 'Archival engraving of Anthony Babington, principal conspirator in the 1586 plot.',
  },
  lesson_2_2: {
    act: 3,
    id: 'source_a_sir_francis_drake',
    letter: 'A',
    title: 'Source A: Sir Francis Drake (c. 1581)',
    src: '/images/sir_francis_drake.jpg',
    source: '/images/sir_francis_drake.jpg',
    image: '/images/sir_francis_drake.jpg',
    caption:
      'Sir Francis Drake wearing the Drake Jewel presented by Queen Elizabeth I following his triumphant circumnavigation on the Golden Hind.',
    desc: 'Official portrait of Sir Francis Drake by Nicholas Hilliard, c. 1581.',
    provenance:
      'Miniature portrait by Nicholas Hilliard, 1581. National Portrait Gallery, London (NPG 4172).',
    citation: 'National Portrait Gallery, NPG 4172, Sir Francis Drake.',
    question:
      'How does Source A reflect Elizabeth’s defiance of Philip II by publicly honoring and knighting an English privateer who plundered Spanish treasure?',
    hinge_question:
      'How does Source A reflect Elizabeth’s defiance of Philip II by publicly honoring and knighting an English privateer who plundered Spanish treasure?',
    source_context:
      'Portrait of Francis Drake following his 1577–1580 circumnavigation, wearing the golden Drake Jewel gifted by Elizabeth I after he returned with £140,000 of looted Spanish silver and gold. Hinge Question: How does Source A reflect Elizabeth’s defiance of Philip II by publicly honoring and knighting an English privateer who plundered Spanish treasure?',
    context: 'Portrait of Sir Francis Drake wearing royal jewels following his circumnavigation.',
  },
  lesson_2_3: {
    act: 3,
    id: 'source_a_drake_cadiz',
    letter: 'A',
    title: 'Source A: Drake’s Raid on Cadiz Harbor (April 1587)',
    src: '/images/drake_cadiz_1587.jpg',
    source: '/images/drake_cadiz_1587.jpg',
    image: '/images/drake_cadiz_1587.jpg',
    caption:
      'Drake’s warships entering the Spanish harbor of Cadiz in April 1587, destroying thirty Spanish vessels in the raid known as "singeing the King of Spain’s beard."',
    desc: 'Contemporary Dutch engraving illustrating Drake’s raid on Cadiz harbor in 1587.',
    provenance:
      'Contemporary engraving by Baptista Boazio, 1588. National Maritime Museum, Greenwich, London.',
    citation: 'National Maritime Museum, PAD0256, Drake at Cadiz, 1587.',
    question:
      'How does Source A illustrate why Drake’s raid on Cadiz delayed the launch of the Spanish Armada by over twelve months?',
    hinge_question:
      'How does Source A illustrate why Drake’s raid on Cadiz delayed the launch of the Spanish Armada by over twelve months?',
    source_context:
      'Contemporary engraving of Drake’s audacious preemptive strike on Cadiz harbor in April 1587, destroying thirty Spanish warships and burning thousands of tons of seasoned oak barrel staves. Hinge Question: How does Source A illustrate why Drake’s raid on Cadiz delayed the launch of the Spanish Armada by over twelve months?',
    context: 'Contemporary engraving of the English naval raid on Cadiz harbor in April 1587.',
  },
  lesson_2_4: {
    act: 5,
    id: 'source_a_armada_portrait',
    letter: 'A',
    title: 'Source A: The Armada Portrait of Queen Elizabeth I (1588)',
    src: '/images/armada_portrait.jpg',
    source: '/images/armada_portrait.jpg',
    image: '/images/armada_portrait.jpg',
    caption:
      'Elizabeth I with her hand resting upon the globe, flanked by views of the English fireship attack at Calais and the Spanish fleet wrecked on rocky shores.',
    desc: 'The iconic Armada Portrait attributed to George Gower, 1588.',
    provenance:
      'The Armada Portrait, c. 1588, Woburn Abbey Collection / National Maritime Museum, Greenwich.',
    citation: 'National Maritime Museum, BHC2678, The Armada Portrait.',
    question:
      'How do the dual window vignettes behind Elizabeth in Source A summarize the reasons for England’s miraculous victory over the Armada?',
    hinge_question:
      'How do the dual window vignettes behind Elizabeth in Source A summarize the reasons for England’s miraculous victory over the Armada?',
    source_context:
      'The iconic 1588 Armada Portrait showing Elizabeth I with her hand resting upon the Americas on a globe, while the background windows contrast English fireships dispersing the Spanish crescent with Spanish galleons wrecked by storms on Irish rocks. Hinge Question: How do the dual window vignettes behind Elizabeth in Source A summarize the reasons for England’s miraculous victory over the Armada?',
    context:
      'The iconic Armada Portrait depicting Queen Elizabeth I celebrating the 1588 naval triumph.',
  },
  lesson_3_1: {
    act: 5,
    id: 'source_a_swan_theatre',
    letter: 'A',
    title: 'Source A: Johannes de Witt’s Drawing of the Swan Theatre (c. 1596)',
    src: '/images/swan_theatre.jpg',
    source: '/images/swan_theatre.jpg',
    image: '/images/swan_theatre.jpg',
    caption:
      'A contemporary sketch of the open-air Swan Theatre in Southwark, showing the thrust stage, tiered wooden galleries, and groundling standing pit.',
    desc: 'Contemporary copy of Johannes de Witt’s sketch of the Swan Theatre, London.',
    provenance:
      'Arend van Buchel’s commonplace book copy of Johannes de Witt’s drawing, c. 1596. Utrecht University Library (MS 842).',
    citation: 'Utrecht University Library, MS 842, fol. 132r, Swan Theatre.',
    question:
      'How does Source A illustrate how Elizabethan public playhouses brought diverse social classes together while provoking Puritan moral condemnation?',
    hinge_question:
      'How does Source A illustrate how Elizabethan public playhouses brought diverse social classes together while provoking Puritan moral condemnation?',
    source_context:
      'The only surviving contemporary visual record of an Elizabethan playhouse interior, sketched by Dutch traveler Johannes de Witt at the Swan Theatre in Southwark, showing groundlings standing in the pit around the thrust stage while wealthy patrons sat in covered galleries. Hinge Question: How does Source A illustrate how Elizabethan public playhouses brought diverse social classes together while provoking Puritan moral condemnation?',
    context: 'Contemporary drawing of the interior of the Swan Theatre in London, c. 1596.',
  },
  lesson_3_2: {
    act: 3,
    id: 'source_a_caveat_cursitors',
    letter: 'A',
    title: 'Source A: Thomas Harman’s "Caveat for Common Cursitors" (1567)',
    src: '/images/caveat_for_cursitors.png',
    source: '/images/caveat_for_cursitors.png',
    image: '/images/caveat_for_cursitors.png',
    caption:
      'Title page of Thomas Harman’s popular 1567 book warning householders against counterfeit vagabonds, sturdy beggars, and tricksters.',
    desc: 'Frontispiece of Thomas Harman’s Caveat for Common Cursitors, printed in London in 1567.',
    provenance:
      'Woodcut title page from Thomas Harman, A Caveat or Warning for Common Cursitors, London, 1567. British Library Collection.',
    citation: 'British Library, C.27.b.24, Harman’s Caveat, 1567.',
    question:
      'How does Source A reflect the growing anxiety and moral panic felt by Elizabethan property owners towards the "sturdy poor"?',
    hinge_question:
      'How does Source A reflect the growing anxiety and moral panic felt by Elizabethan property owners towards the "sturdy poor"?',
    source_context:
      'Woodcut title page from Justice of the Peace Thomas Harman’s 1567 bestseller classifying vagrants into deceitful criminal categories like "Counterfeit Cranks" and "Abraham Men." Hinge Question: How does Source A reflect the growing anxiety and moral panic felt by Elizabethan property owners towards the "sturdy poor"?',
    context:
      'Woodcut frontispiece of Thomas Harman’s 1567 book warning against counterfeit vagabonds.',
  },
  lesson_3_3: {
    act: 4,
    id: 'source_a_francis_drake_voyage',
    letter: 'A',
    title: 'Source A: Sir Francis Drake and the Golden Hind World Voyage (1577–1580)',
    src: '/images/francis_drake.jpg',
    source: '/images/francis_drake.jpg',
    image: '/images/francis_drake.jpg',
    caption:
      'Sir Francis Drake, whose 36,000-mile circumnavigation established England as an emerging global maritime power.',
    desc: 'Portrait of navigator and privateer Sir Francis Drake.',
    provenance:
      'Portrait of Sir Francis Drake, c. 1580. National Portrait Gallery, London / National Maritime Museum, Greenwich.',
    citation: 'National Portrait Gallery, NPG 837, Sir Francis Drake.',
    question:
      'Why did Drake’s voyage of discovery combine geographic exploration with state-sanctioned commercial plunder against the Spanish Empire?',
    hinge_question:
      'Why did Drake’s voyage of discovery combine geographic exploration with state-sanctioned commercial plunder against the Spanish Empire?',
    source_context:
      'Portrait of Francis Drake commemorating his epic three-year voyage around South America, up the coast of California (Nova Albion), and across the Pacific and Indian Oceans, returning to Plymouth with immense treasure. Hinge Question: Why did Drake’s voyage of discovery combine geographic exploration with state-sanctioned commercial plunder against the Spanish Empire?',
    context: 'Portrait of Francis Drake commemorating his circumnavigation of the globe.',
  },
  lesson_3_4: {
    act: 3,
    id: 'source_a_roanoke_colony',
    letter: 'A',
    title: 'Source A: Map of the First English Colony at Roanoke Island, Virginia (1585)',
    src: '/images/roanoke_colony.jpg',
    source: '/images/roanoke_colony.jpg',
    image: '/images/roanoke_colony.jpg',
    caption:
      'A contemporary watercolor map of Roanoke Island and the Outer Banks of North Carolina, charted by surveyor John White in 1585.',
    desc: 'Watercolor map of the Virginia coast by John White, 1585.',
    provenance:
      'Original watercolor map by John White, 1585. British Museum Department of Prints and Drawings (1906,0509.1.2).',
    citation: 'British Museum 1906,0509.1.2, John White Map of Virginia.',
    question:
      'How does the geography depicted in Source A explain why English supply ships struggled with treacherous shallows and sandbars at Roanoke?',
    hinge_question:
      'How does the geography depicted in Source A explain why English supply ships struggled with treacherous shallows and sandbars at Roanoke?',
    source_context:
      'John White’s detailed 1585 map of Roanoke Island showing the shallow coastal sandbars and Secotan Native American settlements along the coast of Virginia. Hinge Question: How does the geography depicted in Source A explain why English supply ships struggled with treacherous shallows and sandbars at Roanoke?',
    context:
      'Contemporary watercolor map of Roanoke Island and the Virginia coastline by John White, 1585.',
  },
};

const ACT_ACTORS_AND_TAGS = {
  lesson_1_1: [
    {
      actor: 'Queen Elizabeth I & Sir William Cecil',
      tag: '👑 CROWN ACCESSION & DEBT',
      connective:
        'Inherited severe debt of £300,000, forcing heavy borrowing at 14% interest from Antwerp financiers.',
    },
    {
      actor: 'The 19-Man Privy Council',
      tag: '🏛️ PRIVY COUNCIL & PATRONAGE',
      connective:
        'Maintained executive control through royal patronage and balanced noble factions without a standing army.',
    },
    {
      actor: 'Catholic Traditionalists & Parliament',
      tag: '⚖️ GENDER PREJUDICE & LEGITIMACY',
      connective:
        'Papal rejection of Anne Boleyn cast doubt on Elizabeth’s legitimacy, putting intense pressure on her to marry.',
    },
    {
      actor: 'Justices of the Peace & Lords Lieutenant',
      tag: '🌾 COUNTY JPs & LOCAL GOVERNANCE',
      connective:
        'Depended on unpaid country gentry to enforce royal decrees and collect emergency taxes granted by MPs.',
    },
    {
      actor: 'Mary of Guise & Mary, Queen of Scots',
      tag: '⚔️ AULD ALLIANCE & LOSS OF CALAIS',
      connective:
        'Left England encircled by French forces in Scotland and across the Channel following the loss of Calais.',
    },
  ],
  lesson_1_2: [
    {
      actor: 'English Protestants & Catholic Traditionalists',
      tag: '⛪ RELIGIOUS FRACTURE IN 1558',
      connective:
        'Split England between a conservative Catholic north and a reforming Protestant southeast after Mary I’s burnings.',
    },
    {
      actor: 'Queen Elizabeth I & Parliament',
      tag: '📜 1559 ACT OF SUPREMACY',
      connective:
        'Re-established royal spiritual independence from Rome under the compromise title of Supreme Governor.',
    },
    {
      actor: 'Anglican Clergy & Recusants',
      tag: '📖 1559 ACT OF UNIFORMITY',
      connective:
        'Enforced the English Book of Common Prayer and fine of 12d per missed Sunday service for recusants.',
    },
    {
      actor: 'Royal Commissioners & Parish Priests',
      tag: '🕊️ ROYAL INJUNCTIONS & COMMUNION',
      connective:
        'Established moderate parish instructions, retaining clerical vestments and requiring an English Bible in every church.',
    },
    {
      actor: 'Archbishop Matthew Parker & Marian Bishops',
      tag: '🛡️ CHURCH SETTLEMENT ENFORCEMENT',
      connective:
        'Purged fourteen Catholic bishops who refused the Oath of Supremacy, while parish priests largely conformed.',
    },
  ],
  lesson_1_3: [
    {
      actor: 'Puritan Reformers & Bishops',
      tag: '✝️ PURITAN CHALLENGE & VESTMENTS',
      connective:
        'Challenged the Ornaments Rubric, demanding the removal of crucifixes and ornate clerical vestments.',
    },
    {
      actor: 'Archbishop Parker & Dissident Clergy',
      tag: '👗 VESTMENTS CONTROVERSY (1566)',
      connective:
        'Archbishop Parker’s Book of Advertisements enforced surplices, leading thirty-seven London ministers to resign.',
    },
    {
      actor: 'English Catholic Recusants',
      tag: '🕯️ CATHOLIC RECUSANCY & FINES',
      connective:
        'Practiced secret Latin masses in manor houses, aided by sympathetic local gentry ignoring shilling fines.',
    },
    {
      actor: 'King Philip II & The Duke of Alba',
      tag: '🌍 DUKE OF ALBA IN NETHERLANDS',
      connective:
        'Alba’s 50,000 Spanish troops in the Low Countries posed an immediate invasion threat across the Channel.',
    },
    {
      actor: 'Queen Elizabeth I & Spanish Treasure Fleet',
      tag: '💰 1568 GENOESE LOAN SEIZURE',
      connective:
        'Elizabeth seized 400,000 florins bound for Alba’s army, triggering a Spanish trade embargo and escalating war tensions.',
    },
  ],
  lesson_1_4: [
    {
      actor: 'Mary, Queen of Scots & Catholic Claimants',
      tag: '👑 MARY QOS LEGITIMATE CLAIM',
      connective:
        'Granddaughter of Margaret Tudor quartered English arms, representing the natural Catholic heir to England.',
    },
    {
      actor: 'Lord Darnley & Earl of Bothwell',
      tag: '💣 MURDER AT KIRK O’ FIELD (1567)',
      connective:
        'Darnley’s murder sparked civil outrage, implicating Mary and forcing her hasty marriage to Bothwell.',
    },
    {
      actor: 'Scottish Protestant Lords & Mary Stuart',
      tag: '🏰 ABDICATION AT LOCHLEVEN',
      connective:
        'Imprisoned Mary at Lochleven Castle, forcing her abdication in favor of infant King James VI before her escape.',
    },
    {
      actor: 'Earl of Murray & English Commissioners',
      tag: '✉️ INQUIRY AT YORK & CASKET LETTERS',
      connective:
        'Examined the controversial Casket Letters at York, reaching a politically ambiguous verdict that left Mary detained.',
    },
    {
      actor: 'Earl of Shrewsbury & Mary in Captivity',
      tag: '⛓️ ENGLISH IMPRISONMENT (1569)',
      connective:
        'Placed Mary under domestic arrest in English country houses, inadvertently creating a magnet for Catholic rebellion.',
    },
  ],
  lesson_2_1: [
    {
      actor: 'Earls of Northumberland & Westmorland',
      tag: '⚔️ REVOLT OF NORTHERN EARLS (1569)',
      connective:
        'Catholic earls seized Durham Cathedral, but fled when royal forces advanced, leading to 450 executions.',
    },
    {
      actor: 'Pope Pius V & Roberto Ridolfi',
      tag: '📜 PAPAL BULL & RIDOLFI PLOT (1571)',
      connective:
        'Pope Pius V excommunicated Elizabeth (Regnans in Excelsis), inciting Ridolfi’s plot with Norfolk and Spain.',
    },
    {
      actor: 'Francis Throckmorton & Duke of Guise',
      tag: '🗡️ THROCKMORTON PLOT & BOND OF ASSOC.',
      connective:
        'Planned a French invasion financed by Philip II, prompting Cecil to draft the ruthless Bond of Association.',
    },
    {
      actor: 'Anthony Babington & Sir Francis Walsingham',
      tag: '🍺 BABINGTON CIPHER & BEER BARRELS',
      connective:
        'Walsingham intercepted beer-barrel ciphers with Mary’s approval of assassination, sealing her legal doom.',
    },
    {
      actor: 'Parliament & Mary, Queen of Scots',
      tag: '🪓 EXECUTION AT FOTHERINGHAY (1587)',
      connective:
        'Executed Mary under the Act for the Queen’s Safety, removing the Catholic claimant but enraging Philip II.',
    },
  ],
  lesson_2_2: [
    {
      actor: 'King Philip II & William of Orange',
      tag: '🌍 SPANISH-DUTCH RELIGIOUS RIVALRY',
      connective:
        'Protestant rebellion in the Netherlands threatened English wool trade and created a Spanish military base.',
    },
    {
      actor: 'Francis Drake & Spanish Treasure Ships',
      tag: '⚓ NEW WORLD PRIVATEERING',
      connective:
        'Drake ambushed Spanish mule trains at Nombre de Dios, plundering silver with Elizabeth’s covert backing.',
    },
    {
      actor: 'Sir Francis Drake & The Golden Hind',
      tag: '🧭 CIRCUMNAVIGATION (1577–1580)',
      connective:
        'Drake returned with £140,000 of Spanish treasure; Elizabeth defied Philip II by knighting Drake on his ship.',
    },
    {
      actor: 'Philip II & French Catholic League',
      tag: '⚡ ESCALATION & JOINVILLE PACT',
      connective:
        'Assassination of William of Orange and Philip inheriting Portugal left England facing an unchallenged Spanish empire.',
    },
    {
      actor: 'Queen Elizabeth I & Robert Dudley',
      tag: '⚔️ 1585 TREATY OF NONSUCH',
      connective:
        'Elizabeth sent 7,400 troops under Dudley to the Netherlands, making direct war with Spain inevitable.',
    },
  ],
  lesson_2_3: [
    {
      actor: 'Robert Dudley, Earl of Leicester & Dutch Rebels',
      tag: '🏰 DUDLEY’S NETHERLANDS EXPEDITION',
      connective:
        'Dudley accepted the title of Governor-General, angering Elizabeth while underfunding hindered military success.',
    },
    {
      actor: 'Sir Philip Sidney & Defecting Commanders',
      tag: '💥 ZUTPHEN & DEVENTER BETRAYALS',
      connective:
        'Sidney’s death at Zutphen and the surrender of Deventer forts by Catholic officers shattered Anglo-Dutch trust.',
    },
    {
      actor: 'Sir Francis Drake & Cadiz Defense Fleet',
      tag: '🔥 SINGEING THE KING OF SPAIN’S BEARD',
      connective:
        'Drake raided Cadiz harbor in April 1587, destroying thirty warships and burning seasoned oak barrel staves.',
    },
    {
      actor: 'Marquis of Santa Cruz & Medina Sidonia',
      tag: '⏳ DELAY & LOGISTICAL COLLAPSE',
      connective:
        'Delayed the Armada by twelve months and caused food to rot inside unseasoned barrels during transit.',
    },
    {
      actor: 'Duke of Medina Sidonia & 130 Galleons',
      tag: '⛵ ARMADA LAUNCH (MAY 1588)',
      connective:
        '130 ships sailed with orders to link with Parma’s army, but lacked a deep-water port to unite in the shallows.',
    },
  ],
  lesson_2_4: [
    {
      actor: 'Lord Howard of Effingham & Spanish Crescent',
      tag: '🌊 CHANNEL BATTLES (PLYMOUTH TO WIGHT)',
      connective:
        'The Spanish seven-mile crescent held formation, but English culverins prevented landings on the Isle of Wight.',
    },
    {
      actor: 'Lord Charles Howard & Sir Francis Drake',
      tag: '🔥 CALAIS FIRESHIPS ATTACK (AUG 1588)',
      connective:
        'Eight pitch-soaked fireships scattered the Spanish fleet at midnight, forcing ships to cut anchors and break formation.',
    },
    {
      actor: 'Sir John Hawkins & English Race Galleons',
      tag: '💥 BATTLE OF GRAVELINES',
      connective:
        'Hawkins’ manoeuvrable race-built galleons pounded disordered Spanish ships at close range, sinking three vessels.',
    },
    {
      actor: 'The "Protestant Wind" & Irish Coast',
      tag: '💨 ATLANTIC RETREAT & SHIPWRECKS',
      connective:
        'Fierce gales drove the anchorless Spanish fleet around Scotland and Ireland, wrecking dozens of ships on reefs.',
    },
    {
      actor: 'Queen Elizabeth I & Tilbury Troops',
      tag: '👑 TILBURY SPEECH & NAVAL TRIUMPH',
      connective:
        'Elizabeth’s speech at Tilbury and the survival of only 67 Spanish ships established England as a major naval power.',
    },
  ],
  lesson_3_1: [
    {
      actor: 'Elizabethan Gentry & Commoners',
      tag: '📚 LITERACY & EDUCATIONAL ATTITUDES',
      connective:
        'Literacy grew to 30% for men and 10% for women, while petty schools taught basic reading to middling boys.',
    },
    {
      actor: 'Grammar School Masters & Yeomen Sons',
      tag: '🏫 RISE OF ENDOWED GRAMMAR SCHOOLS',
      connective:
        'Over seventy grammar schools taught Latin and rhetoric, enabling social mobility for sons of merchants and yeomen.',
    },
    {
      actor: 'Noble Sons & University Scholars',
      tag: '🎓 UNIVERSITIES & INNS OF COURT',
      connective:
        'Oxford and Cambridge expanded along with London’s Inns of Court to train aristocratic sons for law and government.',
    },
    {
      actor: 'Elites & Labouring Classes',
      tag: '🏹 LEISURE & SOCIAL STRATIFICATION',
      connective:
        'Elites enjoyed hunting and tennis while commoners played violent mob football and gathered at bear-baiting rings.',
    },
    {
      actor: 'James Burbage & London Playwrights',
      tag: '🎭 DEVELOPMENT OF ELIZABETHAN THEATRE',
      connective:
        'Purpose-built playhouses like The Theatre brought all social classes together, despite Puritan moral objections.',
    },
  ],
  lesson_3_2: [
    {
      actor: 'Growing Population & Rural Poor',
      tag: '📈 POPULATION EXPLOSION & INFLATION',
      connective:
        'Population grew from 3 to 4 million while consecutive bad harvests caused grain prices and poverty to soar.',
    },
    {
      actor: 'Enclosing Landlords & Evicted Cottagers',
      tag: '🐑 ENCLOSURE & SHEEP FARMING CRISIS',
      connective:
        'High wool profits led landlords to enclose arable land for sheep, reducing agricultural jobs and displacing families.',
    },
    {
      actor: 'Thomas Harman & Fearful Gentry',
      tag: '👁️ STURDY BEGGARS & MORAL PANIC',
      connective:
        'Harman’s book warned of deceitful vagrants, sharpening the distinction between the impotent poor and sturdy beggars.',
    },
    {
      actor: 'Parish Overseers & Vagrants',
      tag: '⚖️ 1572 VAGABONDS ACT & PENALTIES',
      connective:
        'Established a compulsory poor rate while punishing repeat vagrants with ear-boring and hanging for third offenses.',
    },
    {
      actor: 'County Justices of the Peace & Bridewells',
      tag: '🏛️ 1576 ACT FOR RELIEF OF POOR',
      connective:
        'Required towns to provide raw wool and flax for work and built houses of correction, laying the 1601 Poor Law base.',
    },
  ],
  lesson_3_3: [
    {
      actor: 'English Mariners & Cartographers',
      tag: '🧭 NAVIGATIONAL REVOLUTION',
      connective:
        'Astrolabes, quadrants, and Mercator maps allowed sailors to navigate accurately across open oceans beyond coastal landmarks.',
    },
    {
      actor: 'English Shipwrights & John Hawkins',
      tag: '⛵ RACE-BUILT GALLEON INNOVATION',
      connective:
        'Lower forecastles, lateen sails, and culverins on four-wheel carriages created faster, more manoeuvrable warships.',
    },
    {
      actor: 'Muscovy & Levant Trading Merchants',
      tag: '🌍 NEW GLOBAL TRADE MARKETS',
      connective:
        'Collapse of the Antwerp cloth market forced merchants to establish joint-stock companies trading with Russia and the East.',
    },
    {
      actor: 'Francis Drake & The Pelican Crew',
      tag: '🌎 DRAKE’S PACIFIC VOYAGE',
      connective:
        'Navigated the Magellan Strait, raided Spanish Peru, claimed Nova Albion, and sailed home via the Indian Ocean.',
    },
    {
      actor: 'Queen Elizabeth I & Investors',
      tag: '💰 COMMERCIAL & GEOPOLITICAL IMPACT',
      connective:
        'Yielded a 4,700% return, paid off the Crown debt, and proved English seamanship could challenge the Spanish empire.',
    },
  ],
  lesson_3_4: [
    {
      actor: 'Sir Walter Raleigh & Richard Hakluyt',
      tag: '📜 RALEIGH’S PATENT & PLANNING',
      connective:
        'Raleigh received a royal patent and Hakluyt’s treatise argued for American bases to raid Spanish treasure fleets.',
    },
    {
      actor: 'Sir Richard Grenville & Ralph Lane',
      tag: '⚓ RECRUITING GENTLEMEN & SOLDIERS',
      connective:
        'Recruited 107 gentlemen soldiers and artisans but no farmers, relying on soldierly discipline under Ralph Lane.',
    },
    {
      actor: 'Chief Wingina & Roanoke Settlers',
      tag: '🏝️ 1585 FIRST ROANOKE DISASTER',
      connective:
        'The Tiger ran aground spoiling provisions; settlers depended on Secotan fish weirs, creating acute tension.',
    },
    {
      actor: 'Ralph Lane & Secotan Warriors',
      tag: '⚔️ ANGLO-ALGONQUIAN CONFLICT & RESCUE',
      connective:
        'Lane ambushed and killed Chief Wingina; starving colonists evacuated back to England aboard Drake’s fleet.',
    },
    {
      actor: 'John White & The 118 Lost Settlers',
      tag: '🌫️ 1587 "LOST COLONY" MYSTERY',
      connective:
        'Armada crisis delayed relief ships for three years; White returned in 1590 to find only "CROATOAN" carved on a post.',
    },
  ],
};

for (let i = 0; i < 12; i++) {
  const lesson = unitData.lessons[i];
  const enquiry = configMap[lesson.id];
  if (!enquiry) {
    console.warn(`No config found for ${lesson.id}`);
    continue;
  }

  console.log(`\nTransforming ${lesson.id} (${enquiry.title})...`);

  // 1. Format narrative_blocks with [X.1] and [X.2] badges & embed primary sources
  const sourceMeta = EEE_SOURCE_METADATA[lesson.id];
  lesson.narrative_blocks.forEach((block, idx) => {
    const actNum = idx + 1;
    block.act = actNum;
    block.stage = actNum;
    block.type = 'narrative';

    // Ensure title matches stage format
    const stageConf = enquiry.stages[idx];
    block.title = `Act ${actNum}: [${stageConf.dates}] ${stageConf.title}`;
    block.theme_heading = block.title;

    // Check if text already has decimal badges
    if (!block.text.includes('<span class="para-ref">[')) {
      // Split text into two rich paragraphs
      const sentences = block.text.split(/(?<=[.!?])\s+/);
      const mid = Math.ceil(sentences.length / 2);
      const p1 = sentences.slice(0, mid).join(' ');
      const p2 = sentences.slice(mid).join(' ');
      block.text = `<span class="para-ref">[${actNum}.1]</span> ${p1}<br><br><span class="para-ref">[${actNum}.2]</span> ${p2}`;
    }

    // Embed primary source if assigned to this act
    if (sourceMeta && sourceMeta.act === actNum) {
      block.source = sourceMeta;
      // Add archival tag to text if not present
      if (!block.text.includes('archival-meta-tag')) {
        block.text = block.text.replace(
          `<span class="para-ref">[${actNum}.1]</span>`,
          `<span class="para-ref">[${actNum}.1]</span> (<span class="archival-meta-tag">Source A</span>)`,
        );
      }
    }
  });
  console.log(`  - Standardized 5 narrative blocks with decimal badges and primary source.`);

  // 2. Inject 5-stage workbook_stages
  lesson.workbook_stages = enquiry.stages.map((st, idx) => ({
    stage: idx + 1,
    dates: st.dates,
    title: st.title,
    spec_focus: enquiry.specAnchor,
    focus_clue: st.focusClue,
    para_ref: `[${idx + 1}.1–${idx + 1}.2]`,
    bullets: st.bullets,
    writing_frame: {
      connectives: enquiry.connectives,
    },
  }));
  console.log(`  - Injected 5 workbook_stages.`);

  // 3. Inject 5-stage causal_domino_spine
  const actorsAndTags = ACT_ACTORS_AND_TAGS[lesson.id] || [];
  lesson.causal_domino_spine = {
    title: `${enquiry.keyTopicBadge}: ${enquiry.title}`,
    subtitle: enquiry.inquiryQuestion,
    stages: enquiry.stages.map((st, idx) => {
      const at = actorsAndTags[idx] || {
        actor: 'Elizabethan Figures',
        tag: '📜 TUDOR POLICY',
        connective: 'Influenced English society and governance.',
      };
      return {
        step: idx + 1,
        date: st.dates,
        para_ref: `[${idx + 1}.1–${idx + 1}.2]`,
        title: st.title,
        actor: at.actor,
        tag: at.tag,
        trigger: `${st.bullets[0]}, leading to ${st.bullets[1].toLowerCase()}.`,
        desc: `${st.bullets.join('. ')}.`,
        connective: at.connective,
        question: st.focusClue,
      };
    }),
  };
  console.log(`  - Injected 5-stage causal_domino_spine.`);

  // 4. Update timeline_anchor
  lesson.timeline_anchor = lesson.causal_domino_spine.stages.map((st) => ({
    date: st.date,
    title: st.title,
    desc: st.trigger,
    para_ref: st.para_ref,
  }));
  console.log(`  - Aligned 5 timeline_anchor entries.`);

  // 5. Build 5 structured objectives in teacher_notes with Hinge Questions
  const existingNotes = lesson.teacher_notes || {};
  const objectives = enquiry.stages.map((st, idx) => ({
    objective: `Explain and evaluate ${st.title} (${st.dates}): ${st.bullets.join(', ')}.`,
    primer: `Direct students to paragraphs [${idx + 1}.1]–[${idx + 1}.2]. Focus on ${st.bullets[0]} and how this impacted ${st.bullets[1].toLowerCase()}.`,
    question: st.focusClue,
  }));

  lesson.teacher_notes = {
    primer:
      existingNotes.primer ||
      `This enquiry investigates ${enquiry.title}, focusing on ${enquiry.inquiryQuestion}`,
    objectives: objectives,
    source_context: sourceMeta
      ? sourceMeta.source_context
      : existingNotes.source_context ||
        `Examine the contemporary visual evidence for ${enquiry.title}. Hinge Question: ${enquiry.inquiryQuestion}`,
  };
  console.log(`  - Aligned 5 structured objectives & hinge questions in teacher_notes.`);
}

const newFileContent =
  '// Early Elizabethan England, 1558–88 Unit Data\nconst unitData = ' +
  JSON.stringify(unitData, null, 2) +
  ';\n\nexport default unitData;\nif (typeof module !== "undefined" && module.exports) {\n  module.exports = unitData;\n}\n';
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log(
  '\n🎉 Successfully upgraded Early Elizabethan England (eee) to 5-Act Gold Standard & Digital Spine Parity across all 12 lessons (60 stages)!',
);
