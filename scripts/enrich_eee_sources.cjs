const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../units/eee/data.js');

// Load existing unitData
const rawData = require(dataFilePath);
const unitData = rawData.default || rawData;

console.log('Enriching Early Elizabethan England sources...');

const eeeSources = {
  // L1: KT1.1
  lesson_1_1: {
    1: {
      id: 'source_a_coronation_portrait',
      letter: 'A',
      title: 'Source A: Queen Elizabeth I Coronation Portrait (1559)',
      src: '/images/elizabeth_coronation_portrait.jpg',
      source: '/images/elizabeth_coronation_portrait.jpg',
      image: '/images/elizabeth_coronation_portrait.jpg',
      caption:
        'Queen Elizabeth I in her magnificent gold coronation robes, holding the orb and sceptre as symbols of monarchical authority and divine right, painted c. 1559.',
      desc: 'Coronation portrait of Queen Elizabeth I in imperial robes.',
      provenance: 'National Portrait Gallery, London (NPG 5175), c. 1559.',
      citation: 'National Portrait Gallery, London, 1559.',
      question:
        'How did Elizabeth use royal portraits like the Coronation Portrait to project divine authority and overcome early doubts about female rule?',
      hinge_question:
        'How did Elizabeth use royal portraits like the Coronation Portrait to project divine authority and overcome early doubts about female rule?',
      source_context:
        'Queen Elizabeth I in her gold coronation robes, holding the orb and sceptre, c. 1559. Hinge Question: How did Elizabeth use royal portraits like the Coronation Portrait to project divine authority and overcome early doubts about female rule?',
      context:
        'Queen Elizabeth I in her gold coronation robes, holding the orb and sceptre, c. 1559.',
    },
    2: {
      id: 'source_b_william_cecil',
      letter: 'B',
      title: 'Source B: Sir William Cecil, Lord Burghley, Elizabeth’s Chief Minister',
      src: '/images/sir_william_cecil_lord_burghley.jpg',
      source: '/images/sir_william_cecil_lord_burghley.jpg',
      image: '/images/sir_william_cecil_lord_burghley.jpg',
      caption:
        'Sir William Cecil (later Lord Burghley), appointed Elizabeth’s Principal Secretary on 17 November 1558, who managed government business and parliament for forty years.',
      desc: 'Contemporary portrait of Sir William Cecil, Lord Burghley, Principal Secretary to Elizabeth I.',
      provenance: 'National Portrait Gallery, London (NPG 2174), c. 1565.',
      citation: 'National Portrait Gallery, London, c. 1565.',
      question:
        'Why did Elizabeth’s appointment of moderate, experienced advisers like William Cecil prove critical in stabilising her royal government in 1558?',
      hinge_question:
        'Why did Elizabeth’s appointment of moderate, experienced advisers like William Cecil prove critical in stabilising her royal government in 1558?',
      source_context:
        'Contemporary portrait of Sir William Cecil, Elizabeth’s most trusted adviser and Principal Secretary from 1558 until his death in 1598. Hinge Question: Why did Elizabeth’s appointment of moderate, experienced advisers like William Cecil prove critical in stabilising her royal government in 1558?',
      context:
        'Contemporary portrait of Sir William Cecil, Elizabeth’s most trusted adviser and Principal Secretary from 1558 until his death in 1598.',
    },
  },

  // L2: KT1.2
  lesson_1_2: {
    2: {
      id: 'source_a_act_of_supremacy',
      letter: 'A',
      title: 'Source A: The 1559 Act of Supremacy',
      src: '/images/act_of_supremacy.jpg',
      source: '/images/act_of_supremacy.jpg',
      image: '/images/act_of_supremacy.jpg',
      caption:
        'The opening preamble of the 1559 Act of Supremacy passed by Parliament, declaring Queen Elizabeth I to be "Supreme Governor" rather than "Supreme Head" of the Church of England.',
      desc: 'The official parliamentary statute of the 1559 Act of Supremacy.',
      provenance: 'Parliamentary Archives, London, 1 Elizabeth I, c. 1, May 1559.',
      citation: 'Parliamentary Archives, London, 1559.',
      question:
        'Why was the compromise title of "Supreme Governor" chosen instead of "Supreme Head" to reassure both Catholic traditionalists and Puritan reformers?',
      hinge_question:
        'Why was the compromise title of "Supreme Governor" chosen instead of "Supreme Head" to reassure both Catholic traditionalists and Puritan reformers?',
      source_context:
        'The official parliamentary statute of the 1559 Act of Supremacy. Hinge Question: Why was the compromise title of "Supreme Governor" chosen instead of "Supreme Head" to reassure both Catholic traditionalists and Puritan reformers?',
      context: 'The official parliamentary statute of the 1559 Act of Supremacy.',
    },
    4: {
      id: 'source_b_book_of_common_prayer',
      letter: 'B',
      title: 'Source B: The 1559 Book of Common Prayer',
      src: '/images/book_of_common_prayer_1559.jpg',
      source: '/images/book_of_common_prayer_1559.jpg',
      image: '/images/book_of_common_prayer_1559.jpg',
      caption:
        'Title page of the 1559 Book of Common Prayer, enforcing moderate Protestant liturgy and deliberately combining 1549 and 1552 communion wordings to appease traditional Catholics.',
      desc: 'Title page of the Elizabethan Book of Common Prayer, published 1559.',
      provenance: 'The Folger Shakespeare Library / British Library, 1559 edition.',
      citation: 'British Library, London, 1559.',
      question:
        'How did the deliberate ambiguity of the 1559 Prayer Book reflect Elizabeth’s desire "not to make windows into men’s souls"?',
      hinge_question:
        'How did the deliberate ambiguity of the 1559 Prayer Book reflect Elizabeth’s desire "not to make windows into men’s souls"?',
      source_context:
        'Title page of the Elizabethan Book of Common Prayer (1559), which enforced Protestant liturgy while including ambiguous wording on communion to avoid alienating Catholics. Hinge Question: How did the deliberate ambiguity of the 1559 Prayer Book reflect Elizabeth’s desire "not to make windows into men’s souls"?',
      context:
        'Title page of the Elizabethan Book of Common Prayer (1559), which enforced Protestant liturgy while including ambiguous wording on communion.',
    },
  },

  // L3: KT1.3
  lesson_1_3: {
    2: {
      id: 'source_a_regnans_in_excelsis',
      letter: 'A',
      title: 'Source A: Papal Bull Regnans in Excelsis Excommunicating Elizabeth (1570)',
      src: '/images/regnans_in_excelsis_1570.jpg',
      source: '/images/regnans_in_excelsis_1570.jpg',
      image: '/images/regnans_in_excelsis_1570.jpg',
      caption:
        'Pope Pius V, who issued the papal bull Regnans in Excelsis on 25 February 1570, excommunicating Queen Elizabeth I as a "pretended queen" and releasing English Catholics from their allegiance.',
      desc: 'Portrait of Pope Pius V, who excommunicated Elizabeth I in 1570.',
      provenance: 'Vatican Secret Archives / contemporary papal portrait, 1570.',
      citation: 'Vatican Archives, Rome, 1570.',
      question:
        'Why did Pope Pius V’s papal bull in 1570 make it impossible for English Catholics to remain loyal to both their church and their queen?',
      hinge_question:
        'Why did Pope Pius V’s papal bull in 1570 make it impossible for English Catholics to remain loyal to both their church and their queen?',
      source_context:
        'Contemporary portrait of Pope Pius V, who excommunicated Elizabeth I in 1570 with the papal bull Regnans in Excelsis. Hinge Question: Why did Pope Pius V’s papal bull in 1570 make it impossible for English Catholics to remain loyal to both their church and their queen?',
      context:
        'Contemporary portrait of Pope Pius V, who excommunicated Elizabeth I in 1570 with the papal bull Regnans in Excelsis.',
    },
    3: {
      id: 'source_b_edmund_campion',
      letter: 'B',
      title: 'Source B: Father Edmund Campion SJ, Catholic Jesuit Martyr (1581)',
      src: '/images/edmund_campion.jpg',
      source: '/images/edmund_campion.jpg',
      image: '/images/edmund_campion.jpg',
      caption:
        'Father Edmund Campion SJ, the brilliant English Jesuit missionary who secretly ministered to Catholic households before being arrested and executed for treason at Tyburn in 1581.',
      desc: 'Engraving of Jesuit missionary Father Edmund Campion, executed at Tyburn in 1581.',
      provenance: 'British Jesuit Archive / Stonyhurst College collection, 1581.',
      citation: 'British Jesuit Archive, 1581.',
      question:
        'Why did the Elizabethan government treat Jesuit missionaries like Edmund Campion as political traitors rather than religious dissidents?',
      hinge_question:
        'Why did the Elizabethan government treat Jesuit missionaries like Edmund Campion as political traitors rather than religious dissidents?',
      source_context:
        'Engraving of Jesuit missionary Father Edmund Campion, executed at Tyburn in 1581. Hinge Question: Why did the Elizabethan government treat Jesuit missionaries like Edmund Campion as political traitors rather than religious dissidents?',
      context: 'Engraving of Jesuit missionary Father Edmund Campion, executed at Tyburn in 1581.',
    },
  },

  // L4: KT1.4
  lesson_1_4: {
    1: {
      id: 'source_a_mary_queen_of_scots',
      letter: 'A',
      title: 'Source A: Mary, Queen of Scots (c. 1565)',
      src: '/images/mary_queen_of_scots_mary_stuart.jpg',
      source: '/images/mary_queen_of_scots_mary_stuart.jpg',
      image: '/images/mary_queen_of_scots_mary_stuart.jpg',
      caption:
        'Mary Stuart, Queen of Scots, great-granddaughter of Henry VII, whose strong dynastic claim and Catholic faith made her a continuous focal point for Catholic rebellion in England.',
      desc: 'Portrait of Mary, Queen of Scots, painted c. 1565.',
      provenance: 'National Portrait Gallery, London (NPG 429), c. 1565.',
      citation: 'National Portrait Gallery, London, c. 1565.',
      question:
        'Why did Mary, Queen of Scots’ arrival in England in 1568 present Elizabeth with an impossible political and legal dilemma?',
      hinge_question:
        'Why did Mary, Queen of Scots’ arrival in England in 1568 present Elizabeth with an impossible political and legal dilemma?',
      source_context:
        'Portrait of Mary, Queen of Scots, c. 1565. Hinge Question: Why did Mary, Queen of Scots’ arrival in England in 1568 present Elizabeth with an impossible political and legal dilemma?',
      context: 'Portrait of Mary, Queen of Scots, c. 1565.',
    },
    4: {
      id: 'source_b_francis_walsingham',
      letter: 'B',
      title: 'Source B: Sir Francis Walsingham, Queen Elizabeth’s Spymaster',
      src: '/images/sir_francis_walsingham.jpg',
      source: '/images/sir_francis_walsingham.jpg',
      image: '/images/sir_francis_walsingham.jpg',
      caption:
        'Sir Francis Walsingham, Elizabeth’s Principal Secretary and spymaster, who built an extensive network of codebreakers and double agents to intercept correspondence between Mary and Catholic plotters.',
      desc: 'Contemporary portrait of Sir Francis Walsingham, Secretary of State and spymaster.',
      provenance: 'National Portrait Gallery, London (NPG 1807), c. 1585.',
      citation: 'National Portrait Gallery, London, c. 1585.',
      question:
        'Why was Francis Walsingham so determined to convince a reluctant Elizabeth to place Mary, Queen of Scots on trial for high treason?',
      hinge_question:
        'Why was Francis Walsingham so determined to convince a reluctant Elizabeth to place Mary, Queen of Scots on trial for high treason?',
      source_context:
        'Contemporary portrait of Sir Francis Walsingham, Elizabeth’s spymaster who uncovered the plots centered on Mary, Queen of Scots. Hinge Question: Why was Francis Walsingham so determined to convince a reluctant Elizabeth to place Mary on trial for high treason?',
      context:
        'Contemporary portrait of Sir Francis Walsingham, Elizabeth’s spymaster who uncovered the plots centered on Mary, Queen of Scots.',
    },
  },

  // L5: KT2.1
  lesson_2_1: {
    3: {
      id: 'source_a_throckmorton_plot',
      letter: 'A',
      title: 'Source A: Francis Throckmorton and the 1583 Catholic Conspiracy',
      src: '/images/francis_throckmorton.jpg',
      source: '/images/francis_throckmorton.jpg',
      image: '/images/francis_throckmorton.jpg',
      caption:
        'Francis Throckmorton, the young Catholic conspirator who served as a courier between Mary Queen of Scots and the French and Spanish ambassadors before being arrested and tortured in 1583.',
      desc: 'Contemporary engraving of Francis Throckmorton, arrested for treason in 1583.',
      provenance: 'British Library / Contemporary Tudor engraving, 1583.',
      citation: 'British Library, London, 1583.',
      question:
        'How did the discovery of the Throckmorton Plot lead directly to Parliament creating the Bond of Association in 1584?',
      hinge_question:
        'How did the discovery of the Throckmorton Plot lead directly to Parliament creating the Bond of Association in 1584?',
      source_context:
        'Contemporary portrait of conspirator Francis Throckmorton, whose confession revealed Spanish plans for an armed invasion of England in 1583. Hinge Question: How did the discovery of the Throckmorton Plot lead directly to Parliament creating the Bond of Association in 1584?',
      context:
        'Contemporary portrait of conspirator Francis Throckmorton, whose confession revealed Spanish plans for an armed invasion in 1583.',
    },
    4: {
      id: 'source_b_anthony_babington',
      letter: 'B',
      title: 'Source B: Anthony Babington and the 1586 Conspiracy',
      src: '/images/anthony_babington.jpg',
      source: '/images/anthony_babington.jpg',
      image: '/images/anthony_babington.jpg',
      caption:
        'Anthony Babington, the wealthy young Catholic gentleman whose coded letters to Mary, Queen of Scots directly implicated her in the plot to assassinate Elizabeth in 1586.',
      desc: 'Portrait of Anthony Babington, executed for high treason in 1586.',
      provenance: 'National Portrait Gallery, London, c. 1586.',
      citation: 'National Portrait Gallery, London, 1586.',
      question:
        'Why was Mary’s written reply to Babington’s letter the decisive piece of evidence Walsingham needed to secure her death warrant?',
      hinge_question:
        'Why was Mary’s written reply to Babington’s letter the decisive piece of evidence Walsingham needed to secure her death warrant?',
      source_context:
        'Portrait of Anthony Babington, whose intercepted correspondence with Mary sealed her fate in 1586. Hinge Question: Why was Mary’s written reply to Babington’s letter the decisive piece of evidence Walsingham needed to secure her death warrant?',
      context:
        'Portrait of Anthony Babington, whose intercepted correspondence with Mary sealed her fate in 1586.',
    },
  },

  // L6: KT2.2
  lesson_2_2: {
    1: {
      id: 'source_a_robert_dudley',
      letter: 'A',
      title: 'Source A: Robert Dudley, Earl of Leicester',
      src: '/images/robert_dudley_earl_of_leicester.jpg',
      source: '/images/robert_dudley_earl_of_leicester.jpg',
      image: '/images/robert_dudley_earl_of_leicester.jpg',
      caption:
        'Robert Dudley, Earl of Leicester, Elizabeth’s Master of the Horse and favourite, who strongly urged direct English military intervention to support Dutch Protestant rebels against Spain.',
      desc: 'Portrait of Robert Dudley, Earl of Leicester, painted c. 1575.',
      provenance: 'National Portrait Gallery, London (NPG 447), c. 1575.',
      citation: 'National Portrait Gallery, London, c. 1575.',
      question:
        'Why did Elizabeth resist Dudley’s calls for direct war with Spain in the Netherlands for so many years before 1585?',
      hinge_question:
        'Why did Elizabeth resist Dudley’s calls for direct war with Spain in the Netherlands for so many years before 1585?',
      source_context:
        'Contemporary portrait of Robert Dudley, Earl of Leicester, who advocated aggressive military support for Protestant rebels in the Netherlands. Hinge Question: Why did Elizabeth resist Dudley’s calls for direct war with Spain in the Netherlands for so many years before 1585?',
      context:
        'Contemporary portrait of Robert Dudley, Earl of Leicester, who advocated aggressive military support for Protestant rebels in the Netherlands.',
    },
    3: {
      id: 'source_b_francis_drake_privateer',
      letter: 'B',
      title: 'Source B: Sir Francis Drake, Privateer and Navigator',
      src: '/images/sir_francis_drake.jpg',
      source: '/images/sir_francis_drake.jpg',
      image: '/images/sir_francis_drake.jpg',
      caption:
        'Sir Francis Drake, English privateer who seized massive quantities of Spanish silver from South American ports during his 1577–1580 circumnavigation aboard the Golden Hind.',
      desc: 'Portrait of Sir Francis Drake holding a navigational compass, c. 1580.',
      provenance: 'National Maritime Museum, Greenwich, c. 1580.',
      citation: 'National Maritime Museum, Greenwich, 1580.',
      question:
        'How did Drake’s state-backed piracy against Spanish treasure fleets push Philip II and Elizabeth toward open war?',
      hinge_question:
        'How did Drake’s state-backed piracy against Spanish treasure fleets push Philip II and Elizabeth toward open war?',
      source_context:
        'Portrait of privateer Sir Francis Drake following his circumnavigation of the globe. Hinge Question: How did Drake’s state-backed piracy against Spanish treasure fleets push Philip II and Elizabeth toward open war?',
      context:
        'Portrait of privateer Sir Francis Drake following his circumnavigation of the globe.',
    },
  },

  // L7: KT2.3
  lesson_2_3: {
    3: {
      id: 'source_a_drake_cadiz',
      letter: 'A',
      title: 'Source A: Drake’s Raid on Cadiz (1587)',
      src: '/images/drake_cadiz_1587.jpg',
      source: '/images/drake_cadiz_1587.jpg',
      image: '/images/drake_cadiz_1587.jpg',
      caption:
        'Sir Francis Drake’s daring naval raid on the Spanish port of Cadiz in April 1587, destroying over thirty Spanish supply ships and delaying the Armada by over a year.',
      desc: 'Contemporary maritime illustration of Drake’s raid on Cadiz harbour, 1587.',
      provenance: 'National Maritime Museum, Greenwich, 1587.',
      citation: 'National Maritime Museum, Greenwich, 1587.',
      question:
        'Why did Drake describe his raid on Cadiz as "singeing the King of Spain’s beard", and how did it give England vital time to prepare for invasion?',
      hinge_question:
        'Why did Drake describe his raid on Cadiz as "singeing the King of Spain’s beard", and how did it give England vital time to prepare for invasion?',
      source_context:
        'Contemporary illustration of Drake’s raid on Cadiz harbour, April 1587. Hinge Question: Why did Drake describe his raid on Cadiz as "singeing the King of Spain’s beard", and how did it give England vital time to prepare for invasion?',
      context: 'Contemporary illustration of Drake’s raid on Cadiz harbour, April 1587.',
    },
    5: {
      id: 'source_b_tilbury_speech',
      letter: 'B',
      title: 'Source B: Elizabeth I’s Speech to the Troops at Tilbury (August 1588)',
      src: '/images/elizabeth_tilbury_speech.jpg',
      source: '/images/elizabeth_tilbury_speech.jpg',
      image: '/images/elizabeth_tilbury_speech.jpg',
      caption:
        'Contemporary manuscript of Queen Elizabeth I’s famous speech delivered to English land forces assembled at Tilbury Camp: "I know I have the body of a weak and feeble woman, but I have the heart and stomach of a king."',
      desc: 'Manuscript text of Queen Elizabeth I’s speech at Tilbury Camp, August 1588.',
      provenance: 'British Library Harleian MS 6798, Tilbury, August 1588.',
      citation: 'British Library, London, 1588.',
      question:
        'How did Elizabeth use the Tilbury speech to transform the gender liability of being a female monarch into a source of national inspiration?',
      hinge_question:
        'How did Elizabeth use the Tilbury speech to transform the gender liability of being a female monarch into a source of national inspiration?',
      source_context:
        'Contemporary text of Queen Elizabeth I’s famous speech to English troops assembled at Tilbury in August 1588. Hinge Question: How did Elizabeth use the Tilbury speech to transform the gender liability of being a female monarch into a source of national inspiration?',
      context:
        'Contemporary text of Queen Elizabeth I’s famous speech to English troops assembled at Tilbury in August 1588.',
    },
  },

  // L8: KT2.4
  lesson_2_4: {
    3: {
      id: 'source_a_battle_of_gravelines',
      letter: 'A',
      title: 'Source A: The Battle of Gravelines and the Fireships (8 August 1588)',
      src: '/images/battle_of_gravelines_1588.jpg',
      source: '/images/battle_of_gravelines_1588.jpg',
      image: '/images/battle_of_gravelines_1588.jpg',
      caption:
        'Contemporary maritime painting showing English fireships scattering the Spanish Armada off Calais on the night of 7–8 August 1588, breaking the defensive crescent formation.',
      desc: 'Maritime painting of the fireship attack and Battle of Gravelines, August 1588.',
      provenance: 'National Maritime Museum, Greenwich, BHC0262, c. 1588.',
      citation: 'National Maritime Museum, Greenwich, 1588.',
      question:
        'Why did the fireship attack at Calais prove the decisive tactical turning point in the defeat of the Spanish Armada?',
      hinge_question:
        'Why did the fireship attack at Calais prove the decisive tactical turning point in the defeat of the Spanish Armada?',
      source_context:
        'Contemporary painting of the Battle of Gravelines, showing English fireships disrupting the Spanish Armada’s crescent formation. Hinge Question: Why did the fireship attack at Calais prove the decisive tactical turning point in the defeat of the Spanish Armada?',
      context:
        'Contemporary painting of the Battle of Gravelines, showing English fireships disrupting the Spanish Armada’s crescent formation.',
    },
    5: {
      id: 'source_b_armada_portrait',
      letter: 'B',
      title: 'Source B: The Armada Portrait of Elizabeth I (1588)',
      src: '/images/armada_portrait.jpg',
      source: '/images/armada_portrait.jpg',
      image: '/images/armada_portrait.jpg',
      caption:
        'The iconic Armada Portrait attributed to George Gower, showing Elizabeth I with her hand resting on the globe, with the defeated Spanish fleet wrecked on rocks in the background.',
      desc: 'The Armada Portrait of Queen Elizabeth I, painted in late 1588.',
      provenance: 'Woburn Abbey Collection / National Portrait Gallery, c. 1588.',
      citation: 'Woburn Abbey Collection, 1588.',
      question:
        'How does the symbolism in the Armada Portrait present Elizabeth’s victory as both divinely ordained and the start of global empire?',
      hinge_question:
        'How does the symbolism in the Armada Portrait present Elizabeth’s victory as both divinely ordained and the start of global empire?',
      source_context:
        'The Armada Portrait of Queen Elizabeth I, painted in 1588 to celebrate England’s naval triumph over Spain. Hinge Question: How does the symbolism in the Armada Portrait present Elizabeth’s victory as both divinely ordained and the start of global empire?',
      context:
        'The Armada Portrait of Queen Elizabeth I, painted in 1588 to celebrate England’s naval triumph over Spain.',
    },
  },

  // L9: KT3.1
  lesson_3_1: {
    3: {
      id: 'source_a_royal_procession',
      letter: 'A',
      title: 'Source A: Queen Elizabeth in Royal Procession (1601)',
      src: '/images/elizabeth_procession_1601.jpg',
      source: '/images/elizabeth_procession_1601.jpg',
      image: '/images/elizabeth_procession_1601.jpg',
      caption:
        'Queen Elizabeth I being carried in a royal litter during a summer "progress", surrounded by court nobles, Privy Councillors, and ordinary cheering subjects.',
      desc: 'Painting of Queen Elizabeth I on royal progress, attributed to Robert Peake, c. 1601.',
      provenance: 'Sherborne Castle Collection, Dorset, c. 1601.',
      citation: 'Sherborne Castle Collection, Dorset, 1601.',
      question:
        'Why were summer "progresses" so essential for maintaining royal popularity and bonding the Queen with provincial English society?',
      hinge_question:
        'Why were summer "progresses" so essential for maintaining royal popularity and bonding the Queen with provincial English society?',
      source_context:
        'Painting of Queen Elizabeth I on a summer royal progress, surrounded by courtiers and citizens. Hinge Question: Why were summer "progresses" so essential for maintaining royal popularity and bonding the Queen with provincial English society?',
      context:
        'Painting of Queen Elizabeth I on a summer royal progress, surrounded by courtiers and citizens.',
    },
    5: {
      id: 'source_b_swan_theatre',
      letter: 'B',
      title: 'Source B: Johannes de Witt’s Sketch of the Swan Theatre (c. 1596)',
      src: '/images/swan_theatre.jpg',
      source: '/images/swan_theatre.jpg',
      image: '/images/swan_theatre.jpg',
      caption:
        'Johannes de Witt’s eyewitness ink drawing of the interior of the Swan Theatre on Bankside in London, the only surviving contemporary sketch of an Elizabethan playhouse interior.',
      desc: 'Contemporary sketch of the interior of the Swan Theatre, London, c. 1596.',
      provenance: 'Utrecht University Library, MS 842, c. 1596.',
      citation: 'Utrecht University Library, c. 1596.',
      question:
        'Why did Elizabethan playhouses appeal equally to working-class groundlings and wealthy aristocrats in private galleries?',
      hinge_question:
        'Why did Elizabethan playhouses appeal equally to working-class groundlings and wealthy aristocrats in private galleries?',
      source_context:
        'Johannes de Witt’s contemporary sketch of the Swan Theatre in London, c. 1596. Hinge Question: Why did Elizabethan playhouses appeal equally to working-class groundlings and wealthy aristocrats in private galleries?',
      context: 'Johannes de Witt’s contemporary sketch of the Swan Theatre in London, c. 1596.',
    },
  },

  // L10: KT3.2
  lesson_3_2: {
    3: {
      id: 'source_a_caveat_for_cursitors',
      letter: 'A',
      title: 'Source A: Thomas Harman’s Caveat for Common Cursitors (1567)',
      src: '/images/caveat_for_cursitors.png',
      source: '/images/caveat_for_cursitors.png',
      image: '/images/caveat_for_cursitors.png',
      caption:
        'Woodcut frontispiece from Thomas Harman’s book warning against vagabonds and "sturdy beggars", depicting the birch whipping of vagrants tied to the back of a cart.',
      desc: 'Woodcut from Thomas Harman’s Caveat for Common Cursitors, printed in London, 1567.',
      provenance: 'British Library, London, 1567.',
      citation: 'British Library, London, 1567.',
      question:
        'Why did Elizabethan society distinguish so sharply between the "deserving poor" (impotent) and "idle vagabonds" (sturdy beggars)?',
      hinge_question:
        'Why did Elizabethan society distinguish so sharply between the "deserving poor" (impotent) and "idle vagabonds" (sturdy beggars)?',
      source_context:
        'Woodcut from Thomas Harman’s Caveat for Common Cursitors, London, 1567. Hinge Question: Why did Elizabethan society distinguish so sharply between the "deserving poor" (impotent) and "idle vagabonds" (sturdy beggars)?',
      context: 'Woodcut from Thomas Harman’s Caveat for Common Cursitors, London, 1567.',
    },
    5: {
      id: 'source_b_poor_law_statute',
      letter: 'B',
      title: 'Source B: The Elizabethan Poor Law Statute of 1601',
      src: '/images/poor_law_1601.jpg',
      source: '/images/poor_law_1601.jpg',
      image: '/images/poor_law_1601.jpg',
      caption:
        'The official printed parliamentary statute of the 1601 Act for the Relief of the Poor, establishing a national compulsory poor rate collected by parish overseers.',
      desc: 'Official parliamentary statute of the 1601 Poor Relief Act.',
      provenance: 'Parliamentary Archives, London, 43 Elizabeth I, c. 2, 1601.',
      citation: 'Parliamentary Archives, London, 1601.',
      question:
        'Why did the 1601 Poor Law represent a radical change from treating poverty as a criminal failure to a civic parish duty?',
      hinge_question:
        'Why did the 1601 Poor Law represent a radical change from treating poverty as a criminal failure to a civic parish duty?',
      source_context:
        'Official parliamentary statute of the 1601 Elizabethan Poor Law, which formalized local parish responsibility for the poor. Hinge Question: Why did the 1601 Poor Law represent a radical change from treating poverty as a criminal failure to a civic parish duty?',
      context:
        'Official parliamentary statute of the 1601 Elizabethan Poor Law, which formalized local parish responsibility for the poor.',
    },
  },

  // L11: KT3.3
  lesson_3_3: {
    1: {
      id: 'source_a_naval_galleons',
      letter: 'A',
      title: 'Source A: Naval Engagement Between English Galleons and Spanish Warships',
      src: '/images/spanish_armada_battle.jpg',
      source: '/images/spanish_armada_battle.jpg',
      image: '/images/spanish_armada_battle.jpg',
      caption:
        'Contemporary depiction of English long-range naval gunnery and maneuverable race-built galleons engaging heavy Spanish warships in the late 16th century.',
      desc: 'Painting of naval combat between English and Spanish warships, c. 1590.',
      provenance: 'National Maritime Museum, Greenwich, c. 1590.',
      citation: 'National Maritime Museum, Greenwich, c. 1590.',
      question:
        'How did technological innovations in ship design (like John Hawkins’ race-built galleons) give English explorers and commanders a decisive advantage at sea?',
      hinge_question:
        'How did technological innovations in ship design (like John Hawkins’ race-built galleons) give English explorers and commanders a decisive advantage at sea?',
      source_context:
        'Contemporary painting of English race-built galleons using long-range culverins against Spanish warships. Hinge Question: How did technological innovations in ship design (like John Hawkins’ race-built galleons) give English explorers and commanders a decisive advantage at sea?',
      context:
        'Contemporary painting of English race-built galleons using long-range culverins against Spanish warships.',
    },
    4: {
      id: 'source_b_francis_drake_circumnavigator',
      letter: 'B',
      title: 'Source B: Sir Francis Drake Circumnavigating the Globe',
      src: '/images/francis_drake.jpg',
      source: '/images/francis_drake.jpg',
      image: '/images/francis_drake.jpg',
      caption:
        'Sir Francis Drake, navigator, pirate, and naval commander, who became the first Englishman to successfully circumnavigate the globe between 1577 and 1580 aboard the Golden Hind.',
      desc: 'Portrait of Sir Francis Drake following his global circumnavigation.',
      provenance: 'National Portrait Gallery, London (NPG 4032), c. 1583.',
      citation: 'National Portrait Gallery, London, c. 1583.',
      question:
        'Why was Drake’s return from his circumnavigation in 1580 celebrated as both a financial triumph and a symbol of national prestige?',
      hinge_question:
        'Why was Drake’s return from his circumnavigation in 1580 celebrated as both a financial triumph and a symbol of national prestige?',
      source_context:
        'Portrait of Sir Francis Drake following his global circumnavigation aboard the Golden Hind. Hinge Question: Why was Drake’s return from his circumnavigation in 1580 celebrated as both a financial triumph and a symbol of national prestige?',
      context:
        'Portrait of Sir Francis Drake following his global circumnavigation aboard the Golden Hind.',
    },
  },

  // L12: KT3.4
  lesson_3_4: {
    1: {
      id: 'source_a_walter_raleigh',
      letter: 'A',
      title: 'Source A: Sir Walter Raleigh, Courtier, Explorer, and Coloniser',
      src: '/images/sir_walter_raleigh.jpg',
      source: '/images/sir_walter_raleigh.jpg',
      image: '/images/sir_walter_raleigh.jpg',
      caption:
        'Sir Walter Raleigh, favorite courtier of Queen Elizabeth I, who obtained a royal patent in 1584 to explore and colonize North American territories named "Virginia" in honour of the Virgin Queen.',
      desc: 'Portrait of Sir Walter Raleigh, courtier and sponsor of the Roanoke voyages, c. 1588.',
      provenance: 'National Portrait Gallery, London (NPG 7), c. 1588.',
      citation: 'National Portrait Gallery, London, 1588.',
      question:
        'Why did Walter Raleigh rely on wealthy private investors and royal charters rather than government funding to establish English colonies in America?',
      hinge_question:
        'Why did Walter Raleigh rely on wealthy private investors and royal charters rather than government funding to establish English colonies in America?',
      source_context:
        'Contemporary portrait of Sir Walter Raleigh, who organized the first English colonizing expeditions to Roanoke Island in North America. Hinge Question: Why did Walter Raleigh rely on wealthy private investors and royal charters rather than government funding to establish English colonies in America?',
      context:
        'Contemporary portrait of Sir Walter Raleigh, who organized the first English colonizing expeditions to Roanoke Island.',
    },
    3: {
      id: 'source_b_roanoke_colony_map',
      letter: 'B',
      title: 'Source B: The Roanoke Island Colony Map by John White (1585)',
      src: '/images/roanoke_colony.jpg',
      source: '/images/roanoke_colony.jpg',
      image: '/images/roanoke_colony.jpg',
      caption:
        'John White’s original watercolor map and coastal survey of Roanoke Island and the Virginia coastline, recording the initial landing site of English settlers in 1585.',
      desc: 'Watercolour map of the Roanoke settlement by Governor John White, 1585.',
      provenance: 'British Museum, Prints & Drawings (1906,0509.1.2), 1585.',
      citation: 'British Museum, London, 1585.',
      question:
        'What critical geographic and climatic factors made the Roanoke settlement site so vulnerable to famine and indigenous conflict?',
      hinge_question:
        'What critical geographic and climatic factors made the Roanoke settlement site so vulnerable to famine and indigenous conflict?',
      source_context:
        'John White’s original watercolor map of Roanoke Island and the Virginia coast, 1585. Hinge Question: What critical geographic and climatic factors made the Roanoke settlement site so vulnerable to famine and indigenous conflict?',
      context:
        'John White’s original watercolor map of Roanoke Island and the Virginia coast, 1585.',
    },
  },
};

// Apply sources to unitData
unitData.lessons.forEach((lesson) => {
  const lessonSources = eeeSources[lesson.id];
  if (!lessonSources) return;

  if (!lesson.teacher_notes) lesson.teacher_notes = {};
  if (!lesson.teacher_notes.source_context) lesson.teacher_notes.source_context = {};

  lesson.narrative_blocks.forEach((block, bIdx) => {
    const actNum = block.act || bIdx + 1;
    const srcObj = lessonSources[actNum];
    if (srcObj) {
      block.source = srcObj;
      lesson.teacher_notes.source_context[`Source ${srcObj.letter}`] = srcObj.source_context;
      console.log(`Updated ${lesson.id} Act ${actNum} -> Source ${srcObj.letter}: ${srcObj.title}`);
    }
  });

  // Also sync lesson.sources array if present
  const allSourcesInLesson = [];
  lesson.narrative_blocks.forEach((b) => {
    if (b.source) allSourcesInLesson.push(b.source);
  });
  lesson.sources = allSourcesInLesson;
});

// Re-serialize unitData into data.js
const newFileContent = `export default ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataFilePath, newFileContent, 'utf8');

console.log('Successfully wrote enriched EEE sources to:', dataFilePath);
