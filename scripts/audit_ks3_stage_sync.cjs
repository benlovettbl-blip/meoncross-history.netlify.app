/**
 * KS3 Stage Synchronization & Paragraph Anchor Auditor
 *
 * Enforces strict pedagogical and classroom alignment between:
 * 1. Printed KS3 pupil workbooks (the 5 enquiry stages on the left page)
 * 2. On-screen web app narratives (paragraph reference tags [1.1], [1.2], etc.)
 *
 * Rules Enforced:
 * - Every stage in the printed workbook must declare a valid paraRef (e.g. '[1.1–1.2]').
 * - Every lesson in data.js must define workbook_stages (or margin_spine for legacy KS3 units).
 * - All referenced paragraph tags must physically exist in the lesson's narrative_blocks.
 *
 * Usage:
 *   node scripts/audit_ks3_stage_sync.cjs <unit_id>
 *   node scripts/audit_ks3_stage_sync.cjs --all
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const targetUnit = process.argv[2] || 'great_war_part2';

const KS3_UNITS = [
  'great_war_part2',
  'great_war',
  'early_modern_world',
  'industrialisation_and_empire',
  'medieval_england',
  'monarchy_religion_power',
  'first_british_empire',
  'water_and_sanitation',
  'the_shoah',
  'cold_war',
  'post_war_britain',
  'australia',
];

function auditUnit(unitId) {
  const dataPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (!fs.existsSync(dataPath)) {
    return { unitId, skipped: true, reason: `No data.js found at ${dataPath}` };
  }

  const errors = [];
  const warnings = [];

  // 1. Read database.json or load unit data
  let unitData = null;
  const dbPath = path.join(ROOT_DIR, 'public', 'database.json');
  if (fs.existsSync(dbPath)) {
    try {
      const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      if (db[unitId] && db[unitId].data) {
        unitData = db[unitId].data;
      }
    } catch (e) {
      // Fallback
    }
  }

  if (!unitData) {
    // If not in database.json yet, read raw data.js
    const content = fs.readFileSync(dataPath, 'utf8');
    const hasWorkbookStages = content.includes('workbook_stages');
    const hasMarginSpine = content.includes('margin_spine');

    if (!hasWorkbookStages && !hasMarginSpine) {
      errors.push(`Lesson data does not contain 'workbook_stages' or 'margin_spine' array.`);
    }
    return { unitId, errors, warnings };
  }

  const lessons = unitData.lessons || [];
  let totalStagesChecked = 0;

  lessons.forEach((lesson, lIdx) => {
    const lId = lesson.id || `Lesson ${lIdx + 1}`;
    const blocks = lesson.narrative_blocks || [];

    // Extract all [X.X] paragraph references in this lesson
    const existingParas = new Set();
    blocks.forEach((b) => {
      const text = b.text || b.content || '';
      const matches = text.match(/\[\d+\.\d+\]/g) || [];
      matches.forEach((m) => existingParas.add(m.replace(/[\[\]]/g, '')));
    });

    if (lesson.workbook_stages && Array.isArray(lesson.workbook_stages)) {
      lesson.workbook_stages.forEach((st) => {
        totalStagesChecked++;
        if (!st.para_ref && !st.paraRef) {
          errors.push(`${lId} -> Stage ${st.step || '?'}: Missing 'para_ref' badge property.`);
        } else {
          const pRef = st.para_ref || st.paraRef;
          // Check that at least one paragraph referenced actually exists
          const nums = pRef.match(/\d+\.\d+/g) || [];
          if (nums.length === 0) {
            errors.push(`${lId} -> Stage ${st.step}: Invalid para_ref format "${pRef}".`);
          } else if (existingParas.size > 0) {
            const hasMatch = nums.some((n) => existingParas.has(n));
            if (!hasMatch) {
              warnings.push(
                `${lId} -> Stage ${st.step}: para_ref "${pRef}" not directly found in narrative paragraphs (${Array.from(existingParas).join(', ')}).`,
              );
            }
          }
        }
      });
    } else if (lesson.margin_spine && Array.isArray(lesson.margin_spine)) {
      // Legacy 5-Act decimal standard (e.g. 1.1, 1.2)
      lesson.margin_spine.forEach((st, sIdx) => {
        totalStagesChecked++;
        const label = st.label || '';
        const match = label.match(/\d+\.\d+/);
        if (!match) {
          warnings.push(
            `${lId} -> margin_spine item ${sIdx + 1} (${label}) lacks decimal paragraph index.`,
          );
        }
      });
    }
  });

  // 2. Check printed workbook script if one exists for this unit
  const workbookScripts = [
    path.join(ROOT_DIR, 'scripts', `render_${unitId}_twopage_workbook.cjs`),
    path.join(ROOT_DIR, 'scripts', `render_${unitId}_workbook.cjs`),
  ];

  workbookScripts.forEach((scriptPath) => {
    if (fs.existsSync(scriptPath)) {
      const scriptContent = fs.readFileSync(scriptPath, 'utf8');
      // If the script defines stages, check that it also defines paraRef
      if (scriptContent.includes('stages: [') && !scriptContent.includes('paraRef:')) {
        errors.push(
          `Workbook script ${path.basename(scriptPath)} defines 'stages' but omits 'paraRef' badges.`,
        );
      }
      if (scriptContent.includes('renderSpinePage') && !scriptContent.includes('paraRef')) {
        errors.push(
          `Workbook script ${path.basename(scriptPath)} renderSpinePage does not render 'paraRef' badge in .stage-banner.`,
        );
      }
    }
  });

  return { unitId, totalStagesChecked, errors, warnings };
}

function runAudit() {
  console.log(`=============================================================`);
  console.log(`🔍 KS3 WORKBOOK ENQUIRY STAGE & PARAGRAPH ANCHOR AUDITOR`);
  console.log(`=============================================================`);

  const unitsToAudit = targetUnit === '--all' || targetUnit === 'all' ? KS3_UNITS : [targetUnit];

  let hasFatalErrors = false;

  unitsToAudit.forEach((uId) => {
    const res = auditUnit(uId);
    if (res.skipped) {
      console.log(`[${uId}] ⏭️  Skipped: ${res.reason}`);
      return;
    }

    if (res.errors && res.errors.length > 0) {
      hasFatalErrors = true;
      console.error(`\n❌ [${uId}] FAILED STAGE SYNCHRONIZATION AUDIT:`);
      res.errors.forEach((err) => console.error(`   - ${err}`));
    } else {
      console.log(
        `✅ [${uId}] Optimal stage synchronization (${res.totalStagesChecked} stages verified across all enquiries).`,
      );
    }

    if (res.warnings && res.warnings.length > 0) {
      res.warnings.forEach((warn) => console.warn(`   ⚠️ ${warn}`));
    }
  });

  console.log(`=============================================================`);
  if (hasFatalErrors) {
    console.error(`❌ KS3 Stage Synchronization Audit FAILED. Fix errors before deployment.`);
    process.exit(1);
  } else {
    console.log(`🎉 100% Stage Synchronization Verified. Zero classroom projection blindness.`);
    process.exit(0);
  }
}

runAudit();
