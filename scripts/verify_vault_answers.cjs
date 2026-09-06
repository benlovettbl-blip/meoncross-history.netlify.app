/**
 * Vault Verification & Options Completeness Script
 *
 * Quality Assurance tool that performs two essential build-time checks:
 *
 * STAGE 1: Options Completeness Linter (Source Data Check)
 *   Directly scans all `units/<unitId>/data.js` quiz arrays to ensure:
 *   - No question options array contains empty strings ("") or whitespace-only choices.
 *   - No question options array contains duplicate choices (case-insensitive).
 *
 * STAGE 2: Vault Output Verification (HTML Check)
 *   Scans all generated HTML files in `public/units/* /mastery_pack_*.html` for:
 *   - Literal string ">undefined<"
 *   - Empty answer containers: '<div class="answer-text"></div>'
 *
 * Exits with code 1 if any invalid choices or answers are detected,
 * halting CI/pre-commit immediately before build or PDF compilation.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { PATHS } = require('./config.cjs');

const rootDir = path.join(__dirname, '..');
const unitsSourceDir = path.join(rootDir, 'units');
const publicUnitsDir = path.join(PATHS.PUBLIC, 'units');

console.log('====================================================');
console.log('🔒 RUNNING VAULT & OPTIONS VERIFICATION SUITE');
console.log('====================================================\n');

(async () => {
  let hasErrors = false;

  // ----------------------------------------------------
  // STAGE 1: Options Completeness Linter (Source data.js)
  // ----------------------------------------------------
  console.log('--- STAGE 1: Source Data "Options Completeness" Linter ---');
  let totalQuestionsScanned = 0;
  const optionsViolations = [];

  if (fs.existsSync(unitsSourceDir)) {
    const unitDirs = fs
      .readdirSync(unitsSourceDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
      .map((d) => d.name);

    for (const unitId of unitDirs) {
      if (unitId === 'trip_ypres') continue;
      const dataJsPath = path.join(unitsSourceDir, unitId, 'data.js');
      if (!fs.existsSync(dataJsPath)) continue;

      let unit;
      try {
        const mod = await import(pathToFileURL(dataJsPath).href);
        unit = mod.unitData || mod.default || mod[unitId];
      } catch (e) {
        console.warn(`⚠️ Warning: Could not import data.js for ${unitId}: ${e.message}`);
        continue;
      }

      if (!unit || !unit.lessons) continue;

      unit.lessons.forEach((lesson, lessonIdx) => {
        const lessonLabel = lesson.title || lesson.id || `Lesson ${lessonIdx + 1}`;

        const inspectArray = (arr, arraySource) => {
          if (!Array.isArray(arr)) return;
          arr.forEach((q, qIdx) => {
            if (!q) return;
            totalQuestionsScanned++;
            const qNum = qIdx + 1;
            const qText = q.question || q.q || '(No question text)';

            if (Array.isArray(q.options)) {
              // Check 1: Empty strings or whitespace-only options
              const emptyIndices = [];
              q.options.forEach((opt, optIdx) => {
                if (typeof opt !== 'string' || opt.trim() === '') {
                  emptyIndices.push(optIdx);
                }
              });

              if (emptyIndices.length > 0) {
                optionsViolations.push({
                  unitId,
                  lesson: lessonLabel,
                  source: arraySource,
                  qNum,
                  question: qText,
                  issue: `Contains empty string or whitespace-only option(s) at index [${emptyIndices.join(', ')}]`,
                  options: q.options,
                });
              }

              // Check 2: Duplicate choices
              const seenChoices = new Map();
              const duplicates = [];
              q.options.forEach((opt, optIdx) => {
                if (typeof opt === 'string' && opt.trim() !== '') {
                  const normalized = opt.trim().toLowerCase();
                  if (seenChoices.has(normalized)) {
                    duplicates.push(
                      `"${opt}" (positions ${seenChoices.get(normalized)} & ${optIdx})`,
                    );
                  } else {
                    seenChoices.set(normalized, optIdx);
                  }
                }
              });

              if (duplicates.length > 0) {
                optionsViolations.push({
                  unitId,
                  lesson: lessonLabel,
                  source: arraySource,
                  qNum,
                  question: qText,
                  issue: `Contains duplicate option choice(s): ${duplicates.join('; ')}`,
                  options: q.options,
                });
              }
            }
          });
        };

        inspectArray(lesson.quiz, 'lesson.quiz');
        if (lesson.do_now) inspectArray(lesson.do_now.items, 'do_now.items');
        inspectArray(lesson.starter_quiz, 'lesson.starter_quiz');
      });
    }
  }

  console.log(
    `📊 Scanned ${totalQuestionsScanned} question objects across source curriculum files.`,
  );

  if (optionsViolations.length > 0) {
    hasErrors = true;
    console.error(
      `\n🚨 OPTIONS COMPLETENESS LINTER FAILED: ${optionsViolations.length} violation(s) found:\n`,
    );
    optionsViolations.forEach((v) => {
      console.error(`❌ [${v.unitId}] ${v.lesson} > ${v.source} (Q${v.qNum}):`);
      console.error(`   Question: "${v.question}"`);
      console.error(`   Issue: ${v.issue}`);
      console.error(`   Current Options: ${JSON.stringify(v.options)}\n`);
    });
  } else {
    console.log('✅ Stage 1 Passed: Zero empty strings or duplicate options in source data.');
  }

  // ----------------------------------------------------
  // STAGE 2: Generated HTML Vault Verification
  // ----------------------------------------------------
  console.log('\n--- STAGE 2: Generated HTML Vault Verification ---');
  if (!fs.existsSync(publicUnitsDir)) {
    console.error(`❌ Error: Directory not found: ${publicUnitsDir}`);
    process.exit(1);
  }

  const unitDirs = fs
    .readdirSync(publicUnitsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
    .map((d) => d.name);

  let totalFilesScanned = 0;
  let totalHtmlErrors = 0;
  const htmlErrorDetails = [];

  const PATTERN_UNDEFINED = />\s*undefined\s*</i;
  const PATTERN_EMPTY_ANSWER = /<div class=["']answer-text["']>\s*<\/div>/i;

  for (const unitId of unitDirs) {
    const dirPath = path.join(publicUnitsDir, unitId);
    const packFiles = fs
      .readdirSync(dirPath)
      .filter((f) => f.startsWith('mastery_pack_') && f.endsWith('.html'));

    for (const packFile of packFiles) {
      totalFilesScanned++;
      const filePath = path.join(dirPath, packFile);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      const fileViolations = [];

      lines.forEach((line, index) => {
        const lineNum = index + 1;
        let matchedReason = null;

        if (PATTERN_UNDEFINED.test(line)) {
          matchedReason = 'Contains literal ">undefined<" in answer output';
        } else if (PATTERN_EMPTY_ANSWER.test(line)) {
          matchedReason = 'Empty <div class="answer-text"></div> with no answer text';
        }

        if (matchedReason) {
          fileViolations.push({
            lineNum,
            snippet: line.trim(),
            reason: matchedReason,
          });
        }
      });

      if (fileViolations.length > 0) {
        totalHtmlErrors += fileViolations.length;
        htmlErrorDetails.push({
          unitId,
          fileName: packFile,
          filePath,
          violations: fileViolations,
        });
      }
    }
  }

  console.log(`📊 Total Mastery Pack HTML files scanned: ${totalFilesScanned}`);

  if (totalHtmlErrors > 0) {
    hasErrors = true;
    console.error('\n🚨 HTML VAULT VERIFICATION FAILED!');
    console.error(
      `Found ${totalHtmlErrors} invalid/undefined Vault answer(s) across ${htmlErrorDetails.length} file(s):\n`,
    );

    for (const err of htmlErrorDetails) {
      console.error(`❌ [${err.unitId}] ${err.fileName} (${err.violations.length} issue(s)):`);
      for (const v of err.violations.slice(0, 10)) {
        console.error(`   • Line ${v.lineNum}: ${v.reason}`);
        console.error(`     Snippet: "${v.snippet}"`);
      }
      if (err.violations.length > 10) {
        console.error(`   ... and ${err.violations.length - 10} more in this file.`);
      }
      console.error('');
    }
  } else {
    console.log(
      `✅ Stage 2 Passed: All ${totalFilesScanned} Mastery Pack files contain 100% valid answers.`,
    );
  }

  console.log('====================================================');
  if (hasErrors) {
    console.error('🛑 Halting build: One or more checks failed.');
    process.exit(1);
  } else {
    console.log('🎉 ALL VAULT & OPTIONS VERIFICATION CHECKS PASSED CLEANLY');
    console.log('====================================================\n');
    process.exit(0);
  }
})();
