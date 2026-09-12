/**
 * Synchronize Admin & Curriculum PDFs to Google Drive Department File
 *
 * Copies the latest compiled Schemes of Work, Curriculum Overviews,
 * Marking Policy, and Department Development Plan PDFs from `public/pdfs/`
 * directly into Mr Lovett's Google Drive Department File (`G:\My Drive\AAMX\Dep File\`).
 */

const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const DRIVE_DEP_DIR = PATHS.GOOGLE_DRIVE_DEP_FILE || 'G:\\My Drive\\AAMX\\Dep File';

// Mapping: Source filename in public/pdfs -> Target filename in Google Drive Dep File
const PDF_MAPPINGS = [
  {
    src: 'year_7_sow.pdf',
    dest: 'Year 7 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    src: 'year_8_sow.pdf',
    dest: 'Year 8 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    src: 'year_9_sow.pdf',
    dest: 'Year 9 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    src: 'year_10_sow.pdf',
    dest: 'Year 10 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    src: 'year_11_sow.pdf',
    dest: 'Year 11 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    src: 'whole_school_curriculum_overview.pdf',
    dest: 'Whole School History Curriculum Overview (Executive).pdf',
    category: 'Curriculum Overview',
  },
  {
    src: 'curriculum_overview_tabular.pdf',
    dest: 'Whole School History Curriculum Overview (Tabular).pdf',
    category: 'Curriculum Overview',
  },
  {
    src: 'history_marking_and_feedback_policy_v2.pdf',
    dest: 'History Marking and Feedback Policy (with Visual Appendix).pdf',
    category: 'Department Policy',
  },
  {
    src: 'history_department_development_plan_2026_2027.pdf',
    dest: 'History Department Development Plan 2026-2027.pdf',
    category: 'Department Plan',
  },
  {
    src: 'edexcel_medicine_visual_revision_and_exam_guide.pdf',
    dest: 'Edexcel GCSE Medicine Visual Revision and Exam Guide.pdf',
    category: 'GCSE Revision Guide',
  },
];

function syncAdminPdfsToDrive() {
  console.log('====================================================');
  console.log('📂 SYNCHRONIZING ADMIN & CURRICULUM PDFS TO GOOGLE DRIVE');
  console.log('====================================================');

  if (!fs.existsSync(DRIVE_DEP_DIR)) {
    console.warn(`⚠️ Google Drive Department File folder not found at: ${DRIVE_DEP_DIR}`);
    console.warn('   (Skipping sync - Google Drive may be offline or unmounted.)\n');
    return false;
  }

  console.log(`📁 Target Directory: ${DRIVE_DEP_DIR}\n`);

  let syncedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const item of PDF_MAPPINGS) {
    const srcPath = path.join(PATHS.PDFS, item.src);
    const destPath = path.join(DRIVE_DEP_DIR, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.log(
        `   ⏭️ Skipped [${item.category}]: ${item.src} (not yet generated in public/pdfs)`,
      );
      skippedCount++;
      continue;
    }

    try {
      fs.copyFileSync(srcPath, destPath);
      console.log(`   ✅ [${item.category}] Synced: ${item.dest}`);
      syncedCount++;
    } catch (err) {
      console.error(`   ❌ Failed to copy ${item.src} to ${item.dest}:`, err.message);
      errorCount++;
    }
  }

  console.log('----------------------------------------------------');
  console.log(`📊 Result: ${syncedCount} synced, ${skippedCount} skipped, ${errorCount} errors.`);
  console.log('====================================================\n');
  return errorCount === 0;
}

if (require.main === module) {
  syncAdminPdfsToDrive();
}

module.exports = {
  syncAdminPdfsToDrive,
  PDF_MAPPINGS,
  DRIVE_DEP_DIR,
};
