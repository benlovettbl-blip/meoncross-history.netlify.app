/**
 * Departmental Reference Shelf Indexer
 * Maps curriculum unit IDs to available textbooks in `G:\My Drive\TEXTBOOKS`.
 *
 * Enforces the Departmental Rule:
 * - Content Knowledge ONLY (narrative facts, quotes, statistics, dates).
 * - ZERO Exam Technique (exam structures are strictly governed by Pearson Edexcel specification rules).
 */

const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config.cjs');

const SHELF_DIR = PATHS.GOOGLE_DRIVE_TEXTBOOKS || 'G:\\My Drive\\TEXTBOOKS';

const UNIT_TEXTBOOK_MAP = {
  weimar_nazi_germany: [
    'Edexcel 9-1 GCSE - Weimar and Nazi Germany 1918-1939.pdf',
    'Hodder GCSE history for Edexcel. Weimar and Nazi Germany, 1918-39.epub',
    '[Access to History] Geoff Layton - Access to History. From Kaiser to Fuhrer_ Germany 1900-1945 for Edexcel (2010, Hodder).pdf',
  ],
  eee: [
    'Edexcel 9-1 GCSE - Early Elizabethan England.pdf',
    'Revise Edexcel GCSE (9-1) History Early Elizabethan England Revision Guide and Workbook.pdf',
  ],
  edexcel_medicine: [
    'Edexcel 9-1 GCSE - Medicne through time - 1250-present.pdf',
    '[Hodder GCSE (9 1) History for Pearson Edexcel Foundation Edition_ Medicine Through Time c. 1250-Present - Hodder GCSE.pdf',
    'Revise Edexcel GCSE (9-1) History Medicine in Britain Revision Guide and Workbook.pdf',
    'Revise Edexcel GCSE (9-1) History Medicine in Britain Revision Guide and Workbook (1).pdf',
  ],
  usa: ['USA, 1954-75_ Conflict at Home & Abroad.pdf'],
  cme_new: [
    'History - Conflict in the Middle East.pdf',
    'Edexcel International GCSE (9-1) History Conflict, Crisis and Change The Middle East, 1919-2012 Student Book THE MIDDLE EAST.pdf',
  ],
  early_modern_world: [
    'Aaron Wilkes - Key Stage 3 History by Aaron Wilkes_ Renaissance, Revolution and Reformation_ Britain 1509-1745 Student.pdf',
    'Understanding History_ Key Stage 3_ Britain in the Wider -- Michael Riley (History teacher); Alex Ford; Kath Goudie; -.pdf',
  ],
  medieval_england: [
    'Hodder GCSE History for Edexcel. Anglo-Saxon and Norman England, c1060-88.pdf',
    'Understanding History_ Key Stage 3_ Britain in the Wider -- Michael Riley (History teacher); Alex Ford; Kath Goudie; -.pdf',
    'Common Entrance 13+ History for ISEB CE and KS3{Collier, Martin, Rees, Rosemary}(2021, Galore Park){115127577} libgen.pdf',
  ],
  great_war: [
    'Edexcel International GCSE (9-1) History The Origins and Course of the First World War, 1905-18 Student Book.pdf',
    'Rosemary Rees - Edexcel International GCSE (9-1) History The Origins and Course of the First World War, 1905-18 Student.pdf',
  ],
  great_war_part2: [
    'Edexcel International GCSE (9-1) History The Origins and Course of the First World War, 1905-18 Student Book.pdf',
    'Rosemary Rees - Edexcel International GCSE (9-1) History The Origins and Course of the First World War, 1905-18 Student.pdf',
  ],
  cold_war: [
    'Edexcel GCSE History A the Making of the Modern World_ Unit 1 International Relations_ the Era of the Cold War 1943-91.pdf',
    'Superpower Relations & the Cold War 1941-91.pdf',
  ],
};

function getShelfInventory() {
  if (!fs.existsSync(SHELF_DIR)) {
    return { available: false, path: SHELF_DIR, files: [] };
  }
  const files = fs.readdirSync(SHELF_DIR);
  return { available: true, path: SHELF_DIR, files };
}

function getTextbooksForUnit(unitId) {
  const inventory = getShelfInventory();
  if (!inventory.available) {
    return { error: `Reference shelf directory not found at ${SHELF_DIR}` };
  }
  const targetFiles = UNIT_TEXTBOOK_MAP[unitId] || [];
  const found = [];
  const missing = [];

  for (const filename of targetFiles) {
    const fullPath = path.join(SHELF_DIR, filename);
    if (fs.existsSync(fullPath)) {
      found.push({ filename, path: fullPath, sizeBytes: fs.statSync(fullPath).size });
    } else {
      // Fuzzy find
      const match = inventory.files.find((f) =>
        f.toLowerCase().includes(filename.toLowerCase().slice(0, 30)),
      );
      if (match) {
        const matchedPath = path.join(SHELF_DIR, match);
        found.push({
          filename: match,
          path: matchedPath,
          sizeBytes: fs.statSync(matchedPath).size,
          note: 'Matched by pattern',
        });
      } else {
        missing.push(filename);
      }
    }
  }

  return {
    unitId,
    shelfPath: SHELF_DIR,
    found,
    missing,
    guardrail: 'CONTENT KNOWLEDGE ONLY — DO NOT use for exam questions, marks, or techniques.',
  };
}

if (require.main === module) {
  const unitId = process.argv[2];
  if (!unitId) {
    console.log('📚 Departmental Reference Shelf Inventory');
    console.log('Path:', SHELF_DIR);
    const inv = getShelfInventory();
    console.log(`Total files on shelf: ${inv.files.length}`);
    console.log('\nUsage: node scripts/index_textbook_shelf.cjs <unit_id>');
    console.log('Example: node scripts/index_textbook_shelf.cjs weimar_nazi_germany');
    process.exit(0);
  }

  const result = getTextbooksForUnit(unitId);
  console.log(`\n📚 Departmental Reference Books for [${unitId}]:`);
  console.log(`🛡️ GUARDRAIL: ${result.guardrail}\n`);
  if (result.found && result.found.length > 0) {
    result.found.forEach((b, i) => {
      console.log(`  ${i + 1}. ${b.filename} (${(b.sizeBytes / (1024 * 1024)).toFixed(1)} MB)`);
    });
  } else {
    console.log('  No mapped textbooks found.');
  }
}

module.exports = {
  SHELF_DIR,
  UNIT_TEXTBOOK_MAP,
  getShelfInventory,
  getTextbooksForUnit,
};
