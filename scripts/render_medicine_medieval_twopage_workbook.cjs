const fs = require('fs');
const path = require('path');

function formatText(txt) {
  if (!txt) return '';
  return txt;
}

// ============================================================================
// 5 Dedicated Medieval Enquiry Lesson Configurations (14-Page Mastery Workbook)
// ============================================================================
const medievalConfigs = [
  {
    lessonIndex: 0, // lesson_1_1
    lessonNum: 1,
    id: 'lesson_1_1',
    title: 'KT1.1: Supernatural & Religious Explanations of Disease (c1250–c1500)',
    enquiryQuestion:
      'Why did the medieval Catholic Church hold an unshakeable monopoly over beliefs about the causes of disease?',
    specAnchor:
      'Ideas about the causes of disease: supernatural and religious explanations; the influence of the Catholic Church on medicine and science.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why the Catholic Church had such a major influence on ideas about the causes of disease in the period c1250–c1500. [12 marks]',
    stimulus: ['Monastic scriptoria and book-copying', 'The imprisonment of Roger Bacon (1277)'],
    structureStrip: [
      {
        col: '1. MONASTIC MONOPOLY ON LEARNING',
        text: 'Explain how monks controlled all manuscript copying in scriptoria; universities taught theology and Galen exclusively; dissent was punished as heresy (Roger Bacon 1277).',
      },
      {
        col: '2. DISEASE AS DIVINE RETRIBUTION',
        text: 'Explain how the Church taught illness was sent directly by God to punish individual or communal sin, or test virtue (e.g. biblical leprosy and Lazar houses).',
      },
      {
        col: '3. ASTROLOGY & SCRIPTURAL DOGMA',
        text: 'Explain how church scholars accepted Christian astrology (e.g. 1345 planetary conjunction); lack of scientific instruments left ordinary people with zero alternative ideas.',
      },
    ],
    connectives:
      'One major reason for Church influence was... &bull; In particular, monastic scriptoria... &bull; Furthermore, disease was seen as divine retribution... &bull; Crucially, the imprisonment of Roger Bacon in 1277 proved... &bull; Consequently...',
    wordBank: {
      technical:
        'divine retribution &bull; biblical leprosy &bull; Lazar houses &bull; teleology &bull; heresy &bull; Roger Bacon (1277)',
      institutional:
        'monastic scriptoria &bull; Catholic Church &bull; University of Paris &bull; papal authority &bull; Articella',
      continuity:
        'supernatural punishment &bull; 1345 planetary conjunction &bull; Mars, Jupiter &amp; Saturn in Aquarius &bull; astrological almanacs',
    },
    doNow: [
      {
        q: 'Which ancient Greek physician originally developed the Theory of the Four Humours?',
        a: 'Hippocrates of Kos',
      },
      {
        q: 'Which ancient Roman physician expanded this into the Theory of Opposites?',
        a: 'Claudius Galen',
      },
      {
        q: 'What is the medical term for corrupt, foul-smelling air believed to cause disease?',
        a: 'Miasma',
      },
      {
        q: 'Why did the medieval Catholic Church actively support the medical writings of Galen?',
        a: 'Galen taught that the human body was designed by a single divine Creator (teleology).',
      },
    ],
    coreKnowledge: [
      {
        heading: 'The Church Monopoly on Education & Scriptorium Censorship:',
        text: 'Monasteries controlled all manuscript copying and libraries. Because Galen argued every human organ was purposefully crafted by a single divine Creator, the Church declared his writings sacred dogma. Questioning Galen was branded heresy; Franciscan friar Roger Bacon was imprisoned in 1277 for advocating firsthand empirical experimentation.',
      },
      {
        heading: 'Disease as Divine Retribution for Sin:',
        text: 'Illness was understood as sent directly by God to punish personal sin, cleanse moral corruption, or test faith. Leprosy was viewed as an outward sign of internal wickedness; lepers were cast out into Lazar houses with wooden clappers as living warnings of divine wrath.',
      },
      {
        heading: 'Astrology & The 1345 Planetary Conjunction:',
        text: 'The Church incorporated astrology into Christian philosophy. When unusual alignments occurred—such as the March 1345 conjunction of Mars, Jupiter, and Saturn in Aquarius—University of Paris physicians blamed celestial forces for corrupting the atmosphere with pestilence.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Divine Retribution',
      termB: 'Planetary Conjunction',
      prompt:
        'Explain the crucial difference between <strong>divine retribution</strong> (God directly inflicting illness as punishment for sin) and a <strong>planetary conjunction</strong> (astrological alignment of planets corrupting the air):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which ideas about the cause of disease in the Medieval period (c1250–c1500) were similar to ideas in the Renaissance period (c1500–c1700). [4 marks]',
      hint: 'Focus on the persistent belief that God sent epidemic disease (such as the 1348 Black Death and the 1665 Great Plague) to punish human sin.',
      stems:
        'One way ideas about causes were similar was the continued belief in divine punishment... &bull; In the Medieval period... &bull; Similarly, in the Renaissance...',
    },
    livingTimelineMission: {
      milestone: 'Milestones 1 & 2 (c. 1250 & 1277)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestones 1 & 2)</strong>. In the sketchpad frame, sketch the monastic scriptorium and annotate the Church warning: <em>Dissent from Galen is Heresy!</em>',
    },
  },
  {
    lessonIndex: 1, // lesson_1_2
    lessonNum: 2,
    id: 'lesson_1_2',
    title: 'KT1.2: Rational Explanations: Hippocrates, Galen & The Four Humours (c1250–c1500)',
    enquiryQuestion:
      'How did Hippocrates and Galen provide medieval doctors with an entirely rational, natural explanation of disease?',
    specAnchor:
      'Rational explanations for disease: the Theory of the Four Humours (Hippocrates), the Theory of Opposites (Galen), and Miasma theory.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why the Theory of the Four Humours remained the dominant rational explanation of disease throughout the period c1250–c1500. [12 marks]',
    stimulus: ['Galen’s Theory of Opposites', 'The diagnostic matula (uroscopy)'],
    structureStrip: [
      {
        col: '1. ELEGANT LOGIC OF THE FOUR HUMOURS',
        text: 'Explain how Hippocrates’ balance of blood, phlegm, yellow bile, and black bile linked bodily fluids to seasons and elements, providing a universal, sensible explanation.',
      },
      {
        col: '2. GALEN’S THEORY OF OPPOSITES',
        text: 'Explain how Galen provided doctors with practical treatment rules (curing excess cold/moist phlegm with hot/dry remedies), making the theory actionable and comprehensive.',
      },
      {
        col: '3. UNIVERSAL DIAGNOSTIC TOOLS',
        text: 'Explain how uroscopy (examining urine in a matula against radial charts) and the Zodiac Man gave physicians authority without needing human dissection.',
      },
    ],
    connectives:
      'A primary reason for the dominance of the Four Humours was... &bull; Crucially, Galen extended this by introducing... &bull; Furthermore, diagnostic tools such as the matula... &bull; Because the theory explained every symptom without contradiction... &bull; Consequently...',
    wordBank: {
      technical:
        'Four Humours &bull; Theory of Opposites &bull; uroscopy &bull; matula flask &bull; Vademecum &bull; Zodiac Man (Homo Signorum)',
      fluids:
        'blood (sanguine) &bull; phlegm (phlegmatic) &bull; yellow bile (choleric) &bull; black bile (melancholic) &bull; clinical observation',
      rational:
        'Hippocrates of Kos &bull; Claudius Galen &bull; Articella &bull; miasma (corrupt air) &bull; bodily equilibrium',
    },
    doNow: [
      {
        q: 'Why did the medieval Church consider Galen’s writings acceptable for Christian teaching?',
        a: 'Galen taught that the body was designed by a single divine Creator (teleology).',
      },
      {
        q: 'Name the Franciscan friar imprisoned in 1277 for advocating firsthand empirical experimentation.',
        a: 'Roger Bacon',
      },
      {
        q: 'What astrological event in March 1345 did University of Paris physicians blame for corrupting the atmosphere?',
        a: 'The conjunction of Saturn, Jupiter, and Mars in Aquarius',
      },
      {
        q: 'What special hospitals were built outside medieval town walls to isolate patients suffering from divine skin disease?',
        a: 'Lazar houses (for lepers)',
      },
    ],
    coreKnowledge: [
      {
        heading: 'The Four Humours & Bodily Equilibrium:',
        text: 'Hippocrates taught that health was an exact balance of blood (spring/air/hot & wet), phlegm (winter/water/cold & wet), yellow bile (summer/fire/hot & dry), and black bile (autumn/earth/cold & dry). An imbalance caused distinct symptoms and temperaments (sanguine, phlegmatic, choleric, melancholic).',
      },
      {
        heading: 'Galen’s Theory of Opposites:',
        text: 'Second-century Roman physician Galen developed the Theory of Opposites: treating an excess of one humour with its opposite quality. A patient with a cold, moist phlegmatic fever was treated with hot, dry pepper or wine; an overheated choleric fever was cooled with cucumber and cold baths.',
      },
      {
        heading: 'The Physician’s Diagnostic Toolkit (Uroscopy & Astrology):',
        text: 'Physicians diagnosed patients without physical examination by holding urine up to the light in a glass matula, comparing color, clarity, and sediment against a 20-shade chart; they consulted the Zodiac Man in their pocket Vademecum before prescribing bloodletting.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Humoural Imbalance',
      termB: 'Miasmatic Corruption',
      prompt:
        'Explain the crucial difference between an internal <strong>humoural imbalance</strong> (bodily fluids out of equilibrium) and external <strong>miasmatic corruption</strong> (breathing foul air from rotting waste or swamps):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which ideas about the cause of disease in the Medieval period (c1250–c1500) were different from ideas in the Modern period (c1900–present). [4 marks]',
      hint: 'Contrast the medieval belief in invisible humoural imbalances and miasma with the modern understanding of specific pathogenic microbes (bacteria and viruses) discovered under microscopes.',
      stems:
        'One way ideas about causes differed was the belief in... &bull; In the Medieval period, disease was blamed on... &bull; In contrast, in the Modern period...',
    },
    livingTimelineMission: {
      milestone: 'Milestone 3 (c. 1300)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestone 3: c. 1300)</strong>. In the sketchpad frame, sketch a physician holding a glass matula up to the light and annotate: <em>The Vademecum and Zodiac Man!</em>',
    },
  },
  {
    lessonIndex: 2, // lesson_1_3
    lessonNum: 3,
    id: 'lesson_1_3',
    title: 'KT1.3: Approaches to Prevention & Treatment: Rituals, Bleeding & Purging (c1250–c1500)',
    enquiryQuestion:
      'Why did medieval treatments focus so heavily on draining, purging, and balancing the body?',
    specAnchor:
      'Approaches to prevention and treatment: religious and supernatural methods (pilgrimage, prayer, relics); rational treatments (bloodletting, purging, herbal remedies, regimen sanitatis).',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why humoural treatments such as bloodletting and purging remained the standard medical response to illness throughout the Middle Ages (c1250–c1500). [12 marks]',
    stimulus: ['Phlebotomy (bloodletting)', 'The Regimen Sanitatis'],
    structureStrip: [
      {
        col: '1. PHLEBOTOMY & HUMOURAL DRAINING',
        text: 'Explain how doctors believed excess blood caused fevers and inflammation; describe methods (fleam incisions into veins, cupping, and live leeches) and why patients felt psychosomatic relief.',
      },
      {
        col: '2. PURGING & THE DIGESTIVE TRACT',
        text: 'Explain how emetics (inducing vomiting) and laxatives/enemas (clysters) were used to violently expel corrupted humours from the stomach and intestines.',
      },
      {
        col: '3. HERBAL REMEDIES & REGIMEN SANITATIS',
        text: 'Explain how apothecaries compounded complex herbal antidotes like Theriac (60+ ingredients) and how physicians advised rich patients to follow the Regimen Sanitatis (diet, exercise, rest).',
      },
    ],
    connectives:
      'One major reason bloodletting was so widespread was... &bull; Furthermore, physicians believed that purging... &bull; Crucially, complex herbal remedies like Theriac... &bull; Because these treatments aligned perfectly with Galenic theory... &bull; Consequently...',
    wordBank: {
      technical:
        'phlebotomy (bloodletting) &bull; fleam &bull; cupping &bull; leeches (Hirudo medicinalis) &bull; purging &bull; emetics &bull; clyster (enema)',
      remedies:
        'Theriac (treacle) &bull; herbal infusions &bull; viper flesh &bull; opium &bull; chamomile &bull; mint &bull; Regimen Sanitatis',
      supernatural:
        'pilgrimages (Canterbury) &bull; holy relics &bull; fasting &amp; prayer &bull; votive candles &bull; incantations',
    },
    doNow: [
      {
        q: 'Name the four humours identified by Hippocrates.',
        a: 'Blood, Phlegm, Yellow Bile, Black Bile',
      },
      {
        q: 'What medical theory developed by Galen treated excess heat and moisture with cold and dry substances?',
        a: 'The Theory of Opposites',
      },
      {
        q: 'What circular diagram linked star signs to body parts to dictate when surgery could be performed?',
        a: 'The Zodiac Man (Homo Signorum)',
      },
      {
        q: 'What clear glass flask was used by medieval physicians to examine urine colour, sediment, and clarity?',
        a: 'The Matula',
      },
    ],
    coreKnowledge: [
      {
        heading: 'Supernatural Healing Rituals & Divine Intercession:',
        text: 'To appease God’s wrath or cleanse sin, patients undertook pilgrimages to holy shrines (e.g. St Thomas Becket at Canterbury), touched holy relics, lit wax votive candles matching their body weight, fasted, and recited Ave Marias under priestly guidance.',
      },
      {
        heading: 'Humoural Draining (Phlebotomy & Purging):',
        text: 'To restore balance under Galen’s Opposites, physicians prescribed phlebotomy: opening veins with a fleam, drawing blood with cupping glasses, or applying live leeches; digestive tracts were evacuated using herbal emetics (scammony) or clyster syringes.',
      },
      {
        heading: 'Herbal Pharmacopoeia & The Regimen Sanitatis:',
        text: 'Apothecaries prepared Theriac (an ancient compound of 64 ingredients including opium and viper flesh); wealthy households followed the Regimen Sanitatis—a personalised lifestyle guide regulating diet, sleep, exercise, and bathing to maintain humoural balance.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Phlebotomy (Bloodletting)',
      termB: 'Purging (Emetics/Clysters)',
      prompt:
        'Explain the difference between humoural draining via <strong>phlebotomy</strong> (opening veins with a fleam or leeches) and humoural evacuation via <strong>purging</strong> (inducing vomiting or bowel movements with emetics and clysters):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which medical treatments in the Medieval period (c1250–c1500) were different from medical treatments in the Renaissance period (c1500–c1700). [4 marks]',
      hint: 'Contrast medieval reliance on herbal Theriac and humoural balance with Renaissance chemical remedies pioneered by Paracelsus (e.g. antimony, mercury, and minerals).',
      stems:
        'One way medical treatments differed was... &bull; In the Medieval period, treatments relied on... &bull; In contrast, in the Renaissance period, practitioners began to use...',
    },
    livingTimelineMission: {
      milestone: 'Milestone 4 (c. 1320)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestone 4: c. 1320)</strong>. In the sketchpad frame, sketch a fleam, cupping glass, and medicinal leeches, and annotate: <em>Bleeding and Purging to balance the Humours!</em>',
    },
  },
  {
    lessonIndex: 3, // lesson_1_4
    lessonNum: 4,
    id: 'lesson_1_4',
    title: 'KT1.4: Medical Care Providers & Monastic Hospitals: ‘Care Not Cure’ (c1250–c1500)',
    enquiryQuestion:
      'Why did medieval hospitals focus entirely on ‘care not cure’, and who actually treated the sick?',
    specAnchor:
      'Medical care providers: university-trained physicians, barber-surgeons, apothecaries, and wise women; the role of medieval hospitals and monastic care.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why medieval hospitals focused on providing ‘care not cure’ in the period c1250–c1500. [12 marks]',
    stimulus: ['The role of monks and nuns', 'The exclusion of infectious patients'],
    structureStrip: [
      {
        col: '1. RELIGIOUS FOUNDATIONS & HOSPITIUM',
        text: 'Explain how over 1,200 medieval hospitals were monastic charities funded by the Church; their purpose was hospitium (hospitality, warmth, food, clean sheets, and spiritual salvation facing a chapel altar).',
      },
      {
        col: '2. LACK OF MEDICAL KNOWLEDGE & PHYSICIANS',
        text: 'Explain how hospitals employed monks and nuns rather than university physicians; doctors were too expensive, surgery was prohibited to monks, and medicine had no known cures for internal disease.',
      },
      {
        col: '3. STRICT SELECTION CRITERIA & EXCLUSION',
        text: 'Explain why hospitals excluded infectious lepers, plague victims, and terminal cases to preserve spiritual peace and avoid contamination, sending them to isolated Lazar houses.',
      },
    ],
    connectives:
      'A central reason medieval hospitals focused on care not cure was... &bull; In particular, monasteries established hospitals to... &bull; Furthermore, university-trained physicians were absent because... &bull; Crucially, infectious patients were turned away because... &bull; Consequently...',
    wordBank: {
      technical:
        '‘care not cure’ &bull; hospitium &bull; infirmary &bull; St Bartholomew’s (1123) &bull; Augustinian nuns &bull; chapel altar',
      practitioners:
        'university physician &bull; barber-surgeon &bull; apothecary &bull; wise woman &bull; guild apprenticeship &bull; Guild of Surgeons (1368)',
      exclusion:
        'Lazar houses &bull; leprosy &bull; infectious diseases &bull; terminal illness &bull; spiritual salvation &bull; daily Mass',
    },
    doNow: [
      {
        q: 'What three methods were used by medieval practitioners to perform bloodletting?',
        a: 'Fleams (vein incision), cupping glasses, and live leeches',
      },
      {
        q: 'What famous herbal compound contained over 60 ingredients including dried viper flesh and opium?',
        a: 'Theriac',
      },
      {
        q: 'What Latin name was given to the lifestyle guide advising medieval elites on diet, sleep, and bathing?',
        a: 'Regimen Sanitatis',
      },
      {
        q: 'What surgical tool was used by barber-surgeons to cut into a vein for phlebotomy?',
        a: 'A fleam',
      },
    ],
    coreKnowledge: [
      {
        heading: 'The Medieval Practitioner Hierarchy:',
        text: 'Wealthy elites hired university physicians (studied 7–10 years reading Latin Galenic texts without touching patients); ordinary people consulted barber-surgeons (manual bloodletting, tooth-pulling, amputations), apothecaries (compounding herbs), or local wise women (herbs, charms, and childbirth).',
      },
      {
        heading: 'Monastic Hospitals & Spiritual Salvation:',
        text: 'By 1500, England had over 1,200 hospitals run by religious orders (e.g. St Bartholomew’s, 1123). Wards were arranged like churches so patients could view the altar from their beds, receiving nourishing stew, clean linen, warmth, and daily Mass.',
      },
      {
        heading: '‘Care Not Cure’ & Strict Patient Selection:',
        text: 'Hospitals aimed to heal the immortal soul rather than cure bodily pathology; pregnant women, lepers, the blind, and those with contagious pestilence were strictly barred, redirecting lepers to separate Lazar houses.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Monastic Hospital ‘Care’',
      termB: 'Modern Medical ‘Cure’',
      prompt:
        'Explain the difference between medieval monastic hospital <strong>spiritual care</strong> (hospitality, clean bedding, warmth, prayer, Mass) and modern hospital <strong>medical cure</strong> (specialist doctors, clinical surgery, pharmaceuticals):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which hospital care in the Medieval period (c1250–c1500) was different from hospital care in the 18th or 19th century. [4 marks]',
      hint: 'Contrast medieval monastic hospitals run by nuns offering rest and prayer without doctors, with 18th/19th century voluntary hospitals employing trained surgeons and medical staff to actively cure disease.',
      stems:
        'One way hospital care differed was... &bull; In the Medieval period, hospitals... &bull; In contrast, in the 18th and 19th centuries...',
    },
    livingTimelineMission: {
      milestone: 'Milestones 7 & 8 (c. 1400 & c. 1450)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestones 7 & 8)</strong>. In the sketchpad frame, sketch a monastic hospital ward facing the altar and annotate: <em>Hospitality, warmth, and prayer, not medical cure!</em>',
    },
  },
  {
    lessonIndex: 4, // lesson_1_5
    lessonNum: 5,
    id: 'lesson_1_5',
    title: 'KT1.5: Case Study: Dealing with the Black Death (1348–1349)',
    enquiryQuestion:
      'Why were medieval people completely helpless in the face of the Black Death epidemic?',
    specAnchor:
      'Dealing with the Black Death, 1348–49: approaches to treatment and attempts to prevent its spread.',
    tariff: '[16+4 marks &bull; 25 mins]',
    examStem:
      '‘The main reason why people failed to prevent the spread of the Black Death in 1348–49 was belief in supernatural causes.’ How far do you agree? Explain your answer. [16+4 marks]',
    stimulus: ['Punishment from God', 'Miasma (bad air)'],
    structureStrip: [
      {
        col: '1. SUPERNATURAL CAUSES & RELIGIOUS PANIC (AGREE)',
        text: 'Explain how people believed God sent the pestilence to punish sin, prompting mass church gatherings, pilgrimages, and flagellants scourging themselves—which actually accelerated the spread of contagion.',
      },
      {
        col: '2. MIASMA, LIVING CONDITIONS & FLEAS (DISAGREE)',
        text: 'Explain how belief in bad air led to ineffective measures (street fires, carrying sweet posies), while squalid, cramped timber housing and open cesspits enabled black rats and fleas (Yersinia pestis) to multiply unchecked.',
      },
      {
        col: '3. LACK OF MEDICAL KNOWLEDGE & CIVIC WEAKNESS (EVALUATION)',
        text: 'Weigh the factors: neither physicians nor civic officials understood germ theory; Edward III’s 1349 street-cleaning mandate was powerless against rat fleas and pneumonic coughing droplets.',
      },
    ],
    connectives:
      'On the one hand, belief in supernatural causes was a primary reason for failure because... &bull; For instance, flagellants whipped themselves... &bull; On the other hand, misdiagnosis of miasma and squalid conditions were equally vital because... &bull; Crucially, authorities lacked knowledge of Yersinia pestis... &bull; In conclusion, while religious fatalism dictated reactions, the fundamental barrier was...',
    wordBank: {
      technical:
        'The Black Death (1348–49) &bull; Melcombe Regis &bull; Yersinia pestis &bull; bubonic strain (rat fleas) &bull; pneumonic strain (droplets) &bull; buboes &bull; 30–50% mortality',
      reactions:
        'flagellants &bull; public religious processions &bull; sweet posies &amp; pomanders &bull; street bonfires &bull; lancing buboes',
      civic:
        'King Edward III &bull; Mayor of London &bull; 1349 street-cleaning order &bull; East Smithfield plague pits &bull; quarantine failure',
    },
    doNow: [
      {
        q: 'State the motto or philosophy of medieval monastic hospitals regarding patient treatment.',
        a: '‘Care not cure’ (hospitality, warmth, food, and prayer)',
      },
      {
        q: 'Which group of medical practitioners carried out bloodletting, tooth-pulling, and minor amputations?',
        a: 'Barber-surgeons',
      },
      {
        q: 'Which patients were strictly excluded from medieval monastic hospitals?',
        a: 'Lepers, plague victims, the terminally ill, and pregnant women',
      },
      {
        q: 'In what Dorset port did the Black Death first arrive in England in June 1348?',
        a: 'Melcombe Regis',
      },
    ],
    coreKnowledge: [
      {
        heading: 'Arrival & Dual Strains (1348):',
        text: 'Arrived in June 1348 at Melcombe Regis (Dorset) on trade ships from Gascony, killing 30–50% of England’s population. Bubonic plague (rat flea bites) caused agonizing lymph buboes in the groin/armpits (50% mortality); Pneumonic plague (spread by cough droplets) attacked lungs with near 100% mortality.',
      },
      {
        heading: 'Believed Causes & Desperate Prevention:',
        text: 'People blamed God’s wrath, the 1345 planetary conjunction in Aquarius, and corrupt miasma from rotting waste. Reactions included processions, self-flagellation with iron scourges, burning aromatic resin fires, and carrying sweet posies.',
      },
      {
        heading: 'Ineffective Treatments & Civic Panic:',
        text: 'Barber-surgeons lanced buboes with hot irons or tied live plucked chickens to swellings; local councils were overwhelmed. In 1349, King Edward III ordered the Mayor of London to clear filth and human dung, but unburied corpses filled emergency mass pits at East Smithfield.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Bubonic Plague (Flea-Borne)',
      termB: 'Pneumonic Plague (Airborne)',
      prompt:
        'Explain the critical distinction between <strong>bubonic plague</strong> (spread by rat flea bites, producing agonizing lymph buboes) and <strong>pneumonic plague</strong> (spread by cough droplets, attacking lungs with near 100% mortality):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which reactions to the Black Death (1348) were similar to reactions to the Great Plague of London (1665). [4 marks]',
      hint: 'Focus on the continued reliance on fires in the streets, carrying sweet herbs to counter miasma, and viewing epidemics as divine punishment for human wickedness.',
      stems:
        'One way reactions were similar was the widespread belief that miasma caused the plague... &bull; During the Black Death in 1348... &bull; Similarly, during the Great Plague of 1665...',
    },
    livingTimelineMission: {
      milestone: 'Milestones 5 & 6 (1348 & 1349)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestones 5 & 6)</strong>. In the sketchpad frame, sketch the emergency plague burial pit at East Smithfield and annotate: <em>The Catastrophe of 1348–1349!</em>',
    },
  },
];

// ============================================================================
// HTML WORKBOOK GENERATOR FUNCTION
// ============================================================================
function buildMedievalTwoPageWorkbook(unitData, period) {
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Edexcel GCSE (9–1) Medicine &bull; Medieval England Pupil Mastery Workbook</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Cinzel:wght@700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <style>
    *, *:before, *:after { box-sizing: border-box; }
    @page {
      size: A4 portrait;
      margin: 10mm 12mm 12mm 12mm;
    }
    body {
      font-family: 'Georgia', 'Garamond', serif;
      font-size: 10pt;
      line-height: 1.35;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6, strong, th, .sans {
      font-family: 'Inter', -apple-system, sans-serif;
    }
    .page, .page-container {
      width: 100%;
      height: 272mm;
      max-height: 272mm;
      overflow: hidden;
      box-sizing: border-box;
      position: relative;
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .page:last-child, .page-container:last-child {
      page-break-after: auto;
    }
    .task-line {
      border-bottom: 1.2px solid #475569;
      height: 7.4mm;
      width: 100%;
      box-sizing: border-box;
    }
    .task-line-dotted {
      border-bottom: 1.2px solid #475569;
      height: 5.2mm;
      width: 100%;
      box-sizing: border-box;
    }
    .archival-badge {
      font-family: 'Inter', sans-serif;
      font-size: 7.6pt;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 2.5px 7px;
      border-radius: 3px;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      font-weight: 600;
    }
    .spec-anchor-bar {
      background: #fdf8f6;
      border: 1.2px solid #fed7aa;
      border-left: 4px solid #78350f;
      border-radius: 4px;
      padding: 3.5px 7px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 7px;
      font-family: 'Inter', sans-serif;
    }
    .spec-anchor-badge {
      background: #78350f;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    .spec-anchor-text {
      font-size: 7.2pt;
      color: #1e293b;
      line-height: 1.25;
    }
    .living-mission-box {
      border: 1.2px dashed #92400e;
      background: #fffbeb;
      border-radius: 4px;
      padding: 3.5px 7px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: 'Inter', sans-serif;
    }
    .living-mission-tag {
      background: #92400e;
      color: #ffffff;
      font-size: 6.8pt;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-right: 6px;
      white-space: nowrap;
    }
    .living-mission-text {
      font-size: 7.2pt;
      color: #78350f;
      line-height: 1.25;
    }
    .living-mission-link {
      font-weight: 700;
      color: #92400e;
      font-size: 7pt;
      white-space: nowrap;
      margin-left: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
`;

  // ====================================================================
  // PAGE 1: FRONT COVER (Strict Neutral Departmental Branding)
  // ====================================================================
  html += `
  <div class="page page-container" id="page-1" style="padding: 18px 22px; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #78350f; outline-offset: -8px;">
    <div>
      <!-- Top Institutional Banner with Customizer Stamping Hook -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #78350f; padding-bottom: 6px; margin-bottom: 12px;">
        <div data-department-name="The History Department" style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Cinzel', serif; font-size: 10pt; font-weight: 900; color: #78350f; text-transform: uppercase; letter-spacing: 1.5px;">
            <span class="school-brand-target">The History Department</span> &bull; Pupil Mastery Series
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; color: #64748b; letter-spacing: 0.5px;">
          EDEXCEL GCSE (9–1) HISTORY &bull; EDITION 2026.1
        </div>
      </div>

      <!-- Pupil Details Strip -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: #fdf8f6; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 14px; align-items: center;">
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Pupil Name:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Class:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
        <div style="display: flex; align-items: baseline;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 8.5pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap; margin-right: 8px;">Target:</strong>
          <div style="flex: 1; border-bottom: 1.5px solid #334155; height: 14px;"></div>
        </div>
      </div>
    </div>

    <!-- Central Hero & Title Block -->
    <div style="text-align: center; margin: 15px 0;">
      <div style="display: inline-block; background: #78350f; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 800; padding: 3px 12px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
        Key Topic 1 &bull; c1250–c1500 &bull; 14-Page Complete Mastery Workbook
      </div>
      <h1 style="font-family: 'Playfair Display', serif; font-size: 26pt; line-height: 1.15; color: #0f172a; margin: 0 0 6px 0; font-weight: 800; letter-spacing: -0.5px;">
        Medicine in Medieval England
      </h1>
      <div style="font-family: 'Cinzel', serif; font-size: 12.5pt; color: #78350f; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 14px;">
        Supernatural Dogma, The Four Humours &amp; The Black Death Catastrophe
      </div>

      <!-- Historical Primary Artifact Banner Frame -->
      <div style="border: 2px solid #78350f; border-radius: 6px; padding: 5px; background: #fdf8f6; max-width: 580px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <img src="/images/history_of_medicine_hero.jpg" alt="Medieval Physician Examining Urine in a Matula" style="width: 100%; height: 165px; object-fit: cover; border-radius: 4px; display: block;">
        <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #64748b; padding: 4px 6px 0 6px;">
          <span><strong>Primary Artifact:</strong> Medieval Physician Examining a Matula &bull; British Library MS Harley 1585</span>
          <span>Shelfmark: ARCH-MED-1250</span>
        </div>
      </div>
    </div>

    <!-- Specification Breakdown & Learning Pillars -->
    <div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
        <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #78350f; border-radius: 4px; padding: 8px 10px; background: #ffffff;">
          <h4 style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #78350f; text-transform: uppercase; margin: 0 0 4px 0;">
            Thematic Specification Inquiries (KT1.1–KT1.5)
          </h4>
          <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <li><strong>KT1.1:</strong> Supernatural &amp; religious explanations; Church scribal monopoly.</li>
            <li><strong>KT1.2:</strong> Rational explanations: Hippocrates, Galen, Four Humours &amp; Opposites.</li>
            <li><strong>KT1.3:</strong> Approaches to treatment: Phlebotomy, purging, Theriac &amp; Regimen.</li>
            <li><strong>KT1.4:</strong> Care providers &amp; monastic hospitals (‘care not cure’).</li>
            <li><strong>KT1.5:</strong> Case study: Dealing with the Black Death catastrophe (1348–1349).</li>
          </ul>
        </div>
        <div style="border: 1.2px solid #cbd5e1; border-left: 4px solid #78350f; border-radius: 4px; padding: 8px 10px; background: #ffffff;">
          <h4 style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #78350f; text-transform: uppercase; margin: 0 0 4px 0;">
            Rigorous Exam Mastery Architecture
          </h4>
          <ul style="margin: 0; padding-left: 14px; font-size: 7.2pt; color: #334155; line-height: 1.35;">
            <li><strong>Living Timeline:</strong> 8-node dual-page chronological sketchpad (Pages 2–3).</li>
            <li><strong>Knowledge Injection:</strong> Do Now recall, core knowledge &amp; distinction tasks.</li>
            <li><strong>Paper 1 Question 3:</strong> 5x 4-mark similarity/difference comparative tasks.</li>
            <li><strong>Paper 1 Question 4:</strong> 4x 12-mark causation essays with 3-column structure strips.</li>
            <li><strong>Paper 1 Question 5/6:</strong> 1x 16+4-mark evaluative essay with criteria judgement.</li>
          </ul>
        </div>
      </div>

      <!-- Departmental Guarantee Strip -->
      <div style="border: 1.2px solid #78350f; border-radius: 4px; padding: 6px 12px; background: #fdf8f6; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            GCSE History Revision Hub &bull; Independent Educational Series
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #475569;">
            Standardized 14-Page Double-Page Spread Layout &bull; Zero Page Overflows Guaranteed
          </div>
        </div>
        <div style="text-align: right;">
          <span style="font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 900; color: #78350f;">96 TOTAL MARKS</span>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b; font-weight: 600;">PAPER 1 SECTION B</div>
        </div>
      </div>
    </div>

    <!-- Bottom Departmental Footer -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #78350f; padding-top: 8px; margin-top: 4px;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #16a34a;"></span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e293b;">
          Zero Page Overflow Guaranteed &bull; 100% Edexcel Specification Aligned
        </span>
      </div>
      <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #78350f; letter-spacing: 0.5px;">
        PAGE 1 OF 14
      </div>
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: DOUBLE-PAGE SPREAD: MEDIEVAL LIVING TIMELINE (8 MILESTONES)
  // ====================================================================
  html += `
  <!-- PAGE 2: LIVING TIMELINE PART 1 (MILESTONES 1–4: c1250–c1320) -->
  <div class="page page-container" id="page-2" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #78350f; outline-offset: -6px;">
    <div>
      <div style="border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1px; color: #78350f; font-weight: 700;">
            Living Unit Timeline &bull; Part I: Religious Dogma &amp; Humoural Foundations (c1250–c1320)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Medieval Intellectual World
          </h2>
        </div>
        <span class="archival-badge" style="background: #fdf8f6; color: #78350f; border-color: #fed7aa;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #fdf8f6; border: 1px solid #fed7aa; border-left: 3px solid #78350f; padding: 3.5px 8px; margin-bottom: 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Illustrate each milestone inside its sketchpad box. Add visual symbols, causal arrows, and forensic tags as you complete each lesson.</span>
        <span style="font-weight: 700; color: #78350f; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Left</span>
      </div>

      <!-- Chronological Timeline Nodes: Milestones 1–4 -->
      <div style="display: flex; flex-direction: column; gap: 6px;">

        <!-- Milestone 1: c. 1250 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 1 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Scriptorium monk copying Galen text]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>c.1250 Dogma</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #78350f; color: #ffffff; padding: 1px 5px; border-radius: 3px;">c. 1250</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">The Intellectual Triad: Hippocrates, Galen &amp; The Catholic Church</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                Hippocrates’ Four Humours and Galen’s Theory of Opposites dominate medical thinking. Because Galen believed every organ was designed by a single Creator, the Catholic Church adopts his writings as sacred dogma, controlling all manuscript copying in monastic scriptoria.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Church scribal monopoly &bull; teleology &bull; suppression of dissent
            </div>
          </div>
        </div>

        <!-- Milestone 2: 1277 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 2 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Roger Bacon in chains / warning sign]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1277 Heresy</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #991b1b; color: #ffffff; padding: 1px 5px; border-radius: 3px;">1277</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">The Imprisonment of Roger Bacon &amp; Enforcement of Conformity</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                Franciscan friar Roger Bacon is imprisoned by Church authorities for advocating firsthand scientific experimentation over unquestioned obedience to ancient books. His punishment acts as a chilling warning across European universities: challenging Galen is branded heresy.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 1 &bull; Church censorship &bull; suppression of empirical science
            </div>
          </div>
        </div>

        <!-- Milestone 3: c. 1300 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 3 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Matula urine flask &amp; Zodiac Man]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>c.1300 Diagnosis</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #78350f; color: #ffffff; padding: 1px 5px; border-radius: 3px;">c. 1300</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">The Physician’s Diagnostic Toolkit: Uroscopy &amp; The Zodiac Man</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                Physicians carry pocket Vademecum handbooks containing urine charts and astrology wheels. Examining urine color, clarity, and sediment in a glass matula against 20 shades becomes the standard diagnostic method; doctors consult the Zodiac Man before deciding where and when to bleed.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 2 &bull; Uroscopy &bull; astrological diagnostics &bull; Vademecum
            </div>
          </div>
        </div>

        <!-- Milestone 4: c. 1320 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 4 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Barber fleam, leeches &amp; Theriac jar]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>c.1320 Therapy</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #78350f; color: #ffffff; padding: 1px 5px; border-radius: 3px;">c. 1320</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">Humoural Therapeutics: Phlebotomy, Purging &amp; Theriac</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                Treatments focus entirely on restoring humoural balance. Phlebotomy (bloodletting with fleams, cupping, or leeches) and purging (emetics and clysters) physically deplete patients. Apothecaries compound Theriac (60+ ingredients including viper flesh) as a universal antidote.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 3 &bull; Bloodletting &bull; purging &bull; Theriac &bull; Regimen Sanitatis
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Page 2 Footer -->
    <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>The History Department &bull; GCSE Medicine Revision Series</span>
      <span>Key Topic 1 &bull; Living Timeline Part I</span>
      <span>Page 2</span>
    </div>
  </div>

  <!-- PAGE 3: LIVING TIMELINE PART 2 (MILESTONES 5–8: 1345–c1500) -->
  <div class="page page-container" id="page-3" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #78350f; outline-offset: -6px;">
    <div>
      <div style="border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1px; color: #78350f; font-weight: 700;">
            Living Unit Timeline &bull; Part II: Epidemic Catastrophe &amp; Monastic Care (1345–c1500)
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            The Black Death &amp; Institutional Care
          </h2>
        </div>
        <span class="archival-badge" style="background: #fdf8f6; color: #78350f; border-color: #fed7aa;">
          Pages 2–3 Facing Spread
        </span>
      </div>

      <div style="background: #fdf8f6; border: 1px solid #fed7aa; border-left: 3px solid #78350f; padding: 3.5px 8px; margin-bottom: 6px; border-radius: 3px; font-family: 'Inter', sans-serif; font-size: 7pt; color: #475569; display: flex; justify-content: space-between; align-items: center;">
        <span><strong>Living Timeline Protocol:</strong> Illustrate milestones 5–8 below. Notice how the catastrophe of 1348 exposed the total failure of ancient medical theories.</span>
        <span style="font-weight: 700; color: #78350f; white-space: nowrap; margin-left: 8px;">Spine &bull; Facing Right</span>
      </div>

      <!-- Chronological Timeline Nodes: Milestones 5–8 -->
      <div style="display: flex; flex-direction: column; gap: 6px;">

        <!-- Milestone 5: 1345 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 5 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Planets aligned over smoking city]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1345 Conjunction</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #3730a3; color: #ffffff; padding: 1px 5px; border-radius: 3px;">1345</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">The Great Planetary Conjunction of Mars, Jupiter &amp; Saturn</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                In March 1345, Mars, Jupiter, and Saturn align in the sign of Aquarius. University of Paris scholars declare this celestial event drew poisonous vapours from the earth, corrupting the air with deadly miasma. Astrological almanacs become standard tools for predicting pestilence.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lessons 1 &amp; 5 &bull; Astrological causation &bull; atmospheric miasma
            </div>
          </div>
        </div>

        <!-- Milestone 6: 1348 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 6 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Black rat flea, bubo &amp; mass grave]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1348 Pestilence</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #991b1b; color: #ffffff; padding: 1px 5px; border-radius: 3px;">1348</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">The Black Death Catastrophe at Melcombe Regis, Dorset</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                In June 1348, the pestilence arrives on trade ships from Gascony carrying black rats and fleas. The dual epidemic—bubonic plague (flea bites, agonizing buboes, 50% death) and pneumonic plague (airborne coughing droplets, 100% death)—wipes out 30–50% of England within 18 months.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; Bubonic vs pneumonic strains &bull; catastrophic mortality
            </div>
          </div>
        </div>

        <!-- Milestone 7: 1349 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 7 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Edward III royal seal &amp; East Smithfield]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>1349 Sanitation</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #78350f; color: #ffffff; padding: 1px 5px; border-radius: 3px;">1349</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">King Edward III’s Sanitary Mandate &amp; London Mass Pits</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                Alarmed by rotting corpses and filth, Edward III commands the Mayor of London to clean the streets of animal dung and human waste to eliminate corrupt miasma. Simultaneously, churchyards overflow and emergency trenches are dug at East Smithfield to bury hundreds daily.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 5 &bull; Civic public health orders &bull; mass mortality
            </div>
          </div>
        </div>

        <!-- Milestone 8: c. 1400 -->
        <div style="display: grid; grid-template-columns: 105px 1fr; gap: 9px; align-items: stretch; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff;">
          <div style="border: 1.2px dashed #94a3b8; border-radius: 3px; background: #fafaf9; display: flex; flex-direction: column; justify-content: space-between; padding: 3px 4px; min-height: 26mm;">
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌜</span><span>Milestone 8 Sketchpad</span><span>⌝</span>
            </div>
            <div style="text-align: center; font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic;">
              [Sketch: Hospital ward beds facing chapel altar]
            </div>
            <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 6pt; color: #94a3b8;">
              <span>⌞</span><span>c.1400 Hospitals</span><span>⌟</span>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 2px;">
                <span style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; background: #166534; color: #ffffff; padding: 1px 5px; border-radius: 3px;">c. 1400</span>
                <strong style="font-family: 'Inter', sans-serif; font-size: 8pt; color: #0f172a;">Monastic Hospitals: The Golden Age of ‘Care Not Cure’</strong>
              </div>
              <p style="font-family: 'Georgia', serif; font-size: 7.4pt; color: #334155; line-height: 1.3; margin: 0;">
                Over 1,200 hospitals operate across England run by monks and nuns (e.g. St Bartholomew’s, St Thomas’s). Patients receive clean bedding, warmth, food, and continuous prayer facing a chapel altar. Zero surgery or medical cure is attempted; lepers and plague victims are strictly barred.
              </p>
            </div>
            <div style="border-top: 1px dotted #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
              <strong>Key Enquiry Link:</strong> Lesson 4 &bull; ‘Care not cure’ &bull; religious hospitium &bull; patient exclusion
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Page 3 Footer -->
    <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>The History Department &bull; GCSE Medicine Revision Series</span>
      <span>Key Topic 1 &bull; Living Timeline Part II</span>
      <span>Page 3</span>
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–13: 5 DEDICATED TWO-PAGE SPREADS (LESSONS 1.1 TO 1.5)
  // ====================================================================
  medievalConfigs.forEach((cfg) => {
    const leftPageNum = cfg.lessonNum * 2 + 2; // e.g. 1*2+2 = 4, 2*2+2 = 6, ..., 5*2+2 = 12
    const rightPageNum = cfg.lessonNum * 2 + 3; // e.g. 1*2+3 = 5, 2*2+3 = 7, ..., 5*2+3 = 13

    // ------------------------------------------------------------------
    // LEFT PAGE: KNOWLEDGE INJECTION, RETRIEVAL & 4-MARK COMPARISON
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container" id="page-${leftPageNum}" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #78350f; outline-offset: -6px;">
    <div>
      <!-- Lesson Header & Spec Anchor -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #78350f; padding-bottom: 3px; margin-bottom: 5px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #78350f; text-transform: uppercase; letter-spacing: 0.8px;">
            Spread ${cfg.lessonNum} &bull; Medieval Mastery &bull; Part A
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f172a; margin: 1px 0; font-weight: 700;">
            ${cfg.title}
          </h2>
        </div>
        <div style="text-align: right; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b; font-weight: 600;">
          PAGE ${leftPageNum} &bull; FOUNDATION
        </div>
      </div>

      <!-- Specification Anchor Bar -->
      <div class="spec-anchor-bar">
        <span class="spec-anchor-badge">Spec Focus</span>
        <span class="spec-anchor-text">${cfg.specAnchor}</span>
      </div>

      <!-- 4-Question Do Now Retrieval Grid -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #ffffff; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #78350f; text-transform: uppercase;">
            &bull; 'Do Now' Retrieval Drill (Prior Knowledge Recall)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b;">4 Marks Available</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
          ${cfg.doNow
            .map(
              (item, idx) => `
          <div style="background: #fdf8f6; border: 1px solid #fed7aa; border-radius: 3px; padding: 3px 5px;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #0f172a; margin-bottom: 1px;">
              ${idx + 1}. ${item.q}
            </div>
            <div class="task-line-dotted"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Core Knowledge Architecture (3 Thematic Pillars) -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 7px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #78350f; text-transform: uppercase; margin-bottom: 3px;">
          Core Knowledge Architecture &bull; High-Yield Fact Injection
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${cfg.coreKnowledge
            .map(
              (know) => `
          <div style="border-left: 2.5px solid #78350f; padding-left: 6px; background: #fafaf9;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #78350f; display: block; margin-bottom: 1px;">${know.heading}</strong>
            <p style="font-family: 'Georgia', serif; font-size: 7.2pt; color: #334155; margin: 0; line-height: 1.25;">${know.text}</p>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Disciplinary Vocabulary Distinction Task -->
      <div style="border: 1px solid #fed7aa; border-radius: 4px; padding: 4px 6px; background: #fffbeb; margin-bottom: 5px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #78350f; text-transform: uppercase;">
            Disciplinary Vocabulary &bull; Dual-Term Analytical Distinction
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.2pt; background: #78350f; color: #ffffff; padding: 1px 4px; border-radius: 2px; font-weight: 700;">PRECISION</span>
        </div>
        <p style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b; margin: 0 0 2px 0;">${cfg.vocabTask.prompt}</p>
        <div class="task-line-dotted"></div>
        <div class="task-line-dotted"></div>
      </div>

      <!-- Edexcel Paper 1 Question 3: 4-Mark Comparison Task -->
      <div style="border: 1.2px solid #78350f; border-radius: 4px; padding: 5px 7px; background: #fdf8f6;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #78350f; text-transform: uppercase;">
            Paper 1 Question 3 Workshop &bull; ${cfg.fourMarkComparison.question.includes('similar') ? 'Explain One Similarity' : 'Explain One Difference'} [4 marks]
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; color: #78350f;">[4 MARKS &bull; 5 MINS]</span>
        </div>
        <p style="font-family: 'Playfair Display', serif; font-size: 7.6pt; font-weight: 700; color: #0f172a; margin: 0 0 2px 0;">${cfg.fourMarkComparison.question}</p>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #64748b; font-style: italic; margin-bottom: 3px;">
          <strong>Examiner Scaffolding Hint:</strong> ${cfg.fourMarkComparison.hint}
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #78350f; font-weight: 600; margin-bottom: 3px;">
          <strong>Model Stems:</strong> ${cfg.fourMarkComparison.stems}
        </div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>
    </div>

    <!-- Left Page Footer -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE ${leftPageNum}</span>
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: EXTENDED EXAM MASTERY & TIMELINE MISSION               -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container" id="page-${rightPageNum}" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #78350f; outline-offset: -6px;">
    <div>
      <!-- Exam Mastery Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #78350f; padding-bottom: 3px; margin-bottom: 5px;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #78350f; text-transform: uppercase; letter-spacing: 0.8px;">
            Spread ${cfg.lessonNum} &bull; Extended Exam Mastery &bull; Part B
          </div>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 11pt; color: #0f172a; margin: 1px 0; font-weight: 700;">
            ${cfg.tariff.includes('16') ? 'Question 5/6: Evaluative Essay' : 'Question 4: Explain Why'} ${cfg.tariff}
          </h2>
        </div>
        <div style="text-align: right; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b; font-weight: 600;">
          PAGE ${rightPageNum} &bull; EXTENDED WRITING
        </div>
      </div>

      <!-- Exam Question Stem & Stimulus Box -->
      <div style="background: #fdf8f6; border: 1.2px solid #fed7aa; border-radius: 4px; padding: 4.5px 7px; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 700; color: #0f172a; margin-bottom: 2px; line-height: 1.25;">
          ${cfg.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 7px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #78350f;">
          <strong>Stimulus:</strong>
          <span style="background: #ffffff; border: 1px solid #cbd5e1; padding: 1px 5px; border-radius: 3px;">${cfg.stimulus[0]}</span>
          <span style="background: #ffffff; border: 1px solid #cbd5e1; padding: 1px 5px; border-radius: 3px;">${cfg.stimulus[1]}</span>
          <span style="color: #64748b; font-style: italic;">(You must also use information of your own)</span>
        </div>
      </div>

      <!-- 3-Column Visual Structure Strip -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #ffffff; margin-bottom: 5px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #78350f; text-transform: uppercase; margin-bottom: 3px;">
          Structure Strip &bull; 3-Paragraph Analytical Blueprint
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px;">
          ${cfg.structureStrip
            .map(
              (strip) => `
          <div style="border: 1px solid #e2e8f0; border-top: 2.5px solid #78350f; border-radius: 2px; padding: 3px 5px; background: #fdf8f6;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #78350f; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-size: 6.2pt; color: #1e293b; line-height: 1.2; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Analytical Connectives & High-Yield Vocabulary Bank -->
      <div style="border: 1px solid #fed7aa; border-radius: 4px; padding: 4px 6px; background: #fffbeb; margin-bottom: 5px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #78350f; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-size: 6.1pt; color: #1e293b; font-style: italic; line-height: 1.2; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.2pt; color: #78350f; text-transform: uppercase; display: block;">High-Yield Word Bank:</strong>
          <span style="font-size: 6.1pt; color: #1e293b; line-height: 1.2; display: block;">
            ${cfg.wordBank.technical} &bull; ${cfg.wordBank.institutional || cfg.wordBank.practitioners || cfg.wordBank.reactions || cfg.wordBank.remedies || cfg.wordBank.fluids}
          </span>
        </div>
      </div>

      <!-- 16 Ruled Task Lines for Extended Writing -->
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 5px;">
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
        <div class="task-line"></div>
      </div>

      <!-- Living Timeline Interactive Mission Box -->
      <div class="living-mission-box">
        <div style="display: flex; align-items: center;">
          <span class="living-mission-tag">Timeline Mission</span>
          <span class="living-mission-text">${cfg.livingTimelineMission.instruction}</span>
        </div>
        <span class="living-mission-link">&larr; Pages 2–3</span>
      </div>
    </div>

    <!-- Right Page Footer -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 3px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE ${rightPageNum}</span>
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 14: OUTSIDE BACK COVER (96-MARK LEDGER, AUDIT & DIRT)
  // ====================================================================
  html += `
  <!-- PAGE 14: OUTSIDE BACK COVER · SUMMATIVE LEDGER & SPEC AUDIT -->
  <div class="page page-container" id="page-14" style="padding: 10px 14px; display: flex; flex-direction: column; height: 272mm; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #78350f; outline-offset: -6px;">
    <div>
      <!-- Back Cover Header Strip -->
      <div style="border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 5px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1px; color: #78350f; font-weight: 700;">
            Summative Assessment &bull; Key Topic 1 Mastery Record
          </div>
          <h2 style="margin: 2px 0 0 0; font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
            Medieval Medicine Performance Ledger
          </h2>
        </div>
        <span class="archival-badge" style="background: #fdf8f6; color: #78350f; border-color: #fed7aa;">
          Outside Back Cover
        </span>
      </div>

      <!-- Pupil Target & Progress Matrix -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 4.5px 8px; background: #ffffff; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; align-items: center; font-family: 'Inter', sans-serif; font-size: 7.2pt;">
        <div>
          <span style="color: #64748b; display: block; font-size: 6.2pt; text-transform: uppercase;">Pupil Target Grade</span>
          <strong style="font-size: 9.5pt; color: #78350f;">Grade: [ &nbsp; ]</strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 6.2pt; text-transform: uppercase;">Q3 Skills Total</span>
          <strong style="font-size: 9.5pt; color: #0f172a;">&nbsp; / 20 Marks</strong>
        </div>
        <div>
          <span style="color: #64748b; display: block; font-size: 6.2pt; text-transform: uppercase;">Extended Total</span>
          <strong style="font-size: 9.5pt; color: #0f172a;">&nbsp; / 76 Marks</strong>
        </div>
        <div style="background: #fdf8f6; border: 1px solid #fed7aa; border-radius: 3px; padding: 3px 6px; text-align: center;">
          <span style="color: #78350f; display: block; font-size: 6.2pt; font-weight: 800; text-transform: uppercase;">Overall Mastery</span>
          <strong style="font-size: 10.5pt; color: #78350f;">&nbsp; / 96 Marks</strong>
        </div>
      </div>

      <!-- 96-Mark GCSE Exam Progress Ledger Table -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 6.8pt;">
          <thead>
            <tr style="background: #78350f; color: #ffffff;">
              <th style="padding: 3px 6px; text-align: left; width: 28%;">Lesson &bull; Specification Focus</th>
              <th style="padding: 3px 6px; width: 20%; text-align: center;">Q3 Skills [4m]</th>
              <th style="padding: 3px 6px; width: 34%;">Extended Exam Response</th>
              <th style="padding: 3px 6px; width: 18%; text-align: center;">Lesson Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #ffffff;">
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;"><strong>L1:</strong> Supernatural &amp; Church</td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center;">Q3 Similarity: &nbsp;<strong>/ 4</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q4 Explain Why [12m]: &nbsp;<strong>/ 12</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">&nbsp; / 16</td>
            </tr>
            <tr style="background: #fdf8f6;">
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;"><strong>L2:</strong> Four Humours &amp; Galen</td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center;">Q3 Difference: &nbsp;<strong>/ 4</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q4 Explain Why [12m]: &nbsp;<strong>/ 12</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">&nbsp; / 16</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;"><strong>L3:</strong> Bleeding, Purging &amp; Theriac</td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center;">Q3 Difference: &nbsp;<strong>/ 4</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q4 Explain Why [12m]: &nbsp;<strong>/ 12</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">&nbsp; / 16</td>
            </tr>
            <tr style="background: #fdf8f6;">
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;"><strong>L4:</strong> Practitioners &amp; Hospitals</td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center;">Q3 Difference: &nbsp;<strong>/ 4</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q4 Explain Why [12m]: &nbsp;<strong>/ 12</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700;">&nbsp; / 16</td>
            </tr>
            <tr style="background: #ffffff;">
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;"><strong>L5:</strong> The Black Death 1348–49</td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center;">Q3 Similarity: &nbsp;<strong>/ 4</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1;">Q5/6 Essay [16+4 SPaG]: &nbsp;<strong>/ 20</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-weight: 700; color: #78350f;">&nbsp; / 24</td>
            </tr>
            <tr style="background: #fef3c7; font-weight: 800; border-top: 1.5px solid #78350f;">
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-transform: uppercase;">Cumulative Totals</td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; color: #78350f;">Q3 Total: &nbsp;<strong>/ 20</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; color: #78350f;">Extended Total: &nbsp;<strong>/ 76</strong></td>
              <td style="padding: 3px 6px; border: 1px solid #cbd5e1; text-align: center; font-size: 8pt; background: #fed7aa; color: #78350f;">&nbsp; / 96</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5-Point High-Yield Specification Revision Checklist -->
      <div style="margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; text-transform: uppercase; color: #78350f; letter-spacing: 0.5px;">
            &bull; High-Yield Specification Audit (Self-Check Confidence)
          </strong>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
            [ R = Needs Work &bull; A = Secure &bull; G = Mastered ]
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 3.5px;">
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
              <strong>1. Supernatural &amp; Church:</strong> God's will, divine retribution for sin, scriptorial book-copying, Roger Bacon 1277, 1345 planetary conjunction.
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; white-space: nowrap; margin-left: 8px;">[ R &bull; A &bull; G ]</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
              <strong>2. Four Humours &amp; Galen:</strong> Hippocratic balance (blood, phlegm, yellow bile, black bile); Galen's Theory of Opposites; uroscopy in matula; Zodiac Man.
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; white-space: nowrap; margin-left: 8px;">[ R &bull; A &bull; G ]</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
              <strong>3. Treatments &amp; Prevention:</strong> Phlebotomy (fleam, cupping, leeches); purging (emetics, clysters); Theriac (60+ ingredients); Regimen Sanitatis.
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; white-space: nowrap; margin-left: 8px;">[ R &bull; A &bull; G ]</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
              <strong>4. Practitioners &amp; Hospitals:</strong> Physicians vs barber-surgeons vs apothecaries; over 1,200 monastic hospitals providing 'care not cure' (excluding lepers).
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; white-space: nowrap; margin-left: 8px;">[ R &bull; A &bull; G ]</span>
          </div>
          <div style="border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 6px; background: #ffffff; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-family: 'Georgia', serif; font-size: 6.8pt; color: #1e293b; line-height: 1.25;">
              <strong>5. The Black Death (1348–49):</strong> Melcombe Regis, bubonic vs pneumonic strains, buboes, flagellants, street fires, Edward III cleanliness order, East Smithfield pits.
            </div>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; white-space: nowrap; margin-left: 8px;">[ R &bull; A &bull; G ]</span>
          </div>
        </div>
      </div>

      <!-- Teacher Feedback & D.I.R.T. Section -->
      <div style="border: 1.2px solid #78350f; border-radius: 4px; padding: 4.5px 8px; background: #fdf8f6; margin-bottom: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #cbd5e1; padding-bottom: 2px; margin-bottom: 4px; font-family: 'Inter', sans-serif; font-size: 6.8pt;">
          <strong style="color: #78350f; text-transform: uppercase;">Teacher Summative Feedback &amp; D.I.R.T. Target</strong>
          <span style="color: #475569;">Effort: [ 1 &bull; 2 &bull; 3 &bull; 4 &bull; 5 ] &nbsp;|&nbsp; <strong>&square; D.I.R.T. Complete</strong></span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b; line-height: 1.35; margin-bottom: 3px;">
          <strong>WWW:</strong> <span class="line" style="display: inline-block; width: 92%; border-bottom: 1px solid #94a3b8; height: 11px;"></span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b; line-height: 1.35; margin-bottom: 3px;">
          <strong>EBI:</strong> &nbsp;&nbsp;<span class="line" style="display: inline-block; width: 92%; border-bottom: 1px solid #94a3b8; height: 11px;"></span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 2px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
          <span><strong>Teacher Signature:</strong> ____________________________</span>
          <span><strong>Date:</strong> ____________________</span>
          <span><strong>D.I.R.T. Responded:</strong> &square; Yes &square; No</span>
        </div>
      </div>
    </div>

    <!-- Outside Back Cover Footer -->
    <div style="display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 3px;">
      <span>The History Department &bull; GCSE Medicine Revision Series</span>
      <span>Key Topic 1 &bull; Outside Back Cover</span>
      <span>Page 14 &bull; END OF BOOKLET</span>
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = { buildMedievalTwoPageWorkbook };
