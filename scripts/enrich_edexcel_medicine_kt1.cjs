const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'edexcel_medicine', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'edexcel_medicine.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const MEDIEVAL_MEDICINE_PEDAGOGY = {
  // LESSON 1.1 (KT1.1 Supernatural & Religious Explanations)
  lesson_1_1: {
    A: {
      hinge_question:
        'How did medieval wall paintings like the Salisbury Doom reinforce the belief that sickness and epidemics were sent by God as punishments for sin?',
      discussion_ideas: [
        "Divine Justice and Physical Retribution: For an illiterate congregation, vivid church frescoes taught that physical suffering was God's immediate moral judgment; illness was not viewed as a biological failure, but as divine retribution for personal or communal sin, leading people to seek spiritual remedies—such as confession, prayer, and flagellation—over physical cures.",
      ],
    },
    B: {
      hinge_question:
        'Why did medieval university physicians believe that bleeding a patient under the wrong astrological sign could cause sudden death?',
      discussion_ideas: [
        "Macrocosm-Microcosm Harmony: Medieval medicine held that the human body (microcosm) was governed by the movements of the heavenly bodies (macrocosm); because specific constellations ruled designated organs (such as Aries governing the head and Pisces the feet), physicians believed that incising a vein when the moon was in an opposing sign would disrupt the body's vital spirits and induce fatal haemorrhaging.",
      ],
    },
  },

  // LESSON 1.2 (KT1.2 Rational Explanations: Hippocrates, Galen & The Four Humours)
  lesson_1_2: {
    A: {
      hinge_question:
        'How did the Four Humours diagram explain seasonal illnesses, and why did this internal fluid theory stop physicians from searching for external disease causes?',
      discussion_ideas: [
        'Seasonal Humoural Fluctuation: Illness was explained by seasonal shifts in environmental qualities—for example, cold, damp winters caused an overproduction of cold, wet phlegm (coughs and chills), while hot, dry summers provoked excess yellow bile (fevers).',
        'The Barrier to Bacteriological Discovery: Because doctors believed disease arose entirely from an internal imbalance of the patient’s own fluids, they focused solely on restoring balance through diet and opposites, entirely failing to investigate external vectors such as contaminated water, germs, or contagion.',
      ],
    },
    B: {
      hinge_question:
        'Why did the ritual of examining urine inside a glass matula grant medieval physicians such formidable diagnostic prestige?',
      discussion_ideas: [
        'Visual Proof of Humoural Balance: Urine was believed to be the direct by-product of internal digestion; by inspecting its color, clarity, and sediment against a 20-shade uroscopy chart, university physicians demonstrated scholarly authority to patients without needing to touch diseased bodies or perform invasive surgery.',
      ],
    },
  },

  // LESSON 1.3 (KT1.3 Approaches to Prevention & Treatment: Rituals, Bleeding & Purging)
  lesson_1_3: {
    A: {
      hinge_question:
        'Why did medieval practitioners believe that draining large volumes of blood from an already weakened patient would restore bodily health?',
      discussion_ideas: [
        'Relieving Sanguine Plethora: Blood was considered the dominant and most abundant of the four humours; physicians believed that inflammatory fevers were caused by an excess of hot, moist blood (plethora), so opening a vein with a fleam was thought to evacuate the surplus heat and restore bodily equilibrium.',
      ],
    },
    B: {
      hinge_question:
        "How did the Church's reverence for Galen ensure that treatments like purging and Theriac remained standard medical practice for over 1,500 years?",
      discussion_ideas: [
        "Ecclesiastical Dogma and Medical Monopolies: Because Galen argued the human body was created by a single divine Designer, the Catholic Church adopted his writings as absolute medical truth; university medical faculties taught Galen's texts dogmatically, meaning any practitioner who challenged purging, bleeding, or ancient herbal compounds was branded a heretic.",
      ],
    },
  },

  // LESSON 1.4 (KT1.4 Medical Care Providers & Monastic Hospitals: 'Care Not Cure')
  lesson_1_4: {
    A: {
      hinge_question:
        'Why were barber-surgeons considered socially inferior to university-trained physicians, despite being the only practitioners performing practical, hands-on treatment?',
      discussion_ideas: [
        'Manual Labour vs Scholarly Intellect: Medieval society prized theoretical Latin learning above manual trade; physicians held university degrees and diagnosed from books, while surgeons worked with their hands and knives, grouping them with craftsmen and tradesmen.',
        'Association with Blood and Mortality: Barber-surgeons dealt directly with agonizing amputations, wound stitching, and battlefield trauma; because surgeries were frequently fatal due to shock and blood loss, the profession lacked the elite scholarly prestige of diagnostic medicine.',
      ],
    },
    B: {
      hinge_question:
        'How does this hospital miniature demonstrate the medieval principle of ‘care not cure’?',
      discussion_ideas: [
        'Spiritual Sanctuary over Clinical Treatment: Run by religious orders, medieval hospitals focused on spiritual salvation, rest, and Christian charity rather than medical curing; patients received clean bedding, warm soup, and daily prayers facing the chapel altar, while infectious, contagious, or incurable patients were strictly turned away.',
      ],
    },
  },

  // LESSON 1.5 (KT1.5 Case Study: Dealing with the Black Death 1348–1349)
  lesson_1_5: {
    A: {
      hinge_question:
        'How does this contemporary illumination convey the total breakdown of customary individual funeral rites during the Black Death?',
      discussion_ideas: [
        'Overwhelming of Civic and Religious Ritual: The sheer speed and volume of deaths completely overwhelmed parish churchyards; solemn individual funeral processions with bell-ringing and consecrated family graves collapsed, forcing townsfolk to transport multiple coffins simultaneously to mass burial trenches outside the walls.',
      ],
    },
    B: {
      hinge_question:
        'What does this depiction of agonizing buboes reveal about the physiological horror and medical helplessness of plague treatment?',
      discussion_ideas: [
        "Misinterpreting Buboes as Humoural Poison: Doctors believed the agonizing, necrotic swellings in lymph nodes were the body's natural attempt to force out corrupt humours, leading them to apply warm poultices, draw with leeches, or slice open buboes, which caused excruciating pain and spread septic infection.",
        'Complete Ignorance of Flea Vectors: Because doctors operated under the theory of miasma and humoural imbalance, they had no conception of the Yersinia pestis bacteria or the black rat flea vector, rendering all contemporary treatments utterly futile.',
      ],
    },
  },
};

async function main() {
  console.log('🚀 Loading units/edexcel_medicine/data.js...');
  const mod = await import(pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  let updatedCount = 0;

  unitData.lessons.forEach((l) => {
    const pedLesson = MEDIEVAL_MEDICINE_PEDAGOGY[l.id];
    if (pedLesson) {
      console.log(`\nWiring ${l.id} (${l.title})...`);

      // Update l.sources
      (l.sources || []).forEach((s) => {
        const letter = (
          s.letter ||
          (s.title && s.title.match(/Source\s+([A-Z])/i)
            ? s.title.match(/Source\s+([A-Z])/i)[1]
            : '')
        ).toUpperCase();
        if (pedLesson[letter]) {
          s.hinge_question = pedLesson[letter].hinge_question;
          s.discussion_ideas = pedLesson[letter].discussion_ideas;
          updatedCount++;
          console.log(
            `  ✅ [l.sources] Source ${letter} wired with ${s.discussion_ideas.length} idea(s)`,
          );
        }
      });

      // Update narrative_blocks
      (l.narrative_blocks || []).forEach((b) => {
        if (b.source) {
          const letter = (
            b.source.letter ||
            (b.source.title && b.source.title.match(/Source\s+([A-Z])/i)
              ? b.source.title.match(/Source\s+([A-Z])/i)[1]
              : '')
          ).toUpperCase();
          if (pedLesson[letter]) {
            b.source.hinge_question = pedLesson[letter].hinge_question;
            b.source.discussion_ideas = pedLesson[letter].discussion_ideas;
            console.log(
              `  ✅ [narrative_blocks] Source ${letter} wired with ${b.source.discussion_ideas.length} idea(s)`,
            );
          }
        }
      });
    }
  });

  console.log(`\n🎉 Total sources updated across KT1 lessons: ${updatedCount}`);

  // 1. Write back to units/edexcel_medicine/data.js
  const jsContent = 'export default ' + JSON.stringify(unitData, null, 2) + ';\n';
  fs.writeFileSync(dataJsPath, jsContent, 'utf8');
  console.log('✅ Successfully wrote units/edexcel_medicine/data.js');

  // 2. Write to public/data/edexcel_medicine.json
  if (fs.existsSync(pubJsonPath)) {
    const pubData = JSON.parse(fs.readFileSync(pubJsonPath, 'utf8'));
    pubData.data = unitData;
    fs.writeFileSync(pubJsonPath, JSON.stringify(pubData, null, 2), 'utf8');
    console.log('✅ Successfully updated public/data/edexcel_medicine.json');
  }

  // 3. Write to public/database.json
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (db.edexcel_medicine) {
      db.edexcel_medicine.data = unitData;
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('✅ Successfully updated edexcel_medicine in public/database.json');
    }
  }

  console.log('\n🏁 Completed Edexcel Medicine Key Topic 1 enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
