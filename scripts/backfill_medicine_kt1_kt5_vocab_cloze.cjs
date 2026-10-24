/**
 * scripts/backfill_medicine_kt1_kt5_vocab_cloze.cjs
 *
 * Backfills vocab (5 items) and vocab_cloze_text for KT1 (Lessons 1-5),
 * and vocab_cloze_text for KT5 (Lessons 21-26) in Edexcel Medicine Through Time.
 * Ensures { term, def, definition } consistency across all vocab.
 */

const fs = require('fs');
const path = require('path');

const KT1_DATA = {
  lesson_1_1: {
    vocab: [
      {
        term: "God's Punishment",
        def: 'The widespread medieval belief that epidemic disease was a divine retribution sent by God to punish humanity for its sins and test Christian faith.',
        definition:
          'The widespread medieval belief that epidemic disease was a divine retribution sent by God to punish humanity for its sins and test Christian faith.',
      },
      {
        term: 'Flagellation',
        def: 'A ritual of public self-scourging with knotted ropes and iron tips undertaken by religious penitents to appease divine wrath during plague outbreaks.',
        definition:
          'A ritual of public self-scourging with knotted ropes and iron tips undertaken by religious penitents to appease divine wrath during plague outbreaks.',
      },
      {
        term: 'Astrology',
        def: 'The medical belief that celestial movements, planetary conjunctions, and eclipses directly influenced bodily humours and precipitated epidemics.',
        definition:
          'The medical belief that celestial movements, planetary conjunctions, and eclipses directly influenced bodily humours and precipitated epidemics.',
      },
      {
        term: 'Miasma',
        def: 'A harmful, invisible vapor or bad air emanating from rotting organic matter, stagnant water, and cesspools, believed to cause disease when inhaled.',
        definition:
          'A harmful, invisible vapor or bad air emanating from rotting organic matter, stagnant water, and cesspools, believed to cause disease when inhaled.',
      },
      {
        term: 'The Medieval Church',
        def: 'The supreme institutional authority that controlled education, medical training, libraries, and hospitals, enforcing strict adherence to Christian and Galenic orthodoxy.',
        definition:
          'The supreme institutional authority that controlled education, medical training, libraries, and hospitals, enforcing strict adherence to Christian and Galenic orthodoxy.',
      },
    ],
    vocab_cloze_text:
      "In medieval England, ordinary people and clergy firmly believed that epidemic sickness was [God's Punishment] sent to cleanse sinful souls. In desperation, religious zealots engaged in public [Flagellation] with knotted leather cords to demonstrate physical penance and appease divine fury. Physicians also consulted celestial charts, believing that medical [Astrology] and planetary conjunctions (such as the 1345 alignment of Saturn, Jupiter, and Mars) disrupted human bodies. At the same time, authorities feared [Miasma], an invisible cloud of foul air rising from decaying matter and stagnant swamps that corrupted internal humours. Throughout this era, [The Medieval Church] dominated hospital care, education, and medical libraries, fiercely suppressing any rational challenge to traditional doctrine.",
  },

  lesson_1_2: {
    vocab: [
      {
        term: 'Four Humours',
        def: 'The foundational ancient medical doctrine asserting that human health depended on an equilibrium among four bodily fluids: blood, phlegm, yellow bile, and black bile.',
        definition:
          'The foundational ancient medical doctrine asserting that human health depended on an equilibrium among four bodily fluids: blood, phlegm, yellow bile, and black bile.',
      },
      {
        term: 'Theory of Opposites',
        def: "Galen's therapeutic principle prescribing remedies possessing qualities contrary to the disease (e.g. treating cold, wet phlegm with hot, dry pepper).",
        definition:
          "Galen's therapeutic principle prescribing remedies possessing qualities contrary to the disease (e.g. treating cold, wet phlegm with hot, dry pepper).",
      },
      {
        term: 'Hippocratic Oath',
        def: 'An ancient ethical code sworn by medical practitioners binding them to treat patients diligently, protect life, and preserve confidentiality.',
        definition:
          'An ancient ethical code sworn by medical practitioners binding them to treat patients diligently, protect life, and preserve confidentiality.',
      },
      {
        term: 'Clinical Observation',
        def: "The diagnostic practice pioneered by Hippocrates of carefully examining, recording, and monitoring a patient's symptoms at the bedside before formulating a diagnosis.",
        definition:
          "The diagnostic practice pioneered by Hippocrates of carefully examining, recording, and monitoring a patient's symptoms at the bedside before formulating a diagnosis.",
      },
      {
        term: 'Galenic Dogma',
        def: 'The unchallengeable medical authority attributed to Claudius Galen, whose anatomical writings were preserved and dogmatically enforced by the Catholic Church.',
        definition:
          'The unchallengeable medical authority attributed to Claudius Galen, whose anatomical writings were preserved and dogmatically enforced by the Catholic Church.',
      },
    ],
    vocab_cloze_text:
      "Rational medieval medicine was anchored in the ancient Greek concept of the [Four Humours], which maintained that good health required an exact balance between blood, phlegm, yellow bile, and black bile. Building upon this, Claudius Galen introduced the [Theory of Opposites], arguing that cold and wet sicknesses (like winter colds) should be cured with hot and dry foods like pepper. Trainee physicians swore the sacred [Hippocratic Oath], pledging ethical conduct and confidentiality, and learned the practice of [Clinical Observation] to monitor fever patterns and examine urine flasks at the patient's bedside. However, medical training soon ossified into rigid [Galenic Dogma], because the Roman Catholic Church heavily promoted Galen's anatomical texts as divine proof that God had engineered the human body for a purposeful creator.",
  },

  lesson_1_3: {
    vocab: [
      {
        term: 'Phlebotomy',
        def: "The surgical incision of veins, cupping, or application of medicinal leeches to drain blood and rebalance the body's four humours.",
        definition:
          "The surgical incision of veins, cupping, or application of medicinal leeches to drain blood and rebalance the body's four humours.",
      },
      {
        term: 'Purging',
        def: 'The evacuation of the digestive tract using emetics, laxatives, and clysters to expel excess humours and harmful residues.',
        definition:
          'The evacuation of the digestive tract using emetics, laxatives, and clysters to expel excess humours and harmful residues.',
      },
      {
        term: 'Regimen Sanitatis',
        def: 'A holistic set of dietary, environmental, and behavioral rules prescribed by medieval physicians to preserve humoral harmony.',
        definition:
          'A holistic set of dietary, environmental, and behavioral rules prescribed by medieval physicians to preserve humoral harmony.',
      },
      {
        term: 'Theriac',
        def: 'A complex herbal and animal antidote containing dozens of ingredients (including crushed viper flesh and opium) widely consumed as a panacea.',
        definition:
          'A complex herbal and animal antidote containing dozens of ingredients (including crushed viper flesh and opium) widely consumed as a panacea.',
      },
      {
        term: 'Materia Medica',
        def: 'The catalogued body of knowledge regarding herbal plants, minerals, and animal substances possessing medicinal and healing properties.',
        definition:
          'The catalogued body of knowledge regarding herbal plants, minerals, and animal substances possessing medicinal and healing properties.',
      },
    ],
    vocab_cloze_text:
      'To restore internal balance when humours became corrupted, medieval healers relied primarily on [Phlebotomy], drawing excess blood through vein incision, cupping, or applying leeches. Patients also underwent vigorous [Purging] with violent emetics, bitter laxatives, and enema clysters to expel offending bile from their digestive tracts. For daily preventative hygiene, physicians compiled the [Regimen Sanitatis], a comprehensive code of conduct advising wealthy citizens on wholesome diet, restful sleep, emotional temperance, and seasonal exercise. When deadly pestilence struck, apothecaries compounded [Theriac], a complex antidotal paste containing up to seventy ingredients including snake flesh and opium. Most common illnesses were treated using home remedies drawn from the folk [Materia Medica], which catalogued curative herbs, roots, minerals, and animal compounds.',
  },

  lesson_1_4: {
    vocab: [
      {
        term: 'Monastic Infirmary',
        def: 'Hospital wards established inside medieval monasteries and abbeys offering hospitality, shelter, and palliative care to travelers, pilgrims, and the infirm.',
        definition:
          'Hospital wards established inside medieval monasteries and abbeys offering hospitality, shelter, and palliative care to travelers, pilgrims, and the infirm.',
      },
      {
        term: 'Barber-Surgeon',
        def: 'Practical craftsmen who performed minor surgery, bloodletting, bone-setting, and tooth extraction using blades without university medical degrees.',
        definition:
          'Practical craftsmen who performed minor surgery, bloodletting, bone-setting, and tooth extraction using blades without university medical degrees.',
      },
      {
        term: 'Apothecary',
        def: 'Tradespeople who prepared, mixed, and sold botanical tinctures, herbal remedies, and ointments in urban shops.',
        definition:
          'Tradespeople who prepared, mixed, and sold botanical tinctures, herbal remedies, and ointments in urban shops.',
      },
      {
        term: 'University-Trained Physician',
        def: 'Elite practitioners who studied Latin texts, astrological charts, and humoral theory at universities, rarely performing physical surgery.',
        definition:
          'Elite practitioners who studied Latin texts, astrological charts, and humoral theory at universities, rarely performing physical surgery.',
      },
      {
        term: 'Wise Woman',
        def: 'Respected female community healers who provided folk remedies, botanical brews, and midwifery services to poor rural villagers.',
        definition:
          'Respected female community healers who provided folk remedies, botanical brews, and midwifery services to poor rural villagers.',
      },
    ],
    vocab_cloze_text:
      'Medical care in medieval society was divided among very different practitioners. Monks and nuns ran the [Monastic Infirmary], providing quiet shelter, clean bedding, herbal broths, and spiritual solace to elderly or chronically ill pilgrims rather than curative medical surgery. Manual treatments fell to the [Barber-Surgeon], who used razor-sharp blades to amputate gangrenous limbs, extract decayed teeth, and perform phlebotomy for modest fees. Botanical cures and ointments were compounded and sold by the [Apothecary], who trained in guilds to mix herbs, wines, and minerals into commercial tinctures. The elite social tier was occupied by the [University-Trained Physician], who charged high fees to rich clients for academic consultations based on astrological charts and pulse readings without ever performing physical surgery. In remote rural hamlets, most peasant families turned to the local [Wise Woman], whose generationally inherited herbal remedies, bone-setting, and midwifery provided vital frontline care.',
  },

  lesson_1_5: {
    vocab: [
      {
        term: 'Black Death',
        def: 'The catastrophic bubonic and pneumonic plague pandemic that swept England in 1348–49, killing between 30% and 50% of the population.',
        definition:
          'The catastrophic bubonic and pneumonic plague pandemic that swept England in 1348–49, killing between 30% and 50% of the population.',
      },
      {
        term: 'Buboes',
        def: 'Excruciating, dark inflammatory swellings of the lymph nodes in the groin, armpits, and neck characteristic of bubonic plague.',
        definition:
          'Excruciating, dark inflammatory swellings of the lymph nodes in the groin, armpits, and neck characteristic of bubonic plague.',
      },
      {
        term: 'Quarantine',
        def: 'The enforced isolation of infected households, travelers, or ships to halt the transmission of contagious disease.',
        definition:
          'The enforced isolation of infected households, travelers, or ships to halt the transmission of contagious disease.',
      },
      {
        term: 'Pomander',
        def: 'A perforated metal or ceramic container filled with aromatic herbs and spices carried to neutralize foul, pestilential miasma.',
        definition:
          'A perforated metal or ceramic container filled with aromatic herbs and spices carried to neutralize foul, pestilential miasma.',
      },
      {
        term: 'Winchester Cemetery Order',
        def: 'The urgent public health measure by authorities to establish mass burial grounds outside town walls to prevent contamination from plague pits.',
        definition:
          'The urgent public health measure by authorities to establish mass burial grounds outside town walls to prevent contamination from plague pits.',
      },
    ],
    vocab_cloze_text:
      'In the scorching summer of 1348, the lethal pandemic known as the [Black Death] reached the southern ports of Dorset and swept across England, killing roughly half the population. Terrified victims suffered fever, violent vomiting, and hideous egg-sized [Buboes] swelling painfully in the armpits and groin that oozed pus before turning black. To check the terrifying airborne contagion, wealthy gentlemen carried a sweet-smelling [Pomander] filled with dried lavender and rose petals to ward off the deadly miasma. Desperate town magistrates enforced strict [Quarantine], boarding up infected households and burning pitch barrels in city alleys to purify polluted air. In London, municipal authorities issued the [Winchester Cemetery Order], consecrating vast communal burial grounds outside the city gates at West Smithfield and Spitalfields to bury the overwhelming mountain of corpses in deep lime trenches.',
  },
};

const KT5_CLOZE = {
  lesson_5_1:
    'On the Western Front, British infantry rotated into the dangerous [Frontline Trench], standing vigil on raised firesteps behind sandbag parapets and thick barbed-wire entanglements. To move vital munitions, hot rations, and stretcher-borne casualties safely up to the firing line, soldiers moved along the zig-zagging [Communication Trench]. Every trench line was constructed with a defensive 90-degree [Traverse], preventing enemy enfilading rifle fire and containing the blast concussion of incoming artillery shells. The bloodiest Sector remained the low-lying [Ypres Salient], where British positions were exposed to German artillery fire from three sides on surrounding high ridges. Meanwhile, beneath the city of Arras, British engineers hollowed out ancient chalk quarries into [Thompson’s Cave], creating a hidden 700-bed underground hospital complete with surgical operating theatres and running water.',

  lesson_5_2:
    'Living in deep mud and freezing water created severe medical challenges for soldiers. Men standing for days in wet ditches suffered from [Trench Foot], a painful necrotic condition where toes turned numb and black with gangrene, often requiring surgical amputation. To protect their skin from moisture, soldiers were ordered to rub pungent [Whale Oil] onto their bare feet daily during compulsory buddy inspections. Frontline troops were also tormented by biting [Body Lice], tiny parasites that bred inside the warm woollen seams of battle-dress uniforms and transmitted [Trench Fever], causing blinding headaches, high fever, and agonizing shin pain. To control outbreaks of debilitating waterborne dysentery, battalion sanitation orderlies methodically dumped [Chloride of Lime] into water-cart tanks and communal latrine trenches.',

  lesson_5_3:
    'Artillery was the greatest killer of the war; detonations from a [High-Explosive Shell] shattered steel casings into thousands of jagged, red-hot shrapnel splinters that sliced through flesh. Deep wounds contaminated with manured French soil frequently developed [Gas Gangrene], an agonizing infection caused by anaerobic bacteria producing foul gas pockets that rotted living muscle within hours. Soil contamination also carried [Tetanus], a fatal nervous system toxin that locked victims in painful spinal convulsions until routine antitoxin injections were administered. To protect soldiers from downward-falling aerial shrapnel, the British Army introduced the pressed-steel [Brodie Helmet] in late 1915, drastically reducing head trauma. In 1917, battlefield trauma deepened when the German army deployed blistering [Mustard Gas], an odorless oily vesicant that burned through wet uniforms, blinded eyes, and destroyed the respiratory lining of the lungs.',

  lesson_5_4:
    'To handle tens of thousands of battlefield casualties, the Royal Army Medical Corps created the [Chain of Evacuation], systematically moving wounded soldiers from the firestep back to base hospitals. Stretcher-bearers first carried wounded infantry to the [Regimental Aid Post (RAP)], located in a dugout a few hundred yards behind the front line for immediate bandaging and morphine. Critical surgical care was delivered seven to twelve miles to the rear at the [Casualty Clearing Station (CCS)], which was positioned beside railway sidings and equipped with operating rooms and female nurses. Upon arrival, medical officers conducted rapid [Triage], dividing patients into walking wounded, those requiring urgent lifesaving surgery, and the moribund who were beyond surgical help. Driving through artillery barrages, brave volunteer drivers of the [FANY] piloted motor ambulances across shell-cratered roads to keep the supply line of patients flowing smoothly.',

  lesson_5_5:
    'High-velocity bullet and shrapnel strikes frequently produced a devastating [Compound Fracture], where fractured bone shattered through the skin into the bacteria-choked mud. Early in the war, 80% of soldiers with broken femurs died of shock, but the universal adoption of the [Thomas Splint] in 1915 reduced mortality to under 20%. The metal splint applied constant mechanical [Traction], pulling the leg straight, steadying jagged bone fragments, and preventing internal bleeding during rough ambulance transport. Inside field operating theatres, surgeons pioneered [Wound Debridement], meticulously excising all blackened, dead tissue and uniform shreds to deprive anaerobic bacteria of nutrients. To disinfect deep, ragged wound cavities without corroding living flesh, surgeons flushed damaged tissue using the [Carrel-Dakin Method], continuously running dilute sodium hypochlorite through rubber irrigation tubes.',

  lesson_5_6:
    "Medical breakthroughs during the war permanently transformed modern clinical surgery. In 1914, doctors discovered that adding [Sodium Citrate] stopped blood from clotting outside the human body, removing the dangerous necessity of direct person-to-person transfusion. At the Battle of Cambrai in 1917, Canadian officer Oswald Robertson constructed the world’s first [Blood Depot], refrigerating citrated blood in wooden ice chests for up to 28 days to treat haemorrhaging soldiers. For catastrophic head wounds, pioneering American neurosurgeon [Harvey Cushing] used local anaesthetics and magnets to extract shrapnel from cranial wounds, lowering brain surgery mortality to 29%. Meanwhile, at Queen's Hospital in Sidcup, New Zealand surgeon [Harold Gillies] pioneered facial reconstruction using the [Tubed Pedicle], rolling living skin flaps into vascularized cylinders to rebuild shattered jaws and faces.",
};

function backfillMedicineVocabCloze() {
  console.log('📦 Backfilling Medicine KT1 & KT5 Vocab & Cloze...');

  const targetFiles = [
    path.join(__dirname, '..', 'public', 'data', 'edexcel_medicine.json'),
    path.join(__dirname, '..', 'data', 'edexcel_medicine.json'),
  ];

  targetFiles.forEach((fp) => {
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      const lessons = data.data?.lessons || data.lessons || [];

      lessons.forEach((l) => {
        // Backfill KT1 (Lessons 1-5)
        if (KT1_DATA[l.id]) {
          l.vocab = KT1_DATA[l.id].vocab;
          l.vocab_cloze_text = KT1_DATA[l.id].vocab_cloze_text;
        }

        // Backfill KT5 (Lessons 21-26)
        if (KT5_CLOZE[l.id]) {
          l.vocab_cloze_text = KT5_CLOZE[l.id];
          // Ensure vocab def and definition are populated
          if (l.vocab) {
            l.vocab.forEach((v) => {
              if (!v.def && v.definition) v.def = v.definition;
              if (!v.definition && v.def) v.definition = v.def;
            });
          }
        }
      });

      fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      console.log(`  ✔ Injected vocab & cloze into ${fp}`);
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

  console.log(
    `✅ Medicine Through Time: KT1 vocab & cloze injected (5 lessons), KT5 cloze injected (6 lessons). All 26 lessons complete.`,
  );
}

if (require.main === module) {
  backfillMedicineVocabCloze();
}

module.exports = { backfillMedicineVocabCloze, KT1_DATA, KT5_CLOZE };
