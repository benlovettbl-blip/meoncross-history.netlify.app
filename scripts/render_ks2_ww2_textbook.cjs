/**
 * scripts/render_ks2_ww2_textbook.cjs
 *
 * Forwarder to canonical Model 1 Single Wide-Margin Column Pure Narrative compiler:
 * scripts/render_standard_textbook_ks2_ww2.cjs
 */

const { renderKs2Ww2Textbook, buildHtml } = require('./render_standard_textbook_ks2_ww2.cjs');

if (require.main === module) {
  renderKs2Ww2Textbook().catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });
}

module.exports = { renderKs2Ww2Textbook, buildHtml, run: renderKs2Ww2Textbook };
