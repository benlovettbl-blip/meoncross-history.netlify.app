const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
const raw = fs.readFileSync(dataFilePath, 'utf8');

let data;
const sandbox = { module: {}, exports: {} };
eval(raw.replace(/export\s+default\s+/, 'data = '));
if (!data && sandbox.module.exports) data = sandbox.module.exports;

// Map of all 130 cataloged sources by original ID
const catalog = {};
data.lessons.forEach((l) => {
  l.sources.forEach((s) => {
    catalog[s.id] = JSON.parse(JSON.stringify(s));
  });
});

function getCat(id, letter, extra = {}) {
  const s = catalog[id];
  if (!s) throw new Error('Missing catalog source: ' + id);
  const clone = JSON.parse(JSON.stringify(s));
  clone.letter = letter;
  clone.id = id;
  if (!clone.title.startsWith(`Source ${letter}:`)) {
    clone.title = clone.title.replace(/^Source [A-E][^:]*:\s*/i, `Source ${letter}: `);
  }
  if (clone.enquiry_question) {
    clone.enquiry_question = clone.enquiry_question.replace(/Source [A-E]/g, `Source ${letter}`);
  }
  if (clone.model_answer) {
    clone.model_answer = clone.model_answer.replace(/Source [A-E]/g, `Source ${letter}`);
  }
  if (clone.image && !clone.src) clone.src = clone.image;
  if (clone.src && !clone.image) clone.image = clone.src;
  if (clone.image) clone.type = 'visual';
  Object.assign(clone, extra);
  return clone;
}

function createSource(opts) {
  const s = {
    id: opts.id,
    letter: opts.letter,
    title: `Source ${opts.letter}: ${opts.title}`,
    type: opts.type || (opts.image ? 'visual' : 'written'),
    caption: opts.caption,
    desc: opts.desc || opts.caption,
    provenance: opts.provenance,
    citation: opts.citation || opts.provenance,
    intro: opts.intro || `From ${opts.title}.`,
    hinge_question: opts.hinge_question,
    source_context: `${opts.context} **Hinge Question:** ${opts.hinge_question}`,
    context: opts.context,
    question_badge: opts.question_badge || 'Source Utility',
    question_type: opts.question_type || 'Source Utility',
    enquiry_question:
      opts.enquiry_question ||
      `How useful is Source ${opts.letter} for an enquiry into ${opts.enquiry_topic}?`,
    model_answer: opts.model_answer,
    teacher_notes: {
      source_context: `${opts.context} **Hinge Question:** ${opts.hinge_question}`,
    },
  };
  if (opts.text) s.text = opts.text;
  if (opts.image) {
    s.image = opts.image;
    s.src = opts.image;
  }
  return s;
}

console.log('Realigning Edexcel Medicine sources across all 26 lessons...');

// Lesson 6: lesson_2_1 (Renaissance New Spirit of Enquiry)
data.lessons[5].sources = [
  getCat('med_l6_source_a', 'A'), // Printing House
  getCat('med_l6_source_e', 'B'), // Erasmus Humanism -> Block 2
  getCat('med_l6_source_b', 'C'), // Royal Society Charter 1662 -> Block 3
  getCat('med_l6_source_d', 'D'), // Oldenburg Philosophical Transactions -> Block 4
  getCat('med_l6_source_c', 'E'), // Hooke Microscopic Flea -> Block 5
];

// Lesson 7: lesson_2_2 (Thomas Sydenham)
data.lessons[6].sources = [
  getCat('med_l7_source_a', 'A'), // Sydenham Observationes Medicae Title Page
  getCat('med_l7_source_b', 'B'), // Sydenham on Bedside Observation
  getCat('med_l7_source_e', 'C'), // Sydenham on Cool Treatment for Smallpox -> Block 3
  getCat('med_l7_source_d', 'D'), // Sydenham on Peruvian Bark
  getCat('med_l7_source_c', 'E'), // Quack Physician by Jan Steen -> Block 5 Limits & Quackery
];

// Lesson 11: lesson_3_1 (Pasteur & Koch)
data.lessons[10].sources = [
  getCat('source_e_bastian_lancet_1875', 'A'), // Bastian in Lancet 1875 (Spontaneous generation orthodoxy) -> Block 1
  getCat('source_b_pasteur_sorbonne_1864', 'B'), // Pasteur Sorbonne Address 1864 -> Block 2 Germ Theory
  getCat('source_a_pasteur_lab', 'C', {
    title: 'Source C: Louis Pasteur in his Laboratory (1885) by Albert Edelfelt',
  }), // Pasteur in Lab -> Block 3
  getCat('source_c_koch_bacteria', 'D'), // Koch Stained TB Bacilli Microphotograph 1882 -> Block 4 Koch
  getCat('source_d_koch_berlin_address_1882', 'E'), // Koch Address to Berlin Physiological Society 1882 -> Block 5 Postulates
];

// Lesson 14: lesson_3_4 (Surgical Revolution: Simpson, Lister)
data.lessons[13].sources = [
  createSource({
    // Block 1: Pre-anaesthetic surgery
    id: 'med_l14_source_pre_anaesthetic',
    letter: 'A',
    type: 'written',
    title: 'Contemporary Medical Account of Pre-Anaesthetic Surgery under Robert Liston (c.1840s)',
    text: 'Before the introduction of ether and chloroform, the surgical amphitheatre was a chamber of terror. Strong orderlies pinioned the screaming patient to the wooden table with leather straps. The surgeon’s primary virtue was sheer speed: Mr Liston was famous for amputating a leg at the thigh in under twenty-eight seconds, holding the bloody knife between his teeth as his hands sawed through the bone. Patients frequently perished from the sheer agony of surgical shock.',
    caption:
      'Historical account describing the terrifying speed, physical restraint, and traumatic shock characteristic of British surgery before anaesthesia.',
    provenance: 'Wellcome Collection Archives, London, MS 7412, Surgical Memoirs.',
    context:
      'Before 1846, surgical operations were severely limited by unbearable pain, requiring rapid limb amputations that often caused fatal cardiovascular shock.',
    hinge_question:
      'Why was extreme operating speed considered the highest surgical virtue prior to the discovery of anaesthesia?',
    enquiry_topic:
      'the traumatic conditions and surgical shock confronting patients before the introduction of anaesthetics',
    model_answer:
      '<p>Source A is highly useful because it documents the terrifying reality of pre-anaesthetic surgery, where patients had to be physically pinned down and operations like Robert Liston’s 28-second leg amputations prioritized speed over precision. As a contemporary medical account, it explains why surgeons avoided deep internal abdominal operations and why patients frequently died of traumatic surgical shock before anaesthesia existed.</p>',
  }),
  getCat('source_b_simpson_chloroform_1847', 'B'), // Simpson Chloroform Account 1847 -> Block 2
  createSource({
    // Block 3: Black Period & Hospital Gangrene
    id: 'med_l14_source_black_period',
    letter: 'C',
    type: 'written',
    title:
      'John Eric Erichsen, Professor of Surgery, on "Hospitalism" and Post-Operative Mortality (1874)',
    text: 'A man laid on an operating table in one of our large metropolitan hospitals is exposed to greater danger of death than a soldier on the battlefield of Waterloo. The very atmosphere of the surgical wards is impregnated with septic poisons generated by decomposing animal matter. Hospital gangrene, pyaemia, and erysipelas stalk the beds. While anaesthesia has abolished pain, it has multiplied operations and thereby multiplied the harvest of death.',
    caption:
      'Professor John Eric Erichsen describing the terrifying rise in post-operative sepsis and mortality during the "Black Period" of surgery in 1874.',
    provenance:
      'John Eric Erichsen, On Hospitalism and the Causes of Death after Operations, Longmans, London, 1874.',
    context:
      'Following the introduction of anaesthesia, surgeons attempted longer, deeper operations in unsterilized conditions, wearing blood-encrusted coats, causing sepsis rates to soar during the "Black Period".',
    hinge_question:
      'Why did the initial success of anaesthesia paradoxically cause an increase in surgical infection and hospital mortality rates?',
    enquiry_topic:
      'the causes and consequences of high surgical infection rates during the "Black Period" of British hospital surgery',
    model_answer:
      '<p>Source C is exceptionally useful because Professor Erichsen candidly exposes the paradox of the *\"Black Period\"*: anaesthetics permitted longer, more invasive surgery, but because surgeons operated in unwashed frock coats with unsterilized instruments, mortality from hospital gangrene soared beyond battlefield casualty rates. As a clinical assessment by a leading University College surgeon, it highlights why the conquest of pain was incomplete until Lister tackled sepsis.</p>',
  }),
  getCat('source_d_lister_lancet_1867', 'D'), // Lister Carbolic Acid Lancet 1867 -> Block 4
  getCat('source_e_tait_aseptic_critique_1880', 'E'), // Lawson Tait BMJ 1880 (Aseptic critique) -> Block 5
];

// Lesson 15: lesson_3_5 (Public Health & Cholera)
data.lessons[14].sources = [
  createSource({
    // Block 1: Edwin Chadwick & 1842 Sanitary Report
    id: 'med_l15_source_chadwick',
    letter: 'A',
    type: 'written',
    title:
      'Edwin Chadwick, Report on the Sanitary Condition of the Labouring Population of Great Britain (1842)',
    text: 'The primary and most important condition that affects the health of the labouring classes is the defective drainage, the lack of clean water, and the accumulation of decaying refuse in their dwellings and streets. Such conditions generate atmospheric impurities that depress the vital powers and produce epidemic, endemic, and contagious diseases. The expenditure of public funds on clean water and underground drainage will prevent disease, reduce pauperism, and promote public morality.',
    caption:
      'Edwin Chadwick’s landmark 1842 report demonstrating that disease among working-class families was caused by unsanitary living conditions and contaminated drainage.',
    provenance:
      'Edwin Chadwick, Report on the Sanitary Condition of the Labouring Population, Poor Law Commission, London, 1842.',
    context:
      'In 1842, social reformer Edwin Chadwick published his landmark sanitary survey, linking filth and poverty to epidemic diseases, leading directly to the Public Health Act 1848.',
    hinge_question:
      'How did Edwin Chadwick use empirical evidence to convince parliament that sanitary reform was cheaper than supporting impoverished widows and orphans?',
    enquiry_topic:
      'the impact of Edwin Chadwick’s 1842 sanitary report on early public health legislation in industrial Britain',
    model_answer:
      '<p>Source A is highly useful because Edwin Chadwick articulates the foundational argument of the sanitary movement: filth, defective drainage, and contaminated water directly generated epidemic diseases among industrial workers. As an official Poor Law Commission report, it demonstrates why the state began abandoning *laissez-faire* economics to pass the 1848 Public Health Act, even though Chadwick still attributed epidemics to miasma rather than waterborne bacteria.</p>',
  }),
  getCat('source_a_snow_cholera_map', 'B'), // John Snow Broad Street Map 1854 -> Block 2
  getCat('source_c_cholera_miasma', 'C'), // King Cholera Tramples Slums -> Block 3
  getCat('source_d_board_of_health_rejection_1855', 'D'), // Board of Health Scepticism 1855 -> Block 4
  getCat('source_e_public_health_act_1875', 'E'), // 1875 Public Health Act Provisions -> Block 5
];

// Lesson 17: lesson_4_2 (Diagnostic Technology & Lifestyle Factors)
data.lessons[16].sources = [
  getCat('source_b_rontgen_paper_1895', 'A'), // Röntgen On a New Kind of Rays 1895 -> Block 1
  createSource({
    // Block 2: Fibre-Optic Endoscopy & Automated Blood Testing
    id: 'med_l17_source_endoscopy',
    letter: 'B',
    type: 'written',
    title:
      'Medical Report on the Clinical Introduction of Fibre-Optic Gastrointestinal Endoscopy (1960s)',
    text: 'The transmission of light through flexible bundles of coated glass fibres has transformed internal diagnosis. Instead of subjecting patients to exploratory laparotomies, clinicians can now visually examine the mucosal lining of the stomach and duodenum in real time. Biopsies of malignant lesions can be obtained under direct vision without surgical trauma. Combined with automated biochemical blood auto-analysers, diseases can be diagnosed at cellular stages.',
    caption:
      'Clinical paper describing the introduction of flexible fibre-optic endoscopes and automated blood analyzers in British teaching hospitals in the 1960s.',
    provenance: 'British Medical Journal, Vol. 2, Clinical Review Series, London, 1968.',
    context:
      'In the mid-20th century, physics breakthroughs enabled flexible fiber-optic endoscopy and automated blood laboratories, replacing dangerous exploratory surgery with direct internal visualization.',
    hinge_question:
      'How did fiber-optic endoscopy and automated blood testing eliminate the need for dangerous exploratory surgery?',
    enquiry_topic:
      'the revolutionary diagnostic capabilities introduced by fiber-optic endoscopy and clinical laboratories in the mid-20th century',
    model_answer:
      '<p>Source B is highly useful because it documents how flexible fiber-optic technology allowed doctors to visually inspect internal organs and biopsy suspicious lesions directly without risky exploratory surgery. As a clinical assessment in the *British Medical Journal*, it illustrates the rapid shift toward non-invasive diagnostic tools, although it reflects high-level hospital specialist practice that took years to become routine nationwide.</p>',
  }),
  getCat('source_a_rontgen_ct_prototype', 'C'), // EMI CT Brain Scanner 1970s -> Block 3
  getCat('source_d_hounsfield_nobel_1979', 'D'), // Hounsfield Nobel Lecture 1979 -> Block 4
  getCat('source_e_dhss_lifestyle_report_1976', 'E'), // DHSS Prevention and Health 1976 -> Block 5
];

// Lesson 18: lesson_4_3 (Magic Bullets & Birth of NHS)
data.lessons[17].sources = [
  getCat('source_b_ehrlich_address_1913', 'A'), // Paul Ehrlich Address 1913 -> Block 1
  getCat('source_c_gerhard_domagk_portrait', 'B'), // Gerhard Domagk Prontosil -> Block 2
  getCat('source_d_beveridge_report_1942', 'C'), // Beveridge Report 1942 -> Block 3
  getCat('source_a_nhs_leaflet_1948', 'D'), // NHS Launch Leaflet 1948 -> Block 4
  getCat('source_e_bevan_commons_speech_1946', 'E'), // Aneurin Bevan Speech 1946 -> Block 5
];

// Lesson 20: lesson_4_5 (Case Study 2: Lung Cancer)
data.lessons[19].sources = [
  createSource({
    // Block 1: 1930s/40s Tobacco Advertising
    id: 'med_l20_source_tobacco_ad',
    letter: 'A',
    type: 'written',
    title: 'Transcript of a National British Cigarette Print Advertisement (1938)',
    text: 'Protect your throat! Smoke Craven "A" cork-tipped cigarettes. Made specifically to prevent sore throats, coughing, and vocal strain. Doctors agree that our natural, sun-ripened Virginia tobacco is pure, mild, and non-irritating. Join the millions of active men and women who smoke Craven "A" daily for refreshment, steady nerves, and throat protection.',
    caption:
      'Popular 1938 national print advertisement promoting commercial cigarettes as throat-soothing and health-protecting before medical links to lung cancer were established.',
    provenance: 'Daily Mail, London edition, Advertising Supplement, 14 May 1938.',
    context:
      'Before 1950, tobacco manufacturers advertised cigarettes as soothing, masculine, and medically safe, leading to soaring cigarette consumption that caused a massive epidemic of lung cancer.',
    hinge_question:
      'How does this 1938 cigarette advertisement demonstrate why smoking was so culturally normalized and popular before the 1950s?',
    enquiry_topic:
      'how commercial tobacco advertising normalized cigarette consumption in Britain prior to scientific proof of lung cancer links',
    model_answer:
      '<p>Source A is highly useful because it demonstrates how cigarette manufacturers actively marketed tobacco as beneficial to throat health and approved by doctors, normalising daily smoking across British society. As a mass commercial print advertisement, it explains why cigarette consumption reached unprecedented heights in the early 20th century, before Richard Doll’s epidemiological studies proved tobacco was the primary cause of fatal lung malignancies.</p>',
  }),
  getCat('source_b_doll_hill_bmj_1950', 'B'), // Doll & Hill 1950 -> Block 2
  getCat('source_d_rcp_report_1962', 'C'), // Royal College of Physicians Report 1962 -> Block 3
  getCat('source_e_health_act_2006', 'D'), // Health Act 2006 Public Smoking Ban -> Block 4
  getCat('source_a_plain_packaging_uk', 'E'), // Standardized Plain Packaging 2016 -> Block 5
];

// Lesson 23: lesson_5_3 (Battlefield Trauma & Gas Attacks)
data.lessons[22].sources = [
  createSource({
    // Block 1: High Explosive Shrapnel Wounds
    id: 'med_l23_source_shrapnel_trauma',
    letter: 'A',
    type: 'written',
    title:
      'Report of an RAMC Consulting Surgeon on High Explosive Shrapnel Trauma in Flanders (1916)',
    text: 'The devastating nature of modern artillery shrapnel exceeds anything in medical history. When a high explosive shell detonates, it shatters into hundreds of jagged, irregular steel fragments travelling at supersonic velocity. These hot jagged fragments rip through flesh, pulverising bone into splinters and driving fragments of mud, filthy wool uniform, and manure deep into the tissues. Infection is instantaneous; clean bullet wounds are almost unknown.',
    caption:
      'RAMC surgical report detailing the catastrophic tissue damage, compound fractures, and immediate wound contamination caused by German artillery shrapnel.',
    provenance: 'British Medical Journal, Vol. 2, Clinical War Reports, London, 1916.',
    context:
      'Artillery was the greatest killer on the Western Front, responsible for 58% of all wounds and massive compound fractures deeply contaminated by Flemish mud.',
    hinge_question:
      'Why did high explosive artillery shrapnel create far more dangerous and infectious wounds than rifle bullets?',
    enquiry_topic:
      'the severity and infectious nature of wounds caused by artillery shrapnel on the Western Front',
    model_answer:
      '<p>Source A is highly useful because an RAMC consulting surgeon explains that irregular, jagged shrapnel fragments travelled at high velocity, shattering bone and forcing filthy uniform wool and manure deep into the wound track. As an official medical report, it provides clinical evidence explaining why Western Front surgeons faced an unprecedented epidemic of gas gangrene and sepsis that could not be treated by standard antiseptics alone.</p>',
  }),
  getCat('med_l23_source_d', 'B'), // RAMC Surgical Report on Wound Infections in Flanders -> Block 2 Gas Gangrene
  getCat('med_l23_source_c', 'C'), // Clinical Radiograph Metallic Projectile in Cranium -> Block 3 Head Trauma
  getCat('med_l23_source_b', 'D'), // First Chlorine Gas Attack at Second Ypres 1915 -> Block 4 Chemical Warfare
  getCat('med_l23_source_e', 'E'), // Leishman Medical History of the War (Mustard Gas) -> Block 5 Mustard Gas
];

// Lesson 25: lesson_5_5 (Surgical Breakthroughs: Thomas Splint, Carrel-Dakin, X-Rays)
data.lessons[24].sources = [
  getCat('med_l25_source_a', 'A'), // Surgical Operating Theatre No. 23 CCS -> Block 1 Wound Debridement
  getCat('med_l25_source_d', 'B'), // Carrel-Dakin Paper on Wound Treatment 1916 -> Block 2 Carrel-Dakin
  getCat('med_l25_source_b', 'C'), // Sir Robert Jones Report on Thomas Splint 1917 -> Block 3 Thomas Splint
  getCat('med_l25_source_c', 'D'), // Marie Curie Mobile X-Ray Car -> Block 4 Mobile X-Rays
  getCat('med_l25_source_e', 'E'), // Memoir of British Army Surgeon at CCS No. 44 -> Block 5 Limits of X-Rays
];

// Lesson 26: lesson_5_6 (Blood Storage, Brain Surgery & Plastic Reconstruction)
data.lessons[25].sources = [
  createSource({
    // Block 1: Sodium Citrate Anticoagulation
    id: 'med_l26_source_anticoagulation',
    letter: 'A',
    type: 'written',
    title:
      'Dr. Richard Lewisohn, Clinical Report on the Use of Sodium Citrate in Blood Transfusion (1915)',
    text: 'The paramount obstacle in military blood transfusion has been rapid coagulation, which prevented the transfer of blood from donor to recipient without direct vein-to-vein suture. By adding a small, non-toxic dosage of sodium citrate (0.2%), coagulation is completely arrested for several hours. Blood can now be drawn into sterile flasks and transported directly to wounded soldiers suffering from catastrophic haemorrhage, eliminating the requirement for donor and patient to lie side by side.',
    caption:
      'Dr. Richard Lewisohn reporting the medical breakthrough of sodium citrate anticoagulation, allowing indirect blood transfusions on the battlefield in 1915.',
    provenance: 'Annals of Surgery, Vol. 62, New York, July 1915.',
    context:
      'In 1914–1915, doctors discovered that adding sodium citrate prevented blood from clotting, allowing blood to be collected in bottles and stored away from donors.',
    hinge_question:
      'How did sodium citrate solve the primary obstacle to frontline blood transfusions during the First World War?',
    enquiry_topic:
      'the medical breakthrough of sodium citrate anticoagulation in treating haemorrhagic shock on the battlefield',
    model_answer:
      '<p>Source A is highly useful because Dr. Lewisohn explains that adding 0.2% sodium citrate prevented blood from clotting, transforming blood transfusion from a dangerous direct vein-to-vein procedure into an indirect treatment using stored sterile flasks. As a clinical scientific paper, it explains the breakthrough that allowed military medics to treat acute haemorrhagic shock without requiring donor and recipient to lie together under artillery fire.</p>',
  }),
  createSource({
    // Block 2: Glucose Refrigeration & Extended Blood Storage
    id: 'med_l26_source_rous_turner',
    letter: 'B',
    type: 'written',
    title:
      'Dr. Francis Peyton Rous and Dr. Joseph Turner, Research on Preserving Human Blood Cells (1916)',
    text: 'While sodium citrate prevents immediate clotting, erythrocytes deteriorate rapidly unless provided with chemical nutrition. By combining sodium citrate with a dextrose (glucose) solution and maintaining the mixture in chilled containers, human red blood cells can be preserved in vitro for upwards of four weeks without haemolysis. Cells preserved in this citrate-dextrose medium remain viable and retain their full oxygen-carrying capacity when re-infused into an animal model.',
    caption:
      'Pioneering laboratory paper by Rous and Turner establishing that combining citrate with glucose and refrigeration kept blood viable for weeks in 1916.',
    provenance: 'Journal of Experimental Medicine, Vol. 23, Rockefeller Institute, New York, 1916.',
    context:
      'In 1916, Rous and Turner proved that adding glucose to citrated blood and chilling it allowed red blood cells to survive for up to 4 weeks, laying the scientific foundation for blood banks.',
    hinge_question:
      'Why was the addition of glucose crucial for extending the viable storage life of donated blood?',
    enquiry_topic:
      'the development of citrate-glucose solutions and refrigeration for the long-term preservation of blood cells',
    model_answer:
      '<p>Source B is highly useful because Rous and Turner prove that adding dextrose (glucose) and chilling blood prevented red blood cells from breaking down, allowing blood to be stored for up to four weeks without losing oxygen-carrying capacity. As a landmark laboratory study from the Rockefeller Institute, it explains the scientific mechanism that enabled Captain Oswald Robertson to establish the world’s first blood depot at Cambrai in 1917.</p>',
  }),
  getCat('med_l26_source_b', 'C'), // Capt Oswald Robertson Cambrai Blood Depot 1917 -> Block 3
  getCat('med_l26_source_d', 'D'), // Harvey Cushing Diary at CCS 46 -> Block 4
  getCat('med_l26_source_e', 'E'), // Harold Gillies Queen's Hospital Sidcup -> Block 5
];

// Ensure all 26 lessons have synchronized narrative blocks
data.lessons.forEach((lesson, lIdx) => {
  if (lesson.sources.length !== 5) {
    throw new Error(`Lesson ${lIdx + 1} does not have 5 sources!`);
  }
  lesson.narrative_blocks.forEach((block, bIdx) => {
    block.act = bIdx + 1;
    const src = lesson.sources[bIdx];
    src.letter = ['A', 'B', 'C', 'D', 'E'][bIdx];
    block.sources = [JSON.parse(JSON.stringify(src))];
  });
});

console.log(
  '✅ Realigned all 26 lessons of Edexcel Medicine with 1-to-1 narrative-to-source matching.',
);

const exportStr = `const edexcel_medicine_data = ${JSON.stringify(data, null, 2)};\n\nif (typeof window !== 'undefined') {\n  window.edexcel_medicine_data = edexcel_medicine_data;\n}\n\nif (typeof module !== 'undefined') {\n  module.exports = edexcel_medicine_data;\n}\n\nexport default edexcel_medicine_data;\n`;

fs.writeFileSync(dataFilePath, exportStr, 'utf8');
const publicDataFilePath = path.join(
  __dirname,
  '..',
  'public',
  'units',
  'edexcel_medicine',
  'data.js',
);
fs.writeFileSync(publicDataFilePath, exportStr, 'utf8');

console.log(
  '✅ Saved updated units/edexcel_medicine/data.js and public/units/edexcel_medicine/data.js',
);
