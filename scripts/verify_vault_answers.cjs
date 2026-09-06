/**
 * Vault Verification Script
 *
 * Quality Assurance tool that scans all generated HTML files in
 * public/units/* /mastery_pack_*.html for:
 *  - literal string ">undefined<"
 *  - empty answer elements: '<div class="answer-text"></div>' or '<div class="answer-text">\s*</div>'
 *
 * Exits with code 1 if any invalid or missing answers are detected,
 * halting the CI/build pipeline before PDF compilation.
 */

const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const publicUnitsDir = path.join(PATHS.PUBLIC, 'units');

console.log('====================================================');
console.log('🔒 RUNNING VAULT VERIFICATION SCAN');
console.log('====================================================\n');

if (!fs.existsSync(publicUnitsDir)) {
  console.error(`❌ Error: Directory not found: ${publicUnitsDir}`);
  process.exit(1);
}

// Find all mastery_pack_*.html files across public/units
const unitDirs = fs
  .readdirSync(publicUnitsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
  .map((d) => d.name);

let totalFilesScanned = 0;
let totalErrors = 0;
const errorDetails = [];

// Patterns to identify invalid vault answers
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
      totalErrors += fileViolations.length;
      errorDetails.push({
        unitId,
        fileName: packFile,
        filePath,
        violations: fileViolations,
      });
    }
  }
}

console.log(`📊 Total Mastery Pack HTML files scanned: ${totalFilesScanned}`);

if (totalErrors > 0) {
  console.error('\n🚨 VAULT VERIFICATION FAILED!');
  console.error(
    `Found ${totalErrors} invalid/undefined Vault answer(s) across ${errorDetails.length} file(s):\n`,
  );

  for (const err of errorDetails) {
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

  console.error(
    '🛑 Halting build: You must resolve missing/undefined answers in data.js or generate_mastery_packs.cjs before continuing.',
  );
  process.exit(1);
} else {
  console.log(
    `\n✅ VAULT VERIFICATION PASSED: All ${totalFilesScanned} Mastery Pack files contain 100% valid, defined answers.`,
  );
  console.log('====================================================\n');
  process.exit(0);
}
