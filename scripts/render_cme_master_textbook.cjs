/**
 * History Revision Hub — Conflict in the Middle East Master Textbook Runner
 *
 * Unified CLI runner for compiling Conflict in the Middle East (1945–1995) Master Textbooks
 * (Key Topics 1, 2, and 3) using the standard balanced layout engine, in-memory auto-calibration,
 * and automated page budget auditing.
 *
 * Usage:
 *   node scripts/render_cme_master_textbook.cjs kt1
 *   node scripts/render_cme_master_textbook.cjs kt2
 *   node scripts/render_cme_master_textbook.cjs kt3
 *   node scripts/render_cme_master_textbook.cjs all
 */

const { runKT1 } = require('./render_standard_textbook_kt1.cjs');
const { runKT2 } = require('./render_standard_textbook_kt2.cjs');
const { runKT3 } = require('./render_standard_textbook_kt3.cjs');

async function run(target) {
  const arg = (target || process.argv[2] || 'all').toLowerCase();

  if (arg === 'kt1') {
    await runKT1();
  } else if (arg === 'kt2') {
    await runKT2();
  } else if (arg === 'kt3') {
    await runKT3();
  } else if (arg === 'all') {
    console.log('================================================================');
    console.log('🏛️ COMPILING ALL CONFLICT IN THE MIDDLE EAST MASTER TEXTBOOKS (KT1–KT3)');
    console.log('================================================================\n');
    await runKT1();
    await runKT2();
    await runKT3();
    console.log('\n🎉 ALL CONFLICT IN THE MIDDLE EAST MASTER TEXTBOOKS COMPILED SUCCESSFULLY!');
  } else {
    console.error(`Unknown argument: "${arg}". Use kt1, kt2, kt3, or all.`);
    process.exit(1);
  }
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal error during CME master textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { run };
