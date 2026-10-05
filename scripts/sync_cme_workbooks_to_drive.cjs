const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PDFS_DIR = path.join(ROOT_DIR, 'public', 'pdfs');
const DRIVE_BASE = 'G:\\My Drive\\AAMX\\Dep File';

if (!fs.existsSync(DRIVE_BASE)) {
  console.error(`❌ Google Drive Department File directory not found: ${DRIVE_BASE}`);
  process.exit(1);
}

const copyList = [
  // 1. Year 10 (GCSE) -> Paper 2 - Conflict in the Middle East
  {
    src: 'cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Pupil Workbook (KT1).pdf',
    ),
  },
  {
    src: 'cme_new_pupil_workbook_KT2_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Pupil Workbook (KT2).pdf',
    ),
  },
  {
    src: 'cme_new_pupil_workbook_KT3_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Pupil Workbook (KT3).pdf',
    ),
  },
  {
    src: 'cme_new_textbook_KT1_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Master Textbook (KT1).pdf',
    ),
  },
  {
    src: 'cme_new_textbook_KT2_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Master Textbook (KT2).pdf',
    ),
  },
  {
    src: 'cme_new_textbook_KT3_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Master Textbook (KT3).pdf',
    ),
  },
  {
    src: 'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Master Knowledge Retrieval Companion.pdf',
    ),
  },
  {
    src: 'cme_mastery_pack_FULL.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Complete Mastery Revision & Exam Practice Guide.pdf',
    ),
  },
  {
    src: 'cme_revision_guide.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Visual Revision Guide.pdf',
    ),
  },
  {
    src: 'cme_new_timeline.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Visual Timeline.pdf',
    ),
  },
  {
    src: 'cme_cover_lesson_double_period.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Cover Lesson (Double Period).pdf',
    ),
  },
  {
    src: 'CME_Lesson_4_Causal_Domino_Note_Companion.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Year 10 (GCSE)',
      'Paper 2 - Conflict in the Middle East',
      'Conflict in the Middle East Lesson 4 Causal Domino Note Companion.pdf',
    ),
  },

  // 2. 02. GCSE (Years 10-11) -> Paper 2 - Conflict in the Middle East -> 01. Pupil Workbooks
  {
    src: 'cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '01. Pupil Workbooks',
      'Conflict in the Middle East Pupil Workbook (KT1).pdf',
    ),
  },
  {
    src: 'cme_new_pupil_workbook_KT2_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '01. Pupil Workbooks',
      'Conflict in the Middle East Pupil Workbook (KT2).pdf',
    ),
  },
  {
    src: 'cme_new_pupil_workbook_KT3_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '01. Pupil Workbooks',
      'Conflict in the Middle East Pupil Workbook (KT3).pdf',
    ),
  },
  {
    src: 'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '01. Pupil Workbooks',
      'Conflict in the Middle East Master Knowledge Retrieval Companion.pdf',
    ),
  },
  {
    src: 'CME_Lesson_4_Causal_Domino_Note_Companion.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '01. Pupil Workbooks',
      'Conflict in the Middle East Lesson 4 Causal Domino Note Companion.pdf',
    ),
  },

  // 3. 02. GCSE (Years 10-11) -> Paper 2 - Conflict in the Middle East -> 02. Master Textbooks
  {
    src: 'cme_new_textbook_KT1_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '02. Master Textbooks',
      'Conflict in the Middle East Master Textbook (KT1).pdf',
    ),
  },
  {
    src: 'cme_new_textbook_KT2_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '02. Master Textbooks',
      'Conflict in the Middle East Master Textbook (KT2).pdf',
    ),
  },
  {
    src: 'cme_new_textbook_KT3_FINAL_V17.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '02. Master Textbooks',
      'Conflict in the Middle East Master Textbook (KT3).pdf',
    ),
  },

  // 4. 02. GCSE (Years 10-11) -> Paper 2 - Conflict in the Middle East -> 03. Retrieval Quizzing & Mastery
  {
    src: 'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '03. Retrieval Quizzing & Mastery',
      'Conflict in the Middle East Master Knowledge Retrieval Companion.pdf',
    ),
  },
  {
    src: 'cme_mastery_pack_FULL.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '03. Retrieval Quizzing & Mastery',
      'Conflict in the Middle East Complete Mastery Revision & Exam Practice Guide.pdf',
    ),
  },
  {
    src: 'cme_revision_guide.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '03. Retrieval Quizzing & Mastery',
      'Conflict in the Middle East Visual Revision Guide.pdf',
    ),
  },
  {
    src: 'cme_new_timeline.pdf',
    dest: path.join(
      DRIVE_BASE,
      '02. GCSE (Years 10-11)',
      'Paper 2 - Conflict in the Middle East',
      '03. Retrieval Quizzing & Mastery',
      'Conflict in the Middle East Visual Timeline.pdf',
    ),
  },

  // 5. Mastery & Quiz Packs
  {
    src: 'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Mastery & Quiz Packs',
      'Conflict in the Middle East Master Knowledge Retrieval Companion.pdf',
    ),
  },
  {
    src: 'cme_mastery_pack_FULL.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Mastery & Quiz Packs',
      'Conflict in the Middle East Complete Mastery Revision & Exam Practice Guide.pdf',
    ),
  },

  // 6. Emergency Cover Lessons (All Years)
  {
    src: 'cme_cover_lesson_double_period.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Emergency Cover Lessons (All Years)',
      'GCSE Emergency Cover - Conflict in the Middle East (Double Period).pdf',
    ),
  },

  // 7. Dep File Root
  {
    src: 'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    dest: path.join(
      DRIVE_BASE,
      'Conflict_in_the_Middle_East_Master_Knowledge_Retrieval_Companion.pdf',
    ),
  },
];

console.log('🚀 Synchronizing CME workbooks to Google Drive Department File...');
let successCount = 0;

copyList.forEach((item) => {
  const srcPath = path.join(PDFS_DIR, item.src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠️ Source not found: ${srcPath}`);
    return;
  }
  const destDir = path.dirname(item.dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(srcPath, item.dest);
  console.log(`✅ ${path.basename(item.dest)} -> ${path.relative(DRIVE_BASE, item.dest)}`);
  successCount++;
});

console.log(
  `\n🎉 Successfully placed ${successCount} CME workbooks and textbooks into their exact Google Drive Dep File folders!`,
);
