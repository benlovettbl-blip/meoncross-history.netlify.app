const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const unitsDir = path.join(__dirname, '..', 'units');

async function verifyVocabParity() {
  const targetUnit = process.argv[2];
  let dirs = fs
    .readdirSync(unitsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (targetUnit) {
    dirs = dirs.filter((d) => d === targetUnit);
    if (dirs.length === 0) {
      console.error(`Unit not found: ${targetUnit}`);
      process.exit(1);
    }
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  let scannedLessons = 0;

  console.log('\n====================================================');
  console.log('🔍 RUNNING VOCABULARY & CLOZE PARITY LINTER');
  console.log('====================================================\n');

  for (const unitId of dirs) {
    const dataPath = path.join(unitsDir, unitId, 'data.js');
    if (!fs.existsSync(dataPath)) continue;

    let unitData;
    try {
      const fileUrl = pathToFileURL(dataPath).href;
      const module = await import(fileUrl);
      unitData = module.default || module.unitData || module[unitId];
    } catch (e) {
      console.error(`❌ [${unitId}] Could not load data.js: ${e.message}`);
      totalErrors++;
      continue;
    }

    if (!unitData || !Array.isArray(unitData.lessons)) continue;

    let unitHasIssue = false;

    unitData.lessons.forEach((lesson, idx) => {
      scannedLessons++;
      const lessonNum = idx + 1;
      const lessonTitle = lesson.title || `Lesson ${lessonNum}`;
      const errors = [];
      const warnings = [];

      // 1. Orphaned vocabulary check
      if (lesson.vocabulary && Array.isArray(lesson.vocabulary)) {
        errors.push(`Orphaned legacy 'vocabulary' array found (${lesson.vocabulary.length} terms). Remove and consolidate into canonical 'vocab'.`);
      }

      // 2. Canonical vocab check
      if (!lesson.vocab || !Array.isArray(lesson.vocab) || lesson.vocab.length === 0) {
        warnings.push(`Missing canonical 'vocab' array.`);
      } else {
        const vocabTerms = lesson.vocab.map((v) => (v.term || '').trim());
        const vocabSet = new Set(vocabTerms);

        // 3. Cloze text parity check
        if (lesson.vocab_cloze_text && typeof lesson.vocab_cloze_text === 'string') {
          const rawBlanks = lesson.vocab_cloze_text.match(/\[(.*?)\]/g) || [];
          const blanks = rawBlanks.map((b) => b.slice(1, -1).trim());

          if (blanks.length === 0) {
            warnings.push(`'vocab_cloze_text' contains no bracketed blanks.`);
          } else {
            blanks.forEach((b) => {
              if (!vocabSet.has(b)) {
                // Check if case insensitive match exists
                const caseMatch = vocabTerms.find((t) => t.toLowerCase() === b.toLowerCase());
                if (caseMatch) {
                  errors.push(`Cloze blank '[${b}]' case mismatch with vocab term '${caseMatch}'.`);
                } else {
                  errors.push(`Cloze blank '[${b}]' not found in canonical vocab.`);
                }
              }
            });

            vocabTerms.forEach((t) => {
              if (!blanks.includes(t)) {
                warnings.push(`Vocab term '${t}' is not tested in cloze text.`);
              }
            });
          }
        }
      }

      if (errors.length > 0) {
        unitHasIssue = true;
        totalErrors += errors.length;
        console.log(`❌ [${unitId}] L${lessonNum}: "${lessonTitle.slice(0, 50)}"`);
        errors.forEach((err) => console.log(`   - ERROR: ${err}`));
      }
      if (warnings.length > 0) {
        totalWarnings += warnings.length;
        if (!unitHasIssue) {
          // print header if not already printed
          console.log(`⚠️  [${unitId}] L${lessonNum}: "${lessonTitle.slice(0, 50)}"`);
        }
        warnings.forEach((warn) => console.log(`   - WARN: ${warn}`));
      }
    });

    if (!unitHasIssue) {
      console.log(`✅ [${unitId.padEnd(25)}] All lessons synchronized!`);
    }
  }

  console.log('\n====================================================');
  console.log(`📊 Scanned ${scannedLessons} lessons across units.`);
  console.log(`Errors: ${totalErrors} | Warnings: ${totalWarnings}`);
  console.log('====================================================');

  if (totalErrors > 0) {
    console.error(`\n❌ PARITY CHECK FAILED: Found ${totalErrors} vocabulary error(s).\n`);
    process.exit(1);
  } else {
    console.log(`\n🎉 100% SUCCESS: Vocabulary parity cleanly verified!\n`);
    process.exit(0);
  }
}

verifyVocabParity();
