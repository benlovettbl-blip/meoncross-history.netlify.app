/**
 * scripts/verify_source_block_chronology.cjs
 *
 * Automated regression linter asserting strict 1-to-1 chronological and structural
 * alignment between narrative blocks and primary sources A–E in all 5-block units (CME and USA).
 *
 * Rules:
 * 1. Exactly 5 narrative blocks per lesson (Acts 1–5).
 * 2. Exactly 5 sources per lesson (Letters A–E).
 * 3. Exact 1-to-1 residency: Block 1 holds Source A, Block 2 holds Source B, ..., Block 5 holds Source E.
 * 4. Zero property divergence: s.src === s.image (no stale portrait fallbacks).
 * 5. Sequential lettering: Sources must be lettered strictly A, B, C, D, E.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const FIVE_BLOCK_UNITS = ['cme_new', 'usa', 'weimar_nazi_germany', 'cold_war'];

console.log('======================================================================');
console.log('🛡️  AUTOMATED 5-BLOCK SOURCE-TO-NARRATIVE CHRONOLOGY LINTER');
console.log('======================================================================\n');

let totalErrors = 0;
let totalLessonsAudited = 0;

FIVE_BLOCK_UNITS.forEach((unitId) => {
  const dataPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');
  if (!fs.existsSync(dataPath)) {
    console.error(`❌ Unit data file not found: ${dataPath}`);
    totalErrors++;
    return;
  }

  const rawData = require(dataPath);
  const data = rawData.default || rawData[`${unitId}_data`] || rawData.usa_data || rawData;

  if (!data.lessons || !Array.isArray(data.lessons)) {
    console.error(`❌ Unit ${unitId} contains no lessons array!`);
    totalErrors++;
    return;
  }

  console.log(`▶ Auditing Unit: [${unitId}] (${data.lessons.length} lessons)`);

  data.lessons.forEach((lesson, lIdx) => {
    totalLessonsAudited++;
    const lessonNum = lIdx + 1;
    const lId = lesson.id || `L${lessonNum}`;

    // 1. Check narrative_blocks count
    if (!lesson.narrative_blocks || !Array.isArray(lesson.narrative_blocks)) {
      console.error(`   ❌ [${unitId} L${lessonNum}] Missing 'narrative_blocks' array!`);
      totalErrors++;
      return;
    }

    if (lesson.narrative_blocks.length !== 5) {
      console.error(
        `   ❌ [${unitId} L${lessonNum}] Found ${lesson.narrative_blocks.length} narrative blocks (strictly 5 required)!`,
      );
      totalErrors++;
    }

    // 2. Check lesson.sources count
    if (!lesson.sources || !Array.isArray(lesson.sources)) {
      console.error(`   ❌ [${unitId} L${lessonNum}] Missing 'sources' array!`);
      totalErrors++;
      return;
    }

    if (lesson.sources.length !== 5) {
      console.error(
        `   ❌ [${unitId} L${lessonNum}] Found ${lesson.sources.length} root sources (strictly 5 required)!`,
      );
      totalErrors++;
    }

    const expectedLetters = ['A', 'B', 'C', 'D', 'E'];

    // 3. Check 1-to-1 alignment between blocks and sources
    lesson.narrative_blocks.forEach((block, bIdx) => {
      const step = bIdx + 1;
      const expectedLetter = expectedLetters[bIdx];

      // Check act number
      if (block.act !== step) {
        console.error(
          `   ❌ [${unitId} L${lessonNum} Block ${step}] act is ${block.act}, expected ${step}!`,
        );
        totalErrors++;
      }

      // Check inline sources count
      const bSources = block.sources || (block.source ? [block.source] : []);
      if (bSources.length !== 1) {
        console.error(
          `   ❌ [${unitId} L${lessonNum} Block ${step}] Has ${bSources.length} sources (strictly 1 required per block)!`,
        );
        totalErrors++;
      } else {
        const inlineSrc = bSources[0];
        const rootSrc = lesson.sources[bIdx];

        if (inlineSrc.letter !== expectedLetter) {
          console.error(
            `   ❌ [${unitId} L${lessonNum} Block ${step}] Inline source has letter '${inlineSrc.letter}', expected '${expectedLetter}'!`,
          );
          totalErrors++;
        }

        if (rootSrc && rootSrc.letter !== expectedLetter) {
          console.error(
            `   ❌ [${unitId} L${lessonNum} Root Source ${step}] Letter is '${rootSrc.letter}', expected '${expectedLetter}'!`,
          );
          totalErrors++;
        }

        // Check src vs image alignment
        if (inlineSrc.src && inlineSrc.image && inlineSrc.src !== inlineSrc.image) {
          console.error(
            `   ❌ [${unitId} L${lessonNum} Block ${step}] Source ${inlineSrc.letter} src !== image ('${inlineSrc.src}' vs '${inlineSrc.image}')!`,
          );
          totalErrors++;
        }

        if (rootSrc && rootSrc.src && rootSrc.image && rootSrc.src !== rootSrc.image) {
          console.error(
            `   ❌ [${unitId} L${lessonNum} Root Source ${step}] Source ${rootSrc.letter} src !== image ('${rootSrc.src}' vs '${rootSrc.image}')!`,
          );
          totalErrors++;
        }
      }
    });
  });
});

console.log('\n======================================================================');
console.log(`Audited Units:   ${FIVE_BLOCK_UNITS.length}`);
console.log(`Lessons Audited: ${totalLessonsAudited}`);
console.log(`Total Errors:    ${totalErrors}`);

if (totalErrors > 0) {
  console.error(`\n❌ CHRONOLOGY & UNIFORMITY FAILED: ${totalErrors} violations detected!`);
  console.log('======================================================================\n');
  process.exit(1);
}

console.log('🎉 100% CLEAN: All 5-block lessons possess perfect 1-to-1 chronological');
console.log('   source-to-block alignment with zero property divergence!');
console.log('======================================================================\n');
process.exit(0);
