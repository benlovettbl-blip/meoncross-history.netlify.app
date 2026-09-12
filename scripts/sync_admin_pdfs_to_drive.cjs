/**
 * Synchronize Curriculum, Admin, Trips & Co-Curricular PDFs to Google Drive Department File
 *
 * Automatically organizes and syncs all master textbooks, pupil workbooks,
 * mastery packs, schemes of work, and department policies from `public/pdfs/`
 * into clean, categorized Year Group and Department folders in Mr Lovett's
 * Google Drive Department File (`G:\My Drive\AAMX\Dep File\`).
 */

const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const DRIVE_DEP_DIR = PATHS.GOOGLE_DRIVE_DEP_FILE || 'G:\\My Drive\\AAMX\\Dep File';

// Mapping: Source in public/pdfs -> Target folder & clean canonical filename in Google Drive Dep File
const PDF_MAPPINGS = [
  // 00 - Department Admin & Policies
  {
    folder: '00_Department_Admin_and_Policies',
    src: 'history_department_development_plan_2026_2027.pdf',
    dest: 'History Department Development Plan 2026-2027.pdf',
    category: 'Admin',
  },
  {
    folder: '00_Department_Admin_and_Policies',
    src: 'history_marking_and_feedback_policy_v2.pdf',
    dest: 'History Marking and Feedback Policy (with Visual Appendix).pdf',
    category: 'Admin',
  },
  {
    folder: '00_Department_Admin_and_Policies',
    src: 'whole_school_curriculum_overview.pdf',
    dest: 'Whole School History Curriculum Overview (Executive).pdf',
    category: 'Admin',
  },
  {
    folder: '00_Department_Admin_and_Policies',
    src: 'curriculum_overview_tabular.pdf',
    dest: 'Whole School History Curriculum Overview (Tabular).pdf',
    category: 'Admin',
  },

  // 01 - Schemes of Work (All 5 in one dedicated folder for 1-click batch upload)
  {
    folder: '01_Schemes_of_Work',
    src: 'year_7_sow.pdf',
    dest: 'Year 7 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: '01_Schemes_of_Work',
    src: 'year_8_sow.pdf',
    dest: 'Year 8 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: '01_Schemes_of_Work',
    src: 'year_9_sow.pdf',
    dest: 'Year 9 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: '01_Schemes_of_Work',
    src: 'year_10_sow.pdf',
    dest: 'Year 10 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },
  {
    folder: '01_Schemes_of_Work',
    src: 'year_11_sow.pdf',
    dest: 'Year 11 Scheme of Work (History).pdf',
    category: 'Scheme of Work',
  },

  // Year 7
  {
    folder: path.join('Year 7', 'Medieval England'),
    src: 'medieval_england_pupil_workbook_FINAL_V17.pdf',
    dest: 'Medieval England Pupil Workbook.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Medieval England'),
    src: 'medieval_england_textbook_FINAL_V17.pdf',
    dest: 'Medieval England Master Textbook.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Medieval England'),
    src: 'medieval_england_mastery_pack_full_FINAL_V17.pdf',
    dest: 'Medieval England Complete Mastery Pack.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Water and Sanitation'),
    src: 'water_and_sanitation_pupil_workbook_FINAL_V17.pdf',
    dest: 'Water and Sanitation Pupil Workbook.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Water and Sanitation'),
    src: 'water_and_sanitation_textbook_FINAL_V17.pdf',
    dest: 'Water and Sanitation Master Textbook.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Water and Sanitation'),
    src: 'water_and_sanitation_mastery_pack_full_FINAL_V17.pdf',
    dest: 'Water and Sanitation Complete Mastery Pack.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Industrialisation and Empire'),
    src: 'industrialisation_and_empire_pupil_workbook_FINAL_V17.pdf',
    dest: 'Industrialisation and Empire Pupil Workbook.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Industrialisation and Empire'),
    src: 'industrialisation_and_empire_textbook_FINAL_V17.pdf',
    dest: 'Industrialisation and Empire Master Textbook.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Industrialisation and Empire'),
    src: 'industrialisation_and_empire_mastery_pack_full_FINAL_V17.pdf',
    dest: 'Industrialisation and Empire Complete Mastery Pack.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Industrialisation and Empire'),
    src: 'henry_cort_funtley_primary_source_pack.pdf',
    dest: 'Henry Cort & Funtley Iron Works Primary Source Pack.pdf',
    category: 'Year 7',
  },
  {
    folder: path.join('Year 7', 'Industrialisation and Empire'),
    src: 'hampshire_archives_competition_poster.pdf',
    dest: 'Hampshire Archives Competition Poster.pdf',
    category: 'Year 7',
  },

  // Year 8
  {
    folder: path.join('Year 8', 'Early Modern World'),
    src: 'early_modern_world_pupil_workbook_FINAL_V17.pdf',
    dest: 'Early Modern World Pupil Workbook.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'Early Modern World'),
    src: 'early_modern_world_textbook_FINAL_V17.pdf',
    dest: 'Early Modern World Master Textbook.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'Early Modern World'),
    src: 'early_modern_world_mastery_pack_full_FINAL_V17.pdf',
    dest: 'Early Modern World Complete Mastery Pack.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'The Great War'),
    src: 'great_war_pupil_workbook_FINAL_V17.pdf',
    dest: 'The Great War (Part 1 - 1914-1916) Pupil Workbook.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'The Great War'),
    src: 'great_war_textbook_FINAL_V17.pdf',
    dest: 'The Great War (Part 1 - 1914-1916) Master Textbook.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'The Great War'),
    src: 'great_war_mastery_pack_full_FINAL_V17.pdf',
    dest: 'The Great War (Part 1 - 1914-1916) Complete Mastery Pack.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'The Great War'),
    src: 'great_war_part2_pupil_workbook_FINAL_V17.pdf',
    dest: 'The Great War (Part 2 - 1917-1918) Pupil Workbook.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'The Great War'),
    src: 'great_war_part2_textbook_FINAL_V17.pdf',
    dest: 'The Great War (Part 2 - 1917-1918) Master Textbook.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'The Great War'),
    src: 'great_war_part2_mastery_pack_full_FINAL_V17.pdf',
    dest: 'The Great War (Part 2 - 1917-1918) Complete Mastery Pack.pdf',
    category: 'Year 8',
  },
  {
    folder: path.join('Year 8', 'The Great War'),
    src: 'crummack_sassoon_field_sheet.pdf',
    dest: 'Crummack & Sassoon Primary Field Sheet.pdf',
    category: 'Year 8',
  },

  // Year 9
  {
    folder: path.join('Year 9', 'The Shoah (Holocaust)'),
    src: 'the_shoah_pupil_workbook_FINAL_V17.pdf',
    dest: 'The Shoah (Holocaust) Pupil Workbook.pdf',
    category: 'Year 9',
  },
  {
    folder: path.join('Year 9', 'The Shoah (Holocaust)'),
    src: 'the_shoah_textbook_FINAL_V17.pdf',
    dest: 'The Shoah (Holocaust) Master Textbook.pdf',
    category: 'Year 9',
  },
  {
    folder: path.join('Year 9', 'Post-War Britain'),
    src: 'post_war_britain_pupil_workbook_FINAL_V17.pdf',
    dest: 'Post-War Britain Pupil Workbook.pdf',
    category: 'Year 9',
  },
  {
    folder: path.join('Year 9', 'Post-War Britain'),
    src: 'post_war_britain_textbook_FINAL_V17.pdf',
    dest: 'Post-War Britain Master Textbook.pdf',
    category: 'Year 9',
  },
  {
    folder: path.join('Year 9', 'Post-War Britain'),
    src: 'cold_war_pupil_workbook_FINAL_V17.pdf',
    dest: 'Cold War Context Pupil Workbook.pdf',
    category: 'Year 9',
  },
  {
    folder: path.join('Year 9', 'Post-War Britain'),
    src: 'cold_war_textbook_FINAL_V17.pdf',
    dest: 'Cold War Context Master Textbook.pdf',
    category: 'Year 9',
  },

  // Year 10 (GCSE) - Medicine Through Time
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_visual_revision_and_exam_guide.pdf',
    dest: 'Edexcel GCSE Medicine Visual Revision and Exam Guide.pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'med_mastery_pack_FULL.pdf',
    dest: 'Medicine Through Time Complete Specification Mastery Pack.pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'med_mastery_section_a_western_front.pdf',
    dest: 'Medicine Mastery (Section A - British Sector of Western Front).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'med_mastery_section_b_thematic_study.pdf',
    dest: 'Medicine Mastery (Section B - Thematic Study).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_pupil_workbook_medieval_FINAL_V17.pdf',
    dest: 'Medicine Pupil Workbook (1. Medieval).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_textbook_medieval_FINAL_V17.pdf',
    dest: 'Medicine Master Textbook (1. Medieval).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_pupil_workbook_renaissance_FINAL_V17.pdf',
    dest: 'Medicine Pupil Workbook (2. Renaissance).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_textbook_renaissance_FINAL_V17.pdf',
    dest: 'Medicine Master Textbook (2. Renaissance).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_pupil_workbook_18th_19th_FINAL_V17.pdf',
    dest: 'Medicine Pupil Workbook (3. 18th & 19th Century).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_textbook_18th_19th_FINAL_V17.pdf',
    dest: 'Medicine Master Textbook (3. 18th & 19th Century).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_pupil_workbook_modern_FINAL_V17.pdf',
    dest: 'Medicine Pupil Workbook (4. Modern).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_textbook_modern_FINAL_V17.pdf',
    dest: 'Medicine Master Textbook (4. Modern).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_pupil_workbook_western_front_FINAL_V17.pdf',
    dest: 'Medicine Pupil Workbook (5. Western Front).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_textbook_western_front_FINAL_V17.pdf',
    dest: 'Medicine Master Textbook (5. Western Front).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 1 - Medicine Through Time'),
    src: 'edexcel_medicine_cover_lesson_double_period.pdf',
    dest: 'Medicine Cover Lesson (Double Period).pdf',
    category: 'Year 10 GCSE',
  },

  // Year 10 (GCSE) - Early Elizabethan England
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_pupil_workbook_KT1_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Pupil Workbook (KT1).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_textbook_KT1_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Master Textbook (KT1).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_mastery_pack_KT1_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Mastery Pack (KT1).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_pupil_workbook_KT2_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Pupil Workbook (KT2).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_textbook_KT2_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Master Textbook (KT2).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_mastery_pack_KT2_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Mastery Pack (KT2).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_pupil_workbook_KT3_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Pupil Workbook (KT3).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_textbook_KT3_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Master Textbook (KT3).pdf',
    category: 'Year 10 GCSE',
  },
  {
    folder: path.join('Year 10 (GCSE)', 'Paper 2 - Early Elizabethan England'),
    src: 'eee_mastery_pack_KT3_FINAL_V17.pdf',
    dest: 'Early Elizabethan England Mastery Pack (KT3).pdf',
    category: 'Year 10 GCSE',
  },

  // Year 11 (GCSE) - Conflict in the Middle East
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_timeline.pdf',
    dest: 'Conflict in the Middle East Visual Timeline.pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_mastery_pack_FULL.pdf',
    dest: 'Conflict in the Middle East Complete Mastery Pack.pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_pupil_workbook_KT1_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Pupil Workbook (KT1).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_textbook_KT1_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Master Textbook (KT1).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_mastery_pack_KT1_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Mastery Pack (KT1).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_pupil_workbook_KT2_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Pupil Workbook (KT2).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_textbook_KT2_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Master Textbook (KT2).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_mastery_pack_KT2_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Mastery Pack (KT2).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_pupil_workbook_KT3_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Pupil Workbook (KT3).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_textbook_KT3_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Master Textbook (KT3).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_new_mastery_pack_KT3_FINAL_V17.pdf',
    dest: 'Conflict in the Middle East Mastery Pack (KT3).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 2 - Conflict in the Middle East'),
    src: 'cme_cover_lesson_double_period.pdf',
    dest: 'Conflict in the Middle East Cover Lesson (Double Period).pdf',
    category: 'Year 11 GCSE',
  },

  // Year 11 (GCSE) - USA 1954-75
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - USA 1954-75'),
    src: 'edexcel_usa_visual_revision_and_exam_guide.pdf',
    dest: 'Edexcel GCSE USA Visual Revision and Exam Guide.pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - USA 1954-75'),
    src: 'year11_usa_overdue_booster.pdf',
    dest: 'Year 11 USA Overdue Work & Revision Booster.pdf',
    category: 'Year 11 GCSE',
  },

  // Year 11 (GCSE) - Weimar and Nazi Germany
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_pupil_workbook_KT1_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT1).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_textbook_KT1_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Master Textbook (KT1).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_mastery_pack_KT1_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Mastery Pack (KT1).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_pupil_workbook_KT2_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT2).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_textbook_KT2_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Master Textbook (KT2).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_mastery_pack_KT2_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Mastery Pack (KT2).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_pupil_workbook_KT3_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT3).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_textbook_KT3_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Master Textbook (KT3).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_mastery_pack_KT3_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Mastery Pack (KT3).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_pupil_workbook_KT4_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Pupil Workbook (KT4).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_textbook_KT4_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Master Textbook (KT4).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'weimar_nazi_germany_mastery_pack_KT4_FINAL_V17.pdf',
    dest: 'Weimar and Nazi Germany Mastery Pack (KT4).pdf',
    category: 'Year 11 GCSE',
  },
  {
    folder: path.join('Year 11 (GCSE)', 'Paper 3 - Weimar and Nazi Germany'),
    src: 'year10_germany_overdue_booster.pdf',
    dest: 'Year 10 Germany Overdue Work & Revision Booster.pdf',
    category: 'Year 11 GCSE',
  },

  // Trips - Battlefield Tour - Ypres
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'ypres_1914_1918_pupil_field_guide.pdf',
    dest: 'Ypres 1914-1918 Pupil Field Guide.pdf',
    category: 'Trips',
  },
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'ypres_1914_1918_teacher_companion.pdf',
    dest: 'Ypres 1914-1918 Teacher Companion.pdf',
    category: 'Trips',
  },
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'ypres_1914_1918_field_guide_and_companion.pdf',
    dest: 'Ypres 1914-1918 Field Guide and Companion (Combined).pdf',
    category: 'Trips',
  },
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'ypres_2026_parent_information_pack.pdf',
    dest: 'Ypres 2026 Parent Information Pack.pdf',
    category: 'Trips',
  },
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'Ypres trip 2026 Code of Conduct.pdf',
    dest: 'Ypres Trip 2026 Code of Conduct.pdf',
    category: 'Trips',
  },
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'Ypres_2026_Teacher_Meeting_Prompt_Sheet.pdf',
    dest: 'Ypres 2026 Teacher Meeting Prompt Sheet.pdf',
    category: 'Trips',
  },
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'trip_ypres_pupil_workbook_FINAL_V17.pdf',
    dest: 'Ypres Battlefield Pupil Workbook.pdf',
    category: 'Trips',
  },
  {
    folder: path.join('Trips', 'Battlefield Tour - Ypres'),
    src: 'trip_ypres_textbook_FINAL_V17.pdf',
    dest: 'Ypres Battlefield Master Textbook.pdf',
    category: 'Trips',
  },

  // Chess Club
  {
    folder: 'Chess Club',
    src: 'meoncross_chess_board_qr_stands.pdf',
    dest: 'Meoncross Chess Board QR Table Stands.pdf',
    category: 'Chess Club',
  },
];

// List of legacy loose file names previously written to root that should be cleaned up after sync
const LEGACY_ROOT_FILES = [
  'Year 7 Scheme of Work (History).pdf',
  'Year 8 Scheme of Work (History).pdf',
  'Year 9 Scheme of Work (History).pdf',
  'Year 10 Scheme of Work (History).pdf',
  'Year 11 Scheme of Work (History).pdf',
  'Whole School History Curriculum Overview (Executive).pdf',
  'Whole School History Curriculum Overview (Tabular).pdf',
  'History Marking and Feedback Policy (with Visual Appendix).pdf',
  'History Department Development Plan 2026-2027.pdf',
  'Edexcel GCSE Medicine Visual Revision and Exam Guide.pdf',
  'Edexcel GCSE USA Visual Revision and Exam Guide.pdf',
  'Conflict in the Middle East Visual Timeline.pdf',
];

function syncAdminPdfsToDrive() {
  console.log('====================================================');
  console.log('📂 SYNCHRONIZING DEPARTMENT FILE TO GOOGLE DRIVE');
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
    const targetFolder = path.join(DRIVE_DEP_DIR, item.folder);
    const destPath = path.join(targetFolder, item.dest);

    if (!fs.existsSync(srcPath)) {
      console.log(
        `   ⏭️ Skipped [${item.category}]: ${item.src} (not yet generated in public/pdfs)`,
      );
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

  // Clean up legacy loose copies from root if they exist and are safely in their subfolders
  console.log('\n🧹 Checking for legacy loose PDF copies in root directory...');
  let cleanedCount = 0;
  for (const legacyName of LEGACY_ROOT_FILES) {
    const legacyPath = path.join(DRIVE_DEP_DIR, legacyName);
    if (fs.existsSync(legacyPath)) {
      try {
        fs.unlinkSync(legacyPath);
        console.log(`   🗑️ Cleaned loose root copy: ${legacyName}`);
        cleanedCount++;
      } catch (e) {
        console.warn(`   ⚠️ Could not remove loose root copy ${legacyName}: ${e.message}`);
      }
    }
  }

  console.log('----------------------------------------------------');
  console.log(
    `📊 Result: ${syncedCount} synced, ${skippedCount} skipped, ${cleanedCount} root files cleaned, ${errorCount} errors.`,
  );
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
