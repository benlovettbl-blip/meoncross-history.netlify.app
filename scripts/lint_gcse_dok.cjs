/**
 * lint_gcse_dok.cjs
 *
 * Automated Depth of Knowledge (DoK) & Specification Vocabulary Linter
 * Ensures curriculum files and booklet generator scripts adhere strictly to
 * official Pearson Edexcel GCSE History specifications, preventing university-level
 * trivia and obscure historical facts from entering pupil revision packs.
 */

const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'data', 'curriculum_facts_manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('❌ Error: curriculum_facts_manifest.json not found at:', manifestPath);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const targetUnit = process.argv[2]; // optional unit filter: cme_new, usa, etc.

const targetFiles = {
  cme_new: [
    path.join(__dirname, 'generate_cme_mastery_booklets.cjs'),
    path.join(__dirname, '..', 'units', 'cme_new', 'data.js'),
    path.join(__dirname, '..', 'public', 'units', 'cme_new', 'booklets', 'cme_mastery_FULL.html'),
  ],
  usa: [
    path.join(__dirname, 'generate_usa_visual_guide.cjs'),
    path.join(__dirname, 'generate_usa_mastery_booklets.cjs'),
    path.join(__dirname, '..', 'units', 'usa', 'data.js'),
  ],
};

let totalViolations = 0;

console.log('====================================================');
console.log('🔍 GCSE DEPTH OF KNOWLEDGE (DoK) SPECIFICATION LINTER');
console.log('====================================================\n');

const unitsToAudit = targetUnit ? [targetUnit] : Object.keys(manifest);

for (const unitId of unitsToAudit) {
  const unitConfig = manifest[unitId];
  if (!unitConfig) {
    console.warn(`⚠️ Unit "${unitId}" not found in manifest. Skipping.`);
    continue;
  }

  console.log(`▶ Auditing Unit: [${unitId}] — ${unitConfig.title}`);
  const bannedTerms = unitConfig.banned_peripheral_trivia || [];
  const files = targetFiles[unitId] || [];

  let unitViolations = 0;

  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      continue;
    }

    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    for (const term of bannedTerms) {
      const regex = new RegExp(`\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      lines.forEach((line, idx) => {
        if (regex.test(line)) {
          console.error(`  ❌ [NON-GCSE TRIVIA DETECTED] in ${relativePath}:${idx + 1}`);
          console.error(`     Term: "${term}"`);
          console.error(`     Snippet: "${line.trim().substring(0, 100)}..."`);
          unitViolations++;
          totalViolations++;
        }
      });
    }
  }

  if (unitViolations === 0) {
    console.log(`  ✅ 100% CLEAN: Zero banned peripheral trivia terms found in [${unitId}].`);
  } else {
    console.error(`  ⚠️ Found ${unitViolations} non-GCSE trivia violations in [${unitId}].`);
  }
  console.log('');
}

console.log('====================================================');
if (totalViolations === 0) {
  console.log(
    '🎉 AUDIT PASSED: All curriculum materials adhere to GCSE Depth of Knowledge standards.',
  );
  process.exit(0);
} else {
  console.error(
    `❌ AUDIT FAILED: ${totalViolations} non-GCSE term(s) detected. Please replace with approved specification facts.`,
  );
  process.exit(1);
}
