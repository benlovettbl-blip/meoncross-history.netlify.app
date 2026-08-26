const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const units = [
  'water_and_sanitation',
  'early_modern_world',
  'great_war',
  'cme_new',
  'edexcel_medicine'
];

const term1Dir = path.join(__dirname, 'term_1_pdfs');
const publicPdfsDir = path.join(__dirname, 'public', 'pdfs');

// Clean up term_1_pdfs
if (fs.existsSync(term1Dir)) {
  fs.readdirSync(term1Dir).forEach(file => {
    fs.unlinkSync(path.join(term1Dir, file));
  });
} else {
  fs.mkdirSync(term1Dir);
}

// 1. Run extract_units.js for units that have it (ignore errors)
units.forEach(unit => {
  try {
    if (fs.existsSync(path.join(__dirname, unit))) {
      console.log(`Extracting ${unit}...`);
      execSync(`node extract_units.js ${unit}`, { stdio: 'inherit' });
    }
  } catch(e) {
    console.log(`Skipping extract_units.js for ${unit}`);
  }
});

// 2. Re-apply the Do Now shift fix since extract_units.js might have overwritten data.js
console.log('Running shift_donows.js...');
execSync(`node shift_donows.js`, { stdio: 'inherit' });

// 3. Rebuild database and trackers
console.log('Rebuilding database...');
execSync(`node build_database.cjs`, { stdio: 'inherit' });
execSync(`node generate_tracker_v2.mjs`, { stdio: 'inherit' });

console.log('Generating HTML workbooks and textbooks...');
execSync(`node generate_pupil_workbooks.js`, { stdio: 'inherit' });
execSync(`node generate_workbooks.js`, { stdio: 'inherit' });
execSync(`node generate_textbooks.js`, { stdio: 'inherit' });

// 4. Generate PDFs for each unit and copy to term_1_pdfs
units.forEach(unit => {
  console.log(`Generating PDFs for ${unit}...`);
  try {
    execSync(`node export_pdfs.js ${unit}`, { stdio: 'inherit' });
  } catch(e) {
    console.log(`PDF Generation had issues for ${unit} but proceeding to copy.`);
  }
  
  // Copy matching PDFs
  fs.readdirSync(publicPdfsDir).forEach(file => {
    if (file.startsWith(unit) && (file.includes('pupil_workbook') || file.includes('textbook'))) {
      fs.copyFileSync(path.join(publicPdfsDir, file), path.join(term1Dir, file));
      console.log(`Copied ${file} to term_1_pdfs`);
    }
  });
});

console.log('Finished processing and copying Term 1 PDFs.');
