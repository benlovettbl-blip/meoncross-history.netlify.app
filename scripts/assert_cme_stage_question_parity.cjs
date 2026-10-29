const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dbPath = path.join(rootDir, 'public/database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const cmeUnit = db.cme_new || db.units?.cme_new;
if (!cmeUnit) {
  console.error('Could not find cme_new in database.json');
  process.exit(1);
}

const lessons = cmeUnit.data.lessons;

// Function to extract stage banners from a workbook HTML
function extractStagesFromWorkbook(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const bannerBlocks = html.split('<div class="stage-banner"').slice(1);
  const stages = [];

  bannerBlocks.forEach((chunk) => {
    const rawChunk = chunk.split('</div>')[0];
    const spans = [...rawChunk.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/gi)]
      .map((m) => m[1].replace(/<[^>]+>/g, '').trim())
      .filter((s) => s && s !== '&bull;' && s !== '•');

    if (spans.length >= 2) {
      // If format is [badge, "Date • Question"]
      if (spans.length === 2) {
        const badge = parseInt(spans[0], 10);
        const parts = spans[1].split(/[•\u2022]|&bull;/);
        let date = '';
        let question = spans[1];
        if (parts.length > 1) {
          date = parts[0].trim();
          question = parts.slice(1).join('•').trim();
        }
        stages.push({ step: badge, date, question });
      } else {
        // Format is [badge, date, question]
        const badge = parseInt(spans[0], 10);
        const date = spans[1].trim();
        const question = spans[2].trim();
        stages.push({ step: badge, date, question });
      }
    }
  });

  return stages;
}

const kt1Stages = extractStagesFromWorkbook(
  path.join(rootDir, 'public/units/cme_new/pupil_workbook_KT1.html'),
);
const kt2Stages = extractStagesFromWorkbook(
  path.join(rootDir, 'public/units/cme_new/pupil_workbook_KT2.html'),
);
const kt3Stages = extractStagesFromWorkbook(
  path.join(rootDir, 'public/units/cme_new/pupil_workbook_KT3.html'),
);

console.log(`Extracted stages from workbooks:`);
console.log(`  KT1: ${kt1Stages.length} stages (5 enquiries)`);
console.log(`  KT2: ${kt2Stages.length} stages (5 enquiries)`);
console.log(`  KT3: ${kt3Stages.length} stages (5 enquiries)`);

const normalize = (t) => t.replace(/[""]/g, '"').replace(/['’]/g, "'").replace(/\s+/g, ' ').trim();

let totalPassed = 0;
let errors = [];

// Audit Lesson 1 (KT 1.0) against KT1 Enquiry 1 (stages 0..4)
console.log('\n--- Auditing Lesson 1 (KT 1.0) vs KT1 Enquiry 1 ---');
lessons[0].causal_domino_spine.stages.forEach((st, sIdx) => {
  const wbStage = kt1Stages[sIdx];
  if (normalize(st.question) === normalize(wbStage.question)) {
    console.log(`  ✅ Stage ${st.step}: "${st.question}"`);
    totalPassed++;
  } else {
    console.log(`  ❌ MISMATCH Stage ${st.step}:`);
    console.log(`     DB: "${st.question}"`);
    console.log(`     WB: "${wbStage.question}"`);
    errors.push({ lesson: lessons[0].id, stage: st.step });
  }
});

// Audit Lesson 2 (KT 1.1) against KT1 Enquiry 2 (stages 5..9)
console.log('\n--- Auditing Lesson 2 (KT 1.1) vs KT1 Enquiry 2 ---');
lessons[1].causal_domino_spine.stages.forEach((st, sIdx) => {
  const wbStage = kt1Stages[5 + sIdx];
  if (normalize(st.question) === normalize(wbStage.question)) {
    console.log(`  ✅ Stage ${st.step}: "${st.question}"`);
    totalPassed++;
  } else {
    console.log(`  ❌ MISMATCH Stage ${st.step}:`);
    console.log(`     DB: "${st.question}"`);
    console.log(`     WB: "${wbStage.question}"`);
    errors.push({ lesson: lessons[1].id, stage: st.step });
  }
});

// Audit Lesson 4 (KT 1.3) against KT1 Enquiry 5 (stages 20..24)
console.log('\n--- Auditing Lesson 4 (KT 1.3) vs KT1 Enquiry 5 ---');
lessons[3].causal_domino_spine.stages.forEach((st, sIdx) => {
  const wbStage = kt1Stages[20 + sIdx];
  if (normalize(st.question) === normalize(wbStage.question)) {
    console.log(`  ✅ Stage ${st.step}: "${st.question}"`);
    totalPassed++;
  } else {
    console.log(`  ❌ MISMATCH Stage ${st.step}:`);
    console.log(`     DB: "${st.question}"`);
    console.log(`     WB: "${wbStage.question}"`);
    errors.push({ lesson: lessons[3].id, stage: st.step });
  }
});

// Audit KT2 Lessons 5..9 against KT2 Enquiries 1..5
console.log('\n--- Auditing KT2 Lessons (Lessons 5–9) vs KT2 Enquiries 1–5 ---');
[4, 5, 6, 7, 8].forEach((lIdx, enqIdx) => {
  const l = lessons[lIdx];
  console.log(`\nLesson ${lIdx + 1} (${l.id}):`);
  l.causal_domino_spine.stages.forEach((st, sIdx) => {
    const wbStage = kt2Stages[enqIdx * 5 + sIdx];
    if (normalize(st.question) === normalize(wbStage.question)) {
      console.log(`  ✅ Stage ${st.step}: "${st.question}"`);
      totalPassed++;
    } else {
      console.log(`  ❌ MISMATCH Stage ${st.step}:`);
      console.log(`     DB: "${st.question}"`);
      console.log(`     WB: "${wbStage.question}"`);
      errors.push({ lesson: l.id, stage: st.step });
    }
  });
});

console.log('\n======================================================');
console.log(`Total Stages Verified with 100% Parity: ${totalPassed}`);
if (errors.length === 0) {
  console.log('🎉 ALL AUDITED STAGES MATCH PRINTED WORKBOOK QUESTIONS WITH ZERO DRIFT!');
} else {
  console.log(`⚠️ ${errors.length} mismatches detected.`);
}
console.log('======================================================');
