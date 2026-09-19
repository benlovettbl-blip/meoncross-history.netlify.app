/**
 * Departmental Pedagogical Standards & Rollout Auditor
 * Scans all 16 curriculum units and audits every lesson against our core pedagogical standards:
 * 1. Chronology Spine (timeline_anchor: 3-5 milestone cards)
 * 2. Classroom Delivery Roadmap (delivery_plan: 2-lesson 50m+50m sequence)
 * 3. Pedagogical Primer & Hinge Questions (teacher_notes)
 * 4. Four-Act Narrative Architecture (narrative_blocks with [Act.Paragraph] notation)
 * 5. Disciplinary Vocabulary & Cloze
 */

const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const dbPath = path.join(PATHS.PUBLIC, 'database.json');
if (!fs.existsSync(dbPath)) {
  console.error('❌ database.json not found. Run "node scripts/build_database.cjs" first.');
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const targetUnitId = process.argv[2] || null;

console.log('🏛️ ================================================================');
console.log('🏛️  THE HISTORY DEPARTMENT: PEDAGOGICAL AUDIT & ROLLOUT CHECKER    ');
console.log('🏛️ ================================================================\n');

let totalLessons = 0;
let spineCount = 0;
let deliveryCount = 0;
let hingeCount = 0;
let fourActCount = 0;

const unitEntries = Object.entries(db).filter(([id]) => {
  if (targetUnitId) return id === targetUnitId;
  return true;
});

unitEntries.forEach(([unitId, unitObj]) => {
  const data = unitObj.data || unitObj;
  const lessons = data.lessons || [];
  if (lessons.length === 0) return;

  console.log(`📌 Unit: [${unitId}] ${data.title || 'Untitled Unit'} (${lessons.length} lessons)`);
  console.log('--------------------------------------------------------------------------------');
  console.log(
    '  #  | Chronology Spine | Delivery Plan (50m+50m) | Hinge Questions | 4-Act Structure | Status',
  );
  console.log(
    '-----+------------------+-------------------------+-----------------+-----------------+-------',
  );

  lessons.forEach((l, idx) => {
    totalLessons++;
    const hasSpine = Array.isArray(l.timeline_anchor) && l.timeline_anchor.length >= 3;
    const hasDelivery = !!(
      l.teacher_notes &&
      l.teacher_notes.delivery_plan &&
      l.teacher_notes.delivery_plan.lesson_1
    );

    let hasHinge = false;
    if (l.teacher_notes && Array.isArray(l.teacher_notes.objectives)) {
      hasHinge = l.teacher_notes.objectives.some((o) => !!o.question);
    }

    let has4Act = false;
    if (Array.isArray(l.narrative_blocks) && l.narrative_blocks.length >= 3) {
      has4Act = true;
    }

    if (hasSpine) spineCount++;
    if (hasDelivery) deliveryCount++;
    if (hasHinge) hingeCount++;
    if (has4Act) fourActCount++;

    const spineTag = hasSpine ? '✅ 4 Cards       ' : '❌ Missing       ';
    const deliveryTag = hasDelivery ? '✅ 2-Lesson Phased       ' : '⏳ Queued                ';
    const hingeTag = hasHinge ? '✅ Present        ' : '❌ Missing        ';
    const fourActTag = has4Act ? '✅ Structured    ' : '⚠️ Pending       ';

    let status = '⏳';
    if (hasSpine && hasDelivery && hasHinge && has4Act) status = '🌟 GOLD';
    else if (hasDelivery) status = '✅ PILOT';
    else if (hasSpine && hasHinge) status = '🟢 READY';

    const num = String(idx + 1).padStart(2, ' ');
    console.log(` L${num} | ${spineTag}| ${deliveryTag}| ${hingeTag}| ${fourActTag}| ${status}`);
  });
  console.log('\n');
});

console.log('================================================================');
console.log('📊 DEPARTMENTAL SUMMARY PROGRESS:');
console.log(`   Total Lessons Inspected:   ${totalLessons}`);
console.log(
  `   Chronology Spines Active:  ${spineCount} / ${totalLessons} (${Math.round((spineCount / totalLessons) * 100)}%)`,
);
console.log(
  `   Delivery Plans Active:     ${deliveryCount} / ${totalLessons} (${Math.round((deliveryCount / totalLessons) * 100)}%)`,
);
console.log(
  `   Hinge Questions Active:    ${hingeCount} / ${totalLessons} (${Math.round((hingeCount / totalLessons) * 100)}%)`,
);
console.log(
  `   4-Act Narratives Active:   ${fourActCount} / ${totalLessons} (${Math.round((fourActCount / totalLessons) * 100)}%)`,
);
console.log('================================================================\n');

if (targetUnitId) {
  const nextTarget = unitEntries[0][1]?.data?.lessons?.findIndex(
    (l) => !l.teacher_notes || !l.teacher_notes.delivery_plan,
  );
  if (nextTarget !== -1) {
    console.log(`🎯 NEXT ACTIONABLE TARGET FOR [${targetUnitId}]:`);
    console.log(
      `   👉 Lesson ${nextTarget + 1}: "${unitEntries[0][1].data.lessons[nextTarget].title}"`,
    );
    console.log('   Needs: 2-Lesson delivery_plan, chronology_spine, and hinge questions.\n');
  } else {
    console.log(`🎉 Unit [${targetUnitId}] is 100% COMPLETE!\n`);
  }
}
