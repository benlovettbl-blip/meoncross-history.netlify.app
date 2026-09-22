/**
 * Legacy Redirection Bridge: render_industrialisation_textbook.cjs -> render_standard_textbook_industrialisation.cjs
 *
 * This forwarder guarantees that any legacy calls seamlessly execute the official
 * Publisher-Level Standard Textbook Engine (18 pages, 2-column measure, 0px overflow).
 */

const {
  runIndustrialisation,
  run,
  buildPublisherTextbookHtmlIndustrialisation,
} = require('./render_standard_textbook_industrialisation.cjs');

if (require.main === module) {
  runIndustrialisation().catch((err) => {
    console.error('Fatal textbook compilation error:', err);
    process.exit(1);
  });
}

module.exports = {
  buildIndustrialisationTextbook: buildPublisherTextbookHtmlIndustrialisation,
  runIndustrialisation,
  run,
};
