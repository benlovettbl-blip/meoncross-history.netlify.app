const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const databasePath = path.join(ROOT_DIR, 'public/database.json');
const db = JSON.parse(fs.readFileSync(databasePath, 'utf8'));

const targetUnits = [
  { id: 'water_and_sanitation', year: 'Year 7', title: 'Water & Sanitation Through Time' },
  { id: 'early_modern_world', year: 'Year 8', title: 'Early Modern World & Global Encounters' },
  { id: 'great_war', year: 'Year 9', title: 'Causes of the Great War (1890–1914)' },
];

console.log(
  '========================================================================================================',
);
console.log('🔍 KS3 PRACTICE ASSESSMENT SCAFFOLDING AUDIT');
console.log(
  '   Target Units: Year 7 Sanitation, Year 8 Early Modern, Year 9 Causes of the Great War',
);
console.log(
  '========================================================================================================\n',
);

targetUnits.forEach((u) => {
  const unitData = db[u.id]?.data;
  if (!unitData || !unitData.lessons) {
    console.log(`❌ Unit ${u.id} not found in database.`);
    return;
  }

  console.log(`\n### ${u.year}: ${u.title} (${u.id}) - ${unitData.lessons.length} Lessons`);
  console.log(
    '--------------------------------------------------------------------------------------------------------',
  );

  unitData.lessons.forEach((l, idx) => {
    const ext = l.extended || {};
    const la = l.lesson_assessment || {};
    const ep = l.exam_practice || {};
    const fa = l.formative_assessment || {};

    // Check fields across extended, lesson_assessment, exam_practice
    const question =
      ext.question || la.question || ep.question || fa.question || l.assessment_question || '';
    const wordBank = ext.word_bank || la.word_bank || ep.word_bank || [];
    const connectiveBank = ext.connective_bank || la.connective_bank || ep.connective_bank || [];
    const starters = ext.sentence_starters || la.sentence_starters || ep.sentence_starters || [];
    const hints = ext.hints || la.hints || ep.hints || [];
    const model = ext.model_answer || la.model_answer || ep.model_answer || fa.model_answer || '';

    const hasFullScaffold =
      wordBank.length > 0 &&
      connectiveBank.length > 0 &&
      starters.length > 0 &&
      hints.length > 0 &&
      model.length > 0;

    console.log(`Lesson ${idx + 1}: ${l.title}`);
    console.log(`  Question: ${question ? '✅ "' + question.slice(0, 50) + '..."' : '❌ NONE'}`);
    console.log(
      `  Word Bank:          ${wordBank.length > 0 ? `✅ (${wordBank.length} terms)` : '❌ MISSING'}`,
    );
    console.log(
      `  Connective Bank:    ${connectiveBank.length > 0 ? `✅ (${connectiveBank.length} connectives)` : '❌ MISSING'}`,
    );
    console.log(
      `  Sentence Starters:  ${starters.length > 0 ? `✅ (${starters.length} starters)` : '❌ MISSING'}`,
    );
    console.log(
      `  Hints / Structure:  ${hints.length > 0 ? `✅ (${hints.length} hints)` : '❌ MISSING'}`,
    );
    console.log(
      `  Model Answer:       ${model.length > 0 ? '✅ (' + model.slice(0, 40) + '...)' : '❌ MISSING'}`,
    );
    console.log(
      `  Status:             ${hasFullScaffold ? '🌟 COMPLETE (CME STANDARD)' : '⚠️ INCOMPLETE / NEEDS ENRICHMENT'}\n`,
    );
  });
});
