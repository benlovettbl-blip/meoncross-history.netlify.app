const fs = require('fs');
const path = require('path');

const unitsDir = path.join(__dirname, '..', 'units');
const dirs = fs
  .readdirSync(unitsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

(async () => {
  console.log('=== PLATFORM-WIDE LESSON UNIFORMITY AUDIT ===\n');

  const report = {};

  for (const unitId of dirs) {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) continue;

    try {
      const fileUrl = 'file:///' + dataPath.replace(/\\/g, '/');
      const mod = await import(fileUrl);
      const unitData = mod.default || mod.unitData || mod[unitId];
      if (!unitData) continue;

      const lessons = unitData.lessons || unitData.subtopics || [];
      if (!lessons.length) continue;

      const stats = {
        total: lessons.length,
        hasSpecAnchor: 0,
        hasLearningObjectives: 0,
        hasHookText: 0,
        hasBlurbOrPrologue: 0,
        missingSpec: [],
        missingObjectives: [],
        missingHook: [],
      };

      lessons.forEach((l, idx) => {
        const id = l.id || `lesson_${idx + 1}`;
        const hasSpec = !!(l.specification_anchor && l.specification_anchor.trim());
        const hasObj = !!(
          l.learning_objectives &&
          (Array.isArray(l.learning_objectives)
            ? l.learning_objectives.length
            : l.learning_objectives.scaffolded?.length)
        );
        const hasHook = !!(l.hook_text && l.hook_text.trim());
        const hasPrologue = !!(l.prologue || l.blurb);

        if (hasSpec) stats.hasSpecAnchor++;
        else stats.missingSpec.push(id);

        if (hasObj) stats.hasLearningObjectives++;
        else stats.missingObjectives.push(id);

        if (hasHook) stats.hasHookText++;
        else stats.missingHook.push(id);

        if (hasPrologue) stats.hasBlurbOrPrologue++;
      });

      report[unitId] = stats;
    } catch (err) {
      console.error(`Error loading ${unitId}:`, err.message);
    }
  }

  // Print results table
  console.log(
    'UNIT ID'.padEnd(30) +
      'TOTAL'.padStart(7) +
      'SPEC_ANC'.padStart(10) +
      'OBJ'.padStart(8) +
      'HOOK'.padStart(8) +
      'PROLOGUE'.padStart(10),
  );
  console.log('-'.repeat(73));

  for (const [unitId, s] of Object.entries(report)) {
    const specStr = `${s.hasSpecAnchor}/${s.total}`;
    const objStr = `${s.hasLearningObjectives}/${s.total}`;
    const hookStr = `${s.hasHookText}/${s.total}`;
    const proStr = `${s.hasBlurbOrPrologue}/${s.total}`;

    console.log(
      unitId.padEnd(30) +
        String(s.total).padStart(7) +
        specStr.padStart(10) +
        objStr.padStart(8) +
        hookStr.padStart(8) +
        proStr.padStart(10),
    );
  }

  console.log('\n=== DETAILED BREAKDOWN OF GAPS ===');
  for (const [unitId, s] of Object.entries(report)) {
    const hasAnyGap =
      s.hasSpecAnchor < s.total || s.hasLearningObjectives < s.total || s.hasHookText < s.total;
    if (hasAnyGap) {
      console.log(`\n🔴 ${unitId} (Total: ${s.total}):`);
      if (s.missingSpec.length)
        console.log(
          `   - Missing Spec Anchor (${s.missingSpec.length}): ${s.missingSpec.slice(0, 10).join(', ')}${s.missingSpec.length > 10 ? '...' : ''}`,
        );
      if (s.missingObjectives.length)
        console.log(
          `   - Missing Objectives (${s.missingObjectives.length}): ${s.missingObjectives.slice(0, 10).join(', ')}${s.missingObjectives.length > 10 ? '...' : ''}`,
        );
      if (s.missingHook.length)
        console.log(
          `   - Missing Hook Text (${s.missingHook.length}): ${s.missingHook.slice(0, 10).join(', ')}${s.missingHook.length > 10 ? '...' : ''}`,
        );
    } else {
      console.log(`\n🟢 ${unitId}: 100% UNIFORM (${s.total}/${s.total} on all fields)`);
    }
  }
})();
