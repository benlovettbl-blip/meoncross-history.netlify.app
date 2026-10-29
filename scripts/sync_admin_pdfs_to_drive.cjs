/**
 * Synchronize Modern 3-Pillars Curriculum, Admin, Trips & Resources to Google Drive Department File
 *
 * Automatically organizes and syncs:
 * - 01_Curriculum_and_Key_Stages (KS3 & GCSE): Strictly the 3 Curricular Pillars matching Hero Launchpad
 * - 02_Department_Admin_and_Strategy: Department policies, SOWs, and exam analysis
 * - 03_Fieldwork_Trips_and_Enrichment: Fieldwork guides, parent packs, and enrichment
 * - 04_Cover_and_Staff_Resources: Emergency cover lessons, markbooks, and timetables
 */

const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const DRIVE_DEP_DIR = PATHS.GOOGLE_DRIVE_DEP_FILE || 'G:\\My Drive\\AAMX\\Dep File';

// 1. Department Admin, Policies, Schemes of Work, Fieldwork, and Cover
const STATIC_MAPPINGS = [
  // 02 - Department Admin & Strategy
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Department_Policies'),
    src: 'history_marking_and_feedback_policy_v2.pdf',
    dest: 'History Marking and Feedback Policy (with Visual Appendix).pdf',
    category: 'Admin',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Department_Policies'),
    src: 'whole_school_curriculum_overview.pdf',
    dest: 'Whole School History Curriculum Overview (Executive).pdf',
    category: 'Admin',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Department_Policies'),
    src: 'curriculum_overview_tabular.pdf',
    dest: 'Whole School History Curriculum Overview (Tabular).pdf',
    category: 'Admin',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Department_Policies'),
    src: 'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).pdf',
    dest: 'Research Dossier - 2nd Lt Ernest Crummack (AI Case Study).pdf',
    category: 'Admin',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Department_Policies'),
    src: 'AI Guide for Family Military Historians (Edward Pearson).pdf',
    dest: 'AI Guide for Family Military Historians (Edward Pearson).pdf',
    category: 'Admin',
  },

  // 02 - Schemes of Work
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Schemes_of_Work'),
    src: 'year_7_sow.pdf',
    dest: 'Year 7 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Schemes_of_Work'),
    src: 'year_8_sow.pdf',
    dest: 'Year 8 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Schemes_of_Work'),
    src: 'year_9_sow.pdf',
    dest: 'Year 9 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Schemes_of_Work'),
    src: 'year_10_sow.pdf',
    dest: 'Year 10 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: path.join('02_Department_Admin_and_Strategy', 'Schemes_of_Work'),
    src: 'year_11_sow.pdf',
    dest: 'Year 11 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },

  // 03 - Fieldwork & Enrichment
  {
    folder: path.join('03_Fieldwork_Trips_and_Enrichment', 'Fieldwork_and_Expeditions'),
    src: 'ypres_tour_leader_companion_a4.pdf',
    dest: 'Ypres 1914-1918 Tour Leader Field Companion (A4 Master).pdf',
    category: 'Fieldwork',
  },
  {
    folder: path.join('03_Fieldwork_Trips_and_Enrichment', 'Fieldwork_and_Expeditions'),
    src: 'ypres_2026_parent_information_pack_v2.pdf',
    dest: 'Ypres 2026 Parent Information Pack (v2).pdf',
    category: 'Fieldwork',
  },
  {
    folder: path.join('03_Fieldwork_Trips_and_Enrichment', 'Fieldwork_and_Expeditions'),
    src: 'ypres_1914_1918_pupil_field_guide.pdf',
    dest: 'Ypres 1914-1918 Pupil Field Guide.pdf',
    category: 'Fieldwork',
  },
  {
    folder: path.join('03_Fieldwork_Trips_and_Enrichment', 'Fieldwork_and_Expeditions'),
    src: 'ypres_1914_1918_teacher_companion.pdf',
    dest: 'Ypres 1914-1918 Teacher Companion.pdf',
    category: 'Fieldwork',
  },
  {
    folder: path.join('03_Fieldwork_Trips_and_Enrichment', 'Chess_Club'),
    src: 'chess_board_qr_stands.pdf',
    dest: 'The History Portal Chess Board QR Table Stands.pdf',
    category: 'Enrichment',
  },

  // Primary Source Packs in KS3
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 7 - Industrialisation and Empire',
    ),
    src: 'henry_cort_funtley_primary_source_pack.pdf',
    dest: 'Henry Cort & Funtley Iron Works Primary Source Pack.pdf',
    category: 'Source Pack',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 7 - Industrialisation and Empire',
    ),
    src: 'hampshire_archives_competition_poster.pdf',
    dest: 'Hampshire Archives Competition Poster.pdf',
    category: 'Source Pack',
  },
];

// Unit folder mapping configuration for the 3 Curricular Pillars
const UNIT_FOLDER_CONFIG = {
  // KS3 Units
  medieval_england: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 7 - Medieval England',
    ),
    prefix: 'Medieval England',
  },
  water_and_sanitation: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 7 - Water and Sanitation',
    ),
    prefix: 'Water and Sanitation',
  },
  industrialisation_and_empire: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 7 - Industrialisation and Empire',
    ),
    prefix: 'Industrialisation and Empire',
  },
  early_modern_world: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 8 - Early Modern World',
    ),
    prefix: 'Early Modern World',
  },
  monarchy_religion_power: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 8 - Crown, Church or Parliament',
    ),
    prefix: 'Crown, Church or Parliament',
  },
  great_war: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 8 - Causes of the Great War (Part 1)',
    ),
    prefix: 'Causes of the Great War',
  },
  great_war_part2: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 8 - The Course of the Great War (Part 2)',
    ),
    prefix: 'The Course of the Great War',
  },
  australia: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 8 - The History of Australia',
    ),
    prefix: 'The History of Australia',
  },
  first_british_empire: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 8 - The First British Empire',
    ),
    prefix: 'The First British Empire',
  },
  second_british_empire: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 8 - The Second British Empire',
    ),
    prefix: 'The Second British Empire',
  },
  the_shoah: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 9 - The Shoah (Holocaust)',
    ),
    prefix: 'The Shoah (Holocaust)',
  },
  post_war_britain: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 9 - Post-War Britain',
    ),
    prefix: 'Post-War Britain',
  },
  cold_war: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'KS3 (Years 7-9)',
      'Year 9 - Superpower Relations & Cold War',
    ),
    prefix: 'Superpower Relations & Cold War',
  },

  // GCSE Units
  edexcel_medicine: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 1 - Medicine Through Time',
    ),
    prefix: 'Medicine in Britain',
  },
  eee: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Early Elizabethan England',
    ),
    prefix: 'Early Elizabethan England',
  },
  cme_new: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
    ),
    prefix: 'Conflict in the Middle East',
  },
  weimar_nazi_germany: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - Weimar & Nazi Germany',
    ),
    prefix: 'Weimar & Nazi Germany',
  },
  usa: {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - The USA 1954-1975',
    ),
    prefix: 'The USA 1954-1975',
  },
};

// Sub-workbooks and textbooks for GCSE units (multi-topic architecture)
const GCSE_MULTI_TOPIC_EXTRAS = [
  // Medicine Eras
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 1 - Medicine Through Time',
    ),
    src: 'edexcel_medicine_pupil_workbook_medieval.pdf',
    dest: 'Medicine Pupil Workbook (1. Medieval).pdf',
    category: 'GCSE Medicine',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 1 - Medicine Through Time',
    ),
    src: 'edexcel_medicine_pupil_workbook_renaissance.pdf',
    dest: 'Medicine Pupil Workbook (2. Renaissance).pdf',
    category: 'GCSE Medicine',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 1 - Medicine Through Time',
    ),
    src: 'edexcel_medicine_pupil_workbook_18th_19th.pdf',
    dest: 'Medicine Pupil Workbook (3. 18th & 19th Century).pdf',
    category: 'GCSE Medicine',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 1 - Medicine Through Time',
    ),
    src: 'edexcel_medicine_pupil_workbook_modern.pdf',
    dest: 'Medicine Pupil Workbook (4. Modern).pdf',
    category: 'GCSE Medicine',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 1 - Medicine Through Time',
    ),
    src: 'edexcel_medicine_pupil_workbook_western_front.pdf',
    dest: 'Medicine Pupil Workbook (5. Western Front).pdf',
    category: 'GCSE Medicine',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 1 - Medicine Through Time',
    ),
    src: 'Western_Front_Master_Knowledge_Retrieval_Companion.pdf',
    dest: 'Western Front Master Knowledge Retrieval Companion.pdf',
    category: 'GCSE Medicine',
  },

  // Early Elizabeth Key Topics
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Early Elizabethan England',
    ),
    src: 'eee_pupil_workbook_KT1.pdf',
    dest: 'Early Elizabethan England Pupil Workbook (KT1).pdf',
    category: 'GCSE EEE',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Early Elizabethan England',
    ),
    src: 'eee_pupil_workbook_KT2.pdf',
    dest: 'Early Elizabethan England Pupil Workbook (KT2).pdf',
    category: 'GCSE EEE',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Early Elizabethan England',
    ),
    src: 'eee_pupil_workbook_KT3.pdf',
    dest: 'Early Elizabethan England Pupil Workbook (KT3).pdf',
    category: 'GCSE EEE',
  },

  // Conflict in the Middle East Key Topics
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
    ),
    src: 'cme_new_pupil_workbook_KT1.pdf',
    dest: 'Conflict in the Middle East Pupil Workbook (KT1).pdf',
    category: 'GCSE CME',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
    ),
    src: 'cme_new_pupil_workbook_KT2.pdf',
    dest: 'Conflict in the Middle East Pupil Workbook (KT2).pdf',
    category: 'GCSE CME',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
    ),
    src: 'cme_new_pupil_workbook_KT3.pdf',
    dest: 'Conflict in the Middle East Pupil Workbook (KT3).pdf',
    category: 'GCSE CME',
  },

  // Weimar Key Topics
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - Weimar & Nazi Germany',
    ),
    src: 'weimar_nazi_germany_pupil_workbook_KT1.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT1).pdf',
    category: 'GCSE Weimar',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - Weimar & Nazi Germany',
    ),
    src: 'weimar_nazi_germany_pupil_workbook_KT2.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT2).pdf',
    category: 'GCSE Weimar',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - Weimar & Nazi Germany',
    ),
    src: 'weimar_nazi_germany_pupil_workbook_KT3.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT3).pdf',
    category: 'GCSE Weimar',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - Weimar & Nazi Germany',
    ),
    src: 'weimar_nazi_germany_pupil_workbook_KT4.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT4).pdf',
    category: 'GCSE Weimar',
  },

  // USA Key Topics
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - The USA 1954-1975',
    ),
    src: 'usa_pupil_workbook_KT1.pdf',
    dest: 'USA 1954-75 Pupil Workbook (KT1).pdf',
    category: 'GCSE USA',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - The USA 1954-1975',
    ),
    src: 'usa_pupil_workbook_KT2.pdf',
    dest: 'USA 1954-75 Pupil Workbook (KT2).pdf',
    category: 'GCSE USA',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - The USA 1954-1975',
    ),
    src: 'usa_pupil_workbook_KT3.pdf',
    dest: 'USA 1954-75 Pupil Workbook (KT3).pdf',
    category: 'GCSE USA',
  },
  {
    folder: path.join(
      '01_Curriculum_and_Key_Stages',
      'GCSE (Years 10-11)',
      'Paper 3 - The USA 1954-1975',
    ),
    src: 'usa_pupil_workbook_KT4.pdf',
    dest: 'USA 1954-75 Pupil Workbook (KT4).pdf',
    category: 'GCSE USA',
  },
];

function loadCurricularPillarsCatalog() {
  const launchpadFile = path.join(PATHS.ROOT, 'src', 'engine', 'hero_launchpad.js');
  if (!fs.existsSync(launchpadFile)) return {};
  const content = fs.readFileSync(launchpadFile, 'utf8');
  const match = content.match(/export const CURRICULAR_PILLARS_CATALOG = ({[\s\S]*?});\n\n\/\*\*/);
  if (!match) return {};
  try {
    return eval('(' + match[1] + ')');
  } catch (e) {
    return {};
  }
}

function resolvePdfSource(filename) {
  if (!filename) return null;
  const clean = filename.replace(/^\/pdfs\//, '');
  const candidates = [
    path.join(PATHS.PDFS, clean),
    path.join(PATHS.PUBLIC, 'docs', clean),
    path.join(PATHS.PUBLIC, clean),
    path.join(PATHS.ROOT, clean),
  ];

  for (const cand of candidates) {
    if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
      return cand;
    }
  }
  return null;
}

function buildDynamicPillarsMappings() {
  const catalog = loadCurricularPillarsCatalog();
  const mappings = [];

  for (const [unitId, cfg] of Object.entries(UNIT_FOLDER_CONFIG)) {
    const entry = catalog[unitId];
    if (!entry) continue;

    // Pillar 1: Master Textbook
    if (entry.textbook && entry.textbook.pdfUrl) {
      mappings.push({
        folder: cfg.folder,
        src: path.basename(entry.textbook.pdfUrl),
        dest: `${cfg.prefix} Master Textbook.pdf`,
        category: 'Textbook',
      });
    }

    // Pillar 2: Pupil Workbook
    if (entry.workbook && entry.workbook.pdfUrl) {
      mappings.push({
        folder: cfg.folder,
        src: path.basename(entry.workbook.pdfUrl),
        dest: `${cfg.prefix} Pupil Workbook.pdf`,
        category: 'Workbook',
      });
    }

    // Pillar 3: Master Retrieval Companion
    if (entry.retrieval && entry.retrieval.pdfUrl) {
      mappings.push({
        folder: cfg.folder,
        src: path.basename(entry.retrieval.pdfUrl),
        dest: `${cfg.prefix} Master Knowledge Retrieval Companion.pdf`,
        category: 'Retrieval Companion',
      });
    }
  }

  return mappings;
}

function syncAdminPdfsToDrive() {
  console.log('====================================================');
  console.log('📂 SYNCHRONIZING 4-ZONE DEPARTMENT HUB TO GOOGLE DRIVE');
  console.log('====================================================');

  if (!fs.existsSync(DRIVE_DEP_DIR)) {
    console.warn(`⚠️ Google Drive Department File folder not found at: ${DRIVE_DEP_DIR}`);
    console.warn('   (Skipping sync - Google Drive may be offline or unmounted.)\n');
    return false;
  }

  console.log(`📁 Target Directory: ${DRIVE_DEP_DIR}\n`);

  const dynamicPillars = buildDynamicPillarsMappings();
  const allMappings = [...STATIC_MAPPINGS, ...dynamicPillars, ...GCSE_MULTI_TOPIC_EXTRAS];

  let syncedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const item of allMappings) {
    const srcPath = resolvePdfSource(item.src);
    const targetFolder = path.join(DRIVE_DEP_DIR, item.folder);
    const destPath = path.join(targetFolder, item.dest);

    if (!srcPath) {
      console.log(`   ⏭️ Skipped [${item.category}]: ${item.src} (not found in public/pdfs)`);
      skippedCount++;
      continue;
    }

    try {
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
      }

      fs.copyFileSync(srcPath, destPath);
      console.log(`   ✅ [${item.category}] ${item.folder} -> ${item.dest}`);
      syncedCount++;
    } catch (err) {
      console.error(`   ❌ Failed to copy ${item.src} to ${destPath}:`, err.message);
      errorCount++;
    }
  }

  console.log('\n----------------------------------------------------');
  console.log(`📊 Result: ${syncedCount} synced, ${skippedCount} skipped, ${errorCount} errors.`);
  console.log('====================================================\n');
  return errorCount === 0;
}

if (require.main === module) {
  syncAdminPdfsToDrive();
}

module.exports = {
  syncAdminPdfsToDrive,
  DRIVE_DEP_DIR,
};
