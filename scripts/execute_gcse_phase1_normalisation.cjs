/**
 * scripts/execute_gcse_phase1_normalisation.cjs
 *
 * Phase 1 Execution of the GCSE Units Parity & Alignment Plan:
 * 1. Unify edexcel_medicine.json Do Now tasks from flat arrays [{q, a}] into standard object schema:
 *    { type: "retrieval_starter", title, instructions, items: [{question, answer}] }
 * 2. Normalize cme_new.json lesson IDs from lesson_1..lesson_13 to Key Topic format (lesson_1_1..lesson_3_3),
 *    resolve the missing lesson_5 anomaly, and ensure all 12 lessons have explicit enquiry_question fields.
 * 3. Update timeline lesson_banner_id references in cme_new.
 * 4. Sync public/data/, data/, and units/ files.
 * 5. Rebuild public/database.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Canonical CME Enquiry Questions & Topics
const CME_ENQUIRIES = [
  {
    oldId: 'lesson_1',
    newId: 'lesson_1_1',
    kt: 'KT1: The Birth of the State of Israel (1945–1963)',
    enquiryQuestion:
      'Why did British imperial diplomacy and contradictory wartime promises make conflict in Palestine unavoidable?',
  },
  {
    oldId: 'lesson_2',
    newId: 'lesson_1_2',
    kt: 'KT1: The Birth of the State of Israel (1945–1963)',
    enquiryQuestion:
      'How did the Zionist paramilitary insurgency break British will and secure the State of Israel in the 1948 War?',
  },
  {
    oldId: 'lesson_3',
    newId: 'lesson_1_3',
    kt: 'KT1: The Birth of the State of Israel (1945–1963)',
    enquiryQuestion:
      'How did the 1948–49 War create the Palestinian refugee crisis and reshape Middle Eastern demographics?',
  },
  {
    oldId: 'lesson_4',
    newId: 'lesson_1_4',
    kt: 'KT1: The Birth of the State of Israel (1945–1963)',
    enquiryQuestion:
      'How did the 1956 Suez Crisis destroy European imperial power and elevate Nasser to the hero of the Arab world?',
  },
  {
    oldId: 'lesson_6',
    newId: 'lesson_2_1',
    kt: 'KT2: Escalating Conflict (1964–1973)',
    enquiryQuestion:
      'How did clashes over the River Jordan water supply and Syrian border skirmishes push the Middle East to war by 1967?',
  },
  {
    oldId: 'lesson_7',
    newId: 'lesson_2_2',
    kt: 'KT2: Escalating Conflict (1964–1973)',
    enquiryQuestion:
      'Why was the Six-Day War decided in three hours, and how did Israel conquer an empire in six days?',
  },
  {
    oldId: 'lesson_8',
    newId: 'lesson_2_3',
    kt: 'KT2: Escalating Conflict (1964–1973)',
    enquiryQuestion:
      'Why did the territorial conquests of 1967 entrench permanent stalemate instead of bringing peace?',
  },
  {
    oldId: 'lesson_9',
    newId: 'lesson_2_4',
    kt: 'KT2: Escalating Conflict (1964–1973)',
    enquiryQuestion:
      'How did Palestinian fedayeen transform from refugees into global armed revolutionaries between 1968 and 1972?',
  },
  {
    oldId: 'lesson_10',
    newId: 'lesson_2_5',
    kt: 'KT2: Escalating Conflict (1964–1973)',
    enquiryQuestion:
      'Why did the 1973 Yom Kippur War catch Israel unprepared, and how did it shatter the regional status quo?',
  },
  {
    oldId: 'lesson_11',
    newId: 'lesson_3_1',
    kt: 'KT3: Attempts at Peace (1974–1995)',
    enquiryQuestion:
      'How did Anwar Sadat and Menachem Begin overcome thirty years of hostility to sign the Camp David Accords?',
  },
  {
    oldId: 'lesson_12',
    newId: 'lesson_3_2',
    kt: 'KT3: Attempts at Peace (1974–1995)',
    enquiryQuestion:
      'How did the 1982 invasion of Lebanon and the First Intifada reassert the Palestinian struggle on the global stage?',
  },
  {
    oldId: 'lesson_13',
    newId: 'lesson_3_3',
    kt: 'KT3: Attempts at Peace (1974–1995)',
    enquiryQuestion:
      'How close did the Oslo Accords come to achieving peace, and why did the peace process unravel by 1995?',
  },
];

const cmeIdMap = {};
CME_ENQUIRIES.forEach((item) => {
  cmeIdMap[item.oldId] = item.newId;
});

function normaliseMedicineDoNow(lessons) {
  let transformedCount = 0;
  lessons.forEach((lesson, idx) => {
    if (Array.isArray(lesson.do_now)) {
      lesson.do_now = {
        type: 'retrieval_starter',
        title: 'Recall & Retrieval',
        instructions: 'Answer these questions in full sentences.',
        items: lesson.do_now.map((item) => ({
          question: item.q || item.question || '',
          answer: item.a || item.answer || '',
        })),
      };
      transformedCount++;
    } else if (lesson.do_now && typeof lesson.do_now === 'object') {
      lesson.do_now.type = 'retrieval_starter';
      lesson.do_now.title = lesson.do_now.title || 'Recall & Retrieval';
      lesson.do_now.instructions =
        lesson.do_now.instructions || 'Answer these questions in full sentences.';
      if (lesson.do_now.tasks && !lesson.do_now.items) {
        lesson.do_now.items = lesson.do_now.tasks.map((t) => ({
          question: t.q || t.question || '',
          answer: t.a || t.answer || '',
        }));
      }
      transformedCount++;
    }
  });
  return transformedCount;
}

function normaliseCmeLessons(unitData) {
  const lessons = unitData.lessons || [];
  let updatedLessons = 0;

  lessons.forEach((lesson, idx) => {
    const meta = CME_ENQUIRIES[idx];
    if (meta) {
      const oldId = lesson.id;
      lesson.id = meta.newId;
      lesson.enquiry_question = meta.enquiryQuestion;
      lesson.enquiry = meta.enquiryQuestion;
      lesson.key_topic = meta.kt;
      updatedLessons++;
      console.log(
        `  - Lesson ${idx + 1}: ${oldId} -> ${lesson.id} | Enquiry: "${lesson.enquiry_question.substring(0, 45)}..."`,
      );
    }
  });

  // Also update timeline lesson_banner_id references
  let updatedTimelineBanners = 0;
  if (Array.isArray(unitData.timeline)) {
    unitData.timeline.forEach((evt) => {
      if (evt.lesson_banner_id && cmeIdMap[evt.lesson_banner_id]) {
        evt.lesson_banner_id = cmeIdMap[evt.lesson_banner_id];
        updatedTimelineBanners++;
      }
    });
  }

  return { updatedLessons, updatedTimelineBanners };
}

async function runPhase1() {
  console.log('======================================================');
  console.log('🚀 EXECUTING GCSE PHASE 1: SCHEMA & STRUCTURAL NORMALISATION');
  console.log('======================================================\n');

  // ------------------------------------------------------------------
  // 1. Edexcel Medicine Do Now Normalisation
  // ------------------------------------------------------------------
  console.log('📦 STEP 1: Normalising Edexcel Medicine Do Now Tasks...');

  // 1A. public/data/edexcel_medicine.json
  const pubMedPath = path.join(ROOT_DIR, 'public', 'data', 'edexcel_medicine.json');
  const pubMed = JSON.parse(fs.readFileSync(pubMedPath, 'utf8'));
  const medLessons = pubMed.data.lessons;
  const countA = normaliseMedicineDoNow(medLessons);
  fs.writeFileSync(pubMedPath, JSON.stringify(pubMed, null, 2), 'utf8');
  console.log(
    `  ✔ Successfully transformed ${countA} lessons in public/data/edexcel_medicine.json`,
  );

  // 1B. data/edexcel_medicine.json (if exists)
  const rootDataMedPath = path.join(ROOT_DIR, 'data', 'edexcel_medicine.json');
  if (fs.existsSync(rootDataMedPath)) {
    const rootMed = JSON.parse(fs.readFileSync(rootDataMedPath, 'utf8'));
    const lessonsToNorm = rootMed.data?.lessons || rootMed.lessons || [];
    const countB = normaliseMedicineDoNow(lessonsToNorm);
    fs.writeFileSync(rootDataMedPath, JSON.stringify(rootMed, null, 2), 'utf8');
    console.log(`  ✔ Successfully transformed ${countB} lessons in data/edexcel_medicine.json`);
  }

  // 1C. units/edexcel_medicine/data.js
  const unitMedPath = path.join(ROOT_DIR, 'units', 'edexcel_medicine', 'data.js');
  if (fs.existsSync(unitMedPath)) {
    const medMod = await import('file:///' + unitMedPath.replace(/\\/g, '/'));
    const medUnitData = medMod.default || medMod.unitData;
    if (medUnitData && medUnitData.lessons) {
      normaliseMedicineDoNow(medUnitData.lessons);
      const jsContent = `export default ${JSON.stringify(medUnitData, null, 2)};\n`;
      fs.writeFileSync(unitMedPath, jsContent, 'utf8');
      console.log(`  ✔ Successfully synced units/edexcel_medicine/data.js`);
    }
  }

  // ------------------------------------------------------------------
  // 2. Conflict in the Middle East (cme_new) Normalisation
  // ------------------------------------------------------------------
  console.log(
    '\n📦 STEP 2: Normalising Conflict in the Middle East (cme_new) IDs & Enquiry Questions...',
  );

  // 2A. public/data/cme_new.json
  const pubCmePath = path.join(ROOT_DIR, 'public', 'data', 'cme_new.json');
  const pubCme = JSON.parse(fs.readFileSync(pubCmePath, 'utf8'));
  const cmeResultsA = normaliseCmeLessons(pubCme.data);
  fs.writeFileSync(pubCmePath, JSON.stringify(pubCme, null, 2), 'utf8');
  console.log(
    `  ✔ Successfully normalised ${cmeResultsA.updatedLessons} lessons & ${cmeResultsA.updatedTimelineBanners} timeline banners in public/data/cme_new.json`,
  );

  // 2B. data/cme_new.json (if exists)
  const rootDataCmePath = path.join(ROOT_DIR, 'data', 'cme_new.json');
  if (fs.existsSync(rootDataCmePath)) {
    const rootCme = JSON.parse(fs.readFileSync(rootDataCmePath, 'utf8'));
    const targetData = rootCme.data || rootCme;
    const cmeResultsB = normaliseCmeLessons(targetData);
    fs.writeFileSync(rootDataCmePath, JSON.stringify(rootCme, null, 2), 'utf8');
    console.log(
      `  ✔ Successfully normalised ${cmeResultsB.updatedLessons} lessons & ${cmeResultsB.updatedTimelineBanners} timeline banners in data/cme_new.json`,
    );
  }

  // 2C. units/cme_new/data.js
  const unitCmePath = path.join(ROOT_DIR, 'units', 'cme_new', 'data.js');
  if (fs.existsSync(unitCmePath)) {
    const cmeMod = await import('file:///' + unitCmePath.replace(/\\/g, '/'));
    const cmeUnitData = cmeMod.default || cmeMod.unitData;
    if (cmeUnitData && cmeUnitData.lessons) {
      normaliseCmeLessons(cmeUnitData);
      const jsContent = `const unitData = ${JSON.stringify(cmeUnitData, null, 2)};\nexport default unitData;\nexport { unitData };\nif (typeof module !== 'undefined' && module.exports) {\n  module.exports = unitData;\n}\n`;
      fs.writeFileSync(unitCmePath, jsContent, 'utf8');
      console.log(`  ✔ Successfully synced units/cme_new/data.js`);
    }
  }

  // ------------------------------------------------------------------
  // 3. Update workbook_page_map.json and workbook_page_map.js
  // ------------------------------------------------------------------
  console.log('\n📦 STEP 3: Updating Workbook Page Mappings...');
  const mapJsonPath = path.join(ROOT_DIR, 'src', 'engine', 'workbook_page_map.json');
  const mapJsPath = path.join(ROOT_DIR, 'src', 'engine', 'workbook_page_map.js');

  if (fs.existsSync(mapJsonPath)) {
    const mapJson = JSON.parse(fs.readFileSync(mapJsonPath, 'utf8'));
    if (mapJson.cme_new) {
      Object.keys(cmeIdMap).forEach((oldId) => {
        const newId = cmeIdMap[oldId];
        if (mapJson.cme_new[oldId]) {
          mapJson.cme_new[newId] = Object.assign({}, mapJson.cme_new[oldId]);
        }
      });
      fs.writeFileSync(mapJsonPath, JSON.stringify(mapJson, null, 2), 'utf8');
      console.log(`  ✔ Updated ${mapJsonPath} with normalised CME lesson IDs`);
    }
  }

  if (fs.existsSync(mapJsPath)) {
    const mapJsContent = fs.readFileSync(mapJsPath, 'utf8');
    // Extract JSON portion or update object
    const startIdx = mapJsContent.indexOf('{');
    const endIdx = mapJsContent.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1) {
      try {
        const parsedMap = JSON.parse(mapJsContent.substring(startIdx, endIdx + 1));
        if (parsedMap.cme_new) {
          Object.keys(cmeIdMap).forEach((oldId) => {
            const newId = cmeIdMap[oldId];
            if (parsedMap.cme_new[oldId]) {
              parsedMap.cme_new[newId] = Object.assign({}, parsedMap.cme_new[oldId]);
            }
          });
          const newJsContent = `// Workbook and Textbook Page Mapping Dictionary\nexport const WORKBOOK_PAGE_MAP = ${JSON.stringify(parsedMap, null, 2)};\nexport default WORKBOOK_PAGE_MAP;\n`;
          fs.writeFileSync(mapJsPath, newJsContent, 'utf8');
          console.log(`  ✔ Updated ${mapJsPath} with normalised CME lesson IDs`);
        }
      } catch (err) {
        console.warn(`  ⚠️ Could not parse workbook_page_map.js as JSON: ${err.message}`);
      }
    }
  }

  // ------------------------------------------------------------------
  // 4. Rebuild Database
  // ------------------------------------------------------------------
  console.log('\n📦 STEP 4: Rebuilding public/database.json...');
  const { execSync } = require('child_process');
  execSync('node scripts/build_database.cjs', { cwd: ROOT_DIR, stdio: 'inherit' });

  console.log('\n🎉 Phase 1 Normalisation Completed Successfully!\n');
}

runPhase1().catch((err) => {
  console.error('❌ Phase 1 Execution Error:', err);
  process.exit(1);
});
