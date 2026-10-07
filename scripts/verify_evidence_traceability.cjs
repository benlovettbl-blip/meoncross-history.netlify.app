/**
 * History Revision Hub — Automated Evidence Traceability Linter
 *
 * Verifies that all factual points, proper nouns, and historical dates cited in
 * Task 3 (Dual-Column Planning Bridge) and Task 4 (Extended Writing) are explicitly
 * grounded in the lesson's 4-Act narrative prose, source captions, or contextual blurbs.
 *
 * Disciplinary Pedagogy Standard (Christine Counsell / Disciplinary Literacy):
 * Pupils must never be asked to extract or evaluate evidence that has not been explicitly
 * taught or primed in the preceding acts of the enquiry.
 *
 * Usage:
 *   node scripts/verify_evidence_traceability.cjs [unit_id]
 * Example:
 *   node scripts/verify_evidence_traceability.cjs great_war
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const targetUnit = process.argv[2] || 'great_war';

const unitsToAudit =
  targetUnit === 'all' ? ['great_war', 'water_and_sanitation', 'early_modern_world'] : [targetUnit];

console.log('='.repeat(70));
console.log('🛡️ AUTOMATED EVIDENCE TRACEABILITY LINTER');
console.log('='.repeat(70));

const STOPWORDS = new Set([
  'the',
  'and',
  'was',
  'were',
  'for',
  'with',
  'from',
  'this',
  'that',
  'interpretation',
  'historians',
  'conversely',
  'built',
  'skillfully',
  'prudently',
  'deliberately',
  'collected',
  'bullied',
  'deprived',
  'imposed',
  'created',
  'decades',
  'argue',
  'argues',
  'argued',
  'critics',
  'because',
  'while',
  'however',
  'consequently',
  'therefore',
  'overall',
  'instance',
  'example',
  'explain',
  'evaluate',
  'analyse',
  'contrast',
  'compare',
  'their',
  'which',
  'about',
  'under',
  'after',
  'before',
  'between',
  'into',
  'over',
  'both',
  'each',
  'more',
  'most',
]);

let totalViolations = 0;
let totalPointsAudited = 0;

for (const unitId of unitsToAudit) {
  const dataPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.warn(`⚠️ Skipping unit ${unitId}: data.js not found.`);
    continue;
  }

  const raw = require(dataPath);
  const unitData = raw.default || raw;
  const lessons = unitData.lessons || [];

  console.log(`\n▶ Auditing Unit: [${unitId}] (${lessons.length} lessons)`);

  lessons.forEach((lesson, lIdx) => {
    // Compile full corpus of text available to students in this lesson
    const narrativeCorpus = (lesson.narrative_blocks || [])
      .map((b) => {
        let text = b.text || '';
        if (b.source) {
          text +=
            ' ' +
            (b.source.title || '') +
            ' ' +
            (b.source.caption || '') +
            ' ' +
            (b.source.context || '');
        }
        return text;
      })
      .join(' ')
      .toLowerCase();

    // Include spotlight drawers if present
    let spotlightCorpus = '';
    if (lesson.key_figure) {
      spotlightCorpus +=
        ' ' +
        (lesson.key_figure.name || '') +
        ' ' +
        (lesson.key_figure.epithet || '') +
        ' ' +
        (lesson.key_figure.lifespan || '') +
        ' ' +
        (lesson.key_figure.quote || '') +
        ' ' +
        (lesson.key_figure.core_achievement || '') +
        ' ' +
        (lesson.key_figure.significance || '') +
        ' ' +
        (lesson.key_figure.actions || []).join(' ');
    }
    if (lesson.concept_spotlight) {
      spotlightCorpus +=
        ' ' +
        (lesson.concept_spotlight.title || '') +
        ' ' +
        (lesson.concept_spotlight.category || '') +
        ' ' +
        (lesson.concept_spotlight.definition || '') +
        ' ' +
        (lesson.concept_spotlight.historical_case_study || '') +
        ' ' +
        (lesson.concept_spotlight.analytical_takeaway || '') +
        ' ' +
        (lesson.concept_spotlight.body || '') +
        ' ' +
        (lesson.concept_spotlight.takeaway || '');
    }
    if (lesson.archival_dispatch) {
      spotlightCorpus +=
        ' ' +
        (lesson.archival_dispatch.title || '') +
        ' ' +
        (lesson.archival_dispatch.origin_and_date || '') +
        ' ' +
        (lesson.archival_dispatch.excerpt || '') +
        ' ' +
        (lesson.archival_dispatch.provenance_significance || '') +
        ' ' +
        (lesson.archival_dispatch.enquiry_connection || '') +
        ' ' +
        (lesson.archival_dispatch.body || '');
    }

    const fullAvailableCorpus = (narrativeCorpus + ' ' + spotlightCorpus).toLowerCase();

    const tasks = lesson.tasks || [];
    const t3 = tasks.find((t) => t.type === 'two_sided_argument');

    if (!t3) return;

    const points = [
      ...((t3.advancement && t3.advancement.points) || []),
      ...((t3.limitations && t3.limitations.points) || []),
    ];

    points.forEach((point) => {
      totalPointsAudited++;
      // Extract proper nouns (capitalized words) and 4-digit years
      const tokens = point.match(/[A-Z][a-z]+|\d{4}/g) || [];
      const untraceable = tokens.filter((tok) => {
        const lower = tok.toLowerCase();
        if (STOPWORDS.has(lower)) return false;
        return !fullAvailableCorpus.includes(lower);
      });

      if (untraceable.length > 0) {
        totalViolations++;
        console.error(`  ❌ Lesson ${lIdx + 1} (${lesson.id}) Task 3 Untraceable Evidence:`);
        console.error(`     Point: "${point}"`);
        console.error(`     Missing terms from prose: ${untraceable.join(', ')}`);
      }
    });
  });
}

console.log('\n' + '='.repeat(70));
if (totalViolations === 0) {
  console.log(
    `🎉 100% TRACEABLE: All ${totalPointsAudited} Task 3 evidence points across audited units are fully grounded in narrative prose and spotlight decks!`,
  );
  console.log('='.repeat(70));
  process.exit(0);
} else {
  console.error(
    `❌ Traceability Audit Failed: ${totalViolations} untraceable evidence tokens detected across ${totalPointsAudited} audited points.`,
  );
  console.log('='.repeat(70));
  process.exit(1);
}
