/**
 * scripts/refactor_medicine_essays.cjs
 *
 * 1. Creates a backup of units/edexcel_medicine/data.js in temp_backups/
 * 2. Strips historians_corner across all 18 Medicine lessons.
 * 3. Injects standardized 2x2 16-mark essay planning boxes on core Section B lessons:
 *    - Lesson 1 (lesson_1_1): Medieval Church & Causes
 *    - Lesson 3 (lesson_1_3): Medieval Treatments & Black Death
 *    - Lesson 5 (lesson_2_2): Renaissance Treatments & Progress
 *    - Lesson 6 (lesson_2_3): Great Plague (1665) Quarantine
 *    - Lesson 7 (lesson_3_1): Germ Theory & Koch
 *    - Lesson 8 (lesson_3_2): 19th-C Surgery (Antiseptics & Anesthetics)
 *    - Lesson 9 (lesson_3_3): 19th-C Public Health (Government Action)
 *    - Lesson 10 (lesson_4_1): 20th-C Causes (DNA & Genetics)
 *    - Lesson 12 (lesson_4_3): Modern Treatments (Penicillin)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'data.js');
const backupDir = path.join(ROOT_DIR, 'temp_backups');

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// 1. Create timestamped backup
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `edexcel_medicine_data_${timestamp}.js`);
fs.copyFileSync(dataJsPath, backupPath);
console.log(`✅ Backup created at: ${backupPath}`);

// 2. Planning Matrices Definition
const ESSAY_PLANS = {
  lesson_1_1: {
    statement:
      "'The Church was the main reason why there was little change in ideas about the cause of disease in the period c1250–c1500.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['The role of the Church', 'Galen'],
    supporting_factors: [
      "The Catholic Church held an absolute monopoly over education, universities, and the copying of medical manuscripts, actively enforcing Galen's anatomical and humoural writings as infallible Christian dogma.",
      'Illness was taught to be sent directly by God as divine punishment for sin or a test of faith, meaning that seeking natural scientific causes or questioning classical authority was condemned as sinful heresy.',
    ],
    counter_factors: [
      "The logical internal coherence of Hippocrates' Theory of the Four Humours and Galen's Theory of Opposites (treatments seemed to match observable symptoms like sweating during fever or sneezing phlegm).",
      'A total lack of scientific instruments and technology: without microscopes, it was physically impossible for medieval people to discover microscopic bacteria, making miasma and humours the only rational explanations.',
    ],
    criteria_prompt:
      "Weigh the relative importance: Was the Catholic Church's theological authority the active institutional cause of stagnation, or was the absence of scientific technology and alternative empirical proof the fundamental limiting factor?",
  },
  lesson_1_3: {
    statement:
      "'The main reason why medical care and treatment was ineffective during the medieval period (c1250–c1500) was because medical knowledge was based on Galen's ideas.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['The Four Humours', 'The Black Death'],
    supporting_factors: [
      "Galen's flawed humoural physiology and Theory of Opposites led directly to physically harmful clinical treatments like severe bloodletting (phlebotomy) and purging, which severely weakened infected patients.",
      "Medical education strictly required physicians to memorise Galen's texts rather than conduct practical research; treatments targeted humoural symptoms (e.g. cold cucumbers for fever) rather than underlying infections.",
    ],
    counter_factors: [
      'Pervasive supernatural and religious beliefs during crises like the Black Death (1348), where populations relied on public flagellation, prayer, and pilgrimages that actively accelerated contagion rather than containing it.',
      'Monastic hospitals (over 1,100 in England by 1500) were run by monks and nuns to provide hospitality and spiritual care for the soul rather than physical medical cures, strictly excluding infectious victims.',
    ],
    criteria_prompt:
      "Weigh the relative importance: Did Galen's flawed anatomical models cause treatment failures, or did religious doctrine prioritizing spiritual salvation over biological cure prevent effective healthcare?",
  },
  lesson_2_2: {
    statement:
      "'There was rapid progress in medical treatments in the Renaissance period (c1500–c1700).' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['Andreas Vesalius', 'Bleeding and purging'],
    supporting_factors: [
      'The emergence of iatrochemistry (chemical medicine) pioneered by Paracelsus, introducing mineral remedies like antimony and mercury to treat specific internal diseases.',
      'Global trade and exploration brought new botanical remedies from the Americas, notably cinchona bark (quinine) for treating malaria and opium (laudanum) for effective pain relief.',
    ],
    counter_factors: [
      'Everyday clinical treatments remained overwhelmingly traditional; ordinary patients and conservative physicians continued to rely on bleeding, purging, and humoural balancing because Galen remained trusted.',
      "Major anatomical breakthroughs by Vesalius (1543) and William Harvey (1628) disproved Galen's structure, but had zero practical impact on developing cures or improving surgical outcomes for living patients.",
    ],
    criteria_prompt:
      'Weigh the relative importance: Did new chemical and herbal remedies mark genuine clinical progress, or did everyday medical practice remain stagnant in traditional Galenic treatments until the 19th-century Germ Theory?',
  },
  lesson_2_3: {
    statement:
      "'The most effective method of preventing the spread of the Great Plague (1665) was the use of quarantine.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['Watchmen', "The Mayor of London's Orders"],
    supporting_factors: [
      "The Mayor of London strictly enforced 28-day household quarantines: infected homes were locked and boarded up, marked with red crosses and 'Lord have mercy upon us', and guarded night and day by parish watchmen.",
      'Civic authorities banned public assemblies, closed theaters and markets, buried plague victims at night in mass pits outside city walls, and established isolated pesthouses for sufferers.',
    ],
    counter_factors: [
      'Quarantine was deeply flawed and often counterproductive: locking healthy relatives inside with dying victims increased household infection rates, and thousands of infected citizens escaped London to rural villages like Eyam.',
      'Preventative policies were completely undermined by scientific ignorance of fleas: authorities blamed miasma and ordered the slaughter of 40,000 dogs and 200,000 cats, allowing flea-carrying black rats to multiply unchecked.',
    ],
    criteria_prompt:
      'Weigh the relative importance: Did organized civic quarantine slow the spread between communities, or was urban containment doomed to fail because authorities did not understand the rat-flea vector?',
  },
  lesson_3_1: {
    statement:
      "'Louis Pasteur's publication of the Germ Theory was the biggest turning point in understanding the causes of disease in the period c1700–c1900.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['Spontaneous Generation', 'Robert Koch'],
    supporting_factors: [
      'Pasteur definitively disproved the centuries-old theory of Spontaneous Generation and miasma in 1861, proving via swan-neck flasks that microscopic airborne pathogens caused decay and biological infection.',
      "Germ Theory provided the foundational scientific principle that transformed medicine, directly inspiring Joseph Lister's antiseptic surgery and compelling governments to construct clean water and sewage systems.",
    ],
    counter_factors: [
      'Pasteur was an industrial chemist whose early work focused on beer, wine, and silkworms; he could not isolate the specific bacteria causing specific human diseases, meaning his theory initially had limited diagnostic value.',
      'Robert Koch was the decisive practical turning point: he invented solid agar jelly culture, chemical aniline dyes, and photomicrography, systematically isolating the specific pathogens for anthrax (1876), tuberculosis (1882), and cholera (1883).',
    ],
    criteria_prompt:
      "Weigh the relative importance: Was Pasteur's initial theoretical breakthrough the paramount turning point, or was Koch's practical methodology for identifying specific human microbes more transformative?",
  },
  lesson_3_2: {
    statement:
      "'The discovery of Carbolic Acid was the most significant turning point in surgery in the years c1700–c1900.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['Joseph Lister', 'James Simpson'],
    supporting_factors: [
      "Joseph Lister's introduction of carbolic acid spray (1865) directly overcame the deadly barrier of infection (sepsis and gangrene), reducing surgical mortality in his Glasgow ward from 46% to 15%.",
      "Lister directly linked Pasteur's Germ Theory to operating theatres, paving the way for late-Victorian aseptic surgery (sterilizing instruments with steam autoclaves, sterile gowns, and rubber gloves).",
    ],
    counter_factors: [
      "James Simpson's discovery of chloroform anesthesia in 1847 was the essential prerequisite: by eliminating the barrier of agonizing pain, it allowed surgeons to operate calmly and attempt complex internal operations.",
      "Early carbolic acid was unpopular and fiercely resisted: it irritated surgeons' skin, and during the 'Black Period' of surgery (1840s–1860s), deeper surgeries under anesthesia without antiseptics had caused infection rates to skyrocket.",
    ],
    criteria_prompt:
      'Weigh the relative importance: Was overcoming the barrier of infection with carbolic acid more decisive for patient survival than conquering the barrier of surgical pain with chloroform?',
  },
  lesson_3_3: {
    statement:
      "'Government action was the main reason for improvements in public health in the second half of the nineteenth century.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['The 1875 Public Health Act', 'John Snow'],
    supporting_factors: [
      'The government abandoned laissez-faire in favor of state intervention: the landmark **1875 Public Health Act** made sanitary regulations compulsory, requiring councils to provide clean water, collect refuse, and appoint medical officers.',
      "Parliament funded and authorized massive infrastructure: Joseph Bazalgette's 82-mile London sewer network (1858–1875) following the Great Stink transported 420 million gallons of sewage daily, permanently ending London cholera.",
    ],
    counter_factors: [
      "Scientific breakthrough was the underlying catalyst: John Snow's 1854 Broad Street cholera investigation and Pasteur's 1861 Germ Theory provided the undeniable empirical proof that forced reluctant politicians to legislate.",
      "The expansion of political democracy drove reform: the 1867 Second Reform Act gave working-class urban men the vote, compelling rival political parties (Disraeli's Conservatives) to deliver tangible public health reforms.",
    ],
    criteria_prompt:
      'Weigh the relative importance: Was compulsory government legislation the decisive primary cause of public health reform, or was legislation merely the administrative response to scientific proof and democratic voter pressure?',
  },
  lesson_4_1: {
    statement:
      "'The discovery of DNA was the most significant breakthrough in understanding the causes of illness in the 20th century.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['Watson and Crick', 'Lifestyle factors'],
    supporting_factors: [
      "Watson and Crick's 1953 discovery of the double-helix DNA structure (using Rosalind Franklin's X-ray crystallography) unlocked the fundamental genetic code governing human biology.",
      'The Human Genome Project (completed 2003) enabled scientists to map all 20,000–25,000 human genes, pinpointing hereditary causes for over 4,000 genetic conditions including cystic fibrosis and breast cancer (BRCA1/2).',
    ],
    counter_factors: [
      "Epidemiological research into **lifestyle factors** had a far more immediate impact on public health: Doll and Hill's 1950 study proved the causal link between smoking and lung cancer, alongside dietary and alcohol health links.",
      'Advanced physical diagnostic imaging technology (X-rays from 1895, ultrasound from the 1950s, CT scans from the 1970s, and MRI from the 1980s) allowed doctors to detect internal tumors and organ failure without genetic analysis.',
    ],
    criteria_prompt:
      'Weigh the relative importance: Did the discovery of DNA provide the supreme theoretical breakthrough in etiology, or did lifestyle epidemiology and diagnostic scanning technology deliver greater practical impact for patients?',
  },
  lesson_4_3: {
    statement:
      "'Alexander Fleming was the most important individual in the development of penicillin.' How far do you agree? Explain your answer.",
    marks: '16 marks + 4 marks for SPaG',
    stimulus: ['Howard Florey and Ernst Chain', 'The Second World War'],
    supporting_factors: [
      'Alexander Fleming made the initial serendipitous breakthrough in 1928, recognizing that *Penicillium notatum* mould produced an antibacterial substance that dissolved *Staphylococcus* bacteria.',
      'Fleming published his findings in the *British Journal of Experimental Pathology* (1929); without his keen observation of the contaminated petri dish, penicillin would never have been discovered.',
    ],
    counter_factors: [
      "Fleming failed to chemically purify penicillin and abandoned research in 1931; Howard Florey and Ernst Chain's Oxford team revived the work in 1938, developing purification techniques and proving efficacy on mice (1940) and human patient Albert Alexander (1941).",
      'The US government and American pharmaceutical corporations provided millions in funding during WWII, utilizing deep-tank corn-steep liquor fermentation to mass-produce 2.3 million doses by D-Day (June 1944), transforming mortality rates.',
    ],
    criteria_prompt:
      "Weigh the relative importance: Was Fleming's original accidental observation the paramount contribution, or did Florey and Chain's scientific purification and wartime industrial mass-production matter more for clinical survival?",
  },
};

async function execute() {
  const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
  const imported = await import(fileUrl);
  const unitData = imported.unitData;

  let strippedCount = 0;
  let plannedCount = 0;

  unitData.lessons.forEach((lesson) => {
    if (lesson.historians_corner) {
      delete lesson.historians_corner;
      strippedCount++;
    }

    if (ESSAY_PLANS[lesson.id]) {
      lesson.essay_planning = ESSAY_PLANS[lesson.id];
      plannedCount++;
    } else {
      delete lesson.essay_planning;
    }
  });

  console.log(`🧹 Stripped historians_corner from ${strippedCount} lessons.`);
  console.log(`📊 Injected 2x2 essay_planning into ${plannedCount} 16-mark essay lessons.`);

  const outputCode = `export const unitData = ${JSON.stringify(unitData, null, 2)};\n`;
  fs.writeFileSync(dataJsPath, outputCode, 'utf8');
  console.log(`💾 Successfully updated ${dataJsPath}`);
}

execute().catch((err) => {
  console.error('❌ Refactor failed:', err);
  process.exit(1);
});
