#!/usr/bin/env node

/**
 * Cross-Unit Testing Regime Batch Runner
 *
 * Runs the automated testing regime across KS3 and GCSE units in sequence
 * before major department releases, verifying:
 *  - Visual sources integrity & Hinge questions
 *  - Collapsed-by-default archival drawers
 *  - High-res Lightbox modal & Masterpiece projector
 *  - Retrieval practice data & 0px overflow quiz packs
 *  - Distractor collision & answer key sanity
 *  - Mobile touch ergonomics & WCAG 2.1 AA 44px compliance
 *  - Audio & Speech Synthesis state machine (desktop & mobile)
 *  - PWA manifest, service worker & offline cache storage
 *  - Institutional neutrality & anonymity policy
 *
 * Usage:
 *   node scripts/verify_all_units_regime.cjs            # Runs primary curriculum units
 *   node scripts/verify_all_units_regime.cjs --ks3      # Runs all KS3 units
 *   node scripts/verify_all_units_regime.cjs --gcse     # Runs all GCSE units
 *   node scripts/verify_all_units_regime.cjs --all      # Runs entire 18-unit curriculum
 */

const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');
const REGIME_SCRIPT = path.join(ROOT_DIR, 'scripts', 'verify_app_interactive_regime.cjs');

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  dim: '\x1b[2m',
};

const KS3_UNITS = [
  'medieval_england',
  'early_modern_world',
  'industrialisation_and_empire',
  'great_war',
  'water_and_sanitation',
];

const GCSE_UNITS = ['edexcel_medicine', 'cme_new', 'eee', 'weimar_nazi_germany', 'usa'];

const ALL_ACTIVE_UNITS = [
  'medieval_england',
  'early_modern_world',
  'industrialisation_and_empire',
  'great_war',
  'water_and_sanitation',
  'edexcel_medicine',
  'cme_new',
  'eee',
  'weimar_nazi_germany',
  'usa',
];

async function runBatchRegime() {
  const args = process.argv.slice(2);
  let unitsToRun = ALL_ACTIVE_UNITS;
  let batchTitle = 'Core Departmental Curriculum Units';

  if (args.includes('--ks3')) {
    unitsToRun = KS3_UNITS;
    batchTitle = 'Key Stage 3 Curriculum Units';
  } else if (args.includes('--gcse')) {
    unitsToRun = GCSE_UNITS;
    batchTitle = 'GCSE Edexcel Curriculum Units';
  } else if (args.includes('--all')) {
    const dbPath = path.join(ROOT_DIR, 'public', 'database.json');
    if (fs.existsSync(dbPath)) {
      const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      unitsToRun = Object.keys(db.units || db);
    }
    batchTitle = 'Entire Curriculum (All Units)';
  }

  console.log(
    `\n${ANSI.cyan}${ANSI.bold}=============================================================${ANSI.reset}`,
  );
  console.log(
    `${ANSI.cyan}${ANSI.bold}🚀 CROSS-UNIT AUTOMATED TESTING REGIME BATCH RUNNER${ANSI.reset}`,
  );
  console.log(
    `   Scope: ${ANSI.bold}${batchTitle}${ANSI.reset} (${unitsToRun.length} units queued)`,
  );
  console.log(
    `${ANSI.cyan}${ANSI.bold}=============================================================${ANSI.reset}\n`,
  );

  const results = [];
  const overallStartTime = Date.now();

  for (let i = 0; i < unitsToRun.length; i++) {
    const unitId = unitsToRun[i];
    const unitNum = i + 1;
    console.log(
      `\n${ANSI.bold}[${unitNum}/${unitsToRun.length}] Testing Unit: ${ANSI.cyan}${unitId}${ANSI.reset}...`,
    );

    const unitStartTime = Date.now();
    const child = spawnSync('node', [REGIME_SCRIPT, unitId], {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      env: { ...process.env, FORCE_COLOR: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    const unitDuration = ((Date.now() - unitStartTime) / 1000).toFixed(1);
    const rawOutput = (child.stdout || '') + (child.stderr || '');
    const cleanOutput = rawOutput.replace(/\x1b\[[0-9;]*m/g, '');

    // Extract assertion numbers from summary
    const passedMatch = cleanOutput.match(/Passed Assertions:\s+(\d+)/);
    const failedMatch = cleanOutput.match(/Failed Assertions:\s+(\d+)/);
    const totalMatch = cleanOutput.match(/Total Test Assertions:\s+(\d+)/);

    const passed = passedMatch ? parseInt(passedMatch[1], 10) : 0;
    const failed = failedMatch ? parseInt(failedMatch[1], 10) : 0;
    const total = totalMatch ? parseInt(totalMatch[1], 10) : passed + failed;
    const isSuccess = child.status === 0 && failed === 0;

    if (isSuccess) {
      console.log(
        `  ${ANSI.green}✔ PASS:${ANSI.reset} ${unitId} passed all ${passed}/${total} assertions in ${unitDuration}s`,
      );
    } else {
      console.log(
        `  ${ANSI.red}✖ FAIL:${ANSI.reset} ${unitId} had ${failed} failures in ${unitDuration}s`,
      );
      // Print failure snippets
      const lines = cleanOutput
        .split('\n')
        .filter((l) => l.includes('✖ FAIL') || l.includes('AssertionError'));
      lines.slice(0, 3).forEach((l) => console.log(`     ${ANSI.red}${l}${ANSI.reset}`));
    }

    results.push({
      unitId,
      passed,
      failed,
      total,
      duration: unitDuration,
      status: isSuccess ? 'PASS' : 'FAIL',
    });
  }

  const overallDuration = ((Date.now() - overallStartTime) / 1000).toFixed(1);

  // Print Summary Table
  console.log(
    `\n\n${ANSI.cyan}${ANSI.bold}=============================================================${ANSI.reset}`,
  );
  console.log(
    `${ANSI.cyan}${ANSI.bold}📊 CROSS-UNIT TESTING REGIME EXECUTIVE SCORECARD${ANSI.reset}`,
  );
  console.log(
    `${ANSI.cyan}${ANSI.bold}=============================================================${ANSI.reset}\n`,
  );

  console.log(
    ` ${ANSI.bold}${'Unit ID'.padEnd(32)} ${'Status'.padEnd(10)} ${'Passed'.padEnd(10)} ${'Failed'.padEnd(8)} ${'Time'.padEnd(8)}${ANSI.reset}`,
  );
  console.log(` ${'-'.repeat(70)}`);

  let totalPassedAll = 0;
  let totalFailedAll = 0;
  let totalUnitsPassed = 0;

  results.forEach((r) => {
    totalPassedAll += r.passed;
    totalFailedAll += r.failed;
    if (r.status === 'PASS') totalUnitsPassed++;

    const statusStr =
      r.status === 'PASS'
        ? `${ANSI.green}${ANSI.bold}PASS${ANSI.reset}`
        : `${ANSI.red}${ANSI.bold}FAIL${ANSI.reset}`;

    console.log(
      ` ${r.unitId.padEnd(32)} ${statusStr.padEnd(19)} ${String(r.passed).padEnd(10)} ${String(r.failed).padEnd(8)} ${r.duration + 's'}`,
    );
  });

  console.log(` ${'-'.repeat(70)}`);
  console.log(
    ` ${ANSI.bold}${'TOTALS:'.padEnd(32)} ${`${totalUnitsPassed}/${results.length} Units`.padEnd(10)} ${String(totalPassedAll).padEnd(10)} ${String(totalFailedAll).padEnd(8)} ${overallDuration + 's'}${ANSI.reset}\n`,
  );

  if (totalFailedAll > 0 || totalUnitsPassed < results.length) {
    console.error(
      `${ANSI.red}${ANSI.bold}✖ BATCH TESTING REGIME FAILED: ${totalFailedAll} total failures across ${results.length - totalUnitsPassed} unit(s).${ANSI.reset}\n`,
    );
    process.exit(1);
  } else {
    console.log(
      `${ANSI.green}${ANSI.bold}🎉 ALL UNITS 100% GREEN: ${totalPassedAll} assertions passed across ${results.length} units with zero regressions!${ANSI.reset}\n`,
    );
    process.exit(0);
  }
}

runBatchRegime().catch((err) => {
  console.error('Fatal Batch Error:', err);
  process.exit(1);
});
