/**
 * scripts/verify_curriculum_facts.cjs
 *
 * Automated Anti-Hallucination & Fact Parity Audit.
 * Validates curriculum data and unit files against an authoritative
 * fact manifest and blacklist of known AI confabulations.
 *
 * Usage:
 *   node scripts/verify_curriculum_facts.cjs [unit_id]
 *   node scripts/verify_curriculum_facts.cjs trip_ypres
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'data', 'curriculum_facts_manifest.json');

if (!fs.existsSync(MANIFEST_PATH)) {
  console.error(`❌ Fatal: Fact manifest not found at: ${MANIFEST_PATH}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
const targetUnitId = process.argv[2];

// Determine units to audit
const unitsDir = path.join(ROOT_DIR, 'units');
const availableUnits = fs.readdirSync(unitsDir).filter((f) => {
  return (
    fs.statSync(path.join(unitsDir, f)).isDirectory() &&
    fs.existsSync(path.join(unitsDir, f, 'data.js'))
  );
});

const unitsToAudit = targetUnitId ? [targetUnitId] : availableUnits;

if (targetUnitId && !availableUnits.includes(targetUnitId)) {
  console.error(`❌ Fatal: Target unit "${targetUnitId}" does not exist in units/`);
  process.exit(1);
}

console.log(`\n======================================================`);
console.log(`🛡️  ANTI-HALLUCINATION & FACT VERIFICATION AUDIT`);
console.log(`======================================================`);
console.log(`Auditing target(s): ${unitsToAudit.join(', ')}\n`);

let totalViolations = 0;
let totalFilesChecked = 0;

function auditContent(filePath, content, unitId) {
  const relPath = path.relative(ROOT_DIR, filePath);
  totalFilesChecked++;
  const lines = content.split('\n');
  const violations = [];

  // 1. Check Global Banned Patterns
  for (const rule of manifest.global_banned_patterns || []) {
    const regex = new RegExp(
      rule.pattern,
      (rule.caseInsensitive ? 'i' : '') + (rule.isRegex ? '' : ''),
    );
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        violations.push({
          type: 'GLOBAL_BAN',
          line: i + 1,
          snippet: lines[i].trim().slice(0, 120),
          reason: rule.reason,
        });
      }
    }
  }

  // 2. Check Unit-Specific Banned Patterns
  const unitConfig = manifest.unit_rules?.[unitId];
  if (unitConfig) {
    for (const rule of unitConfig.banned_patterns || []) {
      const flags = rule.caseInsensitive ? 'i' : '';
      const regex = rule.isRegex ? new RegExp(rule.pattern, flags) : null;

      for (let i = 0; i < lines.length; i++) {
        const matched = regex
          ? regex.test(lines[i])
          : rule.caseInsensitive
            ? lines[i].toLowerCase().includes(rule.pattern.toLowerCase())
            : lines[i].includes(rule.pattern);
        if (matched) {
          violations.push({
            type: 'UNIT_HALLUCINATION_REGRESSION',
            line: i + 1,
            snippet: lines[i].trim().slice(0, 140),
            reason: rule.reason,
          });
        }
      }
    }

    // 3. Check Required Anchors (if trigger is found in file)
    if (unitConfig.required_anchors_if_present) {
      for (const anchor of unitConfig.required_anchors_if_present) {
        if (content.includes(anchor.trigger)) {
          for (const req of anchor.must_include || []) {
            const reqRegex = new RegExp(req.pattern, 'i');
            if (!reqRegex.test(content)) {
              violations.push({
                type: 'MISSING_MANDATORY_ANCHOR',
                line: 1,
                snippet: `Trigger "${anchor.trigger}" detected, but required anchor "${req.pattern}" was missing.`,
                reason: req.reason,
              });
            }
          }
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error(`\n❌ [FACT VIOLATIONS FOUND] in ${relPath}:`);
    for (const v of violations) {
      console.error(`   - Line ${v.line} [${v.type}]:`);
      console.error(`     Snippet: "${v.snippet}"`);
      console.error(`     Reason:  ${v.reason}\n`);
    }
    totalViolations += violations.length;
    return false;
  }

  return true;
}

// Audit each unit
for (const unitId of unitsToAudit) {
  const unitFolder = path.join(unitsDir, unitId);
  const candidateFiles = [
    path.join(unitFolder, 'data.js'),
    path.join(unitFolder, 'pupil_workbook.html'),
    path.join(unitFolder, 'textbook.html'),
  ];

  let unitClean = true;
  for (const file of candidateFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const passed = auditContent(file, content, unitId);
      if (!passed) unitClean = false;
    }
  }

  if (unitClean) {
    console.log(`✅ Unit [${unitId}]: All fact guardrails verified clean.`);
  }
}

// Also check public/database.json if present
const dbPath = path.join(ROOT_DIR, 'public', 'database.json');
if (fs.existsSync(dbPath)) {
  try {
    const dbContent = fs.readFileSync(dbPath, 'utf8');
    for (const unitId of unitsToAudit) {
      const unitConfig = manifest.unit_rules?.[unitId];
      if (unitConfig) {
        // Simple check on unit slice
        auditContent(dbPath, dbContent, unitId);
      }
    }
  } catch (err) {
    console.warn(`⚠️ Warning: Could not read database.json: ${err.message}`);
  }
}

console.log(`\n======================================================`);
console.log(
  `AUDIT SUMMARY: Checked ${totalFilesChecked} files across ${unitsToAudit.length} unit(s).`,
);

if (totalViolations > 0) {
  console.error(
    `❌ FATAL: Found ${totalViolations} fact violation(s) / AI hallucination regression(s)!`,
  );
  console.error(`Deployment or build process MUST be aborted until corrected.`);
  console.log(`======================================================\n`);
  process.exit(1);
} else {
  console.log(`✅ 100% CLEAN: Zero hallucinations or fact regressions detected.`);
  console.log(`======================================================\n`);
  process.exit(0);
}
