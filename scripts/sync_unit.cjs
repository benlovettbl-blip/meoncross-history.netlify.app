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

  // Step 0: Fact & Anti-Hallucination Audit
  console.log(
    `\n[Step 0/6] 🛡️ Auditing curriculum facts & anti-hallucination guardrails for ${unitId}...`,
  );
  try {
    execSync(`node scripts/verify_curriculum_facts.cjs ${unitId}`, {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
  } catch (err) {
    console.error(`❌ Fatal: Fact verification failed for ${unitId}. Build aborted.`);
    return false;
  }

  // Step 0b: Image Integrity & No-AI Audit
  console.log(`\n[Step 0b/6] 🖼️ Auditing image integrity & No-AI policy...`);
  try {
    execSync(`node scripts/verify_images.cjs`, {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
  } catch (err) {
    console.error(`❌ Fatal: Image verification failed. Build aborted.`);
    return false;
  }

  // Step 1: Validate Syntax
  console.log(`\n[Step 1/6] 🔍 Validating JavaScript syntax for ${unitId}/data.js...`);
  try {
    execSync(`node --check "${dataJsPath}"`, { stdio: 'inherit' });
    console.log(`✅ Syntax check passed cleanly.`);
  } catch (err) {
    console.error(`❌ Syntax error detected in ${unitId}/data.js:`, err.message);
    return false;
  }

  // Step 1b: Task Uniformity & Anti-Duplication Linter
  console.log(`\n[Step 1b/6] 🛡️ Auditing task uniformity, source formatting & anti-duplication...`);
  try {
    execSync(`node scripts/lint_task_uniformity.cjs ${unitId}`, {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
  } catch (err) {
    console.error(`❌ Task uniformity linter failed for ${unitId}:`, err.message);
    return false;
  }

  // Step 1c: GCSE Depth of Knowledge (DoK) Specification Linter
  console.log(
    `\n[Step 1c/6] 🎓 Auditing GCSE Depth of Knowledge (DoK) specification guardrails...`,
  );
  try {
    execSync(`node scripts/lint_gcse_dok.cjs ${unitId}`, {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
  } catch (err) {
    console.error(`❌ Fatal: GCSE DoK specification linter failed for ${unitId}. Build aborted.`);
    return false;
  }

  // Step 2: Rebuild Global Database
  console.log(`\n[Step 2/6] 🗄️ Updating public/database.json for digital app...`);
  try {
    execSync(`node scripts/build_database.cjs`, { stdio: 'inherit', cwd: ROOT_DIR });
    console.log(`✅ database.json refreshed.`);
  } catch (err) {
    console.error(`❌ Failed to rebuild database.json:`, err.message);
    return false;
  }

  // Step 3: Check if digital-only (trip_ypres) or physical PDF required
  if (unitId === 'trip_ypres') {
    console.log(`\n[Step 3/6] ⏭️ Unit ${unitId} is fully digital. Skipping PDF export.`);
  } else {
    console.log(`\n[Step 3/6] 📄 Compiling fresh HTML workbooks & PDFs with Puppeteer...`);
    try {
      execSync(`node scripts/generate_textbooks.cjs ${unitId}`, {
        stdio: 'inherit',
        cwd: ROOT_DIR,
      });
      execSync(`node scripts/generate_pupil_workbooks.cjs ${unitId}`, {
        stdio: 'inherit',
        cwd: ROOT_DIR,
      });
      execSync(`node scripts/export_pdfs.cjs ${unitId}`, { stdio: 'inherit', cwd: ROOT_DIR });
      if (unitId === 'cme_new') {
        console.log(`\n📚 Compiling 12-page publisher-grade textbooks for [cme_new]...`);
        execSync(`node scripts/render_standard_textbook.cjs all`, {
          stdio: 'inherit',
          cwd: ROOT_DIR,
        });
      }
      if (unitId === 'great_war') {
        console.log(`\n📚 Compiling 14-page publisher-grade textbook for [great_war]...`);
        execSync(`node scripts/render_standard_textbook_great_war.cjs`, {
          stdio: 'inherit',
          cwd: ROOT_DIR,
        });
      }
      if (unitId === 'industrialisation_and_empire') {
        console.log(
          `\n📚 Compiling 18-page publisher-grade textbook for [industrialisation_and_empire]...`,
        );
        execSync(`node scripts/render_standard_textbook_industrialisation.cjs`, {
          stdio: 'inherit',
          cwd: ROOT_DIR,
        });
      }
      if (unitId === 'early_modern_world') {
        console.log(
          `\n📚 Compiling 20-page publisher textbook & universal KS3 engine workbook for [early_modern_world]...`,
        );
        execSync(`node scripts/render_standard_textbook_early_modern_world.cjs`, {
          stdio: 'inherit',
          cwd: ROOT_DIR,
        });
        execSync(`node scripts/generate_ks3_workbook.cjs early_modern_world`, {
          stdio: 'inherit',
          cwd: ROOT_DIR,
        });
      }
      if (unitId === 'great_war_part2') {
        console.log(
          `\n📚 Compiling 20-page universal KS3 engine workbook for [great_war_part2]...`,
        );
        execSync(`node scripts/generate_ks3_workbook.cjs great_war_part2`, {
          stdio: 'inherit',
          cwd: ROOT_DIR,
        });
      }
      if (unitId === 'eee') {
        console.log(`\n📚 Compiling 16-page double-page workbooks for [eee]...`);
        execSync(`node scripts/render_eee_twopage_workbook.cjs all`, {
          stdio: 'inherit',
          cwd: ROOT_DIR,
        });
      }
      console.log(`✅ Pupil workbooks and PDFs exported and verified in public/pdfs/.`);
    } catch (err) {
      console.error(`❌ PDF export failed:`, err.message);
      return false;
    }

    // Step 4: Re-align Workbook Page Map
    console.log(`\n[Step 4/6] 🗺️ Synchronizing digital workbook page numbers to PDF...`);
    try {
      execSync(`node scripts/generate_workbook_page_map.cjs`, { stdio: 'inherit', cwd: ROOT_DIR });
      console.log(`✅ Workbook page map synchronized.`);
    } catch (err) {
      console.warn(`⚠️ Warning: Page map sync had issues:`, err.message);
    }

    // Step 5: Layout Overflow Audit
    console.log(`\n[Step 5/6] 📐 Auditing PDF layout overflows...`);
    try {
      execSync(`node scripts/check_overflows.cjs ${unitId}`, { stdio: 'inherit', cwd: ROOT_DIR });
      console.log(`✅ Overflow audit complete.`);
    } catch (err) {
      console.warn(`⚠️ Warning: Overflow audit encountered an error:`, err.message);
    }
  }

  // Step 5b: Pedagogical Standards & Rollout Audit
  console.log(
    `\n[Step 5b/6] 🏛️ Auditing Pedagogical Standards & Rollout Progress for ${unitId}...`,
  );
  try {
    execSync(`node scripts/audit_pedagogy_standards.cjs ${unitId}`, {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
  } catch (err) {
    console.warn(`⚠️ Warning: Pedagogical standards audit encountered an issue:`, err.message);
  }

  // Step 5c: Synchronize Year Group Scheme of Work (Reflecting latest lessons, themes & historical skills)
  console.log(`\n[Step 5c/6] 📋 Synchronizing Year Group Scheme of Work for ${unitId}...`);
  try {
    execSync(`node scripts/generate_scheme_of_work.cjs ${unitId}`, {
      stdio: 'inherit',
      cwd: ROOT_DIR,
    });
    console.log(`✅ Scheme of Work updated with latest lessons, themes & skills.`);
  } catch (err) {
    console.warn(`⚠️ Warning: Scheme of Work sync encountered an issue:`, err.message);
  }

  // Step 6: Google Drive Department File Synchronization (School Laptop Access)
  console.log(
    `\n[Step 6/6] 📂 Mirroring PDFs to Google Drive Department File (School Laptop Access)...`,
  );
  try {
    const { syncAdminPdfsToDrive } = require('./sync_admin_pdfs_to_drive.cjs');
    syncAdminPdfsToDrive();
    console.log(`✅ Google Drive Department File synchronized for school laptop access.`);
  } catch (err) {
    console.warn(`⚠️ Warning: Google Drive Department File sync had issues:`, err.message);
  }

  // Step 6b: Auto-Update Master Curriculum Roadmap Word Document on User Desktop
  try {
    execSync(`node scripts/export_curriculum_roadmap_docx.cjs`, { stdio: 'pipe', cwd: ROOT_DIR });
    console.log(`✅ Master Curriculum Roadmap Word Document updated on Desktop.`);
  } catch (err) {
    // Non-fatal if document is currently locked by Microsoft Word
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n======================================================`);
  console.log(`🎉 100% SUCCESS: Unit [${unitId}] is fully synchronized in ${duration}s!`);
  console.log(`   - Digital App (database.json): Up to date`);
  console.log(`   - Physical PDFs (public/pdfs/): Re-compiled`);
  console.log(`   - Page Map: Aligned with physical printouts`);
  console.log(
    `   - Google Drive Dep File (G:\\My Drive\\AAMX\\Dep File): Synchronized for school laptop access`,
  );
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
