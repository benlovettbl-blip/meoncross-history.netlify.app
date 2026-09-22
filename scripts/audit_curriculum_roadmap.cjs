/**
 * History Revision Hub — Department Curriculum Roadmap & RAG Audit Tool
 *
 * Programmatically audits all 16 curriculum units across:
 * 1. 4-Act Christine Counsell Data Architecture (Live in data.js vs Staged in data_v2_4act.js vs Legacy)
 * 2. Publisher Master Textbook Engine (14–18 page master reference book with cartography, spotlights & QR grid)
 * 3. Modern Two-Page Spread Pupil Workbook (Rigid 2-page enquiry spread, Do Now recall, Golden Sentence, writing strip)
 * 4. Classroom Reprographics Status (Frozen on desks vs Production ready vs Queued)
 *
 * Usage: node scripts/audit_curriculum_roadmap.cjs
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

// Unit registry with metadata
const UNIT_REGISTRY = [
  {
    id: 'water_and_sanitation',
    year: 'KS3 (Y7)',
    title: 'Water & Sanitation Through Time',
    frozenOnDesks: true,
  },
  {
    id: 'medieval_england',
    year: 'KS3 (Y7)',
    title: 'Medieval England (1066–1485)',
    frozenOnDesks: false,
  },
  {
    id: 'early_modern_world',
    year: 'KS3 (Y8)',
    title: 'Early Modern World (1450–1750)',
    frozenOnDesks: true,
  },
  {
    id: 'industrialisation_and_empire',
    year: 'KS3 (Y8)',
    title: 'Industrialisation & Empire (1750–1901)',
    frozenOnDesks: false,
  },
  {
    id: 'great_war',
    year: 'KS3 (Y9)',
    title: 'Causes of the Great War (1871–1914)',
    frozenOnDesks: true,
  },
  {
    id: 'great_war_part2',
    year: 'KS3 (Y9)',
    title: 'The Great War: Western Front (1914–1918)',
    frozenOnDesks: false,
  },
  {
    id: 'the_shoah',
    year: 'KS3 (Y9)',
    title: 'The Shoah (Holocaust Education)',
    frozenOnDesks: false,
  },
  { id: 'cold_war', year: 'KS3 (Y9)', title: 'The Cold War (1945–1991)', frozenOnDesks: false },
  {
    id: 'post_war_britain',
    year: 'KS3 (Y9)',
    title: 'Rights & Post-War Britain',
    frozenOnDesks: false,
  },
  { id: 'australia', year: 'KS3 Elective', title: 'History of Australia', frozenOnDesks: false },
  {
    id: 'edexcel_medicine',
    year: 'GCSE (Y10–11)',
    title: 'Medicine in Britain & Western Front',
    frozenOnDesks: false,
  },
  {
    id: 'cme_new',
    year: 'GCSE (Y10–11)',
    title: 'Conflict in the Middle East (1945–1995)',
    frozenOnDesks: false,
  },
  {
    id: 'eee',
    year: 'GCSE (Y10–11)',
    title: 'Early Elizabethan England (1558–1588)',
    frozenOnDesks: false,
  },
  {
    id: 'usa',
    year: 'GCSE (Y10–11)',
    title: 'The USA, 1954–1975: Conflict at Home & Abroad',
    frozenOnDesks: false,
  },
  {
    id: 'weimar_nazi_germany',
    year: 'GCSE (Y10–11)',
    title: 'Weimar & Nazi Germany (1918–1939)',
    frozenOnDesks: false,
  },
  {
    id: 'trip_ypres',
    year: 'GCSE Fieldwork',
    title: 'Ypres & Somme Battlefield Tour',
    frozenOnDesks: false,
    digitalOnly: true,
  },
];

// Map script keywords to units
function findTextbookScript(unitId) {
  const scriptFiles = fs.readdirSync(path.join(ROOT_DIR, 'scripts'));
  return (
    scriptFiles.find((f) => {
      if (!f.startsWith('render_standard_textbook')) return false;
      if (unitId === 'water_and_sanitation' && f.includes('water_and_sanitation')) return true;
      if (unitId === 'early_modern_world' && f.includes('early_modern_world')) return true;
      if (unitId === 'great_war' && f === 'render_standard_textbook_great_war.cjs') return true;
      if (unitId === 'industrialisation_and_empire' && f.includes('industrialisation')) return true;
      if (unitId === 'cme_new' && (f.includes('kt1') || f.includes('kt2') || f.includes('kt3')))
        return true;
      return false;
    }) || null
  );
}

function findWorkbookScripts(unitId) {
  const scriptFiles = fs.readdirSync(path.join(ROOT_DIR, 'scripts'));
  return scriptFiles.filter((f) => {
    if (!f.includes('twopage_workbook')) return false;
    if (unitId === 'water_and_sanitation' && f.includes('water_and_sanitation')) return true;
    if (unitId === 'industrialisation_and_empire' && f.includes('industrialisation')) return true;
    if (unitId === 'great_war_part2' && f.includes('great_war_part2')) return true;
    if (unitId === 'great_war' && f === 'render_great_war_twopage_workbook.cjs') return true;
    if (unitId === 'medieval_england' && f.includes('medieval')) return true;
    if (unitId === 'edexcel_medicine' && f.includes('medicine')) return true;
    if (unitId === 'cme_new' && f.includes('cme')) return true;
    return false;
  });
}

function auditUnit(unit) {
  const unitDir = path.join(ROOT_DIR, 'units', unit.id);
  const pubDir = path.join(ROOT_DIR, 'public', 'units', unit.id);

  // 1. Audit Data Architecture
  let dataStatus = 'LEGACY';
  const stagedDataPath = path.join(unitDir, 'data_v2_4act.js');
  const liveDataPath = path.join(unitDir, 'data.js');

  if (fs.existsSync(stagedDataPath)) {
    dataStatus = 'STAGED_V2_4ACT';
  } else if (fs.existsSync(liveDataPath)) {
    const content = fs.readFileSync(liveDataPath, 'utf8');
    if (
      content.includes('para-ref') ||
      content.includes('[1.1]') ||
      content.includes('teacher_notes')
    ) {
      dataStatus = 'LIVE_4ACT';
    }
  }

  // 2. Audit Publisher Textbook
  let textbookStatus = 'LEGACY_OR_NONE';
  const pubTbHtml = path.join(pubDir, 'textbook_PUBLISHER.html');
  const tbScript = findTextbookScript(unit.id);

  if (fs.existsSync(pubTbHtml)) {
    textbookStatus = 'PUBLISHER_MASTER';
  } else if (tbScript) {
    textbookStatus = 'SCRIPT_READY';
  } else if (
    fs.existsSync(path.join(pubDir, 'textbook.html')) ||
    fs.existsSync(path.join(unitDir, 'textbook.html'))
  ) {
    textbookStatus = 'LEGACY_V1';
  }

  // 3. Audit Pupil Workbook
  let workbookStatus = 'NONE';
  const wbScripts = findWorkbookScripts(unit.id);
  const pubWbHtml = path.join(pubDir, 'pupil_workbook.html');
  const unitWbHtml = path.join(unitDir, 'pupil_workbook.html');
  const stagedWbHtml = path.join(pubDir, 'pupil_workbook_v2.html');
  const hasStagedV2Wb = fs.existsSync(stagedWbHtml);

  const targetWb = fs.existsSync(pubWbHtml)
    ? pubWbHtml
    : fs.existsSync(unitWbHtml)
      ? unitWbHtml
      : null;

  if (unit.frozenOnDesks) {
    if (hasStagedV2Wb) {
      workbookStatus = '🔒 V1 ON DESKS (✨ V2 STAGED)';
    } else {
      workbookStatus = '🔒 V1 ON DESKS (QUEUED V2)';
    }
  } else if (hasStagedV2Wb) {
    workbookStatus = 'MODERN_2PAGE (V2 STAGED)';
  } else if (wbScripts.length > 0) {
    workbookStatus = `MODERN_2PAGE (${wbScripts.length} spread script${wbScripts.length > 1 ? 's' : ''})`;
  } else if (targetWb) {
    const wbContent = fs.readFileSync(targetWb, 'utf8');
    if (
      wbContent.includes('two-page-spread') ||
      wbContent.includes('structure-strip') ||
      wbContent.includes('bridge-task')
    ) {
      workbookStatus = 'MODERN_2PAGE';
    } else {
      workbookStatus = 'LEGACY_V1 (UNCONVERTED)';
    }
  }

  // 4. Overall Classroom / Reprographics Status
  let classroomStatus = 'QUEUED_DEVELOPMENT';
  if (unit.digitalOnly) {
    classroomStatus = 'DIGITAL_FIELD_APP';
  } else if (unit.frozenOnDesks) {
    if (
      hasStagedV2Wb &&
      (textbookStatus === 'PUBLISHER_MASTER' || textbookStatus === 'SCRIPT_READY')
    ) {
      classroomStatus = '🔒 FROZEN (✨ V2 SUITE STAGED)';
    } else {
      classroomStatus = '🔒 FROZEN ON DESKS (REPRINT WINDOW)';
    }
  } else if (workbookStatus.startsWith('MODERN_2PAGE') && textbookStatus === 'PUBLISHER_MASTER') {
    classroomStatus = '🌟 GOLD_MASTER (100% COMPLETE)';
  } else if (workbookStatus.startsWith('MODERN_2PAGE')) {
    classroomStatus = 'WORKBOOK_MODERN / TEXTBOOK_QUEUED';
  } else if (textbookStatus === 'PUBLISHER_MASTER') {
    classroomStatus = 'TEXTBOOK_MODERN / WORKBOOK_QUEUED';
  }

  return {
    id: unit.id,
    year: unit.year,
    title: unit.title,
    dataStatus,
    textbookStatus,
    workbookStatus,
    classroomStatus,
  };
}

function runAudit() {
  console.log(
    '\n====================================================================================================',
  );
  console.log('🏛️  THE HISTORY DEPARTMENT: CURRICULUM ARCHITECTURE & WORKBOOK ROADMAP AUDIT');
  console.log(
    '====================================================================================================\n',
  );

  const rows = UNIT_REGISTRY.map(auditUnit);

  // Group by category for clear presentation
  console.log('--- 🔒 ACTIVE CLASSROOM UNITS (PHYSICAL BOOKLETS ON PUPILS DESKS) ---');
  console.log(
    'These units have physical V1 booklets in classroom use. Active workbooks are strictly FROZEN.',
  );
  console.log(
    'V2 4-Act modernizations are staged in data_v2_4act.js & queued for the end-of-term reprint window.\n',
  );

  const frozenUnits = rows.filter((r) => r.classroomStatus.includes('FROZEN'));
  console.table(
    frozenUnits.map((r) => ({
      'Unit ID': r.id,
      Level: r.year,
      'Data (4-Act)': r.dataStatus,
      'Publisher Textbook': r.textbookStatus,
      'Pupil Workbook': r.workbookStatus,
      'Reprographics State': r.classroomStatus,
    })),
  );

  console.log(
    '\n--- 🚀 COMPLETED / MODERNIZED WORKBOOK UNITS (MODERN 2-PAGE SPREAD ARCHITECTURE) ---',
  );
  const modernWbUnits = rows.filter((r) => r.workbookStatus.startsWith('MODERN_2PAGE'));
  console.table(
    modernWbUnits.map((r) => ({
      'Unit ID': r.id,
      Level: r.year,
      'Data (4-Act)': r.dataStatus,
      'Publisher Textbook': r.textbookStatus,
      'Pupil Workbook': r.workbookStatus,
      'Reprographics State': r.classroomStatus,
    })),
  );

  console.log('\n--- 📋 UPCOMING UNITS QUEUED FOR 2-PAGE WORKBOOK & TEXTBOOK CONVERSION ---');
  const upcomingUnits = rows.filter(
    (r) => !r.classroomStatus.includes('FROZEN') && !r.workbookStatus.startsWith('MODERN_2PAGE'),
  );
  console.table(
    upcomingUnits.map((r) => ({
      'Unit ID': r.id,
      Level: r.year,
      'Data (4-Act)': r.dataStatus,
      'Publisher Textbook': r.textbookStatus,
      'Pupil Workbook': r.workbookStatus,
      'Reprographics State': r.classroomStatus,
    })),
  );

  // Write status JSON for persistence and validation
  const outputPath = path.join(ROOT_DIR, 'curriculum_roadmap_status.json');
  fs.writeFileSync(outputPath, JSON.stringify(rows, null, 2), 'utf8');
  console.log(`\n✅ Saved comprehensive roadmap snapshot to: ${outputPath}\n`);
}

runAudit();
