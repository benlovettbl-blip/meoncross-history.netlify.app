const path = require('path');
const fs = require('fs');
const { generatePdf: generatePupilPdf } = require('./generate_ypres_pupil_guide_pdf.cjs');
const { generatePdf: generateTeacherPdf } = require('./generate_ypres_teacher_companion_pdf.cjs');

const pdfsDir = path.join(__dirname, '../public/pdfs');

async function main() {
  console.log('🚀 Compiling Ypres 1914–1918 Field Guide System (Pupil & Teacher Editions)...');

  // 1. Generate Pupil Field Guide
  await generatePupilPdf();

  // 2. Generate Tour Leader & Teacher Companion
  await generateTeacherPdf();

  // 3. For backward compatibility, maintain ypres_1914_1918_field_guide_and_companion.pdf
  const pupilPdfPath = path.join(pdfsDir, 'ypres_1914_1918_pupil_field_guide.pdf');
  const legacyPdfPath = path.join(pdfsDir, 'ypres_1914_1918_field_guide_and_companion.pdf');
  if (fs.existsSync(pupilPdfPath)) {
    fs.copyFileSync(pupilPdfPath, legacyPdfPath);
    console.log('✅ Synchronized legacy link at:', legacyPdfPath);
  }

  console.log('🎉 All Ypres Field Study PDF publications successfully compiled!');
}

if (require.main === module) {
  main().catch((err) => {
    console.error('Fatal error generating PDFs:', err);
    process.exit(1);
  });
}

module.exports = { main };
