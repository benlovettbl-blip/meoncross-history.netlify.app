const { execSync } = require('child_process');
const process = require('process');
const fs = require('fs');

const unitId = process.argv[2];

if (!unitId) {
  console.error("Please provide a unit ID (e.g. 'node build_and_export_all.js early_modern_world')");
  process.exit(1);
}

console.log(`\n======================================================`);
console.log(`Starting Full Build Pipeline for: ${unitId}`);
console.log(`======================================================\n`);

try {
  // Step 1: Extract Data
  console.log(`\n[1/7] Extracting Unit Data & Generating data.js...`);
  execSync(`node extract_units.js ${unitId}`, { stdio: 'inherit' });

  // Step 2: Build Textbooks (needed to get true printed page numbers)
  console.log(`\n[2/7] Generating Textbook HTML...`);
  execSync(`node generate_textbooks.js ${unitId}`, { stdio: 'inherit' });

  // Step 3: Export Textbook PDF ONLY (required for page marker extraction)
  console.log(`\n[3/7] Exporting Textbook PDF...`);
  execSync(`node export_pdfs.js ${unitId} textbook.html`, { stdio: 'inherit' });

  // Step 4: Extract SRC_MARKER page numbers from Textbook PDF
  console.log(`\n[4/7] Extracting page markers from Textbook PDF...`);
  const textbookPdfPath = `public/pdfs/${unitId}_textbook.pdf`;
  const markerJsonPath = `scratch/pdf_markers_${unitId}.json`;
  if (fs.existsSync(textbookPdfPath)) {
    execSync(`node scratch/puppeteer_pdf_extractor.js ${textbookPdfPath} ${markerJsonPath}`, { stdio: 'inherit' });
  } else {
    console.error(`Warning: Textbook PDF not found at ${textbookPdfPath}. Skipping marker extraction.`);
  }

  // Step 5: Generate Workbooks (now that markers JSON exists, source pages will be injected)
  console.log(`\n[5/7] Generating Guided Workbook HTML...`);
  execSync(`node generate_workbooks.js ${unitId}`, { stdio: 'inherit' });
  
  console.log(`\n[6/7] Generating Pupil Workbook HTML...`);
  execSync(`node generate_pupil_workbooks.js ${unitId}`, { stdio: 'inherit' });

  // Step 6: Export all remaining PDFs (which includes workbooks)
  console.log(`\n[7/7] Exporting all remaining PDFs (Workbooks)...`);
  execSync(`node export_pdfs.js ${unitId}`, { stdio: 'inherit' });

  console.log(`\n======================================================`);
  console.log(`Full Build Pipeline Completed Successfully for: ${unitId}`);
  console.log(`======================================================\n`);

} catch (error) {
  console.error('\nBuild Pipeline Failed!');
  process.exit(1);
}
