/**
 * scripts/merge_medicine_master_workbook.cjs
 *
 * Merges the 5 individual period pupil workbooks for Edexcel Medicine into
 * a single comprehensive master workbook PDF:
 * edexcel_medicine_pupil_workbook_master_FINAL_V17.pdf
 */

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { PATHS } = require('./config.cjs');

const pdfsDir = PATHS.PDFS;

const periods = ['medieval', 'renaissance', '18th_19th', 'modern', 'western_front'];

async function mergeMedicineMasterWorkbook() {
  console.log('🔄 Merging Edexcel Medicine Master Pupil Workbook...');
  const mergedPdf = await PDFDocument.create();

  let totalPages = 0;
  for (const period of periods) {
    const pdfFileName = `edexcel_medicine_pupil_workbook_${period}_FINAL_V17.pdf`;
    const pdfPath = path.join(pdfsDir, pdfFileName);

    if (!fs.existsSync(pdfPath)) {
      console.warn(`⚠️ Warning: Missing ${pdfFileName}, skipping...`);
      continue;
    }

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
    totalPages += copiedPages.length;
    console.log(`  ➕ Added ${copiedPages.length} pages from ${pdfFileName}`);
  }

  const outputFileName = 'edexcel_medicine_pupil_workbook_master_FINAL_V17.pdf';
  const outputPath = path.join(pdfsDir, outputFileName);
  const mergedPdfBytes = await mergedPdf.save();
  fs.writeFileSync(outputPath, mergedPdfBytes);

  const stats = fs.statSync(outputPath);
  console.log(`🎉 Successfully created Master Workbook PDF: ${outputFileName}`);
  console.log(
    `   Total Pages: ${totalPages} | File Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`,
  );
  return outputPath;
}

if (require.main === module) {
  mergeMedicineMasterWorkbook().catch((err) => {
    console.error('❌ Error merging master workbook:', err);
    process.exit(1);
  });
}

module.exports = {
  mergeMedicineMasterWorkbook,
};
