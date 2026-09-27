/**
 * History Revision Hub — Early Elizabethan England Master Textbook Runner
 *
 * Unified CLI runner for compiling Early Elizabethan England (1558–1588) Master Textbooks
 * (Key Topics 1, 2, and 3) using the standard balanced layout engine, in-memory auto-calibration,
 * and automated page budget auditing.
 *
 * Usage:
 *   node scripts/render_eee_master_textbook.cjs kt1
 *   node scripts/render_eee_master_textbook.cjs kt2
 *   node scripts/render_eee_master_textbook.cjs kt3
 *   node scripts/render_eee_master_textbook.cjs all
 */

const { runKT1 } = require('./render_standard_textbook_eee_kt1.cjs');
const { runKT2 } = require('./render_standard_textbook_eee_kt2.cjs');
const { runKT3 } = require('./render_standard_textbook_eee_kt3.cjs');

async function run() {
  const arg = (process.argv[2] || 'all').toLowerCase();

  if (arg === 'kt1') {
    await runKT1();
  } else if (arg === 'kt2') {
    await runKT2();
  } else if (arg === 'kt3') {
    await runKT3();
  } else if (arg === 'all') {
    console.log('================================================================');
    console.log('🏛️ COMPILING ALL EARLY ELIZABETHAN ENGLAND MASTER TEXTBOOKS (KT1–KT3)');
    console.log('================================================================\n');
    await runKT1();
    await runKT2();
    await runKT3();
    console.log('🎉 ALL EARLY ELIZABETHAN ENGLAND MASTER TEXTBOOKS COMPILED SUCCESSFULLY!');
  } else {
    console.error(`Unknown argument: "${arg}". Use kt1, kt2, kt3, or all.`);
    process.exit(1);
  }
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Fatal error during EEE master textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { run };
