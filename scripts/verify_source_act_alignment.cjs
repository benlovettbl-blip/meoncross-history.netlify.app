const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

/**
 * Automated Source-to-Act Alignment Guardrail
 * Verifies that every (<span class="archival-meta-tag">Source X</span>) text citation
 * in an Act narrative block has a corresponding block.source attached to that exact block
 * with a matching source letter.
 */
async function runAudit() {
  const args = process.argv.slice(2);
  const isV2 = args.includes('--v2');
  const targetUnitArg = args.find((a) => !a.startsWith('--'));
  const targetFileName = isV2 ? 'data_v2_4act.js' : 'data.js';
  const unitsDir = path.resolve(__dirname, '../units');

  const defaultUnits = [
    'cme_new',
    'early_modern_world',
    'great_war',
    'medieval_england',
    'industrialisation_and_empire',
    'edexcel_medicine',
    'weimar_germany',
    'eee',
    'cold_war',
    'usa',
    'water_and_sanitation',
  ];

  const unitsToAudit = targetUnitArg
    ? [targetUnitArg]
    : defaultUnits.filter((u) => fs.existsSync(path.join(unitsDir, u, targetFileName)));

  console.log('====================================================');
  console.log(`🔍 SOURCE-TO-ACT ALIGNMENT AUDITOR${isV2 ? ' (4-Act V2)' : ''}`);
  console.log('====================================================');
  console.log(`Auditing units: ${unitsToAudit.join(', ')}\n`);

  let totalErrors = 0;
  let totalCitationsChecked = 0;
  let totalBlocksChecked = 0;

  for (const unitId of unitsToAudit) {
    const dataPath = path.join(unitsDir, unitId, targetFileName);
    if (!fs.existsSync(dataPath)) {
      continue;
    }

    try {
      const mod = await import(pathToFileURL(dataPath).href);
      const unitData = mod.default || mod.unitData;
      if (!unitData || !Array.isArray(unitData.lessons)) {
        continue;
      }

      let unitErrors = 0;
      console.log(`▶ Unit: [${unitId}] (${unitData.lessons.length} lessons)`);

      unitData.lessons.forEach((lesson, lIdx) => {
        const lessonId = lesson.id || `lesson_${lIdx + 1}`;
        (lesson.narrative_blocks || []).forEach((block, bIdx) => {
          totalBlocksChecked++;
          const actNum = bIdx + 1;
          const text = block.text || '';

          // Match <span class="archival-meta-tag">Source X</span> or similar
          const citationRegex = /<span class=["']archival-meta-tag["']>Source\s+([A-Z])<\/span>/gi;
          const matches = [...text.matchAll(citationRegex)];

          matches.forEach((m) => {
            totalCitationsChecked++;
            const citedLetter = m[1].toUpperCase();

            if (!block.source) {
              console.error(
                `  ❌ [${unitId} | ${lessonId} | Act ${actNum}] Text cites Source ${citedLetter} via archival-meta-tag, but NO block.source is attached to this block!`,
              );
              unitErrors++;
              totalErrors++;
              return;
            }

            const sourceLetter =
              block.source.letter?.toUpperCase() ||
              (block.source.title || '').match(/Source\s+([A-Z])\b/i)?.[1]?.toUpperCase();

            if (sourceLetter !== citedLetter) {
              console.error(
                `  ❌ [${unitId} | ${lessonId} | Act ${actNum}] Text cites Source ${citedLetter}, but block.source is "${block.source.title || block.source.letter || 'UNKNOWN'}" (detected letter: ${sourceLetter || 'none'})!`,
              );
              unitErrors++;
              totalErrors++;
            }
          });
        });
      });

      if (unitErrors === 0) {
        console.log(`  ✅ [${unitId}] Clean alignment across all Acts.`);
      }
    } catch (err) {
      console.error(`  ❌ Error loading unit "${unitId}":`, err.message);
      totalErrors++;
    }
  }

  console.log('\n====================================================');
  console.log(
    `Audited ${totalBlocksChecked} narrative blocks. Verified ${totalCitationsChecked} archival source citations.`,
  );

  if (totalErrors > 0) {
    console.error(`❌ FAILED: Found ${totalErrors} source-to-act alignment error(s).`);
    process.exit(1);
  } else {
    console.log(
      '🎉 100% CLEAN: Every cited archival source perfectly aligns with its parent Act block!',
    );
    process.exit(0);
  }
}

runAudit();
