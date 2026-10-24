const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA_JS_PATH = path.join(__dirname, '..', 'units', 'edexcel_medicine', 'data.js');
const PUBLIC_JSON_PATH = path.join(__dirname, '..', 'public', 'data', 'edexcel_medicine.json');

const KT1_UPDATES = {
  lesson_1_1: {
    hook_text:
      'In medieval England, disease was never merely a malfunction of the physical body—it was a manifestation of divine will. The Roman Catholic Church dominated every aspect of intellectual and spiritual life, controlling university curricula, libraries, and the monastic scriptoria where hand-copied medical manuscripts were rigorously vetted for theological orthodoxy. Sickness was widely understood as divine retribution for human sin, a test of faith, or the corrupting touch of demonic forces. Even the movements of planets and stars were interpreted through a Christian lens, with doctors consulting astrological almanacs before daring to touch a patient. Questioning accepted medical doctrine was not treated as scientific debate, but as dangerous heresy. Why did the medieval Church fight so fiercely to preserve ancient pagan medicine alongside Christian dogma?',
    learning_objectives: [
      'Explain how the medieval Catholic Church used monastic scriptoria, education, and censorship to control medical ideas.',
      'Analyze supernatural and religious explanations of disease, including divine punishment, original sin, and astrological alignments.',
      'Evaluate medieval religious responses to sickness: saintly relics, holy pilgrimages, and penitential prayer.',
    ],
  },
  lesson_1_2: {
    hook_text:
      'Alongside deep religious faith, medieval physicians inherited a powerful rational framework from the ancient Mediterranean: the natural medicine of Hippocrates and Galen. At its core was the Theory of the Four Humours—blood, phlegm, yellow bile, and black bile—fluids whose delicate balance determined not only physical health, but human personality and temperament. Galen expanded this into the Theory of Opposites, giving university-trained doctors a systematic logic for prescribing diets and remedies to counteract bodily excess. Armed with glass matula flasks to scrutinize urine charts and vigilant against the noxious stench of poisonous miasmas, medieval practitioners believed they possessed a complete, unshakeable science of the human body. Why was this logical, elegant system so fiercely defended for centuries despite failing to cure epidemic disease?',
    learning_objectives: [
      'Explain how Hippocrates and Galen established natural, rational explanations for disease through clinical observation.',
      'Analyze the Theory of the Four Humours and Galen’s Theory of Opposites as systems for diagnosing and treating illness.',
      'Assess the diagnostic use of uroscopy (matula flask) and evaluate the role of miasma theory in medieval epidemiology.',
    ],
  },
  lesson_1_3: {
    hook_text:
      'To survive illness in medieval England, a patient entered a world where spiritual penance and violent physical intervention went hand in hand. If an affliction was sent by God, the first line of defense was prayer, fasting, pilgrimages to holy shrines, or self-flagellation to earn divine mercy. Yet physicians and barber-surgeons also intervened directly in the flesh: draining veins through phlebotomy, applying blood-sucking leeches, and administering violent herbal emetics or pewter clysters to purge corrupt humours from the digestive tract. The wealthy protected themselves with bespoke lifestyle regimens (the Regimen Sanitatis) and complex apothecary electuaries like Theriac, boasting dozens of exotic ingredients. Why did ordinary people eagerly submit to excruciating treatments that frequently weakened the body rather than healing it?',
    learning_objectives: [
      'Explain why religious rituals (prayer, fasting, pilgrimages, flagellation) were prioritized for spiritual healing.',
      'Analyze humoral treatments of bloodletting (phlebotomy) and digestive purging (emetics, laxatives, clysters).',
      'Evaluate the role of herbal apothecary remedies (Theriac) and preventive lifestyle rules in the Regimen Sanitatis.',
    ],
  },
  lesson_1_4: {
    hook_text:
      "Medieval healthcare was defined by a rigid social hierarchy where class, wealth, and religion dictated who treated your body. At the summit sat university-trained physicians—elite Latin scholars who charged astronomical fees, examined urine charts, and debated ancient texts, but strictly refused to perform manual surgery or touch blood. Below them worked guild apothecaries mixing herbal compounds and barber-surgeons wielding razors, saws, and cautery irons to amputate limbs and pull teeth without pain relief. Yet the vast majority of ordinary peasants never saw a doctor; their health rested entirely on the herbal wisdom of local women and household mothers. When poor travelers fell destitute, over 1,200 monastic hospitals offered warmth, food, and prayer, but strictly enforced a rule of 'care not cure'. Why did medieval hospitals deliberately bar the sickest, most contagious patients from their doors?",
    learning_objectives: [
      'Compare the training, status, and treatments of university physicians, guild apothecaries, and barber-surgeons.',
      "Analyze why medieval monastic hospitals prioritized spiritual 'care not cure' and barred contagious patients.",
      'Evaluate the crucial role of domestic healthcare, herbal traditions, and female healers in ordinary households.',
    ],
  },
  lesson_1_5: {
    hook_text:
      'In June 1348, a merchant cog from Gascony docked at the Dorset port of Melcombe Regis, carrying a cargo far deadlier than wine: the Black Death. Within months, the epidemic swept across England with terrifying speed, extinguishing between a third and a half of the entire population. Victims suffered excruciating egg-sized buboes in the armpits and groin before spitting black blood in lethal pneumonic agonies. Faced with an apocalypse, contemporary medicine collapsed into panic: doctors lanced swellings with red-hot irons, strapped live chickens to open sores, or prescribed drinking crushed emeralds. Civic authorities banned street muck and King Edward III ordered London’s aldermen to clean the gutters to disperse corrupt miasma, but the dying continued unabated. How did the catastrophic demographic collapse of 1348 permanently shatter the feudal foundations of medieval society?',
    learning_objectives: [
      'Explain the arrival and transmission of the Black Death (1348–49) and distinguish between bubonic and pneumonic plague.',
      'Analyze medieval attempts to treat and prevent the plague, including humoral remedies, miasma measures, and Edward III’s 1349 order.',
      'Evaluate the devastating demographic, social, and economic consequences of the Black Death across medieval England.',
    ],
  },
};

const KT5_SPEC_ANCHORS = {
  lesson_5_1:
    'The British sector of the Western Front, 1914–18: the context of the British sector and the theatre of war in Flanders and northern France; the Ypres Salient, the Somme, Arras and Cambrai.',
  lesson_5_2:
    'The trench system: construction and communication; conditions requiring medical treatment: terrain, weather, trench foot, trench fever, shell shock.',
  lesson_5_3:
    'The nature of wounds: rifles, high explosive shells, shrapnel; wound contamination by soil and bacteria (gas gangrene); effects of chlorine, phosgene and mustard gas.',
  lesson_5_4:
    'The work of the RAMC and FANY; the system of transport and stages in the chain of evacuation: RAP, Dressing Stations, Casualty Clearing Stations (CCS), Base Hospitals; ambulances, trains and barges.',
  lesson_5_5:
    'The significance of the Western Front for developments in surgery and medicine: wound excision/debridement, the Carrel-Dakin method, the Thomas splint, mobile X-ray units.',
  lesson_5_6:
    "The use of blood transfusions: blood storage at Cambrai (1917, Oswald Robertson); brain surgery (Harvey Cushing); plastic reconstruction (Harold Gillies at Queen's Hospital, Sidcup).",
};

function applyUpdatesToLessons(lessons) {
  let modifiedCount = 0;
  lessons.forEach((l) => {
    // 1. KT1 updates
    if (KT1_UPDATES[l.id]) {
      const update = KT1_UPDATES[l.id];
      if (!l.hook_text || l.hook_text !== update.hook_text) {
        l.hook_text = update.hook_text;
        modifiedCount++;
      }
      if (
        !l.learning_objectives ||
        JSON.stringify(l.learning_objectives) !== JSON.stringify(update.learning_objectives)
      ) {
        l.learning_objectives = update.learning_objectives;
        modifiedCount++;
      }
    }

    // 2. KT5 updates
    if (KT5_SPEC_ANCHORS[l.id]) {
      const spec = KT5_SPEC_ANCHORS[l.id];
      if (!l.specification_anchor || l.specification_anchor !== spec) {
        l.specification_anchor = spec;
        modifiedCount++;
      }
    }
  });
  return modifiedCount;
}

// ==========================================
// 1. Update units/edexcel_medicine/data.js
// ==========================================
console.log('Reading units/edexcel_medicine/data.js...');
let rawJs = fs.readFileSync(DATA_JS_PATH, 'utf8').trim();
if (!rawJs.startsWith('export default ')) {
  throw new Error('Unexpected format in data.js: does not start with "export default "');
}
let jsonStr = rawJs.slice('export default '.length).trim();
if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();

const unitData = JSON.parse(jsonStr);
console.log(`Loaded ${unitData.lessons.length} lessons from data.js.`);

const modsDataJs = applyUpdatesToLessons(unitData.lessons);
console.log(`Applied ${modsDataJs} updates to data.js lessons.`);

const newJsContent = 'export default ' + JSON.stringify(unitData, null, 2) + ';\n';
fs.writeFileSync(DATA_JS_PATH, newJsContent, 'utf8');
console.log('✅ Successfully wrote updated units/edexcel_medicine/data.js');

// ==========================================
// 2. Update public/data/edexcel_medicine.json
// ==========================================
if (fs.existsSync(PUBLIC_JSON_PATH)) {
  console.log('Reading public/data/edexcel_medicine.json...');
  const pubData = JSON.parse(fs.readFileSync(PUBLIC_JSON_PATH, 'utf8'));
  if (pubData.data && Array.isArray(pubData.data.lessons)) {
    const modsPub = applyUpdatesToLessons(pubData.data.lessons);
    console.log(`Applied ${modsPub} updates to public/data/edexcel_medicine.json.`);
    fs.writeFileSync(PUBLIC_JSON_PATH, JSON.stringify(pubData, null, 2), 'utf8');
    console.log('✅ Successfully wrote updated public/data/edexcel_medicine.json');
  }
}

// ==========================================
// 3. Rebuild public/database.json
// ==========================================
console.log('\nRebuilding public/database.json via scripts/build_database.cjs...');
execSync('node scripts/build_database.cjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
console.log('✅ Rebuilt database.json.');
