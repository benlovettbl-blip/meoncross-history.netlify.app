const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const rootDir = path.resolve(__dirname, '..');
const dataJsPath = path.join(rootDir, 'units', 'edexcel_medicine', 'data.js');
const pubJsonPath = path.join(rootDir, 'public', 'data', 'edexcel_medicine.json');
const dbPath = path.join(rootDir, 'public', 'database.json');

const WESTERN_FRONT_PEDAGOGY = {
  // LESSON 5.1 (KT5.1 The Theatre of War: The British Sector, Trench Geography & Battles)
  lesson_5_1: {
    A: {
      hinge_question:
        'Study Source A. How does the zig-zag design of the trenches shown in the photograph explain how British defensive engineers sought to protect soldiers from artillery shrapnel and machine-gun fire?',
      discussion_ideas: [
        'The zig-zag pattern with ninety-degree traverses ensured that trenches were never dug in straight lines: if an enemy artillery shell exploded in a trench bay, the blast wave and flying shrapnel were absorbed by the earth revetments of the traverse, protecting soldiers around the corner. Additionally, if German raiding parties entered a trench line, the zig-zag turns prevented them from firing rifles or machine guns straight down the length of the trench (enfilade fire).',
      ],
    },
    B: {
      hinge_question:
        'How does the physical state of the trench in Source B illustrate why carrying wounded soldiers by stretcher to dressing stations frequently took up to ten hours?',
      discussion_ideas: [
        'The photograph shows deep, waist-high liquid mud, collapsed trench walls, and submerged duckboards, turning communication trenches into impassable swamps. Stretcher bearers carrying heavy casualties could not walk normally; slipping on floating boards and fighting suction in the clay, teams of four to six men became rapidly exhausted and had to move at a slow crawl, extending transit times to Advanced Dressing Stations from minutes to ten grueling hours.',
      ],
    },
  },

  // LESSON 5.2 (KT5.2 The Trench Environment: Mud, Vermin & Non-Combat Illnesses)
  lesson_5_2: {
    A: {
      hinge_question:
        'Study Source A. How does this photograph illustrate the harsh living conditions in frontline trenches that made soldiers vulnerable to physical exhaustion and non-combat illnesses like trench fever?',
      discussion_ideas: [
        'Vermin Infestation and Trench Fever Vector: Men are huddled in damp woolen uniforms without access to laundry or bathing; these unsanitary conditions allowed body lice (Pediculus humanus) to thrive in clothing seams, transmitting trench fever through louse faeces rubbed into broken skin and causing high fever, joint agony, and weeks off the line.',
        'Chronic Sleep Deprivation and Physical Exposure: The cramped duckboards, unroofed dugouts, and constant parapet sentry rotations exposed men to continuous freezing damp and shellfire vibration, preventing restorative sleep and leaving soldiers immuno-compromised and physically exhausted.',
      ],
    },
    B: {
      hinge_question:
        'How does the underground construction of the Ramparts Dressing Station in Source B explain how the RAMC adapted existing architecture to protect casualties from artillery fire and wet weather?',
      discussion_ideas: [
        'Built deep into the massive 17th-century brick and earth ramparts designed by Vauban to encircle Ypres, this subterranean medical station utilized meters of solid brick vaulting and earth revetments to provide bomb-proof shelter completely impervious to heavy German artillery shells and poison gas. This allowed RAMC surgeons to administer emergency wound dressings, treat surgical shock, and stabilize casualties safely beneath the bombardment before evacuating them rearward.',
      ],
    },
  },

  // LESSON 5.3 (KT5.3 Battlefield Trauma: High Explosive Shrapnel, Gas Attacks & Infection)
  lesson_5_3: {
    A: {
      hinge_question:
        'Study Source A. How does this clinical photograph illustrate the severity of anaerobic bacterial infections like gangrene when soil bacteria entered damaged, devitalized human flesh?',
      discussion_ideas: [
        "Flanders farmland had been intensively fertilized with animal manure for centuries, saturating the mud with lethal anaerobic bacteria (specifically Clostridium perfringens and tetanus spores). When high-explosive shrapnel drove contaminated muddy uniform cloth into deep muscular wounds where oxygen was cut off, the anaerobic bacteria multiplied rapidly, producing toxins and gas bubbles that destroyed healthy tissue (gas gangrene), leaving surgeons no choice but radical excision (debridement) or amputation within hours to save the soldier's life.",
      ],
    },
    B: {
      hinge_question:
        'Study Source B. How does this photograph illustrate both the vital protective value of early anti-gas helmets and the severe physical difficulties experienced by soldiers fighting while wearing them?',
      discussion_ideas: [
        "Vital Chemical Neutralization: The flannel Phenate-Hexamine (PH) helmet dipped in chemical neutralizers protected soldiers' lungs from lethal chlorine and phosgene gas, which caused pulmonary edema (drowning in lung fluid), allowing gunners to maintain defensive fire during chemical attacks.",
        'Extreme Sensory and Respiratory Impairment: The mica eyepieces fogged up almost instantly from heavy perspiration, drastically restricting peripheral vision and aiming accuracy; furthermore, breathing through chemically treated flannel while operating a heavy Vickers machine gun caused severe suffocation sensations and heat exhaustion.',
      ],
    },
  },

  // LESSON 5.4 (KT5.4 The Chain of Evacuation: Stretcher Bearers, RAP, Dressing Stations & CCS)
  lesson_5_4: {
    A: {
      hinge_question:
        'Study Source A. How does this photograph illustrate why transporting wounded soldiers across devastated battlefields to dressing stations required up to six bearers and took many exhausting hours?',
      discussion_ideas: [
        'In the cratered wasteland of the Third Battle of Ypres, artillery barrages had pulverized the drainage dykes, turning the terrain into a sea of liquid mud several feet deep. While a standard stretcher team was two to four men, the immense suction of the mud and the danger of slipping into deep shell craters meant six bearers were required to keep the stretcher stable and prevent the wounded man from drowning, rotating positions continuously under sniper and shell fire.',
      ],
    },
    B: {
      hinge_question:
        'How does the use of converted canal barges shown in Source B explain how the RAMC adapted natural infrastructure to improve casualty survival during transit to Base Hospitals?',
      discussion_ideas: [
        'Smooth, Shock-Free Transport for Severe Casualties: Transporting men with compound fractures or fresh abdominal surgery by horse-drawn ambulance or springless motor lorries over shell-cratered roads caused agonizing pain, reopened surgical wounds, and induced fatal hemorrhage; canal barges glided smoothly along French waterways without jarring vibrations, dramatically reducing transit mortality.',
        'High-Capacity Mobile Hospital Facilities: French barges could hold up to 30 lying patients in heated, well-ventilated berths with clean bedding and dedicated QAIMNS nurses, allowing ongoing medical care and intravenous saline drips during journeys to coastal base hospitals in Boulogne and Calais.',
      ],
    },
  },

  // LESSON 5.5 (KT5.5 Surgical Breakthroughs: The Thomas Splint, Wound Debridement & Mobile X-Rays)
  lesson_5_5: {
    A: {
      hinge_question:
        'Study Source A. How does the mechanical design of the Thomas Splint shown in the photograph explain why survival rates for fractured femurs rose from 20% in 1914 to 80% by 1917?',
      discussion_ideas: [
        'Developed by Hugh Owen Thomas and introduced to the front in 1915 by his nephew Robert Jones, the splint utilized a padded leather ring fitting firmly against the groin and pelvic bone, connected to rigid steel side bars and a foot-traction stirrup. By pulling the leg taut under continuous traction, it stopped broken jagged femur bone ends from grinding together, tearing the femoral artery (which caused fatal internal hemorrhage), and piercing skin, reducing surgical shock and increasing compound femur fracture survival from 20% in 1914 to 82% by 1917.',
      ],
    },
    B: {
      hinge_question:
        'How does the operating environment shown in Source B illustrate the transition of Casualty Clearing Stations from simple triage huts into advanced surgical hospitals?',
      discussion_ideas: [
        "Immediate Life-Saving Surgery Within the Golden Hour: In 1914, CCSs were small triage posts that merely bandaged casualties before sending them by train to base hospitals; by 1917, they were massive tented hospital complexes located safely beyond artillery range, equipped with multiple operating tables so surgeons could perform urgent laparotomies (abdominal surgeries) and wound debridements within the critical 'golden hours' before sepsis set in.",
        'Advanced Surgical Technology and Sterilisation: As shown in the photograph, 1917 CCS operating theatres featured mobile electric generators, pressurized steam autoclaves for sterilizing surgical instruments, specialized QAIMNS nursing sisters, and dedicated anesthetic equipment, matching the standards of civilian teaching hospitals in London.',
      ],
    },
  },

  // LESSON 5.6 (KT5.6 Lifesaving Innovations: Blood Storage, Brain Surgery & Plastic Reconstruction)
  lesson_5_6: {
    A: {
      hinge_question:
        'Study Source A. How does this blood storage apparatus explain how medical officers at the Battle of Cambrai were able to treat soldiers suffering from severe shock before operations began?',
      discussion_ideas: [
        "Prior to 1917, blood transfusions required a live donor connected directly to a patient by rubber tubes, which was impossible during mass-casualty offensives. Captain Oswald Robertson added sodium citrate to prevent blood from clotting and glucose to preserve red blood cells, packing the bottled Type O universal donor blood in sawdust and ice chests ('blood depots'). At the Battle of Cambrai in November 1917, medical officers transfused stored blood directly into soldiers arriving in severe hypovolemic shock, restoring blood pressure and enabling them to survive major emergency surgery.",
      ],
    },
    B: {
      hinge_question:
        'How does the mobile X-ray setup shown in Source B illustrate how technological advancements directly assisted specialized surgeons like Harvey Cushing and Harold Gillies?',
      discussion_ideas: [
        'Precision Localization of Shrapnel in Brain Surgery: American neurosurgeon Harvey Cushing relied on mobile X-ray radiograms to pinpoint the exact depth and trajectory of tiny shrapnel fragments embedded in the brain; using local anesthesia and specialized suction magnets, he removed metal splinters without tearing surrounding brain tissue, reducing brain surgery mortality from 50% to under 29%.',
        "Essential Groundwork for Facial Reconstruction: New Zealand surgeon Harold Gillies at the Queen’s Hospital in Sidcup used detailed X-rays to assess destroyed jawbones and facial fractures before designing innovative pedicle skin grafts (the 'tube pedicle'), using diagnostic imaging as the essential blueprint for modern plastic surgery.",
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
    const pedLesson = WESTERN_FRONT_PEDAGOGY[l.id];
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

  console.log('\n🏁 Completed Edexcel Medicine Key Topic 5 enrichment!');
}

main().catch((err) => {
  console.error('❌ Error executing enrich script:', err);
  process.exit(1);
});
