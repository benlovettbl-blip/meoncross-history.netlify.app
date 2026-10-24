const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'edexcel_medicine', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'edexcel_medicine.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const INDUSTRIAL_MEDICINE_PEDAGOGY = {
  // LESSON 3.1 (KT3.1 The Germ Theory & Microbiology: Louis Pasteur & Robert Koch)
  lesson_3_1: {
    A: {
      hinge_question:
        'Study Pasteur intently examining a glass phial under natural window light, surrounded by delicate glassware and observation notebooks. How does this portrait depict the shift from abstract medical philosophy to meticulous laboratory science?',
      discussion_ideas: [
        'Empirical Laboratory Instrumentation: Pasteur is surrounded not by ancient library folios, but by calibrated thermometers, swan-neck flasks, and chemical reagents; holding a preserved spinal cord in a glass phial up to the light, he demonstrates that medical truth is derived from repeatable, recorded experimentation rather than philosophical speculation.',
        "The Scientist Replacing the Bedside Doctor: Dressed in a sober academic coat within a sterile research facility rather than at a sick patient's bedside, Pasteur personifies the emergence of bacteriology; disease causation was now investigated at the microscopic cellular level in laboratories, shifting medical authority from bedside physicians to experimental scientists.",
      ],
    },
    B: {
      hinge_question:
        'Robert Koch stained Mycobacterium tuberculosis using methyl violet dye and captured these images under a microscope. Why did producing clear, reproducible visual evidence of specific bacteria succeed in convincing skeptical British doctors where Pasteur’s theoretical papers had failed?',
      discussion_ideas: [
        "Definitive Refutation of Spontaneous Generation: Prominent British doctors like Dr Henry Bastian insisted bacteria were harmless secondary byproducts formed inside decaying tissue; Koch’s photographs provided irrefutable visual proof that distinct, living microorganisms caused specific diseases (Koch's Postulates), disproving miasma and spontaneous generation.",
        "Replicable Chemical Staining and Microphotography: Koch’s use of methyl violet aniline dyes and camera-microscopy removed subjective artistic interpretation; any physician or bacteriologist in London could repeat Koch's exact laboratory staining protocol, observe identical rod-shaped bacilli under the microscope, and independently verify the discovery.",
      ],
    },
  },

  // LESSON 3.2 (KT3.2 Approaches to Prevention: Edward Jenner & The Smallpox Vaccine)
  lesson_3_2: {
    A: {
      hinge_question:
        'Notice Dr Jenner resting his arm upon an oak tree while dairy cows and a milkmaid carry milk pails in the background. Why did Jenner’s countryside observations of dairymaids and cowpox prove more revolutionary than the book-learning of London’s elite physicians?',
      discussion_ideas: [
        'Empirical Rural Observation Over Classical Dogma: Jenner broke with centuries of rigid London medical dogma by investigating a widely held Gloucestershire folk observation: milkmaids who contracted mild cowpox never caught lethal smallpox. Rather than relying on ancient Galenic theories or risky variolation (inoculation with live, dangerous smallpox), Jenner tested this systematically in 1796 on eight-year-old James Phipps, published his clinical findings in 1798, and proved that a benign animal pathogen could provide cross-immunity against smallpox.',
      ],
    },
    B: {
      hinge_question:
        'James Gillray satirizes Edward Jenner inoculating a patient while miniature cows sprout from the patients’ limbs and faces. What specific commercial and religious anxieties does this caricature reveal about public opposition to vaccination?',
      discussion_ideas: [
        'Religious and Moral Panic Over Bestial Contamination: Gillray captures widespread Victorian and Georgian fears that inoculating humans with animal matter from cows was an unnatural, ungodly violation of divine creation; anti-vaccination preachers argued that corrupting pure human blood with beastial diseases would dehumanise patients or evoke divine punishment.',
        'Commercial Self-Interest of Variolators: Elite private inoculators charged substantial fees (up to 20 guineas) for traditional smallpox inoculation, which required weeks of expensive residential confinement; Jenner’s safer, free cowpox vaccination directly threatened this lucrative commercial monopoly, leading inoculators to fund sensational anti-vaccine propaganda.',
      ],
    },
  },

  // LESSON 3.3 (KT3.3 Improvements in Hospital Care: Florence Nightingale, Mary Seacole & The Sanitary Revolution)
  lesson_3_3: {
    A: {
      hinge_question:
        'Why was entering a military hospital during the Crimean War in 1854 once more likely to kill a sick or wounded soldier than to cure him?',
      discussion_ideas: [
        'Lethal Sanitary Neglect and Hospital-Acquired Infections: Scutari Barrack Hospital was constructed directly over a blocked, leaking sewer system with zero working drainage, contaminated drinking water, and overcrowded wards lacking ventilation. Men lay unwashed on bare, vermin-infested floorboards in blood-soaked uniforms, creating a breeding ground for typhus, cholera, and dysentery; as a result, four out of five military deaths were caused by preventable hospital diseases rather than Russian battlefield wounds.',
      ],
    },
    B: {
      hinge_question:
        'How does this idealized depiction of the reformed hospital ward contrast with the squalor and overflowing sewage that Nightingale originally discovered upon her arrival in November 1854?',
      discussion_ideas: [
        'The Squalid Reality of November 1854: When Nightingale arrived with 38 nurses, Scutari was a cesspool of neglect: wounded soldiers were packed along four miles of corridors without beds, soap, or clean linen, lying in their own excrement amidst swarming rats; bureaucratic red tape prevented supplies from being unpacked, driving mortality to 42%.',
        "The Sanitized Myth of British Efficiency: Simpson’s print was commissioned for domestic British consumption to reassure the public; it depicts an orderly, well-ventilated hall with spotless sheets, spaced cots, and serene angelic nursing, celebrating Nightingale as the 'Lady with the Lamp' while sanitizing the horrific institutional incompetence of the British Army Medical Department.",
      ],
    },
    C: {
      hinge_question:
        'Florence Nightingale invented the Polar Area Diagram to present military mortality data to Queen Victoria. The large outer blue wedges represent preventable sanitary diseases, while the small inner red wedges represent battlefield combat wounds. How did this visual data convince Parliament that bad hospital sanitation was far more deadly than Russian weapons?',
      discussion_ideas: [
        'Revolutionary Statistical Visualization Forcing Legislative Reform: Nightingale knew that dense statistical tables were ignored by politicians; by inventing the Polar Area Diagram, she provided undeniable visual proof where the vast blue wedges (preventable zymotic/sanitary deaths like cholera and typhus) overwhelmingly dwarfed the tiny red inner wedges (wounds in battle). This visual evidence demonstrated that soldiers were being killed by hospital neglect rather than Russian bullets, shaming Parliament and the War Office into establishing a Royal Commission and reconstructing hospital sanitary architecture.',
      ],
    },
    D: {
      hinge_question:
        'Mary Seacole proudly wears four military campaign medals awarded for treating wounded soldiers under fire. How did Seacole’s frontline herbal and battlefield care contrast with Nightingale’s administrative hospital reforms at Scutari?',
      discussion_ideas: [
        'Frontline Physical Bravery and Traditional Herbalism: While Nightingale remained based at Scutari Hospital across the Black Sea managing administrative sanitation, Seacole rode directly onto active battlefields (such as the Siege of Sevastopol) under shellfire; drawing on Jamaican Creole herbal medicine, she administered remedies of mustard, aloe, and pomegranate, bandaging wounded soldiers directly in the trenches.',
        "Grassroots Independence vs Institutional State Authority: Rejected by the British War Office and Nightingale's nursing mission due to racial prejudice, Seacole independently financed the 'British Hotel' at Spring Hill to provide hot food, medicine, and compassionate comfort; while Nightingale transformed the formal architecture of state nursing, Seacole won the devotion of ordinary soldiers through immediate, hands-on frontline care.",
      ],
    },
  },

  // LESSON 3.4 (KT3.4 The Surgical Revolution: Simpson, Lister & The Conquest of Pain and Sepsis)
  lesson_3_4: {
    A: {
      hinge_question:
        'Study Dr Simpson and his assistants collapsed beneath the dining table after inhaling chloroform vapor. Why was self-experimentation so common among 19th-century medical pioneers, and what severe dangers did it carry?',
      discussion_ideas: [
        'Urgency to Overcome Pain and Surgical Shock: Prior to reliable chemical testing, surgeons like Simpson witnessed conscious patients dying of agony and cardiovascular shock on the operating table; self-experimentation was the quickest, most direct method to test volatile anesthetics on human consciousness without endangering patients.',
        'Lethal Hazards of Uncontrolled Dosage: Inhaling uncalibrated volatile chemicals carried extreme risks: without knowledge of cardiac toxicity or respiratory depression, pioneers risked irreversible asphyxiation, sudden ventricular fibrillation, or accidental death (as later demonstrated by Hannah Greener in 1848, the first patient killed by a chloroform overdose).',
      ],
    },
    B: {
      hinge_question:
        'Joseph Lister and his assistants operate in dark frock coats while a machine pumps a fine cloud of carbolic acid mist over the patient. Why did British surgeons initially object to operating inside this dense carbolic cloud?',
      discussion_ideas: [
        "Physical Discomfort and Practical Operating Delays: The pungent carbolic acid spray irritated surgeons' eyes and lungs, caused chemical burns and cracked skin on their hands, and made instruments slippery; it also slowed down operating speeds in an era when surgeons took pride in amputating limbs in under a minute.",
        "Professional Resistance to Germ Theory: Many senior surgeons still believed in miasma and spontaneous generation; they took pride in operating in dirty, blood-stiffened frock coats as badges of experience, and deeply resented Lister's implication that the surgeon's own unwashed hands were killing patients with invisible microbes.",
      ],
    },
  },

  // LESSON 3.5 (KT3.5 Public Health & Cholera: John Snow, The Broad Street Pump & The 1875 Public Health Act)
  lesson_3_5: {
    A: {
      hinge_question:
        "Notice the barefoot children playing in filthy mud heaps, open cesspools, and dilapidated tenement houses beneath the banner 'Good Beds'. What specific environmental factors in Victorian slum courts allowed water-borne diseases like cholera to spread so rapidly?",
      discussion_ideas: [
        'Unchecked Urban Overcrowding and Contaminated Water Supplies: Rapid industrial urbanization forced thousands into unpaved, undrained slum courtyards where overflowing cesspools and privies leaked directly through porous soil into shallow communal water pumps. Without piped clean water or refuse collection, inhabitants bathed, cooked, and drank from water saturated with raw sewage, allowing water-borne cholera bacteria (Vibrio cholerae) to spread through entire tenement blocks within hours.',
      ],
    },
    B: {
      hinge_question:
        'Notice how the black bars indicating cholera deaths cluster densely around the Broad Street water pump, while the nearby brewery recorded zero deaths. How did Snow use cartographic data to prove that cholera was water-borne rather than airborne miasma?',
      discussion_ideas: [
        'Epidemiological Spot-Mapping and Control Groups: Snow plotted every cholera death as a black bar on a Soho street map, showing an unmistakable physical cluster around the Broad Street pump, with deaths fading rapidly further away. Crucially, he investigated local anomalies to prove water-borne causation: 70 workers at the nearby Broad Street brewery drank only malt liquor from their own deep well and suffered zero cholera deaths, while a woman in distant Hampstead died after receiving water transported from Broad Street. This geographical correlation proved the disease was ingested in contaminated pump water rather than inhaled as miasma.',
      ],
    },
    C: {
      hinge_question:
        'Sir Joseph Bazalgette and engineers stand upon the massive brick-arched intercepting sewers under construction in London. Why did it take the political crisis of the Great Stink of 1858 outside Parliament, rather than working-class cholera deaths, to compel the government to fund this civil engineering project?',
      discussion_ideas: [
        'Laissez-Faire Governance and Indifference to the Poor: Throughout the 1830s to 1850s, the British government adhered to strict laissez-faire ideology, refusing to spend tax money or intervene in municipal sanitation; tens of thousands of working-class cholera deaths were treated as inevitable misfortunes or moral failings rather than national emergencies requiring public spending.',
        "Immediate Aristocratic Panic During the Great Stink of 1858: In the scorching summer of 1858, the River Thames was so choked with raw human sewage that the stench made Parliament unworkable; fearing for their own lives and believing miasma would poison the ruling class, MPs soaked curtains in chloride of lime, abandoned committee rooms, and passed Bazalgette's £3 million London Main Drainage bill in just 18 days.",
      ],
    },
  },
};

async function main() {
  console.log('🚀 Loading units/edexcel_medicine/data.js...');
  const mod = await import(pathToFileURL(dataJsPath).href);
  const unitData = mod.default || mod.unitData;

  let updatedSourcesCount = 0;
  let updatedNarrativeCount = 0;

  unitData.lessons.forEach((l) => {
    const pedLesson = INDUSTRIAL_MEDICINE_PEDAGOGY[l.id];
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
          updatedSourcesCount++;
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
            updatedNarrativeCount++;
            console.log(
              `  ✅ [narrative_blocks] Source ${letter} wired with ${b.source.discussion_ideas.length} idea(s)`,
            );
          }
        }
      });
    }
  });

  console.log(
    `\n🎉 Total sources updated: ${updatedSourcesCount} in l.sources, ${updatedNarrativeCount} in narrative_blocks`,
  );

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

  console.log('\n🏁 Completed Edexcel Medicine Key Topic 3 enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
