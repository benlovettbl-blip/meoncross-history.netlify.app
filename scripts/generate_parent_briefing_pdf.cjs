/**
 * Ypres 2026 Parent Information Pack PDF Generator (Proxy to V2 Master)
 */
const v2 = require('./generate_parent_briefing_v2_pdf.cjs');

module.exports = v2;

if (require.main === module) {
  v2.generatePdf().catch((err) => {
    console.error('Error generating PDF:', err);
    process.exit(1);
  });
}
