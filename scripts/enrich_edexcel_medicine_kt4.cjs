const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'edexcel_medicine', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'edexcel_medicine.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const MODERN_MEDICINE_PEDAGOGY = {
  // LESSON 4.1 (KT4.1 Ideas on Causes: Genetics, DNA & The Human Genome Project)
  lesson_4_1: {
    A: {
      hinge_question:
        'How does the sharp X-pattern in Franklin’s X-ray photograph mathematically prove that DNA is a helical coil rather than a flat chain, and why was this physical evidence critical for Watson and Crick’s model?',
      discussion_ideas: [
        "Franklin’s high-resolution X-ray diffraction plate revealed a definitive diagnostic 'X' pattern with distinct layer lines, which mathematically proved that DNA had a helical symmetry with repeating turns of 34 Ångströms. Shown to Watson without Franklin’s knowledge by Maurice Wilkins, this quantitative physical measurement confirmed that the phosphate backbone had to be on the outside rather than the inside, allowing Watson and Crick to construct their accurate double-helix model.",
      ],
    },
    B: {
      hinge_question:
        'Why was proving the exact base-pairing mechanism (A-T and C-G) the decisive breakthrough in understanding how genetic hereditary information replicates and passes between generations?',
      discussion_ideas: [
        'Identifying the strict hydrogen-bonding rules of complementary base-pairing (Adenine only bonds with Thymine, and Cytosine only with Guanine) solved the fundamental secret of biological inheritance: when the two helical strands unzip during cell division, each strand acts as an automatic physical template for synthesizing an identical replica. This explained how genetic code is accurately copied, passed down generations, and how gene mutations can trigger hereditary disorders.',
      ],
    },
  },

  // LESSON 4.2 (KT4.2 Lifestyle Factors & The Technological Revolution in Diagnosis)
  lesson_4_2: {
    A: {
      hinge_question:
        'How did Röntgen’s discovery of X-rays fundamentally overturn thousands of years of medical diagnosis by allowing physicians to view internal pathology without making an incision?',
      discussion_ideas: [
        "Prior to 1895, doctors could only inspect internal anatomy through external palpation, listening with stethoscopes, or performing risky, invasive exploratory surgery. Röntgen's X-rays passed through soft flesh while being absorbed by dense bone and metal, creating an immediate non-invasive photographic silhouette of fractures, embedded bullets, and bone disease, allowing surgeons to diagnose and plan procedures precisely before cutting.",
      ],
    },
    B: {
      hinge_question:
        'In what way did computerized axial tomography (CT scanning) overcome the fundamental 2D flattening limitation of traditional Röntgen X-rays when diagnosing soft-tissue brain tumours?',
      discussion_ideas: [
        "Cross-Sectional Slices Overcoming 2D Superimposition: Traditional X-rays flatten 3D organs into a single 2D shadow where overlapping bones (such as the thick skull) obscure delicate underlying tissues; Hounsfield’s CT scanner rotates an X-ray beam around the patient's head, taking thousands of density measurements to construct razor-sharp cross-sectional 3D slices.",
        'High-Resolution Soft-Tissue Differentiation: Unlike conventional X-ray film, which cannot differentiate between brain tissue and adjacent tumours because they have nearly identical radiological densities, computerized processing amplifies subtle density variations, enabling doctors to pinpoint soft-tissue cancers, blood clots, and strokes without invasive surgery.',
      ],
    },
  },

  // LESSON 4.3 (KT4.3 The Search for Magic Bullets, High-Tech Treatments & The Birth of the NHS)
  lesson_4_3: {
    A: {
      hinge_question:
        'How did Ehrlich’s concept of a synthetic ‘magic bullet’ represent a radical departure from traditional botanical remedies and universal germ-killing antiseptics like carbolic acid?',
      discussion_ideas: [
        'Selective Toxicity vs Indiscriminate Poisoning: Antiseptics like carbolic acid killed bacteria but were lethal to human cells if ingested or injected into the bloodstream; Ehrlich realized that synthetic chemical compounds (like Salvarsan 606) could be engineered to latch onto and destroy specific microbial pathogens without harming surrounding human tissues.',
        'Systematic Chemical Synthesis vs Empirical Herbalism: Rather than relying on random herbal traditions or trial-and-error folk mixtures, Ehrlich and Hata tested hundreds of systematically modified chemical dye derivatives in controlled laboratory trials, establishing the foundation of modern targeted pharmaceutical chemotherapy.',
      ],
    },
    B: {
      hinge_question:
        'How does the universal entitlement outlined in this 1948 leaflet demonstrate a permanent structural rejection of the 19th-century Victorian Poor Law and voluntary hospital system?',
      discussion_ideas: [
        'Universal Healthcare as a Legal Human Right: Under the Victorian Poor Law and voluntary hospital system, medical treatment depended on charitable donations, means-testing, or workhouse infirmaries; the 1948 NHS dismantled this stigma by providing medical, dental, and ophthalmic care free at the point of delivery to all British citizens regardless of wealth.',
        'Nationalised State Infrastructure vs Patchwork Philanthropy: The NHS nationalized over 3,000 municipal and voluntary hospitals into a centrally funded state network, guaranteeing that high-quality modern surgery, specialist consultants, and hospital care were distributed equitably across poor industrial towns rather than concentrated only in affluent philanthropic cities.',
      ],
    },
  },

  // LESSON 4.4 (KT4.4 Case Study 1: The Antibiotic Revolution: Fleming, Florey & Chain and Penicillin)
  lesson_4_4: {
    A: {
      hinge_question:
        'Why was Fleming unable to translate his brilliant 1928 laboratory observation of penicillin’s antibacterial halo into an injectable medicine for human clinical patients?',
      discussion_ideas: [
        'Extreme Chemical Instability and Purification Difficulties: Penicillin was produced in tiny trace amounts by the Penicillium notatum mould and broke down almost immediately in solution; as a bacteriologist rather than an organic chemist, Fleming lacked the biochemical expertise and equipment needed to isolate, purify, and stabilise the fragile active molecule.',
        'Lack of Institutional Funding and Clinical Vision: Fleming viewed penicillin primarily as a topical antiseptic for local wounds or a laboratory reagent to isolate bacteria in petri dishes; without commercial pharmaceutical backing or government research grants in the 1930s, he could not produce the industrial quantities needed to conduct human clinical trials.',
      ],
    },
    B: {
      hinge_question:
        'Why was the industrial transition from surface culture bottles to 10,000-gallon aerated deep-tank fermentation vats the decisive factor in saving thousands of Allied soldiers in 1944?',
      discussion_ideas: [
        'Growing mould on the surface of milk bottles, bedpans, and glass flasks in Oxford produced only milligrams of penicillin—barely enough to treat a single patient. By taking the mould to the US Department of Agriculture in Peoria, Florey and Heatley discovered that corn-steep liquor and deep-tank fermentation vats with sterile air agitation boosted yields a thousand-fold; this industrial breakthrough allowed American chemical companies to mass-produce 2.3 million doses in time for the D-Day Normandy landings in June 1944, drastically reducing wound infections and gangrene.',
      ],
    },
  },

  // LESSON 4.5 (KT4.5 Case Study 2: Public Health & The Fight Against Lung Cancer)
  lesson_4_5: {
    A: {
      hinge_question:
        'How did corporate tobacco advertising exploit the professional authority of medical practitioners to suppress public awareness of smoking hazards prior to Doll and Hill’s 1950 epidemiological study?',
      discussion_ideas: [
        "Co-opting Medical Prestige for Commercial Deception: Tobacco companies deliberately featured illustrations of trusted, white-coated physicians in national magazines, using deceptive slogans ('More Doctors Smoke Camels') to reassure smokers that cigarettes were medically endorsed, throat-soothing, and harmless to human respiratory health.",
        'Pre-Epidemiological Ignorance of Chronic Lifestyle Disease: Prior to Richard Doll and Austin Bradford Hill’s groundbreaking 1950 statistical study connecting smoking to lung cancer, doctors themselves believed cancer was caused by urban coal smoke or tarmac dust; corporate advertising exploited this scientific uncertainty to normalize smoking as a healthy, sophisticated lifestyle habit.',
      ],
    },
    B: {
      hinge_question:
        'How does the transition from unregulated commercial advertising (Source A) to state-mandated plain packaging (Source B) illustrate the changing role of government intervention in 20th- and 21st-century public health?',
      discussion_ideas: [
        'Shift from Laissez-Faire Commercial Freedom to Active State Regulation: In the mid-20th century, tobacco companies operated with complete commercial freedom to market addictive products; modern plain packaging laws demonstrate that governments now override private corporate profits with aggressive statutory mandates to protect citizens from chronic, preventable lifestyle diseases.',
        'Evolution from Treatment to Aggressive Preventive Deterrence: Rather than merely funding NHS chemotherapy and palliative care after lung cancer develops, modern public health strategy uses graphic pictorial warnings, high taxation, and standardized drab packaging to deter teenagers from smoking in the first place, cementing prevention as the core pillar of 21st-century healthcare.',
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
    const pedLesson = MODERN_MEDICINE_PEDAGOGY[l.id];
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

  console.log('\n🏁 Completed Edexcel Medicine Key Topic 4 enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
