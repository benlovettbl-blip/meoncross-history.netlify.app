const fs = require('fs');
const path = require('path');

function extractVar(filePath, varName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const start = content.indexOf('const ' + varName + ' = [');
  if (start === -1) throw new Error('Not found ' + varName);
  const end = content.indexOf(';\n\nfunction', start);
  const code = content.substring(
    start + ('const ' + varName + ' = ').length,
    end !== -1 ? end : content.indexOf('];', start) + 1,
  );
  return eval('(' + code + ')');
}

const medievalConfigs = extractVar(
  'scripts/render_medicine_medieval_twopage_workbook.cjs',
  'medievalConfigs',
);
const renaissanceConfigs = extractVar(
  'scripts/render_medicine_renaissance_twopage_workbook.cjs',
  'renaissanceConfigs',
);
const eighteenthNineteenthConfigs = extractVar(
  'scripts/render_medicine_18th_19th_twopage_workbook.cjs',
  'eighteenthNineteenthConfigs',
);
const modernConfigs = extractVar(
  'scripts/render_medicine_modern_twopage_workbook.cjs',
  'modernConfigs',
);
const wfConfigs = extractVar(
  'scripts/render_medicine_western_front_twopage_workbook.cjs',
  'wfConfigs',
);

const allConfigs = [
  ...medievalConfigs,
  ...renaissanceConfigs,
  ...eighteenthNineteenthConfigs,
  ...modernConfigs,
  ...wfConfigs,
];

console.log(`Loaded ${allConfigs.length} workbook configurations across all 5 Key Topics.`);

// Model answers for Medieval KT1 GCSE tasks (Lessons 1 to 5)
const medievalGcseTasks = [
  {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way in which ideas were similar [4 marks]',
        text: 'Explain one way in which ideas about the cause of disease in the Medieval period (c1250–c1500) were similar to ideas in the Renaissance period (c1500–c1700). [4 marks]',
        model:
          'One way in which ideas about the causes of disease were similar in both periods was the enduring belief in **miasma** (poisonous or corrupted air). In the Medieval period, during epidemics like the Black Death (1348), people believed that foul-smelling vapors arising from decaying filth, swamps, and rotting corpses entered the body and caused sickness. Similarly, during the Renaissance, ordinary citizens and physicians continued to blame miasma for outbreaks like the Great Plague of 1665, carrying sweet-smelling pomanders and smoking tobacco to ward off bad air. **This similarity persisted because** although the Renaissance saw major breakthroughs in anatomy and scientific communication, scientists still had no understanding of germs or microorganisms as disease pathogens. Without knowledge of bacteria, bad smells remained the most rational explanation for why disease spread rapidly in crowded urban environments.',
      },
      {
        type: 'written',
        tariff: 'Q4: Explain why the Catholic Church had such influence [12 marks]',
        text: 'Explain why the Catholic Church had such a major influence on ideas about the causes of disease in the period c1250–c1500. [12 marks]',
        stimulus: [
          'Monastic scriptoria and book-copying',
          'The imprisonment of Roger Bacon (1277)',
        ],
        model:
          'One major reason why the Catholic Church held such vast influence over ideas about disease causation was its institutional monopoly on education, literacy, and the reproduction of books. In the Middle Ages, books were hand-copied exclusively by Catholic monks in monastic scriptoria. The Church actively censored any ideas that contradicted Scripture, ensuring that classical medical texts were only preserved if they aligned with Christian doctrine. Because Claudius Galen argued that the human body was perfectly designed by a single Creator, the Church adopted his writings as sacred medical canon. Medical students in medieval universities—which were run by clergy—spent years memorizing Galen and Hippocrates rather than observing actual patients, reinforcing ecclesiastical control over medical thought.<br><br>Furthermore, the Church possessed the ecclesiastical and legal authority to punish and suppress intellectual dissent. Clerics taught that disease was sent directly by God as divine retribution (punishment) for human sin, or as a spiritual test of faith. Questioning this supernatural explanation or challenging Galenic dogma was treated as heresy. For example, in 1277 the Franciscan friar Roger Bacon was imprisoned by church authorities for advocating empirical scientific experimentation and suggesting that doctors should investigate nature through observation rather than unquestioning adherence to ancient books. The threat of imprisonment or excommunication effectively terrified scholars and stifled independent medical enquiry for centuries.<br><br>Finally, the Church controlled the physical institutions of society, including hospitals, universities, and social life. Ordinary people attended mass weekly, where priests reinforced the message that epidemics like the Black Death were caused by God’s wrath or planetary conjunctions arranged by God. Monastic hospitals were founded on the principle of ‘care not cure’, prioritizing prayer, confession, and the salvation of the patient’s soul over medical diagnosis or physical remedies. Consequently, the pervasive spiritual worldview promoted by the Church made supernatural explanations of illness virtually impossible for medieval people to challenge.',
      },
    ],
  },
  {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way diagnosis was similar [4 marks]',
        text: 'Explain one way in which diagnosis of disease in the Medieval period was similar to diagnosis in the Renaissance. [4 marks]',
        model:
          'One way in which diagnosis was similar was the continued reliance on **humoural analysis and urine inspection (uroscopy)**. In the Medieval period, physicians used a urine wheel (matula flask) to inspect the color, smell, and sediment of a patient’s urine, alongside checking astrology charts to determine humoural imbalance. Similarly, in the Renaissance, ordinary physicians continued to examine urine and check the balance of the four humours to diagnose disease. This persisted because traditional Galenic diagnosis was deeply entrenched in medical education, and new anatomical discoveries had not yet produced alternative diagnostic techniques.',
      },
      {
        type: 'written',
        tariff: 'Q4: Explain why Galen’s ideas continued to be believed [12 marks]',
        text: 'Explain why Galen’s medical ideas continued to be believed in the period c1250–c1500. [12 marks]',
        stimulus: ['The Theory of Opposites', 'The Christian Church'],
        model:
          'One primary reason Galen’s ideas continued to be believed was that his medical framework appeared entirely logical and comprehensive to medieval minds. Galen had expanded Hippocrates’ Four Humours into the **Theory of Opposites**, which offered a practical, common-sense explanation for illness and treatment: if a patient had a cold, wet phlegmatic fever, they were treated with hot, dry remedies like pepper or mustard. This gave both physicians and ordinary people a systematic, reassuring framework for understanding illness, even when treatments failed to cure severe epidemics.<br><br>Furthermore, Galen’s medical writings were actively endorsed and fiercely protected by the medieval Catholic Church. Galen believed that every part of the human body was purposefully crafted by a single divine Creator (teleology), which aligned perfectly with Christian theological doctrine. Because the Church controlled the universities and monastic scriptoria, it declared Galen’s texts infallible. University medical faculties taught Galen as unchallengeable truth; professors sat in an elevated cathedra lecturing from Galen while barber-surgeons dissected animals or criminals. If an anatomical corpse contradicted Galen’s descriptions, professors blamed the imperfection of the human cadaver rather than Galen.<br><br>Finally, there was a total absence of alternative scientific explanations or empirical dissection. Human dissection was strictly restricted by religious authorities, and when dissections did occur, they were demonstrations to confirm Galen rather than investigations to discover new anatomy. Hand-copying errors in monastic manuscripts further locked errors in place. Without microscopes, physiological instruments, or the freedom to conduct empirical research, medieval society had neither the tools nor the intellectual freedom to challenge Galen’s 1,300-year-old authority.',
      },
    ],
  },
  {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way treatments were different [4 marks]',
        text: 'Explain one way in which treatments for disease in the Medieval period were different from treatments in the Modern period. [4 marks]',
        model:
          'One way in which treatments were different was the medieval reliance on **bloodletting (phlebotomy) and purging to restore humoural balance**, compared to modern targeted pharmaceuticals. In the Medieval period, doctors used leeches, vein-slitting, and laxatives to evacuate excess humours, believing this restored natural health. In contrast, modern medicine uses synthetic antibiotics, antivirals, and chemotherapy specifically designed to destroy microscopic pathogens or diseased cells without draining the patient’s blood. This difference exists because modern science understands that bacteria and viruses cause disease, proving that bloodletting was scientifically useless and often fatal.',
      },
      {
        type: 'written',
        tariff: 'Q4: Explain why treatments focused on humoural balance [12 marks]',
        text: 'Explain why medieval treatments for disease focused primarily on restoring humoural balance in the period c1250–c1500. [12 marks]',
        stimulus: ['Bloodletting (phlebotomy) and purging', 'The Regimen Sanitatis'],
        model:
          'One major reason medieval treatments focused on humoural balance was the universal acceptance of the Hippocratic-Galenic medical doctrine. Hippocrates argued that the body contained four vital humours—blood, phlegm, yellow bile, and black bile—which had to remain in harmonious balance for health. If one humour became dominant, illness occurred. Consequently, medieval treatment was designed entirely around evacuative therapies: excess blood was purged through phlebotomy (vein-slitting or leeches), while excess bile was eliminated using violent herbal emetics (vomit-inducing mixtures) and laxatives. Because these procedures produced visible physical results (blood and fluids leaving the body), both physician and patient believed the disease was being physically expelled.<br><br>Furthermore, preventive advice was structured entirely around personal humoural equilibrium, as exemplified by the **Regimen Sanitatis** (Rule of Health). This widely circulated medieval health handbook, written by the medical faculty at Salerno, instructed wealthy nobles to regulate the ‘six non-naturals’—diet, rest, exercise, bathing, air, and emotional state—to prevent humoural corruption. Medieval people believed each person possessed a unique humoural complexion determined by their age, temperament, and astrological birth chart, making customized humoural dieting and bathing the central pillar of daily preventive medicine.<br><br>Finally, there was a total lack of any rival scientific understanding of human physiology or contagion. Because microorganisms, cellular pathology, and biochemical processes were completely invisible and unimaginable without microscopes, humoural imbalance remained the only rational explanation for sickness. Backed by the authority of the Church and medical universities, physicians had no intellectual reason or empirical basis to attempt any treatment other than restoring humoural equilibrium.',
      },
    ],
  },
  {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q4',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way medical care providers were similar [4 marks]',
        text: 'Explain one way in which medical care providers in the Medieval period were similar to those in the Renaissance. [4 marks]',
        model:
          'One way in which medical care providers were similar was that **the majority of ordinary sick people were treated at home by women and wise-women**, rather than university-educated physicians. In both the Medieval period and the Renaissance, licensed physicians were extremely expensive and catered almost exclusively to the wealthy elite. Consequently, ordinary peasants and townspeople relied on female relatives, apothecaries, and local herbalists who prepared home remedies from traditional recipe books passed down through generations.',
      },
      {
        type: 'written',
        tariff: 'Q4: Explain why medieval hospitals provided ‘care not cure’ [12 marks]',
        text: 'Explain why medieval hospitals provided ‘care not cure’ in the period c1250–c1500. [12 marks]',
        stimulus: ['Monastic hospitality and charity', 'The lack of trained physicians and nurses'],
        model:
          'One fundamental reason medieval hospitals provided ‘care not cure’ was that they were religious foundations rather than medical facilities. Established and financed by the Catholic Church or wealthy benefactors seeking salvation in purgatory, medieval hospitals were run by monks and nuns. The Latin word *hospitium* meant hospitality, and these institutions functioned as shelters for the poor, elderly, travelers, and pilgrims. The primary mission of the religious staff was spiritual: they provided a warm bed, clean food, and a place where the sick could pray, confess their sins, and receive holy communion. Hospital wards were arranged so that patient beds faced directly down the central aisle toward the chapel altar, ensuring patients could witness the elevation of the Host and save their souls before death.<br><br>Furthermore, medieval hospitals deliberately lacked trained medical personnel and curative surgical equipment. University-trained physicians rarely set foot inside ordinary monastic hospitals, as their fees were far too high and hospitals could not afford them. The monks and nuns who cared for patients had no medical training; their duties consisted of nursing care—bathing patients, washing linens, feeding them simple broths, and reading prayers. Moreover, hospitals strictly barred people suffering from contagious diseases like leprosy, smallpox, or the plague to protect the resident community, meaning those who were critically ill with curable conditions were turned away.<br><br>Finally, the prevailing theological doctrine held that physical illness was sent by God to cleanse the soul, making prayer and spiritual repentance far more important than physical medicine. Monks believed that attempting to artificially cure a disease might interfere with God’s divine will. Therefore, the hospital’s purpose was to comfort the body while the Church healed the soul, creating an institutional culture centered entirely on compassionate palliative care rather than medical cure.',
      },
    ],
  },
  {
    title: 'Edexcel GCSE (9–1) Paper 1 Section B Practice: Q3 & Q5/Q6',
    tasks: [
      {
        type: 'written',
        tariff: 'Q3: Explain one way approaches to epidemics were similar [4 marks]',
        text: 'Explain one way in which approaches to preventing epidemic disease in the Medieval period (1348 Black Death) were similar to the Renaissance (1665 Great Plague). [4 marks]',
        model:
          'One way in which approaches to preventing epidemics were similar was the widespread use of **quarantine, social isolation, and fleeing infected areas**. In 1348, authorities in cities like Gloucester and London attempted to shut city gates to outsiders, while wealthy lords fled to country estates. Similarly, during the Great Plague of 1665, the Lord Mayor enforced strict quarantine orders: infected houses were locked shut from the outside for 28 days with a red cross painted on the door and watchmen stationed outside, while King Charles II and wealthy citizens fled to the countryside. In both periods, people recognized that physical proximity to infected individuals spread disease, even though they still believed foul miasma or God’s wrath was the ultimate cause.',
      },
      {
        type: 'written',
        tariff: 'Q5/Q6: Evaluative Essay [16+4 marks]',
        text: '‘The primary reason people died during the Black Death was the complete failure of public health measures.’ How far do you agree? Explain your answer. [16+4 marks]',
        stimulus: [
          'Quarantine regulations in Gloucester and London',
          'Miasma and religious explanations',
        ],
        model:
          'To a large extent, I disagree that the primary reason people died was the failure of public health measures; rather, the overwhelming death toll was caused by a total ignorance of the biological causes of the plague, which rendered all medical treatments and public health attempts completely useless. While local authorities in 1348 lacked the administrative infrastructure and legal power to enforce effective sanitation, they could never have stopped the Black Death because they did not know that *Yersinia pestis* was transmitted by rodent fleas.<br><br>On the one hand, public health measures were undeniably weak, fragmented, and late, contributing to the speed of transmission. Medieval towns had no centralized public health departments, sewer networks, or piped clean water. In London, open cesspits and butcher offal piled up in unpaved streets, creating ideal breeding grounds for the black rats (*Rattus rattus*) carrying infected fleas. Although cities like Gloucester attempted quarantine by shutting their town gates to people from Bristol in 1348, surrounding rural communities ignored the ban, and London authorities only began digging emergency plague pits after tens of thousands were already infected. The lack of compulsory national coordination and sanitary enforcement meant town councils were hopelessly overwhelmed.<br><br>However, even the most rigorous public health measures possible in the 14th century would have failed because medieval understanding of disease causation was fundamentally incorrect. People believed the Black Death was caused by divine retribution (God punishing human sin) or corrupted miasma (poisonous air from planetary alignments or volcanic fumes). Consequently, public health responses focused on religious appeasement and sweet smells: town councils organized mass church processions and flagellant rallies, which packed thousands of terrified citizens together in crowded streets, drastically accelerating the spread of pneumonic plague. Similarly, burning aromatic pitch and carrying posies did nothing to repel flea bites.<br><br>Furthermore, medieval medical treatments actively worsened patients’ chances of survival. Physicians relied on Galenic humoural remedies: bleeding patients weakened their immune systems, while lancing buboes exposed open wounds to secondary septic infections. Apothecaries prescribed costly herbal theriacs or mercury that poisoned sufferers. Without knowledge of bacteria, flea vectors, or antibiotic therapies like streptomycin, medical practitioners were completely powerless against a pathogen with a 60–80% bubonic mortality rate and 100% pneumonic mortality rate.<br><br>In conclusion, while public health measures were rudimentary and poorly enforced, they were not the primary reason people died. The primary cause of the catastrophic mortality (which killed 30–45% of England’s population) was the complete absence of scientific knowledge regarding bacteriology and vectors. Even if 14th-century towns had possessed clean streets, their mistaken belief in miasma and divine wrath meant they could never have addressed the real flea-and-rat vector.',
      },
    ],
  },
];

// Now load and update units/edexcel_medicine/data.js
const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
let dataContent = fs.readFileSync(dataFilePath, 'utf8');

// Load module data
const { unitData } = require(dataFilePath);

console.log(`Processing ${unitData.lessons.length} lessons in unitData...`);

unitData.lessons.forEach((lesson, idx) => {
  const cfg = allConfigs[idx];
  if (!cfg) {
    console.error(`No config found for lesson index ${idx}`);
    return;
  }

  // 1. Synchronize do_now to canonical 10 questions
  lesson.do_now = cfg.doNow.map((item) => ({
    q: item.q,
    a: item.a,
  }));

  // Clean up any deprecated camelCase doNow
  delete lesson.doNow;

  // 2. Add gcse_task for Lessons 1–5 if missing
  if (idx < 5) {
    lesson.gcse_task = medievalGcseTasks[idx];
  }

  console.log(
    `Synchronized Lesson ${idx + 1} (${lesson.id}): ${lesson.do_now.length} Do Nows, gcse_task=${!!lesson.gcse_task}`,
  );
});

// Write updated data.js preserving export statement
const newContent = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
fs.writeFileSync(dataFilePath, newContent, 'utf8');

console.log('✅ Successfully wrote updated units/edexcel_medicine/data.js');
