/**
 * scripts/render_standard_textbook_cme_unified.cjs
 *
 * CANONICAL 28-PAGE MASTER TEXTBOOK COMPILER: CONFLICT IN THE MIDDLE EAST (1945–1995)
 * Delegates to the unified Option A compiler: scripts/render_cme_28page_master_textbook.cjs
 */

const { main } = require('./render_cme_28page_master_textbook.cjs');

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error during CME master textbook compilation:', err);
    process.exit(1);
  });
}

module.exports = { main };
