const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'edexcel_medicine', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'edexcel_medicine.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const RENAISSANCE_MEDICINE_PEDAGOGY = {
  // LESSON 2.1 (KT2.1 The New Spirit of Enquiry: Humanism, The Printing Press & The Royal Society)
  lesson_2_1: {
    A: {
      hinge_question:
        'How did the mechanical nature of the printing press prevent the theological censorship and copyist errors that had protected Galenic dogma for over a thousand years?',
      discussion_ideas: [
        'Standardised Dissemination Beyond Church Control: Hand-copied monastic manuscripts were prone to clerical transcription errors and religious censorship; movable type allowed thousands of identical, uncorrupted copies of anatomical treatises and classical translations to be distributed rapidly across Europe, enabling scholars in different countries to challenge medieval orthodoxy simultaneously without relying on Church scriptoriums.',
      ],
    },
    B: {
      hinge_question:
        "How does the creation of Europe's first peer-reviewed scientific journal embody the Royal Society's motto Nullius in Verba ('Take nobody's word for it')?",
      discussion_ideas: [
        'Institutionalising Empirical Verification: Medieval university learning demanded unquestioning obedience to ancient texts like Galen and Aristotle; Philosophical Transactions established peer review, requiring scientists to publish precise experimental methods and empirical data so that fellow scholars could replicate and verify findings rather than accepting claims on personal or traditional authority.',
      ],
    },
    C: {
      hinge_question:
        "Why did Hooke's microscopic illustrations amaze 17th-century society, yet completely fail to improve medical treatments for infectious diseases?",
      discussion_ideas: [
        "Visual Fascination with Macro-Microscopic Structures: Using thirty-times magnification, Hooke revealed the astonishing geometric complexity of common parasites and plant 'cells', proving to contemporaries that nature contained an invisible universe never described by ancient Greek authors.",
        'The Absence of Germ Theory: 17th-century lenses lacked the resolution to visualize single-celled bacteria; because physicians still explained pestilence through miasma and humoural decay, observing the anatomy of a flea was viewed as an intellectual curiosity rather than the vector of epidemic bubonic plague.',
      ],
    },
  },

  // LESSON 2.2 (KT2.2 Thomas Sydenham & The Art of Bedside Observation)
  lesson_2_2: {
    A: {
      hinge_question:
        'How does Sydenham’s plain portrait reflect his rejection of theatrical university dogma in favour of practical bedside clinical care?',
      discussion_ideas: [
        "Demystifying Medicine through Empirical Observation: Sydenham deliberately rejected the pretentious velvet robes, powdered wigs, and archaic Latin treatises of university physicians; his sober puritan attire mirrored his 'English Hippocrates' methodology—treating diseases as distinct biological species identified through meticulous bedside observation, patient symptom charting, and practical clinical trials rather than scholastic book-learning.",
      ],
    },
    B: {
      hinge_question:
        'Why did uneducated mountebanks and quack doctors continue to flourish in 17th-century England, despite the groundbreaking discoveries of Vesalius and Harvey?',
      discussion_ideas: [
        "The Therapeutic Impasse of Scientific Anatomy: Discoveries by Vesalius and Harvey revolutionised anatomical knowledge but produced zero new cures; ordinary sufferers still endured painful, ineffective bloodletting from licensed physicians, driving them to quacks who offered cheaper, sweetly flavoured, and reassuring 'miracle' nostrums.",
        'Absence of Regulatory Enforcement: Outside the immediate jurisdiction of London’s College of Physicians, healthcare was entirely unregulated; rural populations living in poverty had no access to university-trained doctors and relied on charismatic travelling healers, apothecaries, and wise-women.',
      ],
    },
    C: {
      hinge_question:
        'What changes in hygiene, administration, and medical supervision occurred in English hospitals following the Dissolution of the Monasteries?',
      discussion_ideas: [
        'Transition to Secular Municipal Funding: Henry VIII’s closure of Catholic monasteries destroyed hundreds of monastic infirmaries; wealthy city aldermen and royal charters refounded hospitals like St Bartholomew’s and St Thomas’s under secular governors, shifting focus from praying for souls to public welfare.',
        'Introduction of Regular Medical Staff: Unlike medieval abbeys where monks and nuns offered only shelter and basic comfort, early modern municipal hospitals appointed salaried resident apothecaries and visiting surgeons to dress surgical wounds and prescribe treatments.',
      ],
    },
  },

  // LESSON 2.3 (KT2.3 Andreas Vesalius & The Anatomical Revolution)
  lesson_2_3: {
    A: {
      hinge_question:
        'How does this anatomy theatre scene visually symbolize the triumph of direct empirical observation over blind deference to medieval textual authority?',
      discussion_ideas: [
        "Overthrowing Academic Hierarchy: In medieval medical schools, the elite professor sat elevated in a high magisterial chair reading Galen's Latin texts while an uneducated barber-surgeon performed the dirty dissection below; Vesalius places himself directly at the dissection table, sleeves rolled up, dissecting human cadavers with his own hands to demonstrate that empirical reality takes absolute precedence over ancient books.",
      ],
    },
    B: {
      hinge_question:
        'Why was combining forensic anatomical accuracy with dynamic Renaissance artistic realism vital for overthrowing Galen?',
      discussion_ideas: [
        "Irrefutable Graphic Precision: Collaborating with master artists from Titian’s Venice workshop, Vesalius produced woodcuts that showed human muscular layers in life-like, three-dimensional motion; this graphic precision exposed Galen's over 200 anatomical errors—such as proving the human jawbone was a single fused bone rather than two parts as found in apes—making his corrections undeniable to doctors across Europe.",
      ],
    },
    C: {
      hinge_question:
        'Why did ordinary barbers and patients cling to humoural bloodletting diagrams, even after Vesalius proved Galen’s anatomy was fundamentally flawed?',
      discussion_ideas: [
        "Anatomy Does Not Equal Cure: Vesalius proved that human organs differed from Galen's animal models, but he offered no alternative explanation for what made people sick; without an alternative to humoural theory, doctors had no choice but to continue balancing fluids through traditional bloodletting.",
        'Deep-Seated Cultural Comfort: For ordinary laypeople and barber-surgeons, the concept of phlebotomy provided an intuitive, familiar explanation for illness that had comforted families for centuries; abandoning it for theoretical skeletal drawings offered no practical relief from daily suffering.',
      ],
    },
  },

  // LESSON 2.4 (KT2.4 William Harvey & The Circulation of the Blood)
  lesson_2_4: {
    A: {
      hinge_question:
        "How did Harvey's simple ligated arm experiment and calculation of blood volume demolish 1,400 years of Galenic dogma?",
      discussion_ideas: [
        "Mechanical Circulation over Liver Generation: Galen claimed the liver continuously manufactured new blood from digested food to be consumed as fuel by tissues, passing through invisible heart pores; Harvey proved that internal vein valves only permit one-way flow towards the heart, and calculated that the heart pumps three times a human's body weight in blood every hour (over 250kg a day), proving mathematically that blood must circulate continuously through a closed mechanical system powered by the heart pump.",
      ],
    },
  },

  // LESSON 2.5 (KT2.5 Continuity in Treatment & The Great Plague of London)
  lesson_2_5: {
    A: {
      hinge_question:
        'How does this scene of nocturnal mass burial convey the breakdown of civic order and normal funeral customs during the Great Plague of 1665?',
      discussion_ideas: [
        'Collapse of Sacred Burial Traditions: London’s mortality reached over 7,000 deaths a week in September 1665, filling churchyards to capacity; individual coffins, mourners, and consecrated churchyard graves were banned, forcing parishes to dig 20-foot-deep communal pits filled by dead-carts under darkness.',
        "State Enforcement of Night-time Secrecy: The Mayor's regulations mandated that dead-carts operate only between sunset and sunrise to prevent panic and minimize public assembly, demonstrating how the state suspended civil and spiritual liberties in a desperate bid to contain epidemic contagion.",
      ],
    },
    B: {
      hinge_question:
        "How does each feature of the plague doctor's costume prove that 17th-century physicians still believed the primary cause of disease was corrupt miasma?",
      discussion_ideas: [
        'A Protective Barrier Against Airborne Poison: Every element was engineered to repel toxic miasma: the curved leather beak was packed with sweet aromatic herbs (camphor, dried flowers, and spices) to purify inhaled air; the waxed leather gown prevented airborne poisons from sticking to fabric; and the wooden cane allowed the doctor to examine patients and inspect buboes without physical skin contact.',
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
    const pedLesson = RENAISSANCE_MEDICINE_PEDAGOGY[l.id];
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

  console.log(`\n🎉 Total sources updated across KT2 lessons: ${updatedCount}`);

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

  console.log('\n🏁 Completed Edexcel Medicine Key Topic 2 enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
