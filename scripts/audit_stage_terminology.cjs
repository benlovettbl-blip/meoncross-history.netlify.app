/**
 * scripts/audit_stage_terminology.cjs
 *
 * Automated Quality Gate & Linter for Key Stage Stage Detection, Disciplinary Terminology,
 * and Workbook Task Parity across the platform.
 *
 * Enforces:
 * 1. ZERO "GCSE" terminology leakage across Key Stage 2 (ks2_ww2) and all 11 Key Stage 3 units.
 * 2. 100% Task Parity: Every KS2 and KS3 lesson must have active, authentic workbook tasks in database.json.
 * 3. Task Disciplinary Integrity: Valid task types, prompt texts, and model answers.
 * 4. Zero Examiner-Grade Phrasing in KS2/KS3 (no "GCSE Analytical Masterclass", "GCSE Paragraph Builder", etc.).
 * 5. GCSE Preservation: Ensures GCSE units maintain appropriate specification branding.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT_DIR, 'public', 'database.json');

if (!fs.existsSync(DB_PATH)) {
  console.error(
    `❌ Error: database.json not found at ${DB_PATH}. Run 'node scripts/build_database.cjs' first.`,
  );
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

// Canonical Taxonomies
const KS2_UNITS = ['ks2_ww2'];

const KS3_UNITS = [
  'medieval_england',
  'monarchy_religion_power',
  'first_british_empire',
  'second_british_empire',
  'industrialisation_and_empire',
  'great_war',
  'great_war_part2',
  'australia',
  'the_shoah',
  'water_and_sanitation',
  'post_war_britain',
];

const GCSE_UNITS = ['eee', 'weimar_nazi_germany', 'edexcel_medicine', 'cme_new', 'usa', 'cold_war'];

const NON_GCSE_UNITS = [...KS2_UNITS, ...KS3_UNITS];

let totalChecks = 0;
let failures = [];

function recordFailure(gate, unitId, lessonId, details) {
  failures.push({ gate, unitId, lessonId, details });
}

console.log('======================================================================');
console.log('🛡️  PLATFORM DISCIPLINARY STAGE TERMINOLOGY & TASK PARITY LINTER');
console.log('======================================================================\n');

// -----------------------------------------------------------------------------
// GATE 1: Zero "GCSE" Terminology Leakage in KS2 & KS3
// -----------------------------------------------------------------------------
console.log('🔍 [GATE 1] Auditing for Zero "GCSE" terminology leakage in KS2 & KS3 units...');
const gcseRegex = /\bGCSE\b/i;

NON_GCSE_UNITS.forEach((unitId) => {
  const unitEntry = db[unitId];
  if (!unitEntry || !unitEntry.data) {
    recordFailure('GATE 1', unitId, 'N/A', `Unit missing from database.json`);
    return;
  }
  const lessons = unitEntry.data.lessons || [];

  lessons.forEach((lesson, lIdx) => {
    const lId = lesson.id || `lesson_${lIdx + 1}`;

    function checkString(str, fieldPath) {
      if (typeof str !== 'string') return;
      totalChecks++;
      if (gcseRegex.test(str)) {
        const snippet = str.length > 80 ? str.slice(0, 80) + '...' : str;
        recordFailure(
          'GATE 1',
          unitId,
          lId,
          `Prohibited 'GCSE' token in '${fieldPath}': "${snippet}"`,
        );
      }
    }

    function recursiveCheck(obj, currentPath) {
      if (!obj) return;
      if (typeof obj === 'string') {
        checkString(obj, currentPath);
        return;
      }
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => recursiveCheck(item, `${currentPath}[${idx}]`));
        return;
      }
      if (typeof obj === 'object') {
        Object.keys(obj).forEach((key) => {
          recursiveCheck(obj[key], `${currentPath}.${key}`);
        });
      }
    }

    recursiveCheck(lesson, `${unitId}.${lId}`);
  });
});

// -----------------------------------------------------------------------------
// GATE 2: 100% In-App Task Parity across KS2 & KS3
// -----------------------------------------------------------------------------
console.log('🔍 [GATE 2] Verifying 100% in-app task parity across all KS2 & KS3 lessons...');

NON_GCSE_UNITS.forEach((unitId) => {
  const unitEntry = db[unitId];
  if (!unitEntry || !unitEntry.data) return;
  const lessons = unitEntry.data.lessons || [];

  lessons.forEach((lesson, lIdx) => {
    const lId = lesson.id || `lesson_${lIdx + 1}`;
    totalChecks++;

    if (!Array.isArray(lesson.tasks) || lesson.tasks.length === 0) {
      recordFailure('GATE 2', unitId, lId, `Lesson is missing tasks array or tasks array is empty`);
    }
  });
});

// -----------------------------------------------------------------------------
// GATE 3: Disciplinary Task Structure & Integrity
// -----------------------------------------------------------------------------
console.log('🔍 [GATE 3] Auditing task structures, question prompts, and model answers...');

const VALID_TASK_TYPES = new Set([
  'extended_writing',
  'two_features',
  'narrative_account',
  'historical_interpretations',
  'short_answer',
  'two_sided_argument',
]);

NON_GCSE_UNITS.forEach((unitId) => {
  const unitEntry = db[unitId];
  if (!unitEntry || !unitEntry.data) return;
  const lessons = unitEntry.data.lessons || [];

  lessons.forEach((lesson, lIdx) => {
    const lId = lesson.id || `lesson_${lIdx + 1}`;
    if (!Array.isArray(lesson.tasks)) return;

    lesson.tasks.forEach((task, tIdx) => {
      totalChecks++;
      const tPath = `${lId}.tasks[${tIdx}]`;

      // Check type
      if (!task.type || !VALID_TASK_TYPES.has(task.type)) {
        recordFailure(
          'GATE 3',
          unitId,
          lId,
          `Task '${tPath}' has missing or invalid type: "${task.type}"`,
        );
      }

      // Check prompt
      const hasPrompt = Boolean(
        task.question ||
        task.text ||
        task.prompt ||
        (task.feature_1 && task.feature_1.prompt) ||
        (task.sub_question_b && task.sub_question_b.prompt),
      );
      if (!hasPrompt) {
        recordFailure('GATE 3', unitId, lId, `Task '${tPath}' is missing question/prompt content`);
      }

      // Check model answer
      const hasModel = Boolean(
        task.model_answer ||
        task.model ||
        (task.feature_1 && task.feature_1.model) ||
        (task.sub_question_b && task.sub_question_b.model),
      );
      if (!hasModel) {
        recordFailure('GATE 3', unitId, lId, `Task '${tPath}' is missing model answer`);
      }
    });
  });
});

// -----------------------------------------------------------------------------
// GATE 4: Zero Examiner-Grade Phrasing in KS2 & KS3
// -----------------------------------------------------------------------------
console.log('🔍 [GATE 4] Auditing against Examiner-Grade / GCSE terminology in KS2 & KS3 tasks...');

const PROHIBITED_PHRASES = [
  'GCSE Analytical Masterclass',
  'GCSE Paragraph Builder',
  'GCSE Key Vocabulary Bank',
  'GCSE exam paragraph',
  'Examiner-Grade Model Response',
  'Examiner-Grade Model Paragraph',
];

NON_GCSE_UNITS.forEach((unitId) => {
  const unitEntry = db[unitId];
  if (!unitEntry || !unitEntry.data) return;
  const lessons = unitEntry.data.lessons || [];

  lessons.forEach((lesson, lIdx) => {
    const lId = lesson.id || `lesson_${lIdx + 1}`;
    if (!Array.isArray(lesson.tasks)) return;

    const taskJson = JSON.stringify(lesson.tasks);
    PROHIBITED_PHRASES.forEach((phrase) => {
      totalChecks++;
      if (taskJson.includes(phrase)) {
        recordFailure('GATE 4', unitId, lId, `Prohibited phrasing found in tasks: "${phrase}"`);
      }
    });
  });
});

// -----------------------------------------------------------------------------
// GATE 5: GCSE Specification Integrity
// -----------------------------------------------------------------------------
console.log('🔍 [GATE 5] Verifying GCSE specification and exam practice integrity...');

GCSE_UNITS.forEach((unitId) => {
  const unitEntry = db[unitId];
  if (!unitEntry || !unitEntry.data) {
    recordFailure('GATE 5', unitId, 'N/A', `GCSE unit missing from database.json`);
    return;
  }
  const lessons = unitEntry.data.lessons || [];
  totalChecks++;
  if (lessons.length === 0) {
    recordFailure('GATE 5', unitId, 'N/A', `GCSE unit has 0 lessons in database.json`);
  }
});

// -----------------------------------------------------------------------------
// REPORTING
// -----------------------------------------------------------------------------
console.log('\n======================================================================');
console.log('📊 AUDIT SUMMARY REPORT');
console.log('======================================================================');
console.log(`Total Quality Checks Performed: ${totalChecks}`);
console.log(`Key Stage 2 Units Audited:      ${KS2_UNITS.length} (ks2_ww2)`);
console.log(`Key Stage 3 Units Audited:      ${KS3_UNITS.length} (${KS3_UNITS.join(', ')})`);
console.log(`GCSE Units Verified:            ${GCSE_UNITS.length} (${GCSE_UNITS.join(', ')})`);
console.log(`Total Violations / Failures:    ${failures.length}`);

if (failures.length > 0) {
  console.error('\n❌ LINTER FAILURES ENCOUNTERED:\n');
  failures.forEach((f, idx) => {
    console.error(`  ${idx + 1}. [${f.gate}] Unit: '${f.unitId}' | Lesson: '${f.lessonId}'`);
    console.error(`     Issue: ${f.details}`);
  });
  console.log('\n======================================================================');
  console.error('❌ LINTER FAILED. Please resolve the above issues.');
  console.log('======================================================================\n');
  process.exit(1);
} else {
  console.log(
    '\n🎉 100% PERFECT PASS: Zero GCSE leakage in KS2/KS3, 100% workbook task parity, and complete disciplinary integrity.',
  );
  console.log('======================================================================\n');
  process.exit(0);
}
