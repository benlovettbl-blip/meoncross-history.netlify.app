const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '../units/water_and_sanitation/data.js');
console.log('Loading:', dataPath);
const raw = require(dataPath);
const data = raw.default || raw;

console.log('Total lessons:', data.lessons.length);

// 1. Lesson 1
const l1 = data.lessons[0];
l1.banner = '/images/roman_bathhouse_cutaway.jpg';
l1.narrative_blocks[1].image = '/images/roman_aqueduct.jpg';
l1.narrative_blocks[3].image = '/units/water_and_sanitation/assets/was_roman_bathhouse.png';
l1.narrative_blocks[3].caption =
  "Roman Communal Latrine: Authentic excavated stone latrine benches and drainage channels at Housesteads Roman Fort (Vercovicium) on Hadrian's Wall, flushed continuously by wastewater.";
l1.narrative_blocks[3].image_alt =
  "Excavated Roman communal latrines at Housesteads Fort on Hadrian's Wall";

const s1E = l1.sources[4];
s1E.title =
  'Source E: Cupid on a Dolphin Mosaic from the Bath Suite at Fishbourne Roman Palace (Sussex, c.75–100 AD)';
s1E.caption =
  'Excavated polychrome mosaic floor uncovered in the private residential bathhouse suite of Fishbourne Roman Palace near Chichester, depicting Cupid astride a dolphin (Sussex Archaeological Society).';
s1E.question_badge = 'LOCAL ARCHAEOLOGICAL EVIDENCE';
s1E.question =
  'What does the presence of elaborate mosaic floors in the Fishbourne bath complex reveal about the spread of Roman luxury and bathing culture in Britain?';
s1E.model_answer =
  'Source E shows an intricate mosaic of Cupid on a dolphin, crafted for client king Cogidubnus. This demonstrates that following the AD 43 invasion, Romanised British elites adopted Mediterranean bathing culture and lavish architectural decoration to display their status and imperial allegiance.';
s1E.context =
  'Fishbourne Roman Palace was built shortly after the Roman invasion, likely for client king Tiberius Claudius Cogidubnus. It features one of the earliest and most elaborate private Roman bath suites discovered in Britain.';
s1E.hinge_question =
  'Why did wealthy Romanised elites invest fortunes in private luxury bath suites while ordinary Celtic Britons continued drawing water from outdoor wells?';
s1E.provenance_clues = {
  author: 'Excavation survey team recording in situ mosaics at Fishbourne Roman Palace.',
  audience: 'Archaeologists, historians, and visitors studying Roman Britain.',
  motive: 'Documenting high-status Mediterranean decorative art and bathing culture in Britannia.',
  hinge_question: s1E.hinge_question,
};
s1E.teacher_notes = {
  hinge_question: s1E.hinge_question,
  source_context: s1E.context + ' **Hinge Question:** ' + s1E.hinge_question,
  provenance_breakdown: {
    author: 'Excavation survey team recording in situ mosaics at Fishbourne Roman Palace.',
    audience: 'Archaeologists, historians, and visitors studying Roman Britain.',
    motive:
      'Documenting high-status Mediterranean decorative art and bathing culture in Britannia.',
  },
};
s1E.source_context = s1E.teacher_notes.source_context;

// 2. Lesson 3
const l3 = data.lessons[2];
l3.banner = '/images/plague_in_london_1665_wellcome.jpg';

// 3. Lesson 4
const l4 = data.lessons[3];
l4.banner = '/images/coalbrookdale_by_night.jpg';

const s4C = l4.sources[2];
s4C.title = "Source C: Gustave Doré, 'Over London by Rail' (London: A Pilgrimage, 1872)";
s4C.caption =
  'Wood engraving by Gustave Doré illustrating the labyrinth of back-to-back working-class housing, narrow walled yards, and dense smoke beneath a railway viaduct in industrial London (Wellcome Collection / British Museum).';
s4C.author = 'Gustave Doré & Blanchard Jerrold';
s4C.date = '1872';
s4C.question_badge = 'INDUSTRIAL OVERCROWDING & EPIDEMIC VULNERABILITY';
s4C.question =
  'What does Gustave Doré’s depiction of Victorian housing in Source C reveal about why infectious disease spread so rapidly in industrial towns?';
s4C.model_answer =
  'Source C illustrates hundreds of back-to-back brick tenements packed tightly together with tiny walled yards and almost no sunlight or ventilation. These cramped, unpaved conditions trapped sewage and coal smoke, creating an ideal environment for the rapid transmission of epidemic typhus and cholera.';
s4C.context =
  'During the 19th-century Industrial Revolution, millions of agricultural labourers migrated to industrial cities. Speculative builders constructed thousands of back-to-back houses without drainage, damp-proof courses, or municipal sewer connections.';
s4C.hinge_question =
  'Why were Victorian speculative landlords allowed to build back-to-back tenements with zero piped water, drainage, or ventilation?';
s4C.provenance_clues = {
  author: 'French artist Gustave Doré and British journalist Blanchard Jerrold.',
  audience: 'The Victorian reading public and parliamentary reformers.',
  motive:
    "Documenting the crushing physical reality of industrial London's working-class slums from a elevated railway vantage point.",
  hinge_question: s4C.hinge_question,
};
s4C.teacher_notes = {
  hinge_question: s4C.hinge_question,
  source_context: s4C.context + ' **Hinge Question:** ' + s4C.hinge_question,
  provenance_breakdown: {
    author: 'French artist Gustave Doré and British journalist Blanchard Jerrold.',
    audience: 'The Victorian reading public and parliamentary reformers.',
    motive:
      "Documenting the crushing physical reality of industrial London's working-class slums from a elevated railway vantage point.",
  },
};
s4C.source_context = s4C.teacher_notes.source_context;

const s4E = l4.sources[4];
s4E.src = '';
s4E.image = '';
s4E.type = 'written';

// 4. Lesson 5
const l5 = data.lessons[4];
l5.banner = '/units/water_and_sanitation/assets/was_cathedral_sanitation.png';

// 5. Lesson 6
const l6 = data.lessons[5];
l6.banner = '/images/pasteur_laboratory.jpg';
l6.narrative_blocks[1].image = '/images/snow_mode_of_communication_title_1855.jpg';
l6.narrative_blocks[1].caption =
  "Dr John Snow's Treatise (1855): The title page of his expanded study presenting forensic data from the Broad Street pump and the Southwark & Vauxhall water company investigation.";
l6.narrative_blocks[1].image_alt =
  "Title page of John Snow's 1855 treatise On the Mode of Communication of Cholera";

l6.narrative_blocks[4].image = '/images/robert_koch_laboratory.jpg';
l6.narrative_blocks[4].caption =
  'Bacteriological Revolution: Dr Robert Koch at work in his Berlin laboratory, where he perfected solid agar culture mediums and discovered the cholera bacterium Vibrio cholerae in 1884.';
l6.narrative_blocks[4].image_alt =
  'Dr Robert Koch working in his bacteriological laboratory with microscope and cultures';

// 6. Lesson 7
const l7 = data.lessons[6];
l7.banner = '/images/water_local_eastney_opt.jpg';
delete l7.narrative_blocks[0].image;
delete l7.narrative_blocks[0].caption;
delete l7.narrative_blocks[0].image_alt;

l7.sources[4] = {
  id: 'water_l7_src_e',
  letter: 'E',
  type: 'written',
  src: '',
  image: '',
  title:
    'Source E: The Public Health Act 1875 (38 & 39 Vict. c. 55): Compulsory Municipal Sanitary Provision',
  caption:
    'Extract from the landmark 1875 Public Health Act which abolished laissez-faire and made clean water supply and sewer construction compulsory for every local council in Britain (The National Archives / UK Statute Law).',
  author: 'British Parliament under Prime Minister Benjamin Disraeli',
  date: '1875',
  content:
    'Every urban authority shall provide and keep in their waterworks a supply of pure and wholesome water, and where any house within their district is without a proper supply of water the local authority shall require the owner to obtain such supply... and it shall be the duty of every local authority to cause to be made such sewers as may be necessary for effectually draining their district for the purposes of this Act... and every local authority shall from time to time appoint a fit and proper person to be Medical Officer of Health.',
  question_badge: 'COMPULSORY MUNICIPAL PROVISION & THE 1875 ACT',
  question:
    "Why was the 1875 Public Health Act far more effective than earlier health legislation in transforming Britain's towns?",
  model_answer:
    'The 1875 Act made public health duties strictly compulsory rather than optional. For the first time, every local authority across Britain was legally compelled to supply pure water, build covered sewers, and appoint a qualified Medical Officer of Health, ending decades of ratepayer evasion.',
  context:
    "Passed by Disraeli's government under the slogan 'Sanitas sanitatum', the 1875 Act was the turning point in British public health, completely replacing laissez-faire with enforceable state duties.",
  hinge_question:
    'Looking across the entire 19th century, which factor was most decisive in transforming public health: science, engineering, or government laws?',
  provenance_clues: {
    author: 'British Parliament under Prime Minister Benjamin Disraeli.',
    audience: 'Municipal corporations, town councils, and local sanitary authorities nationwide.',
    motive:
      'Establishing a universal, compulsory statutory framework for sanitation and clean water across Britain.',
    hinge_question:
      'Looking across the entire 19th century, which factor was most decisive in transforming public health: science, engineering, or government laws?',
  },
  teacher_notes: {
    hinge_question:
      'Looking across the entire 19th century, which factor was most decisive in transforming public health: science, engineering, or government laws?',
    source_context:
      "Passed by Disraeli's government, the 1875 Act was the turning point in British public health, completely replacing laissez-faire with enforceable state duties. **Hinge Question:** Looking across the entire 19th century, which factor was most decisive in transforming public health: science, engineering, or government laws?",
    provenance_breakdown: {
      author: 'British Parliament under Prime Minister Benjamin Disraeli.',
      audience: 'Municipal corporations, town councils, and local sanitary authorities nationwide.',
      motive:
        'Establishing a universal, compulsory statutory framework for sanitation and clean water across Britain.',
    },
  },
  source_context:
    "Passed by Disraeli's government, the 1875 Act was the turning point in British public health, completely replacing laissez-faire with enforceable state duties. **Hinge Question:** Looking across the entire 19th century, which factor was most decisive in transforming public health: science, engineering, or government laws?",
};

// 7. Harmonize all block sources to match canonical lesson.sources[i]
data.lessons.forEach((l, lIdx) => {
  const blocks = l.narrative_blocks || l.blocks || [];
  blocks.forEach((b, bIdx) => {
    if (l.sources && l.sources[bIdx]) {
      b.sources = [JSON.parse(JSON.stringify(l.sources[bIdx]))];
      b.source = JSON.parse(JSON.stringify(l.sources[bIdx]));
    }
  });
});

console.log('Writing updated data.js...');
const outContent = `const water_and_sanitation_data = ${JSON.stringify(data, null, 2)};

if (typeof window !== 'undefined') window.water_and_sanitation_data = water_and_sanitation_data;
if (typeof module !== 'undefined') module.exports = water_and_sanitation_data;
export default water_and_sanitation_data;
`;

fs.writeFileSync(dataPath, outContent, 'utf8');
console.log('✅ Successfully updated units/water_and_sanitation/data.js');
