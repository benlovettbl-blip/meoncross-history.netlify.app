/**
 * scripts/fix_medicine_kt3_kt4_cloze_parity.cjs
 *
 * Synchronizes cloze texts and vocab brackets for KT3 (L11-L15) and KT4 (L16-L20)
 * in Edexcel Medicine Through Time so that 100% of cloze brackets match canonical vocab.
 */

const fs = require('fs');
const path = require('path');

const KT3_KT4_CLOZE_UPDATES = {
  lesson_3_1:
    'For centuries, physicians believed in [Spontaneous Generation], assuming that decaying organic matter created microbes out of nothing. In 1861, French chemist Louis Pasteur published his groundbreaking [Germ Theory (1861)], using swan-neck flasks to prove that airborne microbes caused decay. However, British doctors resisted because Pasteur was a chemist. The deadlock was broken by German physician Robert Koch, who grew pure bacterial cultures on [Agar Jelly] and stained microbes with synthetic [Aniline Dyes]. In 1882, Koch published [Koch’s Postulates (1882)], establishing four scientific rules to prove that specific microbes caused specific diseases.',

  lesson_3_2:
    'In the eighteenth century, wealthy Britons paid for dangerous [Inoculation (Variolation)], which used active smallpox pus and risked starting lethal epidemics. In 1796, Gloucestershire doctor Edward Jenner pioneered safe [Vaccination] using benign [Cowpox (Vaccinia)] taken from milkmaid Sarah Nelmes. Jenner tested his theory on eight-year-old James Phipps, proving he was immune. Parliament granted Jenner £30,000, and the [1852 Compulsory Act] made infant vaccination mandatory. Despite opposition from the [Anti-Vaccination League], Jenner had created the first scientific preventative vaccine in world history.',

  lesson_3_3:
    'In the early nineteenth century, hospitals were lethal centers of [Hospitalism], where patients caught deadly infections from unwashed bedding and doctors’ hands. In 1854, during the Crimean War, Florence Nightingale led 38 nurses to [Scutari Barrack Hospital], cutting the death rate from 42% to 2% through strict hygiene. In 1858, she invented the [Coxcomb (Polar Area Chart)] to prove to Queen Victoria that filth caused more deaths than battle. She redesigned hospitals using the [Pavilion Hospital Plan] with large facing windows, and established the [Nightingale Training School (1860)] at St Thomas’ Hospital to professionalize nursing.',

  lesson_3_4:
    'Before the 1840s, surgery was paralyzed by pain, bleeding, and infection. In 1847, Edinburgh doctor James Simpson discovered [Chloroform (1847)], which conquered pain but sparked the [The "Black Period" of Surgery], during which infection deaths skyrocketed because surgeons operated deeper with dirty hands. In 1865, Glasgow surgeon Joseph Lister pioneered [Antiseptic Surgery], applying carbolic acid to James Greenlees’ compound fracture. Lister cut mortality from 45% to 15%. By the 1890s, medicine transitioned to [Aseptic Surgery], using high-pressure steam [Autoclave (1881)] chambers, sterile gowns, and rubber gloves.',

  lesson_3_5:
    'During the nineteenth century, British cities suffered lethal epidemics of water-borne [Cholera]. The government maintained a strict [Laissez-faire] policy, refusing to fund public sewers. In 1854, John Snow mapped deaths in Soho and proved the [Broad Street Pump (1854)] was contaminated by a leaking cesspool. Although the Board of Health rejected his findings, the [The Great Stink (1858)] forced Parliament to build London’s intercepting sewers. Finally, the compulsory [1875 Public Health Act] forced all local councils to provide clean water and drainage, wiping out cholera from Britain.',

  lesson_4_1:
    'For centuries, doctors were baffled by hereditary illnesses that passed down family lines without bacterial infection. In 1952, Rosalind Franklin used [X-ray Crystallography] to create Photograph 51, proving that [DNA (Deoxyribonucleic Acid)] formed a double helix. In 1953, James Watson and Francis Crick built their famous model, discovering the rule of complementary [Base Pairing] (A-T, C-G). Between 1990 and 2003, the [Human Genome Project] sequenced all 3 billion chemical base pairs, allowing modern geneticists to identify specific mutations causing [Hereditary Disease] like cystic fibrosis and breast cancer.',

  lesson_4_2:
    'In the 20th century, Britain experienced an [Epidemiological Transition] as clean water and antibiotics conquered infectious plagues, replacing them with chronic lifestyle illnesses like heart disease and cancer. In 1895, Wilhelm Röntgen discovered [X-ray], enabling doctors to see fractures inside living limbs. In 1971, British engineer Godfrey Hounsfield invented the [CT Scanner (Computed Tomography)], using rotating radiation beams and computers to produce 3D cross-sectional slices of soft tissue. Later, [MRI (Magnetic Resonance Imaging)] used magnetic fields to scan organs safely without radiation, while flexible [Endoscope] allowed doctors to view internal organs directly.',

  lesson_4_3:
    'In the early 1900s, Paul Ehrlich sought a [Magic Bullet] that could destroy specific bacteria without harming patient cells. In 1909, Sahachiro Hata tested hundreds of arsenic compounds to discover [Salvarsan 606], which cured syphilis. In 1932, Gerhard Domagk discovered [Prontosil], curing streptococcal infections. While science produced drugs, healthcare remained private until the 1942 [Beveridge Report] called for a war on Disease. On 5 July 1948, Minister of Health Aneurin Bevan overcame doctor opposition to launch the [National Health Service (NHS)], offering free healthcare funded by taxation to all citizens.',

  lesson_4_4:
    'In September 1928, Alexander Fleming accidentally discovered that a spore of Penicillium notatum had landed on his staphylococcus plate, creating [Penicillin]. Fleming recognized it as a revolutionary [Antibiotic], but could not chemically isolate it. In 1938, Howard Florey and Ernst Chain assembled a team at Oxford, using [Freeze-Drying] to purify the unstable substance. After proving it cured mice in 1940, they tested it on police constable Albert Alexander in 1941. In July 1941, Florey flew to the United States, where factories used corn steep liquor and [Deep-Tank Fermentation] to manufacture 2.3 million doses in time for the D-Day landings in June 1944. Today, modern doctors face the growing danger of [Antibiotic Resistance].',

  lesson_4_5:
    'In 1950, Richard Doll and Austin Bradford Hill used [Epidemiology] to prove that cigarette smoking caused lung [Carcinoma]. Doctors face severe diagnostic challenges because lung tumors grow silently; today, specialists use low-dose CT scans and [Bronchoscopy] to inspect bronchial tubes and take biopsies. In treating cancer, oncologists combine robotic surgery, radiotherapy, chemotherapy, and revolutionary [Immunotherapy], which trains the patient’s immune system to attack cancer. Simultaneously, government intervention ended laissez-faire through the 2007 ban on smoking in public places and the 2016 compulsory [Plain Packaging] law.',
};

function fixMedicineCloze() {
  console.log('📦 Synchronizing Medicine KT3 & KT4 Cloze texts...');

  const targetFiles = [
    path.join(__dirname, '..', 'public', 'data', 'edexcel_medicine.json'),
    path.join(__dirname, '..', 'data', 'edexcel_medicine.json'),
  ];

  targetFiles.forEach((fp) => {
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      const lessons = data.data?.lessons || data.lessons || [];

      lessons.forEach((l) => {
        if (KT3_KT4_CLOZE_UPDATES[l.id]) {
          l.vocab_cloze_text = KT3_KT4_CLOZE_UPDATES[l.id];
        }
      });

      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✔ Updated cloze texts in ${fp}`);
    }
  });

  // Also update units/edexcel_medicine/data.js
  const unitJs = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
  if (fs.existsSync(unitJs)) {
    try {
      const pubData = JSON.parse(fs.readFileSync(targetFiles[0], 'utf8'));
      const unitObj = pubData.data || pubData;
      const jsContent = `export default ${JSON.stringify(unitObj, null, 2)};\n`;
      fs.writeFileSync(unitJs, jsContent, 'utf8');
      console.log(`  ✔ Synchronized units/edexcel_medicine/data.js`);
    } catch (err) {
      console.warn(`  ⚠️ Could not update units/edexcel_medicine/data.js: ${err.message}`);
    }
  }

  console.log(`✅ Medicine Through Time: Synchronized KT3 & KT4 cloze texts.`);
}

if (require.main === module) {
  fixMedicineCloze();
}

module.exports = { fixMedicineCloze, KT3_KT4_CLOZE_UPDATES };
