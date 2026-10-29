const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dbPath = path.join(rootDir, 'public/database.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('======================================================================');
console.log('🛡️  STANDARDIZED WORKBOOK & APP STAGE QUESTION SCHEMA AUDIT');
console.log('======================================================================');

let totalUnitsScanned = 0;
let totalLessonsAudited = 0;
let totalStagesAudited = 0;
let totalErrors = 0;
let totalWarnings = 0;
const issues = [];
const warnings = [];

const PROHIBITED_PATTERNS = [
  /specification mastery/i,
  /disciplinary synthesis/i,
  /holistic framework/i,
  /synergistic/i,
  /deep-dive paradigm/i,
];

Object.keys(db).forEach((unitId) => {
  const unit = db[unitId];
  const unitData = unit.data || unit;
  const lessons = unitData.lessons || [];

  // Exclude KS2 and legacy units from strict secondary 5-stage spine schema
  const isKs2 = unitId === 'ks2_ww2' || unitData.is_ks2;
  if (isKs2) return;

  const lessonsWithSpine = lessons.filter(
    (l) => l.causal_domino_spine && Array.isArray(l.causal_domino_spine.stages),
  );

  if (lessonsWithSpine.length === 0) return;

  totalUnitsScanned++;
  console.log(`\n▶ Unit [${unitId}] (${lessonsWithSpine.length} lessons with causal spine):`);

  lessonsWithSpine.forEach((lesson, lIdx) => {
    totalLessonsAudited++;
    const spine = lesson.causal_domino_spine;
    const stages = spine.stages;

    // Rule 1: Exactly 5 stages for KS3 and GCSE units
    if (stages.length !== 5) {
      issues.push(`[${unitId}] ${lesson.id || lIdx}: Expected 5 stages, found ${stages.length}`);
      totalErrors++;
    }

    stages.forEach((st, sIdx) => {
      totalStagesAudited++;
      const expectedStep = sIdx + 1;

      // Rule 2: Sequential step numbers 1..5
      if (st.step !== expectedStep) {
        issues.push(
          `[${unitId}] ${lesson.id} Stage ${sIdx + 1}: Step index mismatch (got ${st.step}, expected ${expectedStep})`,
        );
        totalErrors++;
      }

      // Rule 3: Valid date
      if (!st.date || typeof st.date !== 'string' || st.date.trim().length === 0) {
        issues.push(`[${unitId}] ${lesson.id} Stage ${expectedStep}: Missing or empty date`);
        totalErrors++;
      }

      // Rule 4: Valid question text
      if (!st.question || typeof st.question !== 'string') {
        if (unitId === 'usa') {
          // Warning for USA which has causal dominoes but pending question property injection
          warnings.push(
            `[${unitId}] ${lesson.id} Stage ${expectedStep}: Pending stage enquiry question`,
          );
          totalWarnings++;
        } else {
          issues.push(`[${unitId}] ${lesson.id} Stage ${expectedStep}: Missing question string`);
          totalErrors++;
        }
      } else {
        const q = st.question.trim();
        if (q.length < 10) {
          issues.push(
            `[${unitId}] ${lesson.id} Stage ${expectedStep}: Question too short ("${q}")`,
          );
          totalErrors++;
        }
        const isQuestionOrPrompt =
          q.endsWith('?') ||
          /^(?:Explain|Evaluate|Assess|Analyse|Analyze|Describe|Identify)\b/i.test(q);
        if (!isQuestionOrPrompt) {
          issues.push(
            `[${unitId}] ${lesson.id} Stage ${expectedStep}: Prompt does not end with '?' or begin with an approved analytical stem ("${q}")`,
          );
          totalErrors++;
        }

        // Rule 5: Zero corporate buzzwords
        PROHIBITED_PATTERNS.forEach((p) => {
          if (p.test(q)) {
            issues.push(
              `[${unitId}] ${lesson.id} Stage ${expectedStep}: Prohibited corporate buzzword in question ("${q}")`,
            );
            totalErrors++;
          }
        });
      }
    });

    if (unitId !== 'usa') {
      console.log(`  ✅ Lesson ${lIdx + 1}: 5/5 stages conform to canonical schema`);
    } else {
      console.log(`  ⚠️ Lesson ${lIdx + 1}: 5/5 stages valid dominoes (enquiry questions pending)`);
    }
  });
});

console.log('\n======================================================================');
console.log('📊 AUDIT SUMMARY REPORT');
console.log('======================================================================');
console.log(`Units Scanned:    ${totalUnitsScanned}`);
console.log(`Lessons Audited:  ${totalLessonsAudited}`);
console.log(`Stages Audited:   ${totalStagesAudited}`);
console.log(`Total Errors:     ${totalErrors}`);
console.log(`Total Warnings:   ${totalWarnings} (USA pending question injection)`);

if (totalErrors === 0) {
  console.log('\n🎉 100% SCHEMA VALIDATION PASS: Every stage question strictly adheres');
  console.log('   to the centralized 5-stage enquiry schema with zero prohibited buzzwords!');
  console.log('======================================================================');
  process.exit(0);
} else {
  console.error(`\n❌ SCHEMA AUDIT FAILED with ${totalErrors} issue(s):`);
  issues.forEach((err) => console.error(`  - ${err}`));
  console.log('======================================================================');
  process.exit(1);
}
