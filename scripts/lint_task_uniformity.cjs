/**
 * scripts/lint_task_uniformity.cjs
 *
 * Automated Pedagogical & Task Uniformity Linter
 * Enforces the 4-Act Master Architecture and prevents question duplication.
 *
 * Rules:
 * 1. Prohibits rogue `source.question` properties in `sources: [...]` (prevents duplicate workbook Qs).
 * 2. Enforces strictly sequential source lettering (A, B, C, D) with zero sub-indices.
 * 3. Enforces the "One-Prose-Only" rule for 4-Act KS3 units:
 *    - Acts 1-3 MUST be non-prose tasks (causal_domino, visual_annotation, word_scalpel, etc.).
 *    - Act 4 is the ONLY extended prose task (extended_writing).
 *    - Maximum 4 body tasks per lesson (Q1, Q2, Q3, Q4).
 * 4. Enforces pure paragraph indexing ([Act.Paragraph] notation, never sentence indexing).
 * 5. Enforces structured teacher_notes (primer, objectives with hinge questions).
 */

const fs = require('fs');
const path = require('path');

const unitId = process.argv[2];

if (!unitId) {
  console.error('❌ Error: Please provide a unit ID to lint.');
  process.exit(1);
}

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');

if (!fs.existsSync(dataJsPath)) {
  console.error(`❌ Error: Unit data file not found at: ${dataJsPath}`);
  process.exit(1);
}

// Units held to strict 4-Act Master Architecture
const FOUR_ACT_UNITS = ['great_war', 'great_war_part2', 'industrialisation_and_empire'];

const NON_PROSE_TYPES = new Set([
  'causal_domino',
  'visual_annotation',
  'diagram_annotation',
  'word_scalpel',
  'forensic_autopsy',
  'ledger_audit',
  'balance_sheet',
  'historiographical_spectrum',
  'spectrum',
  'crucible_fork',
  'significance_diamond',
  'priority_matrix',
  'factor_hierarchy',
  'drawing',
  'multiple_choice',
  'sorting',
  'cloze',
  'matching',
  'table_planner',
]);

async function runLinter() {
  console.log(`\n======================================================`);
  console.log(`🔍 TASK UNIFORMITY & ANTI-DUPLICATION LINTER: [${unitId}]`);
  console.log(`======================================================`);

  let unitData;
  try {
    const fileUrl = 'file:///' + dataJsPath.replace(/\\/g, '/');
    const imported = await import(fileUrl);
    unitData = imported.unitData || imported.default || imported.lessons;
    if (!unitData && imported.data) unitData = imported.data;
  } catch (err) {
    console.error(`❌ Failed to import ${dataJsPath}:`, err.message);
    process.exit(1);
  }

  const lessons = Array.isArray(unitData) ? unitData : unitData.lessons || [];
  if (lessons.length === 0) {
    console.warn(`⚠️ Warning: No lessons found in ${unitId}/data.js.`);
    process.exit(0);
  }

  const isFourActTarget = FOUR_ACT_UNITS.includes(unitId);
  const errors = [];
  const warnings = [];

  lessons.forEach((lesson, lIdx) => {
    const lessonNum = lIdx + 1;
    const lTitle = lesson.title || `Lesson ${lessonNum}`;

    // 1. Check for rogue source.question in sources array (prohibited across ALL units except deliberate GCSE Paper 2 cme_new)
    if (lesson.sources && Array.isArray(lesson.sources) && unitId !== 'cme_new') {
      lesson.sources.forEach((src, sIdx) => {
        if (src && src.question) {
          errors.push(
            `[L${lessonNum}] Rogue 'source.question' found on Source ${src.letter || sIdx + 1} ("${src.question.slice(0, 40)}..."). This triggers duplicate questions in pupil workbooks!`,
          );
        }
      });
    }

    // 2. Check source lettering
    if (lesson.sources && Array.isArray(lesson.sources)) {
      const expectedLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      lesson.sources.forEach((src, sIdx) => {
        if (!src) return;
        const letter =
          src.letter ||
          (src.title && src.title.match(/Source\s+([A-Z])/i)
            ? src.title.match(/Source\s+([A-Z])/i)[1]
            : undefined);
        const expected = expectedLetters[sIdx];
        if (letter !== expected) {
          warnings.push(
            `[L${lessonNum}] Source at index ${sIdx} has letter '${letter}', expected '${expected}'.`,
          );
        }
        if (letter && /[0-9]/.test(letter)) {
          errors.push(
            `[L${lessonNum}] Source letter '${letter}' contains sub-index numbers. Strictly forbidden!`,
          );
        }
      });
    }

    // 3. For 4-Act Units: Check Task Uniformity & One-Prose-Only Rule
    if (isFourActTarget) {
      let taskList = [];
      (lesson.narrative_blocks || []).forEach((block, bIdx) => {
        if (block.tasks && Array.isArray(block.tasks)) {
          block.tasks.forEach((t) =>
            taskList.push({ blockIdx: bIdx, blockTitle: block.title, task: t }),
          );
        }
        if (block.task) {
          taskList.push({ blockIdx: bIdx, blockTitle: block.title, task: block.task });
        }
      });

      if (taskList.length > 4) {
        errors.push(
          `[L${lessonNum}] "${lTitle}" has ${taskList.length} body tasks (expected max 4: Q1-Q4). Over-crowding causes workbook cognitive overload!`,
        );
      }

      // Check tasks 1-3 (Acts 1-3) vs task 4 (Act 4)
      taskList.forEach((tObj, tIdx) => {
        const tNum = tIdx + 1;
        const taskType = tObj.task.type;
        if (tNum <= 3) {
          if (!NON_PROSE_TYPES.has(taskType)) {
            errors.push(
              `[L${lessonNum}] Task Q${tNum} in "${tObj.blockTitle}" has continuous prose type '${taskType}'. Acts 1–3 MUST use rotating non-prose tasks (e.g. causal_domino, visual_annotation, word_scalpel, ledger_audit, significance_diamond)!`,
            );
          }
        } else if (tNum === 4) {
          if (taskType !== 'extended_writing') {
            warnings.push(
              `[L${lessonNum}] Task Q4 in "${tObj.blockTitle}" is '${taskType}' (expected 'extended_writing' for the Act 4 Enquiry Essay).`,
            );
          }
        }
      });

      // 4. Check paragraph indexing: strictly [Act.Para] notation
      (lesson.narrative_blocks || []).forEach((block) => {
        const text = block.text || '';
        // Check for illegal sentence-level micro-indices like [1.1], [1.2], [1.3] inside same paragraph
        const paragraphs = text.split(/<\/p>|<br\s*\/?>\s*<br\s*\/?>/i);
        paragraphs.forEach((p, pIdx) => {
          const refs = [...p.matchAll(/\[(\d+\.\d+)\]/g)].map((m) => m[1]);
          if (refs.length > 1) {
            // Check if multiple distinct sentence indices are present in a single paragraph
            const distinct = [...new Set(refs)];
            if (distinct.length > 1) {
              warnings.push(
                `[L${lessonNum}] Multiple paragraph references (${distinct.join(', ')}) found in a single paragraph block. Paragraphs should have exactly ONE [Act.Para] reference.`,
              );
            }
          }
        });
      });

      // 5. Check teacher_notes schema
      if (!lesson.teacher_notes) {
        errors.push(`[L${lessonNum}] Missing 'teacher_notes' property.`);
      } else {
        if (!lesson.teacher_notes.primer) {
          warnings.push(`[L${lessonNum}] 'teacher_notes' missing high-level 'primer' paragraph.`);
        }
        if (
          !Array.isArray(lesson.teacher_notes.objectives) ||
          lesson.teacher_notes.objectives.length === 0
        ) {
          warnings.push(`[L${lessonNum}] 'teacher_notes' missing structured 'objectives' array.`);
        } else {
          lesson.teacher_notes.objectives.forEach((obj, oIdx) => {
            if (!obj.question) {
              warnings.push(
                `[L${lessonNum}] Objective ${oIdx + 1} in teacher_notes missing Hinge Question.`,
              );
            }
          });
        }
      }
    }
  });

  if (warnings.length > 0) {
    console.log(`\n⚠️  LINTER WARNINGS (${warnings.length}):`);
    warnings.forEach((w) => console.log(`   - ${w}`));
  }

  if (errors.length > 0) {
    console.error(`\n❌ LINTER FAILURES (${errors.length}):`);
    errors.forEach((e) => console.error(`   - ${e}`));
    console.log(`\n======================================================`);
    console.log(`❌ Linter failed. Please resolve the above issues before syncing.`);
    console.log(`======================================================\n`);
    process.exit(1);
  }

  console.log(
    `\n🎉 100% CLEAN: All task uniformity, source formatting, and anti-duplication rules passed!`,
  );
  console.log(`======================================================\n`);
  process.exit(0);
}

runLinter();
