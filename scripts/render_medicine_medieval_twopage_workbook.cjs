const fs = require('fs');
const path = require('path');

function formatText(txt) {
  if (!txt) return '';
  return txt;
}

// 3 Dedicated Medieval Lessons Configurations with Standardised GCSE Two-Page Spread Layout
const medievalConfigs = [
  {
    lessonIndex: 0, // mapped to index 0 in units/edexcel_medicine/data.js (lesson_1_1)
    lessonNum: 1,
    id: 'lesson_1_1',
    title: 'KT1.1: Ideas About the Causes of Disease & Illness (c1250–c1500)',
    enquiryQuestion:
      'Why did ancient Roman and Greek ideas about disease dominate medical thinking for over a thousand years?',
    specAnchor:
      'Ideas about the causes of disease and illness: supernatural and religious explanations; rational explanations (Hippocrates and Galen, Four Humours, Opposites, Miasma); the Church’s influence.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why there was so little change in medical ideas about the causes of disease between c1250 and c1500. [12 marks]',
    stimulus: ['The Catholic Church', 'Galen'],
    structureStrip: [
      {
        col: '1. THE CATHOLIC CHURCH & SCRIBAL CONTROL',
        text: 'Explain how the Catholic Church controlled universities, libraries, and book-copying; dissent was punished as heresy (e.g. Roger Bacon in 1277).',
      },
      {
        col: '2. GALEN’S PURPOSE & TELEOLOGY',
        text: 'Explain how Galen’s belief that a single Creator designed every human organ made his classical Latin treatises sacred, infallible Christian dogma.',
      },
      {
        col: '3. LACK OF SCIENTIFIC INSTRUMENTS',
        text: 'Explain how the lack of microscopes, ban on human dissection, and deep respect for tradition prevented doctors from discovering real bodily causes.',
      },
    ],
    connectives:
      'One major reason for lack of change was... &bull; Furthermore, the Church enforced... &bull; Crucially, Galen’s ideas were protected because... &bull; Without scientific instruments... &bull; Consequently...',
    wordBank: {
      technical:
        'Four Humours &bull; Theory of Opposites &bull; phlebotomy &bull; uroscopy (matula) &bull; Vademecum &bull; Zodiac Man',
      institutional:
        'The Catholic Church &bull; monastic scriptoria &bull; teleology &bull; heresy &bull; Roger Bacon (1277) &bull; Articella',
      continuity:
        'Hippocrates &bull; Galen &bull; miasma (bad air) &bull; planetary conjunction (1345) &bull; ancient authority',
    },
    doNow: [
      {
        q: 'Which ancient Greek physician originally developed the Theory of the Four Humours?',
        a: 'Hippocrates of Kos',
      },
      {
        q: 'Which ancient Roman doctor expanded this into the Theory of Opposites?',
        a: 'Claudius Galen',
      },
      {
        q: 'What four bodily fluids did the humoural theory claim dictated health?',
        a: 'Blood, Phlegm, Yellow Bile, Black Bile',
      },
      {
        q: 'What Latin term was used for corrupt, foul-smelling air believed to cause disease?',
        a: 'Miasma',
      },
    ],
    coreKnowledge: [
      {
        heading: 'The Four Humours & Galen’s Theory of Opposites:',
        text: 'Hippocrates taught health was a balance of blood, phlegm, yellow bile, and black bile. Galen developed the Theory of Opposites: treating an illness with its opposite (e.g. cold, moist phlegm treated with hot, dry pepper; fever treated with cold cucumber).',
      },
      {
        heading: 'The Catholic Church & Teleological Dogma:',
        text: 'The Church held a monopoly on education, universities, and manuscript copying. Because Galen argued the human body was purposefully crafted by a single Creator, the Church declared his writings sacred dogma; questioning Galen was branded heresy.',
      },
      {
        heading: 'The Diagnostic Toolkit (Uroscopy & Astrology):',
        text: 'Physicians diagnosed humoural imbalance by examining urine color, clarity, and smell against 20-shade radial charts in a glass matula; consulted the Zodiac Man in their pocket Vademecum to ensure the moon was not in an unfavorable sign before bleeding.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Humoural Imbalance',
      termB: 'Miasmatic Corruption',
      prompt:
        'Explain the crucial difference between an internal <strong>humoural imbalance</strong> (diet, personality, bodily fluids) and external <strong>miasmatic corruption</strong> (foul air from swamps, rotting matter):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which ideas about the causes of illness in the Medieval period (c1250–c1500) were similar to ideas in the Renaissance period (c1500–c1700). [4 marks]',
      hint: 'Focus on the persistent reliance on miasma (foul air) or the continued belief in the Four Humours among ordinary people despite elite anatomical debates.',
      stems:
        'One way ideas about causes were similar was the continued belief in... &bull; In the Medieval period... &bull; Similarly, in the Renaissance...',
    },
    livingTimelineMission: {
      milestone: 'Milestones 1 & 2 (c. 1250 & 1277)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestones 1 & 2)</strong>. In the sketchpad frame, sketch the Four Humours balance and annotate the Church’s warning against Roger Bacon: <em>Dissent from Galen is Heresy!</em>',
    },
  },
  {
    lessonIndex: 1, // lesson_1_2
    lessonNum: 2,
    id: 'lesson_1_2',
    title: 'KT1.2: Approaches to Prevention, Treatment & Care (c1250–c1500)',
    enquiryQuestion:
      'How did medieval approaches to prevention and treatment combine rational ideas with religious belief?',
    specAnchor:
      'Approaches to prevention and treatment: religious and supernatural methods; rational treatments (bloodletting, purging, herbal remedies, regimen sanitatis); medical care providers and medieval hospitals.',
    tariff: '[12 marks &bull; 15 mins]',
    examStem:
      'Explain why approaches to medical treatment changed very little during the Middle Ages (c1250–c1500). [12 marks]',
    stimulus: ['The Theory of Opposites', 'Monastic hospitals'],
    structureStrip: [
      {
        col: '1. THE THEORY OF OPPOSITES & PURGING',
        text: 'Explain how physicians relied on humoural balancing (bloodletting with fleams/leeches; purging with emetics and laxatives), which physically weakened patients.',
      },
      {
        col: '2. MONASTIC HOSPITALS & RELIGIOUS CARE',
        text: 'Explain how over 1,200 hospitals run by monks and nuns focused on hospitality, warmth, prayer, and salvation (‘care not cure’) rather than medical discovery.',
      },
      {
        col: '3. THE COST & LIMITS OF PRACTITIONERS',
        text: 'Explain why university-trained physicians were rare and expensive; most ordinary people could only afford barber-surgeons, apothecaries, or home herbal remedies.',
      },
    ],
    connectives:
      'One major reason treatments did not change was... &bull; In particular, physicians relied on... &bull; Furthermore, monastic hospitals were designed to... &bull; Crucially, ordinary people could only afford... &bull; Consequently...',
    wordBank: {
      technical:
        'phlebotomy (bloodletting) &bull; fleam &bull; cupping &bull; leeches &bull; purging &bull; emetics &bull; Theriac &bull; Regimen Sanitatis',
      practitioners:
        'university physician &bull; apothecary &bull; barber-surgeon &bull; wise woman &bull; guild apprenticeship &bull; pulse-taking',
      institutional:
        'monastic infirmary &bull; ‘care not cure’ &bull; St Bartholomew’s (1123) &bull; Augustinian nuns &bull; chapel altar &bull; Lazar houses',
    },
    doNow: [
      {
        q: 'Why did the medieval Catholic Church actively support the medical writings of Galen?',
        a: 'Galen taught that the human body was designed by a single divine Creator.',
      },
      {
        q: 'Name the ancient Roman physician who created the Theory of Opposites.',
        a: 'Claudius Galen',
      },
      {
        q: 'What pocket handbook containing urine charts and astrological diagrams did medieval doctors carry?',
        a: 'Vademecum',
      },
      {
        q: 'What diagram showed which star signs governed different parts of the human body?',
        a: 'The Zodiac Man (Homo Signorum)',
      },
    ],
    coreKnowledge: [
      {
        heading: 'Religious & Supernatural Healing:',
        text: 'The Church taught illness was sent by God to punish sin or test faith. Treatments included prayer, fasting, confession, pilgrimages to holy shrines (e.g. Canterbury), touching holy relics, and lighting votive candles.',
      },
      {
        heading: 'Rational Humoural Treatments & Regimen Sanitatis:',
        text: 'To balance humours under Galen’s Opposites, physicians ordered phlebotomy (opening veins with a fleam, cupping, or leeches) and purging (inducing vomiting or diarrhoea); prescribed herbal infusions like Theriac (60+ ingredients); advised diet and sleep under the Regimen Sanitatis.',
      },
      {
        heading: 'Practitioners & Monastic Hospitals (‘Care Not Cure’):',
        text: 'University physicians were rare and expensive book-learners; barber-surgeons performed bloodletting and minor surgery; apothecaries mixed herbs; over 1,200 hospitals run by monks and nuns provided hospitality, warmth, food, and prayer, excluding infectious patients.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Monastic Hospital ‘Care’',
      termB: 'Modern Medical ‘Cure’',
      prompt:
        'Explain the difference between a medieval monastic hospital offering <strong>spiritual care</strong> (shelter, bed rest, prayer, Mass) and modern hospital <strong>medical cure</strong> (surgery, pharmaceuticals):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which hospital care in the Medieval period was different from hospital care in the 18th or 19th century. [4 marks]',
      hint: 'Contrast medieval monastic hospitals offering religious shelter and comfort (‘care not cure’) without doctors, with 18th/19th century voluntary hospitals treating illness with trained physicians and surgery.',
      stems:
        'One way hospital care differed was... &bull; In the Medieval period, hospitals... &bull; In contrast, in the 18th and 19th centuries...',
    },
    livingTimelineMission: {
      milestone: 'Milestone 6 (1400s)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestone 6: 1400s)</strong>. In the sketchpad frame, sketch a monastic hospital ward facing a chapel altar and annotate the golden rule: <em>Hospitality and prayer, not medical cure!</em>',
    },
  },
  {
    lessonIndex: 2, // lesson_1_3
    lessonNum: 3,
    id: 'lesson_1_3',
    title: 'KT1.3: Dealing with the Black Death (1348–1349)',
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
        text: 'Explain how people believed God sent the plague to punish sin, leading to prayer, religious processions, and flagellants whipping themselves rather than stopping infection.',
      },
      {
        col: '2. MIASMA, LIVING CONDITIONS & RATS (DISAGREE)',
        text: 'Explain how people blamed corrupt air, carrying herbs and lighting fires, while filthy, crowded streets allowed black rats and fleas to multiply uncontrollably.',
      },
      {
        col: '3. EVALUATIVE VERDICT & CIVIC WEAKNESS (CRITERIA)',
        text: 'Weigh the factors: neither doctors nor councils understood that rat fleas or bacteria caused the plague; Edward III’s street-cleaning order came too late to halt the catastrophe.',
      },
    ],
    connectives:
      'On the one hand, belief in supernatural causes was a major reason because... &bull; For example, flagellants... &bull; On the other hand, environmental factors and miasma were crucial because... &bull; Furthermore, neither doctors nor councils understood... &bull; Overall, while supernatural beliefs led to fatalistic reactions...',
    wordBank: {
      technical:
        'The Black Death (1348) &bull; Yersinia pestis &bull; bubonic plague &bull; pneumonic plague &bull; buboes &bull; high fever &bull; 30–50% mortality',
      prevention:
        'flagellants &bull; religious processions &bull; lighting street fires &bull; sweet posies/pomanders &bull; ringing bells &bull; voluntary quarantine',
      civic:
        'King Edward III &bull; Mayor of London &bull; street-cleaning order (1349) &bull; East Smithfield plague pits &bull; lancing buboes',
    },
    doNow: [
      {
        q: 'What was the most common surgical procedure performed by barber-surgeons to balance the humours?',
        a: 'Bloodletting (Phlebotomy)',
      },
      {
        q: 'What herbal remedy containing over 60 ingredients was widely used as a medieval cure-all?',
        a: 'Theriac',
      },
      {
        q: 'What was the primary purpose of a medieval monastic hospital?',
        a: '‘Care not cure’ (hospitality, warmth, food, and prayer)',
      },
      {
        q: 'Name one group of patients who were strictly excluded from medieval hospitals.',
        a: 'Infectious patients (lepers, plague victims) and pregnant women',
      },
    ],
    coreKnowledge: [
      {
        heading: 'Arrival & Symptoms of the Pestilence (1348):',
        text: 'Arrived at Melcombe Regis (Dorset) in June 1348, killing 30–50% of England’s population. Bubonic plague (rat fleas) caused excruciating groin/armpit buboes, dark blotches, and fever; pneumonic plague (spread by coughs/breath) attacked the lungs with nearly 100% mortality.',
      },
      {
        heading: 'Believed Causes: Divine Wrath & Miasma:',
        text: 'People blamed God’s punishment for human wickedness; the 1345 planetary conjunction of Mars, Jupiter, and Saturn in Aquarius; and corrupt miasma from rotting matter, unburied bodies, and stagnant swamps.',
      },
      {
        heading: 'Desperate Responses & Limited Civic Action:',
        text: 'People prayed, joined religious processions, or whipped themselves as flagellants; burned incense, carried sweet posies, and lit street fires; lanced buboes with hot irons. In 1349, King Edward III ordered the Mayor of London to clean the filthy streets, but authorities lacked power or knowledge to halt the plague.',
      },
    ],
    vocabTask: {
      type: 'distinction',
      termA: 'Religious Penitence (Flagellants)',
      termB: 'Civic Sanitation (Street Cleaning)',
      prompt:
        'Explain the difference between <strong>religious penitence</strong> (whipping oneself to appease God’s wrath) and <strong>civic sanitation</strong> (King Edward III ordering London streets cleared of dung and waste):',
    },
    fourMarkComparison: {
      question:
        'Explain one way in which reactions to the Black Death (1348) were similar to reactions to the Great Plague of London (1665). [4 marks]',
      hint: 'Focus on the persistent belief that miasma caused the epidemic, leading people to burn fires in the streets, carry sweet-smelling herbs, or flee the cities.',
      stems:
        'One way reactions were similar was the widespread belief in... &bull; During the Black Death of 1348... &bull; Similarly, during the Great Plague of 1665...',
    },
    livingTimelineMission: {
      milestone: 'Milestones 4 & 5 (1348 & 1349)',
      instruction:
        'Turn back to <strong>Pages 2–3 (Milestones 4 & 5)</strong>. In the sketchpad frame, sketch the mass burial pit at East Smithfield and annotate Edward III’s order: <em>Clean the streets of pestilential filth!</em>',
    },
  },
];

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
      background: #f8fafc;
      border: 1.2px solid #cbd5e1;
      border-left: 4px solid #78350f;
      border-radius: 4px;
      padding: 4px 8px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      gap: 8px;
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
      font-size: 7.5pt;
      color: #1e293b;
      line-height: 1.25;
    }
    .living-mission-box {
      border: 1.2px dashed #92400e;
      background: #fffbeb;
      border-radius: 4px;
      padding: 4px 7px;
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
      font-size: 7.4pt;
      color: #78350f;
      line-height: 1.25;
    }
    .living-mission-link {
      font-weight: 700;
      color: #92400e;
      font-size: 7.2pt;
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

    <!-- Main Title Block -->
    <div style="text-align: center; border-bottom: 1px solid #cbd5e1; padding: 2px 0 8px 0; margin-bottom: 8px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 800; color: #78350f; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 2px;">
        Pearson Edexcel GCSE (9–1) History &bull; Paper 1 (1HI0/11)
      </div>
      <h1 style="font-family: 'Playfair Display', serif; font-size: 22pt; color: #0f172a; margin: 0 0 3px 0; text-transform: uppercase; letter-spacing: 1.2px; line-height: 1.15;">
        Medicine in Medieval England
      </h1>
      <div style="font-family: 'Inter', sans-serif; font-size: 9.2pt; color: #334155; font-weight: 500; letter-spacing: 0.5px;">
        Key Topic 1: Ideas, Treatments, Monastic Care &amp; The Black Death (c1250–c1500)
      </div>
    </div>

    <!-- Overarching Enquiry Callout Box -->
    <div style="border: 1.5px solid #78350f; border-radius: 5px; padding: 8px 16px; background: #fdf8f6; margin-bottom: 8px; text-align: center;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 1.8px; color: #78350f; font-weight: 700; margin-bottom: 2px;">
        Overarching Historical Enquiry
      </div>
      <div style="font-family: 'Playfair Display', serif; font-size: 13pt; color: #0f172a; font-style: italic; font-weight: 600; line-height: 1.25;">
        &ldquo;Why did Galen, the Catholic Church, and ancient superstition freeze medical thinking for a thousand years?&rdquo;
      </div>
    </div>

    <!-- Hero Primary Source Presentation -->
    <div style="border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; background: #ffffff; display: grid; grid-template-columns: 190px 1fr; gap: 16px; align-items: center;">
      <div style="text-align: center; border: 1px solid #94a3b8; border-radius: 4px; padding: 4px; background: #fdf8f6; box-shadow: 0 2px 4px rgba(0,0,0,0.06);">
        <img src="/images/four_humours.jpg" style="width: 100%; height: 160px; object-fit: contain; border-radius: 2px; display: block;" alt="The Four Humours Wheel">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b; margin-top: 4px; text-transform: uppercase;">
          The Four Humours Wheel (Tacuinum Sanitatis, 14th c.)
        </div>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; background: #fef3c7; color: #92400e; padding: 2px 6px; border-radius: 3px; text-transform: uppercase;">
              Primary Historical Artifact &bull; Humoural Medicine
            </span>
            <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #64748b;">ÖNB MS 2644</span>
          </div>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 10.5pt; color: #0f172a; margin: 0 0 4px 0; font-weight: 700;">
            The Intellectual Monopoly: Blood, Phlegm, Choler &amp; Melancholy
          </h4>
          <p style="font-size: 8pt; line-height: 1.35; color: #334155; margin: 0 0 6px 0;">
            In medieval England, medical authority rested upon ancient Greek philosophy, Roman treatises, and Catholic Christian theology. Sickness was explained as an internal imbalance of the body’s four humours or the corrupting influence of foul miasmas. With the Church declaring Galen infallible dogma and human dissection forbidden, medical ideas remained virtually unchanged for over a thousand years.
          </p>
        </div>

        <div style="border-top: 1px dashed #cbd5e1; padding-top: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569;">
            <strong style="color: #78350f;">Booklet Blueprint:</strong> 3 Rigorous Spreads (KT1.1–1.3) + Living Timeline + Exam Mastery Workshop
          </div>
          <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #475569;">
            <strong style="color: #78350f;">Exam Tariff:</strong> Q3 Similarity/Difference (4m), Q4 Explain Why (12m), Q5/6 Essay (16+4m)
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Departmental Guarantee & Specification Seal -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #78350f; padding-top: 8px; margin-top: 4px;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #16a34a;"></span>
        <span style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 700; color: #1e293b;">
          Zero Page Overflow Guaranteed &bull; 100% Edexcel Specification Aligned
        </span>
      </div>
      <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #78350f; letter-spacing: 0.5px;">
        PAGES 1 &bull; 12
      </div>
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 2–3: DOUBLE-PAGE SPREAD: MEDIEVAL LIVING TIMELINE & SPEC MAP
  // ====================================================================
  html += `
  <!-- PAGE 2: TIMELINE PART 1 (MILESTONES 1–3) -->
  <div class="page page-container" id="page-2" style="padding: 14px 18px; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #78350f; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; padding: 2px 7px; border-radius: 3px; text-transform: uppercase;">
            Living Timeline &bull; Part 1
          </span>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; color: #0f172a; margin: 0; font-weight: 700;">
            The Foundations of Medieval Medicine (c1250–c1345)
          </h2>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; font-weight: 600;">
          PAGE 2 &bull; LIVING CHRONOLOGY
        </div>
      </div>

      <div style="background: #fdf8f6; border: 1.2px solid #fed7aa; border-radius: 4px; padding: 5px 10px; margin-bottom: 8px; font-size: 7.5pt; color: #78350f;">
        <strong>Interactive Visual Mission:</strong> As you progress through each lesson, locate the target milestone below. Sketch the historical artifact in the frame and annotate the key historical mechanisms!
      </div>

      <!-- Milestone 1: c. 1250 Hippocrates & Galen -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; margin-bottom: 8px; background: #ffffff; display: grid; grid-template-columns: 90px 1fr 105px; gap: 10px; align-items: center;">
        <div style="text-align: center; border-right: 1.5px solid #fed7aa; padding-right: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f; line-height: 1;">c. 1250</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #92400e; text-transform: uppercase;">Milestone 1</div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6pt; background: #fef3c7; color: #92400e; padding: 1px 4px; border-radius: 2px; text-transform: uppercase; font-weight: 700;">Dogma</span>
        </div>
        <div>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 9.5pt; color: #0f172a; margin: 0 0 2px 0; font-weight: 700;">
            The Intellectual Triad: Hippocrates, Galen &amp; The Catholic Church
          </h4>
          <p style="font-size: 7.4pt; color: #334155; margin: 0; line-height: 1.3;">
            Ancient Greek humoral theory (Hippocrates) and the Roman Theory of Opposites (Galen) become the unquestioned foundation of European medicine. Because Galen believed every organ had a divine purpose created by a single Creator, the Catholic Church embraces his texts as sacred doctrine. Monks control manuscript copying; universities teach Galen exclusively.
          </p>
        </div>
        <div style="border: 1.5px dashed #94a3b8; border-radius: 4px; height: 58px; background: #f8fafc; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Sketchpad 1</div>
          <div style="font-size: 6.2pt; color: #94a3b8; font-style: italic;">[Four Humours / Opposites]</div>
        </div>
      </div>

      <!-- Milestone 2: 1277 Roger Bacon -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; margin-bottom: 8px; background: #ffffff; display: grid; grid-template-columns: 90px 1fr 105px; gap: 10px; align-items: center;">
        <div style="text-align: center; border-right: 1.5px solid #fed7aa; padding-right: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f; line-height: 1;">1277</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #92400e; text-transform: uppercase;">Milestone 2</div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6pt; background: #fee2e2; color: #991b1b; padding: 1px 4px; border-radius: 2px; text-transform: uppercase; font-weight: 700;">Heresy</span>
        </div>
        <div>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 9.5pt; color: #0f172a; margin: 0 0 2px 0; font-weight: 700;">
            The Imprisonment of Roger Bacon &amp; Enforcement of Conformity
          </h4>
          <p style="font-size: 7.4pt; color: #334155; margin: 0; line-height: 1.3;">
            Franciscan friar Roger Bacon is imprisoned by Church leaders for suggesting that scientists should perform firsthand experiments rather than blindly accepting ancient books. This harsh punishment serves as a terrifying warning across European universities: challenging Galen is equivalent to challenging the Catholic Church itself, completely freezing medical progress.
          </p>
        </div>
        <div style="border: 1.5px dashed #94a3b8; border-radius: 4px; height: 58px; background: #f8fafc; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Sketchpad 2</div>
          <div style="font-size: 6.2pt; color: #94a3b8; font-style: italic;">[Bacon in Chains / Heresy]</div>
        </div>
      </div>

      <!-- Milestone 3: 1345 The Astrological Alignment -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; margin-bottom: 8px; background: #ffffff; display: grid; grid-template-columns: 90px 1fr 105px; gap: 10px; align-items: center;">
        <div style="text-align: center; border-right: 1.5px solid #fed7aa; padding-right: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f; line-height: 1;">1345</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #92400e; text-transform: uppercase;">Milestone 3</div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6pt; background: #e0e7ff; color: #3730a3; padding: 1px 4px; border-radius: 2px; text-transform: uppercase; font-weight: 700;">Astrology</span>
        </div>
        <div>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 9.5pt; color: #0f172a; margin: 0 0 2px 0; font-weight: 700;">
            The Great Planetary Conjunction of Mars, Jupiter &amp; Saturn
          </h4>
          <p style="font-size: 7.4pt; color: #334155; margin: 0; line-height: 1.3;">
            In March 1345, an unusual conjunction of Saturn, Jupiter, and Mars in the sign of Aquarius occurs. Leading physicians at the University of Paris claim this celestial event drew up poisonous vapors from the earth, corrupting the air with deadly miasma. Astrological almanacs become mandatory diagnostic tools for physicians predicting epidemics and planning phlebotomy.
          </p>
        </div>
        <div style="border: 1.5px dashed #94a3b8; border-radius: 4px; height: 58px; background: #f8fafc; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Sketchpad 3</div>
          <div style="font-size: 6.2pt; color: #94a3b8; font-style: italic;">[Planets / Zodiac Man]</div>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE 2</span>
    </div>
  </div>

  <!-- PAGE 3: TIMELINE PART 2 (MILESTONES 4–6 & SPEC MAP) -->
  <div class="page page-container" id="page-3" style="padding: 14px 18px; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #78350f; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; padding: 2px 7px; border-radius: 3px; text-transform: uppercase;">
            Living Timeline &bull; Part 2
          </span>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 12.5pt; color: #0f172a; margin: 0; font-weight: 700;">
            The Black Death Catastrophe &amp; Monastic Care (1348–c1500)
          </h2>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; font-weight: 600;">
          PAGE 3 &bull; LIVING CHRONOLOGY
        </div>
      </div>

      <!-- Milestone 4: 1348 Arrival of the Black Death -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; margin-bottom: 8px; background: #ffffff; display: grid; grid-template-columns: 90px 1fr 105px; gap: 10px; align-items: center;">
        <div style="text-align: center; border-right: 1.5px solid #fed7aa; padding-right: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f; line-height: 1;">1348</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #92400e; text-transform: uppercase;">Milestone 4</div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6pt; background: #fee2e2; color: #991b1b; padding: 1px 4px; border-radius: 2px; text-transform: uppercase; font-weight: 700;">Epidemic</span>
        </div>
        <div>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 9.5pt; color: #0f172a; margin: 0 0 2px 0; font-weight: 700;">
            The Black Death Reaches England (Melcombe Regis, Dorset)
          </h4>
          <p style="font-size: 7.4pt; color: #334155; margin: 0; line-height: 1.3;">
            In June 1348, ships from Gascony dock at Melcombe Regis carrying plague-infected black rats and fleas. The epidemic spreads rapidly along trade roads, striking London by autumn. Between 30% and 50% of England’s population dies within 18 months. Churchyards overflow; emergency mass burial pits are dug outside town walls at East Smithfield.
          </p>
        </div>
        <div style="border: 1.5px dashed #94a3b8; border-radius: 4px; height: 58px; background: #f8fafc; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Sketchpad 4</div>
          <div style="font-size: 6.2pt; color: #94a3b8; font-style: italic;">[Buboes / Mass Pit]</div>
        </div>
      </div>

      <!-- Milestone 5: 1349 Edward III's Street Cleaning Order -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; margin-bottom: 8px; background: #ffffff; display: grid; grid-template-columns: 90px 1fr 105px; gap: 10px; align-items: center;">
        <div style="text-align: center; border-right: 1.5px solid #fed7aa; padding-right: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f; line-height: 1;">1349</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #92400e; text-transform: uppercase;">Milestone 5</div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6pt; background: #fef3c7; color: #92400e; padding: 1px 4px; border-radius: 2px; text-transform: uppercase; font-weight: 700;">Sanitation</span>
        </div>
        <div>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 9.5pt; color: #0f172a; margin: 0 0 2px 0; font-weight: 700;">
            King Edward III’s Sanitary Order to the Mayor of London
          </h4>
          <p style="font-size: 7.4pt; color: #334155; margin: 0; line-height: 1.3;">
            Alarmed by the overwhelming stench and mounds of decaying corpses, King Edward III writes to the Mayor of London demanding streets be cleaned of human dung and rotting waste to eliminate corrupt miasma. While an early example of civic public health intervention, authorities have zero power to enforce quarantine or eliminate the rat fleas transmitting the bacterium.
          </p>
        </div>
        <div style="border: 1.5px dashed #94a3b8; border-radius: 4px; height: 58px; background: #f8fafc; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Sketchpad 5</div>
          <div style="font-size: 6.2pt; color: #94a3b8; font-style: italic;">[Edward III / Street Dung]</div>
        </div>
      </div>

      <!-- Milestone 6: 1400s Monastic Hospitals -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; padding: 7px 10px; margin-bottom: 8px; background: #ffffff; display: grid; grid-template-columns: 90px 1fr 105px; gap: 10px; align-items: center;">
        <div style="text-align: center; border-right: 1.5px solid #fed7aa; padding-right: 8px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f; line-height: 1;">1400s</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #92400e; text-transform: uppercase;">Milestone 6</div>
          <span style="font-family: 'Inter', sans-serif; font-size: 6pt; background: #f0fdf4; color: #166534; padding: 1px 4px; border-radius: 2px; text-transform: uppercase; font-weight: 700;">Care</span>
        </div>
        <div>
          <h4 style="font-family: 'Playfair Display', serif; font-size: 9.5pt; color: #0f172a; margin: 0 0 2px 0; font-weight: 700;">
            The Golden Age of Monastic Hospitals: ‘Care Not Cure’
          </h4>
          <p style="font-size: 7.4pt; color: #334155; margin: 0; line-height: 1.3;">
            By the 15th century, over 1,200 hospitals operate across England, run by Catholic religious orders. Institutions like St Bartholomew’s (founded 1123) and St Thomas’s provide clean bedding, warm fires, nutritious broth, and continuous prayer facing an altar. However, no medical treatment or surgical cure is attempted; their primary purpose is spiritual salvation.
          </p>
        </div>
        <div style="border: 1.5px dashed #94a3b8; border-radius: 4px; height: 58px; background: #f8fafc; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 2px;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6pt; color: #64748b; font-weight: 700; text-transform: uppercase;">Sketchpad 6</div>
          <div style="font-size: 6.2pt; color: #94a3b8; font-style: italic;">[Hospital Ward / Chapel]</div>
        </div>
      </div>

      <!-- Specification Matrix Overview -->
      <div style="border: 1.2px solid #78350f; border-radius: 5px; padding: 6px 10px; background: #fdf8f6;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 3px;">
          Edexcel GCSE History Specification Matrix: Key Topic 1 (c1250–c1500)
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b;">
          <div style="border-left: 2.5px solid #78350f; padding-left: 5px;">
            <strong style="color: #78350f;">1.1 Causes:</strong> God's punishment, sin, astrology (1345 alignment), Four Humours, Opposites, Miasma, Church teleology.
          </div>
          <div style="border-left: 2.5px solid #78350f; padding-left: 5px;">
            <strong style="color: #78350f;">1.2 Treatments:</strong> Prayer, relics, pilgrimages, bloodletting (fleam, leeches), purging, herbal Theriac, monastic care.
          </div>
          <div style="border-left: 2.5px solid #78350f; padding-left: 5px;">
            <strong style="color: #78350f;">1.3 Black Death:</strong> Bubonic & pneumonic plague, buboes, street fires, flagellants, quarantine, Edward III’s order.
          </div>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE 3</span>
    </div>
  </div>
`;

  // ====================================================================
  // PAGES 4–9: 3 DEDICATED TWO-PAGE SPREADS (LESSONS 1.1 TO 1.3)
  // ====================================================================
  medievalConfigs.forEach((cfg) => {
    const leftPageNum = cfg.lessonNum * 2 + 2; // e.g. 1*2+2 = 4
    const rightPageNum = cfg.lessonNum * 2 + 3; // e.g. 1*2+3 = 5

    // ------------------------------------------------------------------
    // LEFT PAGE: KNOWLEDGE INJECTION, RETRIEVAL & 4-MARK COMPARISON
    // ------------------------------------------------------------------
    html += `
  <div class="page page-container" id="page-${leftPageNum}" style="padding: 12px 18px; justify-content: space-between;">
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
        <span class="spec-anchor-badge">Spec Anchor</span>
        <span class="spec-anchor-text">${cfg.specAnchor}</span>
      </div>

      <!-- Overarching Enquiry Question Callout -->
      <div style="background: #fdf8f6; border: 1px solid #fed7aa; border-radius: 4px; padding: 4px 8px; margin-bottom: 6px; font-family: 'Playfair Display', serif; font-size: 8.5pt; color: #78350f; font-style: italic; font-weight: 600;">
        &ldquo;${cfg.enquiryQuestion}&rdquo;
      </div>

      <!-- TASK 1: SPACED RETRIEVAL DO NOW (4 RECALL QUESTIONS) -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Task 1: Spaced Retrieval Do Now &bull; Prior Knowledge Check
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-weight: 600;">[4 Marks &bull; 4 Mins]</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px;">
          ${cfg.doNow
            .map(
              (item, i) => `
          <div style="border: 1px solid #e2e8f0; border-radius: 3px; padding: 3px 6px; background: #f8fafc;">
            <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b; line-height: 1.25; margin-bottom: 2px;">
              <strong>Q${i + 1}:</strong> ${item.q}
            </div>
            <div style="border-bottom: 1px solid #475569; height: 11px; margin-top: 2px;"></div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- TASK 2: CORE SUBSTANTIVE KNOWLEDGE (3 ANCHORS) -->
      <div style="border: 1.2px solid #78350f; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Task 2: Core Substantive Knowledge &bull; The Historical Mechanism
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #78350f; font-weight: 700;">HIGH-YIELD SPECIFICATION CORE</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${cfg.coreKnowledge
            .map(
              (ck) => `
          <div style="border-left: 2.5px solid #78350f; padding-left: 6px; background: #fdf8f6; border-radius: 0 3px 3px 0; padding-top: 2px; padding-bottom: 2px;">
            <strong style="font-family: 'Inter', sans-serif; font-size: 7.2pt; color: #78350f;">${ck.heading}</strong>
            <span style="font-size: 7.2pt; color: #1e293b; line-height: 1.25;"> ${ck.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- TASK 3: DISCIPLINARY DISTINCTION TASK -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 8px; background: #ffffff; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Task 3: Disciplinary Vocabulary &bull; Dual-Term Analytical Distinction
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b; font-weight: 600;">[Tier 3 Vocabulary]</span>
        </div>
        <p style="font-size: 7.2pt; color: #334155; margin: 0 0 3px 0; line-height: 1.25;">
          ${cfg.vocabTask.prompt}
        </p>
        <div style="display: flex; flex-direction: column; gap: 3px;">
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
      </div>

      <!-- TASK 4: DELIBERATE 4-MARK EXAM PRACTICE (QUESTION 3 SIMILARITY/DIFFERENCE) -->
      <div style="border: 1.2px solid #78350f; border-radius: 4px; padding: 6px 8px; background: #fdf8f6;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Task 4: GCSE Exam Practice &bull; Paper 1 Section B &bull; Question 3
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #78350f;">[4 Marks &bull; 5 Mins]</span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 7.8pt; font-weight: 700; color: #0f172a; margin-bottom: 3px; line-height: 1.25;">
          ${cfg.fourMarkComparison.question}
        </div>
        <div style="font-size: 6.6pt; color: #64748b; margin-bottom: 4px; font-family: 'Inter', sans-serif;">
          <strong>Guidance:</strong> ${cfg.fourMarkComparison.hint} <br>
          <strong>Sentence Stems:</strong> <em>${cfg.fourMarkComparison.stems}</em>
        </div>
        <div style="display: flex; flex-direction: column; gap: 3px;">
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
          <div class="task-line-dotted"></div>
        </div>
      </div>
    </div>

    <!-- Left Page Footer -->
    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE ${leftPageNum}</span>
    </div>
  </div>

  <!-- ------------------------------------------------------------------ -->
  <!-- RIGHT PAGE: EXTENDED EXAM MASTERY & TIMELINE MISSION               -->
  <!-- ------------------------------------------------------------------ -->
  <div class="page page-container" id="page-${rightPageNum}" style="padding: 12px 18px; justify-content: space-between;">
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
      <div style="background: #fdf8f6; border: 1.2px solid #fed7aa; border-radius: 4px; padding: 5px 8px; margin-bottom: 5px;">
        <div style="font-family: 'Playfair Display', serif; font-size: 8pt; font-weight: 700; color: #0f172a; margin-bottom: 3px; line-height: 1.25;">
          ${cfg.examStem}
        </div>
        <div style="display: flex; align-items: center; gap: 8px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #78350f;">
          <strong>Stimulus:</strong>
          <span style="background: #ffffff; border: 1px solid #cbd5e1; padding: 1px 6px; border-radius: 3px;">${cfg.stimulus[0]}</span>
          <span style="background: #ffffff; border: 1px solid #cbd5e1; padding: 1px 6px; border-radius: 3px;">${cfg.stimulus[1]}</span>
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
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #78350f; display: block; margin-bottom: 1px;">${strip.col}</strong>
            <span style="font-size: 6.3pt; color: #1e293b; line-height: 1.2; display: block;">${strip.text}</span>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Analytical Connectives & High-Yield Vocabulary Bank -->
      <div style="border: 1px solid #fed7aa; border-radius: 4px; padding: 4px 6px; background: #fffbeb; margin-bottom: 6px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #78350f; text-transform: uppercase; display: block;">Analytical Connectives:</strong>
          <span style="font-size: 6.2pt; color: #1e293b; font-style: italic; line-height: 1.2; display: block;">${cfg.connectives}</span>
        </div>
        <div>
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #78350f; text-transform: uppercase; display: block;">High-Yield Word Bank:</strong>
          <span style="font-size: 6.2pt; color: #1e293b; line-height: 1.2; display: block;">
            ${cfg.wordBank.technical} &bull; ${cfg.wordBank.institutional || cfg.wordBank.practitioners || cfg.wordBank.prevention}
          </span>
        </div>
      </div>

      <!-- 16 Ruled Task Lines for Extended Writing -->
      <div style="display: flex; flex-direction: column; gap: 0; margin-bottom: 6px;">
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
    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE ${rightPageNum}</span>
    </div>
  </div>
`;
  });

  // ====================================================================
  // PAGE 10: SYNOPTIC KNOWLEDGE MAP & CROSS-ERA COMPARISON MATRIX
  // ====================================================================
  html += `
  <div class="page page-container" id="page-10" style="padding: 14px 18px; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #78350f; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; padding: 2px 7px; border-radius: 3px; text-transform: uppercase;">
            Synoptic Workshop
          </span>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 12pt; color: #0f172a; margin: 0; font-weight: 700;">
            The Medieval Medicine Synoptic Knowledge Map &amp; Comparison Matrix
          </h2>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; font-weight: 600;">
          PAGE 10 &bull; REVISION
        </div>
      </div>

      <div style="background: #fdf8f6; border: 1.2px solid #fed7aa; border-radius: 4px; padding: 5px 10px; margin-bottom: 8px; font-size: 7.4pt; color: #78350f;">
        <strong>Edexcel Paper 1 Question 3 Mastery:</strong> Question 3 asks you to explain ONE similarity or ONE difference between two eras. Master this cross-era matrix to instantly access full marks!
      </div>

      <!-- The 4-Pillar Thematic Comparison Matrix -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 5px; overflow: hidden; margin-bottom: 8px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 7pt; font-family: 'Inter', sans-serif;">
          <thead>
            <tr style="background: #78350f; color: #ffffff;">
              <th style="padding: 5px 8px; text-align: left; width: 18%;">Thematic Pillar</th>
              <th style="padding: 5px 8px; text-align: left; width: 28%; background: #92400e;">Medieval (c1250–c1500)</th>
              <th style="padding: 5px 8px; text-align: left; width: 27%;">Renaissance (c1500–c1700)</th>
              <th style="padding: 5px 8px; text-align: left; width: 27%;">Industrial / Modern</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
              <td style="padding: 5px 8px; font-weight: 700; color: #78350f; background: #fdf8f6;">Causes of Disease</td>
              <td style="padding: 5px 8px; background: #fffbeb; border-right: 1px solid #fed7aa;">
                God’s punishment for sin, astrology (1345 conjunction), Theory of Four Humours (internal imbalance), miasma (foul air).
              </td>
              <td style="padding: 5px 8px; border-right: 1px solid #cbd5e1;">
                Continued reliance on miasma and Four Humours; seeds of disease (Fracastoro), Sydenham classifies disease species.
              </td>
              <td style="padding: 5px 8px;">
                Germ Theory (Pasteur 1861, Koch 1876); microbes identified; genetics and DNA (Watson &amp; Crick 1953).
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1; background: #f8fafc;">
              <td style="padding: 5px 8px; font-weight: 700; color: #78350f; background: #fdf8f6;">Treatments &amp; Cures</td>
              <td style="padding: 5px 8px; background: #fffbeb; border-right: 1px solid #fed7aa;">
                Galen’s Theory of Opposites; phlebotomy (bloodletting with fleams/leeches), purging (emetics/laxatives), herbal Theriac.
              </td>
              <td style="padding: 5px 8px; border-right: 1px solid #cbd5e1;">
                Continuity in bloodletting and purging; chemical cures (iatrochemistry), cinchona bark (quinine) for malaria.
              </td>
              <td style="padding: 5px 8px;">
                Antiseptics (Lister 1865), anaesthetics (Simpson 1847), Magic Bullets (Ehrlich 1909), Penicillin (Fleming 1928 / Florey &amp; Chain 1941).
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1; background: #ffffff;">
              <td style="padding: 5px 8px; font-weight: 700; color: #78350f; background: #fdf8f6;">Prevention Methods</td>
              <td style="padding: 5px 8px; background: #fffbeb; border-right: 1px solid #fed7aa;">
                Prayer, fasting, pilgrimages, touching relics, flagellation, carrying sweet posies/pomanders, burning street fires.
              </td>
              <td style="padding: 5px 8px; border-right: 1px solid #cbd5e1;">
                Smoking tobacco against miasma; civic quarantine (1665 plague orders, watchmen, red crosses on doors).
              </td>
              <td style="padding: 5px 8px;">
                Smallpox vaccination (Jenner 1796), Public Health Acts (1848, 1875), clean water (Snow 1854), government lifestyle campaigns.
              </td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 5px 8px; font-weight: 700; color: #78350f; background: #fdf8f6;">Care &amp; Hospitals</td>
              <td style="padding: 5px 8px; background: #fffbeb; border-right: 1px solid #fed7aa;">
                Monastic hospitals run by monks/nuns; ‘care not cure’ (warmth, soup, prayer, altar); infectious patients turned away.
              </td>
              <td style="padding: 5px 8px; border-right: 1px solid #cbd5e1;">
                Dissolution of Monasteries (1536) closes Catholic hospitals; endowed city hospitals reopen (St Bart’s, St Thomas’s).
              </td>
              <td style="padding: 5px 8px;">
                Florence Nightingale revolutionises nursing (1854); specialized wards, trained doctors, antiseptic surgery, NHS (1948).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- The Medieval Disciplinary Vocabulary Vault -->
      <div style="border: 1.2px solid #78350f; border-radius: 5px; padding: 6px 10px; background: #ffffff;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #78350f; text-transform: uppercase; margin-bottom: 4px;">
          The Medieval Tier 3 Vocabulary Vault &bull; High-Yield Technical Glossary
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 6.8pt; line-height: 1.25; color: #1e293b;">
          <div>
            <strong style="color: #78350f;">1. Four Humours:</strong> Greek theory stating blood, phlegm, yellow bile, and black bile dictated internal health.<br>
            <strong style="color: #78350f;">2. Theory of Opposites:</strong> Galen’s method of treating excess humours with contrary qualities (cold with hot).<br>
            <strong style="color: #78350f;">3. Miasma:</strong> Corrupt, poisonous air from swamps or rotting filth believed to disrupt bodily humours.<br>
            <strong style="color: #78350f;">4. Teleology:</strong> The philosophical belief that every organ was designed with divine purpose by a single Creator.<br>
            <strong style="color: #78350f;">5. Monastic Scriptoria:</strong> Monastery workshops where monks hand-copied manuscripts, enforcing Church censorship.<br>
            <strong style="color: #78350f;">6. Uroscopy (Matula):</strong> Diagnosing disease by inspecting urine color, sediment, and smell against radial charts.
          </div>
          <div>
            <strong style="color: #78350f;">7. Vademecum:</strong> A doctor’s pocket handbook containing urine charts, herbal recipes, and Zodiac Man diagrams.<br>
            <strong style="color: #78350f;">8. Phlebotomy:</strong> The practice of bloodletting using fleams, lancets, cupping, or leeches to restore balance.<br>
            <strong style="color: #78350f;">9. Theriac:</strong> A complex herbal compound of 60+ ingredients (including viper flesh) used as a universal cure.<br>
            <strong style="color: #78350f;">10. Lazar House:</strong> Segregated colonies built outside city boundaries to banish infectious leprosy sufferers.<br>
            <strong style="color: #78350f;">11. Flagellants:</strong> Religious sects who whipped themselves in public to appease God’s wrath during the Black Death.<br>
            <strong style="color: #78350f;">12. Regimen Sanitatis:</strong> A personalized lifestyle guide advising moderation in diet, sleep, exercise, and baths.
          </div>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE 10</span>
    </div>
  </div>

  <!-- ==================================================================== -->
  <!-- PAGE 11: SECTION B EXAM MODEL ANSWERS & EXAMINER ADVICE              -->
  <!-- ==================================================================== -->
  <div class="page page-container" id="page-11" style="padding: 14px 18px; justify-content: space-between;">
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: #78350f; color: #ffffff; font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 800; padding: 2px 7px; border-radius: 3px; text-transform: uppercase;">
            Exam Workshop
          </span>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 12pt; color: #0f172a; margin: 0; font-weight: 700;">
            Section B Exam Model Answers &amp; Senior Examiner Guidance
          </h2>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; color: #64748b; font-weight: 600;">
          PAGE 11 &bull; EXAM STRATEGY
        </div>
      </div>

      <!-- Model Answer 1: Question 3 Similarity [4 Marks] -->
      <div style="border: 1.2px solid #78350f; border-radius: 5px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Model Answer: Question 3 Similarity [4 Marks &bull; 5 Mins]
          </span>
          <span style="background: #dcfce7; color: #166534; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">
            GRADE 9 EXEMPLAR (4/4)
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 7.5pt; font-style: italic; color: #0f172a; margin-bottom: 4px;">
          &ldquo;Explain one way in which ideas about the causes of illness in the Medieval period were similar to ideas in the Renaissance.&rdquo;
        </div>
        <div style="font-size: 7pt; line-height: 1.35; color: #1e293b; background: #fdf8f6; border-left: 3px solid #78350f; padding: 5px 8px; border-radius: 0 4px 4px 0; margin-bottom: 3px;">
          <strong>Point:</strong> One way ideas about the causes of illness were similar was the continued widespread belief in miasma (foul air) as the primary cause of epidemic disease.<br>
          <strong>Medieval Evidence:</strong> In the Medieval period, when the Black Death struck England in 1348, people believed corrupt vapors from swamps and unburied waste entered the body and poisoned the humours, prompting Edward III to order London streets cleared of filth in 1349.<br>
          <strong>Renaissance Comparison:</strong> Similarly, during the Great Plague of 1665 in the Renaissance, physicians and citizens still blamed corrupt air, smoking tobacco and carrying pomanders filled with sweet herbs to purify the miasma.<br>
          <strong>Explanation:</strong> Both eras completely lacked Germ Theory, meaning that despite Renaissance anatomical breakthroughs, ordinary people and doctors still believed poisonous smells directly caused sickness.
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
          <strong style="color: #78350f;">Examiner Note:</strong> Notice how the student gives precise dates (1348, 1665) and specific historical details for BOTH eras. Never write both a similarity and a difference—the exam only asks for ONE!
        </div>
      </div>

      <!-- Model Answer 2: Question 4 Explain Why Model Paragraph [12 Marks] -->
      <div style="border: 1.2px solid #78350f; border-radius: 5px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Model Paragraph: Question 4 Explain Why [12 Marks &bull; 15 Mins]
          </span>
          <span style="background: #dcfce7; color: #166534; font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 800; padding: 1px 5px; border-radius: 2px;">
            GRADE 9 EXEMPLAR (P1)
          </span>
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 7.5pt; font-style: italic; color: #0f172a; margin-bottom: 4px;">
          &ldquo;Explain why there was so little change in medical ideas about the causes of disease between c1250 and c1500.&rdquo;
        </div>
        <div style="font-size: 7pt; line-height: 1.35; color: #1e293b; background: #fdf8f6; border-left: 3px solid #78350f; padding: 5px 8px; border-radius: 0 4px 4px 0; margin-bottom: 3px;">
          One major reason why medical ideas about causes showed so little change was the absolute dominance of the Catholic Church over education and society. In the medieval period, the Church controlled all European universities (such as Oxford and Paris) and held a strict monopoly on the production of books, as monastic scriptoria were the only places where texts were hand-copied. The Church fiercely promoted the medical writings of ancient Roman physician Claudius Galen because his teleological philosophy—that every organ in the human body was purposefully crafted by a single divine Creator—aligned perfectly with Genesis and Christian theology. Consequently, the Church declared Galen’s humoural treatises infallible sacred truth. Anyone who dared to challenge Galen or advocate experimental dissection was severely punished as a heretic; for example, the Franciscan friar Roger Bacon was imprisoned in 1277 for advocating firsthand empirical science. Therefore, because the Church outlawed criticism of classical authority and controlled the training of every physician, medical thinking remained completely frozen in ancient dogma.
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">
          <strong style="color: #78350f;">Examiner Note:</strong> The answer uses clear causal signposts (<em>'One major reason why... because... Consequently... Therefore...'</em>) and specific historical evidence (Roger Bacon, 1277, scriptoria, teleology) to link back to the question.
        </div>
      </div>

      <!-- Top 3 GCSE Exam Strategies for Section B -->
      <div style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 5px 8px; background: #f8fafc;">
        <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #78350f; text-transform: uppercase; margin-bottom: 2px;">
          Top 3 Exam Strategies for Edexcel GCSE Paper 1 Section B
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #334155;">
          <div>
            <strong style="color: #78350f;">1. Q3 Timing (5 mins):</strong> Stick to 1 developed PEEL paragraph. Do NOT evaluate usefulness or write both similarity and difference.
          </div>
          <div>
            <strong style="color: #78350f;">2. Q4 Structure (15 mins):</strong> Write 3 distinct PEEL paragraphs (Stimulus 1, Stimulus 2, plus Own Knowledge). Explain CAUSES, don’t just describe.
          </div>
          <div>
            <strong style="color: #78350f;">3. Q5/6 Essay (25 mins):</strong> 16+4 marks. Provide 2 balanced sides followed by a clear, sustained judgement with criteria in the conclusion.
          </div>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid #cbd5e1; padding-top: 4px; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
      <span>The History Department &bull; Edexcel GCSE (9–1) Medicine &bull; Paper 1</span>
      <span>PAGE 11</span>
    </div>
  </div>

  <!-- ==================================================================== -->
  <!-- PAGE 12: OUTSIDE BACK COVER (PROGRESS LEDGER & SPEC CHECKLIST)       -->
  <!-- ==================================================================== -->
  <div class="page page-container" id="page-12" style="padding: 16px 20px; justify-content: space-between; border: 1px solid #cbd5e1; outline: 3.5px double #78350f; outline-offset: -8px;">
    <div>
      <!-- Top Institutional Back Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #78350f; padding-bottom: 4px; margin-bottom: 8px;">
        <div data-department-name="The History Department" style="display: flex; align-items: center; gap: 8px;">
          <span style="font-family: 'Cinzel', serif; font-size: 9.5pt; font-weight: 900; color: #78350f; text-transform: uppercase; letter-spacing: 1.2px;">
            <span class="school-brand-target">The History Department</span> &bull; Assessment &amp; Feedback
          </span>
        </div>
        <div style="font-family: 'Inter', sans-serif; font-size: 7.5pt; font-weight: 700; color: #64748b;">
          UNIT COMPILATION &bull; KEY TOPIC 1
        </div>
      </div>

      <!-- Target Grade & Performance Badges Strip -->
      <div style="border: 1.2px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: #fdf8f6; display: flex; justify-content: space-around; align-items: center; margin-bottom: 8px;">
        <div style="text-align: center;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #64748b; text-transform: uppercase;">Pupil Target</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f;">GRADE ______</div>
        </div>
        <div style="width: 1px; height: 26px; background: #cbd5e1;"></div>
        <div style="text-align: center;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #64748b; text-transform: uppercase;">Booklet Assessment</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #166534;">GRADE ______</div>
        </div>
        <div style="width: 1px; height: 26px; background: #cbd5e1;"></div>
        <div style="text-align: center;">
          <div style="font-family: 'Inter', sans-serif; font-size: 6.8pt; font-weight: 800; color: #64748b; text-transform: uppercase;">Total Marks Earned</div>
          <div style="font-family: 'Inter', sans-serif; font-size: 13pt; font-weight: 900; color: #78350f;">______ / 56</div>
        </div>
      </div>

      <!-- 56-Mark GCSE Exam Progress Ledger -->
      <div style="border: 1.2px solid #78350f; border-radius: 5px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Key Topic 1 Assessment Ledger &bull; 56 Total Marks Available
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; font-weight: 700; color: #64748b;">EDEXCEL PAPER 1 SECTION B STANDARDS</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 7pt;">
          <thead>
            <tr style="background: #fdf8f6; border-bottom: 1px solid #cbd5e1; color: #78350f;">
              <th style="padding: 3px 6px; text-align: left;">Lesson / Topic</th>
              <th style="padding: 3px 6px; text-align: left;">Task Type</th>
              <th style="padding: 3px 6px; text-align: center;">Target Marks</th>
              <th style="padding: 3px 6px; text-align: center;">Actual Score</th>
              <th style="padding: 3px 6px; text-align: center;">Teacher Initials</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 6px; font-weight: 600;">KT1.1: Causes of Illness</td>
              <td style="padding: 3px 6px;">Q3 Similarity (4m) + Q4 Explain Why (12m)</td>
              <td style="padding: 3px 6px; text-align: center; font-weight: 700; color: #78350f;">16 Marks</td>
              <td style="padding: 3px 6px; text-align: center;">_____ / 16</td>
              <td style="padding: 3px 6px; text-align: center;">_______</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 6px; font-weight: 600;">KT1.2: Treatments &amp; Care</td>
              <td style="padding: 3px 6px;">Q3 Difference (4m) + Q4 Explain Why (12m)</td>
              <td style="padding: 3px 6px; text-align: center; font-weight: 700; color: #78350f;">16 Marks</td>
              <td style="padding: 3px 6px; text-align: center;">_____ / 16</td>
              <td style="padding: 3px 6px; text-align: center;">_______</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 3px 6px; font-weight: 600;">KT1.3: The Black Death</td>
              <td style="padding: 3px 6px;">Q3 Similarity (4m) + Q5/6 Essay (16+4m)</td>
              <td style="padding: 3px 6px; text-align: center; font-weight: 700; color: #78350f;">24 Marks</td>
              <td style="padding: 3px 6px; text-align: center;">_____ / 24</td>
              <td style="padding: 3px 6px; text-align: center;">_______</td>
            </tr>
            <tr style="background: #fdf8f6; font-weight: 800; color: #78350f;">
              <td style="padding: 4px 6px;" colspan="2">TOTAL MASTERED MARKS EARNED:</td>
              <td style="padding: 4px 6px; text-align: center;">56 Marks</td>
              <td style="padding: 4px 6px; text-align: center;">_____ / 56</td>
              <td style="padding: 4px 6px; text-align: center;">_______</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 5-Point Specification High-Yield Revision Checklist -->
      <div style="border: 1px solid #cbd5e1; border-radius: 5px; padding: 6px 10px; background: #ffffff; margin-bottom: 8px;">
        <div style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #78350f; text-transform: uppercase; margin-bottom: 3px;">
          Key Topic 1 Specification Revision Checklist &bull; R-A-G Self-Audit
        </div>
        <div style="display: flex; flex-direction: column; gap: 3px; font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #1e293b;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>1. Explain supernatural causes (God, sin) vs rational causes (Four Humours, Opposites, miasma).</span>
            <span style="display: flex; gap: 4px;"><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span></span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>2. Explain why the Catholic Church protected Galen and how this froze medical progress for 1,000 years.</span>
            <span style="display: flex; gap: 4px;"><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span></span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>3. Detail humoural treatments: phlebotomy (fleams, leeches), purging, Theriac, and the Regimen Sanitatis.</span>
            <span style="display: flex; gap: 4px;"><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span></span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>4. Distinguish between physicians, barber-surgeons, apothecaries, and monastic hospitals (‘care not cure’).</span>
            <span style="display: flex; gap: 4px;"><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span></span>
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>5. Assess responses to the Black Death (1348): believed causes, flagellants, street fires, and Edward III’s order.</span>
            <span style="display: flex; gap: 4px;"><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span><span style="border: 1px solid #94a3b8; width: 12px; height: 12px; border-radius: 2px;"></span></span>
          </div>
        </div>
      </div>

      <!-- Teacher Feedback & D.I.R.T. Box -->
      <div style="border: 1.2px solid #78350f; border-radius: 5px; padding: 6px 10px; background: #fdf8f6;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
          <span style="font-family: 'Inter', sans-serif; font-size: 7.2pt; font-weight: 800; color: #78350f; text-transform: uppercase;">
            Teacher Feedback &bull; D.I.R.T. (Dedicated Improvement &amp; Reflection Time)
          </span>
          <span style="font-family: 'Inter', sans-serif; font-size: 6.5pt; color: #64748b;">WWW / EBI TARGET</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #166534; text-transform: uppercase;">What Went Well (WWW):</strong>
            <div style="border-bottom: 1px solid #cbd5e1; height: 14px;"></div>
            <div style="border-bottom: 1px solid #cbd5e1; height: 14px;"></div>
          </div>
          <div>
            <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #991b1b; text-transform: uppercase;">Even Better If (EBI):</strong>
            <div style="border-bottom: 1px solid #cbd5e1; height: 14px;"></div>
            <div style="border-bottom: 1px solid #cbd5e1; height: 14px;"></div>
          </div>
        </div>
        <div style="margin-top: 4px;">
          <strong style="font-family: 'Inter', sans-serif; font-size: 6.8pt; color: #78350f; text-transform: uppercase;">Pupil D.I.R.T. Response / Redraft Action:</strong>
          <div style="border-bottom: 1px solid #cbd5e1; height: 14px;"></div>
        </div>
      </div>
    </div>

    <!-- Bottom Departmental Back Cover Footer -->
    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1.5px solid #78350f; padding-top: 6px; margin-top: 4px;">
      <div style="font-family: 'Inter', sans-serif; font-size: 7pt; color: #64748b;">
        GCSE History Revision Hub &bull; Independent Commercial Educational Platform
      </div>
      <div style="font-family: 'Inter', sans-serif; font-size: 7.4pt; font-weight: 800; color: #78350f; letter-spacing: 0.5px;">
        PAGE 12 &bull; END OF BOOKLET
      </div>
    </div>
  </div>
</body>
</html>
`;

  return html;
}

module.exports = { buildMedievalTwoPageWorkbook };
