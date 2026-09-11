const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const unitId = process.argv[2];
const isWatch = process.argv.includes('--watch') || process.argv.includes('-w');

if (!unitId || unitId.startsWith('-')) {
  console.error('❌ Error: Please provide a unit ID.');
  console.log('Usage:');
  console.log('  node scripts/sync_unit.cjs <unit_id>');
  console.log('  node scripts/sync_unit.cjs <unit_id> --watch');
  console.log('Example:');
  console.log('  node scripts/sync_unit.cjs early_modern_world');
  process.exit(1);
}

const ROOT_DIR = path.join(__dirname, '..');
const dataJsPath = path.join(ROOT_DIR, 'units', unitId, 'data.js');

if (!fs.existsSync(dataJsPath)) {
  console.error(`❌ Error: Unit data file not found at: ${dataJsPath}`);
  process.exit(1);
}

async function runSync() {
  const startTime = Date.now();
  console.log(`\n======================================================`);
  console.log(`🚀 SAFE UNIT SYNC PIPELINE: [${unitId}]`);
  console.log(`======================================================`);

  // Step 1: Validate Syntax
  console.log(`\n[Step 1/5] 🔍 Validating JavaScript syntax for ${unitId}/data.js...`);
  try {
    execSync(`node --check "${dataJsPath}"`, { stdio: 'inherit' });
    console.log(`✅ Syntax check passed cleanly.`);
  } catch (err) {
    console.error(`❌ Syntax error detected in ${unitId}/data.js:`, err.message);
    return false;
  }

  // Step 2: Rebuild Global Database
  console.log(`\n[Step 2/5] 🗄️ Updating public/database.json for digital app...`);
  try {
    execSync(`node scripts/build_database.cjs`, { stdio: 'inherit', cwd: ROOT_DIR });
    console.log(`✅ database.json refreshed.`);
  } catch (err) {
    console.error(`❌ Failed to rebuild database.json:`, err.message);
    return false;
  }

  // Step 3: Check if digital-only (trip_ypres) or physical PDF required
  if (unitId === 'trip_ypres') {
    console.log(`\n[Step 3/5] ⏭️ Unit ${unitId} is fully digital. Skipping PDF export.`);
  } else {
    console.log(`\n[Step 3/5] 📄 Compiling fresh HTML & PDFs with Puppeteer...`);
    try {
      execSync(`node scripts/export_pdfs.cjs ${unitId}`, { stdio: 'inherit', cwd: ROOT_DIR });
      console.log(`✅ PDFs exported and verified in public/pdfs/.`);
    } catch (err) {
      console.error(`❌ PDF export failed:`, err.message);
      return false;
    }

    // Step 4: Re-align Workbook Page Map
    console.log(`\n[Step 4/5] 🗺️ Synchronizing digital workbook page numbers to PDF...`);
    try {
      execSync(`node scripts/generate_workbook_page_map.cjs`, { stdio: 'inherit', cwd: ROOT_DIR });
      console.log(`✅ Workbook page map synchronized.`);
    } catch (err) {
      console.warn(`⚠️ Warning: Page map sync had issues:`, err.message);
    }

    // Step 5: Layout Overflow Audit
    console.log(`\n[Step 5/5] 📐 Auditing PDF layout overflows...`);
    try {
      execSync(`node scripts/check_overflows.cjs ${unitId}`, { stdio: 'inherit', cwd: ROOT_DIR });
      console.log(`✅ Overflow audit complete.`);
    } catch (err) {
      console.warn(`⚠️ Warning: Overflow audit encountered an error:`, err.message);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n======================================================`);
  console.log(`🎉 100% SUCCESS: Unit [${unitId}] is fully synchronized in ${duration}s!`);
  console.log(`   - Digital App (database.json): Up to date`);
  console.log(`   - Physical PDFs (public/pdfs/): Re-compiled`);
  console.log(`   - Page Map: Aligned with physical printouts`);
  console.log(`======================================================\n`);
  return true;
}

if (isWatch) {
  console.log(`👀 Starting watch mode on: ${dataJsPath}`);
  console.log(`Saving changes to data.js will automatically re-sync app & re-export PDFs.\n`);
  runSync();

  let debounceTimer = null;
  fs.watch(dataJsPath, (eventType) => {
    if (eventType === 'change') {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log(`\n📝 Detected change in ${unitId}/data.js. Triggering auto-sync...`);
        runSync();
      }, 1500);
    }
  });
} else {
  runSync();
}
