/**
 * History Revision Hub — Master Curriculum Roadmap Word Document Generator
 *
 * Generates an executive, publisher-grade Microsoft Word document (.docx)
 * tracking the audit status, pedagogical architecture, and next steps for all 16 units.
 *
 * Saves directly to:
 * 1. User Desktop: C:\Users\fives\Desktop\History_Curriculum_Master_Roadmap_16_Units.docx
 * 2. Repository Archive: public/docs/History_Curriculum_Master_Roadmap_16_Units.docx
 * 3. Google Drive Department File: G:\My Drive\AAMX\Dep File\History_Curriculum_Master_Roadmap_16_Units.docx
 *
 * Usage:
 *   node scripts/export_curriculum_roadmap_docx.cjs
 */

const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  PageOrientation,
  ShadingType,
  BorderStyle,
  HeadingLevel,
} = docx;

const ROOT_DIR = path.join(__dirname, '..');
const DESKTOP_PATH = 'C:\\Users\\fives\\Desktop';
const GDRIVE_PATH = 'G:\\My Drive\\AAMX\\Dep File';

// 16 Units Data Matrix
const UNITS_DATA = [
  {
    id: 'edexcel_medicine',
    year: 'Year 11 (GCSE)',
    title: 'Medicine in Britain c1250–Present & Western Front',
    fourAct: 'Complete (26 Lessons)',
    textbook: 'Gold (5 Period Textbooks + 36p Visual Guide)',
    workbook: 'Gold (3-Pillar Master Packs + Period Booklets)',
    themes: 'Mapped (4 Strands)',
    skills: 'Active (Paper 1 Matrix)',
    status: 'GREEN',
    statusLabel: '100% COMPLETE',
    guidance: 'Complete & Production Ready. Maintenance only.',
  },
  {
    id: 'cme_new',
    year: 'Year 10 (GCSE)',
    title: 'Conflict in the Middle East (1945–1995)',
    fourAct: 'Complete (15 Enquiries)',
    textbook: 'Gold (12p Publisher Textbooks KT1–3)',
    workbook: 'Gold (Flagship 16p Double-Page Booklets KT1–3)',
    themes: 'Mapped (4 Strands)',
    skills: 'Active (Consequence / Utility / Essay)',
    status: 'GREEN',
    statusLabel: '100% COMPLETE',
    guidance: 'Flagship GCSE Model. All 3 Key Topics finalized with 0px overflow.',
  },
  {
    id: 'industrialisation_and_empire',
    year: 'Year 8 (KS3)',
    title: 'Industrialisation, Empire & Power (1750–1901)',
    fourAct: 'Complete (8 Lessons)',
    textbook: 'Gold (18p Publisher Standard)',
    workbook: 'Gold (20p Master Double-Page Workbook)',
    themes: 'Mapped (4 Strands)',
    skills: 'Active (8-Skill Cycle)',
    status: 'GREEN',
    statusLabel: '100% GOLD',
    guidance: 'Production Ready for Term 2. 2-lesson delivery plans complete.',
  },
  {
    id: 'early_modern_world',
    year: 'Year 8 (KS3)',
    title: 'The Early Modern World (1450–1750)',
    fourAct: 'Complete (8 Enquiries)',
    textbook: 'Gold (20p Publisher Standard, Color Map, 0 Duplicates)',
    workbook: 'Gold (20p Universal Declarative Engine, V18 Fixed)',
    themes: 'Mapped (4 Strands on Cover)',
    skills: 'Active (8-Skill Cycle)',
    status: 'GREEN',
    statusLabel: '100% GOLD',
    guidance: 'Production Ready. Verified 0px overflow & synced to Drive.',
  },
  {
    id: 'trip_ypres',
    year: 'Year 10/11',
    title: 'Battlefield Tour: Ypres & The Somme',
    fourAct: 'Complete (14 Field Stops)',
    textbook: 'Gold (Field Companion & Parent Pack)',
    workbook: 'Digital Hub (Field app intentionally bypasses print)',
    themes: 'Mapped (Trench & Medical)',
    skills: 'Active',
    status: 'GREEN',
    statusLabel: '100% COMPLETE',
    guidance: 'Live Interactive Web Companion. Stable in production.',
  },
  {
    id: 'usa',
    year: 'Year 11 (GCSE)',
    title: 'The USA, 1954–75: Conflict at Home & Abroad',
    fourAct: 'Complete (16 Lessons)',
    textbook: 'Gold (36p Visual Guide, 4-4-4-4 Matrix)',
    workbook: 'Gold (Master 3-Pillar Consolidated Packs)',
    themes: 'Mapped (Civil Rights & Cold War)',
    skills: 'Active (4-4-4-4 Matrix)',
    status: 'GREEN',
    statusLabel: '100% COMPLETE',
    guidance: 'Complete & Active. Ongoing exam coaching.',
  },
  {
    id: 'great_war',
    year: 'Year 9 (KS3)',
    title: 'Causes of the Great War (1870–1914)',
    fourAct: 'Complete (6 Lessons)',
    textbook: 'Gold (14p Gold Standard Textbook)',
    workbook: 'Amber (Legacy Mastery Standard in pupils hands)',
    themes: 'Mapped (4 Strands)',
    skills: 'Partial',
    status: 'AMBER',
    statusLabel: 'CLASSROOM FROZEN',
    guidance: 'DO NOT TOUCH MID-TERM. Staged in feat/4act-v2-reprint for reprint window.',
  },
  {
    id: 'water_and_sanitation',
    year: 'Year 7 (KS3)',
    title: 'Water and Sanitation Through Time',
    fourAct: 'Amber (Partial 4-Act)',
    textbook: 'Gold (14p Publisher Textbook with Local Fieldwork)',
    workbook: 'Red (Legacy 4-Page Booklet in pupils hands)',
    themes: 'Mapped (4 Strands)',
    skills: 'Partial',
    status: 'AMBER',
    statusLabel: 'CLASSROOM FROZEN',
    guidance: 'DO NOT TOUCH MID-TERM. Staged in feat/4act-v2-reprint for reprint window.',
  },
  {
    id: 'eee',
    year: 'Year 11 (GCSE)',
    title: 'Early Elizabethan England, 1558–1588',
    fourAct: 'Amber (22 Sub-topics Authored)',
    textbook: 'Amber (Split across 3 KT Booklets)',
    workbook: 'Amber (Split across 3 KT Booklets)',
    themes: 'Partial',
    skills: 'Partial',
    status: 'RED',
    statusLabel: 'GCSE PRIORITY #1',
    guidance:
      'Top GCSE Target: Consolidate into 3 unified 16-page double-page booklets matching cme_new.',
  },
  {
    id: 'great_war_part2',
    year: 'Year 9 (KS3)',
    title: 'The Great War: Western Front & Aftermath',
    fourAct: 'Complete (9 Lessons Authored)',
    textbook: 'Amber (Draft companion textbook)',
    workbook: 'Amber (Pending 20p Universal Engine compile)',
    themes: 'Pending (Needs unit-specific strands)',
    skills: 'Pending (Needs 8-skill assignment)',
    status: 'AMBER',
    statusLabel: 'KS3 PRIORITY #1',
    guidance:
      'Top KS3 Target: Run scripts/generate_ks3_workbook.cjs to compile 20p workbook before class printing.',
  },
  {
    id: 'medieval_england',
    year: 'Year 7 (KS3)',
    title: 'Medieval England & Power (1066–1485)',
    fourAct: 'Complete (38 Sub-Units)',
    textbook: 'Amber (Comprehension format)',
    workbook: 'Amber (Needs 20p Double-Page migration)',
    themes: 'Default (Uses fallback KS3 strands)',
    skills: 'Partial',
    status: 'AMBER',
    statusLabel: 'KS3 PRIORITY #2',
    guidance:
      'Scheduled for KS3 Term 2: Group into 8 core enquiries and compile standard 20p workbook.',
  },
  {
    id: 'weimar_nazi_germany',
    year: 'Year 10/11 (GCSE)',
    title: 'Weimar and Nazi Germany, 1918–1939',
    fourAct: 'Amber (24 Lessons Authored)',
    textbook: 'Amber (Split in 4 separate booklets)',
    workbook: 'Red (Split in 4 separate booklets)',
    themes: 'Mapped (4 Strands)',
    skills: 'Partial',
    status: 'AMBER',
    statusLabel: 'GCSE PRIORITY #2',
    guidance:
      'Scheduled for Year 11: Convert to 16-page double-page spreads & 4-4-4-4 Visual Revision Guide.',
  },
  {
    id: 'the_shoah',
    year: 'Year 9 (KS3)',
    title: 'The Shoah (Holocaust Education)',
    fourAct: 'Red (Core text drafted)',
    textbook: 'Red (Pending)',
    workbook: 'Red (Legacy standalone)',
    themes: 'Pending',
    skills: 'Pending',
    status: 'RED',
    statusLabel: 'QUEUED (TERM 2/3)',
    guidance: 'Queued for Year 9 Term 2/3: 4-Act refactor & 2-page spread compilation.',
  },
  {
    id: 'cold_war',
    year: 'Year 9 (KS3)',
    title: 'The Cold War (1945–1991)',
    fourAct: 'Red (Prose drafted)',
    textbook: 'Red (Pending)',
    workbook: 'Red (Legacy standalone)',
    themes: 'Pending',
    skills: 'Pending',
    status: 'RED',
    statusLabel: 'QUEUED (TERM 3)',
    guidance: 'Queued for Year 9 Term 3: 4-Act refactor.',
  },
  {
    id: 'post_war_britain',
    year: 'Year 9 (KS3)',
    title: 'Rights, Protest & Post-War Britain',
    fourAct: 'Red (Prose drafted)',
    textbook: 'Red (Pending)',
    workbook: 'Red (Legacy standalone)',
    themes: 'Pending',
    skills: 'Pending',
    status: 'RED',
    statusLabel: 'QUEUED (TERM 3)',
    guidance: 'Queued for Year 9 Term 3: 4-Act refactor.',
  },
  {
    id: 'australia',
    year: 'Year 8/9 (KS3)',
    title: 'History of Australia (Elective Depth Study)',
    fourAct: 'Red (Draft modules)',
    textbook: 'Red (Pending)',
    workbook: 'Red (Legacy standalone)',
    themes: 'Pending',
    skills: 'Pending',
    status: 'RED',
    statusLabel: 'QUEUED',
    guidance: 'Elective Depth Study: Maintenance/queue.',
  },
];

function createCell(text, options = {}) {
  const {
    bold = false,
    color = '0F172A',
    fill = 'FFFFFF',
    size = 17, // half-points: 17 = 8.5pt
    align = AlignmentType.LEFT,
    widthPercent = null,
  } = options;

  return new TableCell({
    width: widthPercent ? { size: widthPercent, type: WidthType.PERCENTAGE } : undefined,
    shading: { fill, val: ShadingType.CLEAR },
    margins: {
      top: 140, // twips: ~7pt
      bottom: 140,
      left: 140,
      right: 140,
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      left: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
      right: { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' },
    },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text,
            bold,
            color,
            size,
            font: 'Segoe UI',
          }),
        ],
      }),
    ],
  });
}

function buildDocument() {
  const tableRows = [];

  // Header Row
  const headerCols = [
    { title: 'Unit ID & Title', width: 17 },
    { title: 'Year / Level', width: 9 },
    { title: '4-Act Narrative', width: 11 },
    { title: 'Master Textbook', width: 13 },
    { title: 'Master Workbook', width: 13 },
    { title: 'Thematic Strands', width: 9 },
    { title: 'Rotating Skills', width: 9 },
    { title: 'Overall State', width: 9 },
    { title: 'Immediate Next Action & Guidance', width: 10 },
  ];

  tableRows.push(
    new TableRow({
      tableHeader: true,
      children: headerCols.map(
        (col) =>
          new TableCell({
            width: { size: col.width, type: WidthType.PERCENTAGE },
            shading: { fill: '0F172A', val: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 140, right: 140 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 8, color: '0F172A' },
              bottom: { style: BorderStyle.SINGLE, size: 12, color: '0F172A' },
              left: { style: BorderStyle.SINGLE, size: 4, color: '334155' },
              right: { style: BorderStyle.SINGLE, size: 4, color: '334155' },
            },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: col.title,
                    bold: true,
                    color: 'FFFFFF',
                    size: 17, // 8.5pt
                    font: 'Segoe UI',
                  }),
                ],
              }),
            ],
          }),
      ),
    }),
  );

  // Data Rows
  UNITS_DATA.forEach((u, idx) => {
    const isEven = idx % 2 === 1;
    const baseFill = isEven ? 'F8FAFC' : 'FFFFFF';

    let statusFill = 'DCFCE7'; // light green
    let statusColor = '166534'; // dark green
    if (u.status === 'AMBER') {
      statusFill = 'FEF3C7'; // light amber
      statusColor = '92400E';
    } else if (u.status === 'RED') {
      statusFill = 'FEE2E2'; // light red
      statusColor = '991B1B';
    }

    tableRows.push(
      new TableRow({
        children: [
          createCell(`${u.title}\n(${u.id})`, {
            bold: true,
            color: '0F172A',
            fill: baseFill,
            widthPercent: 17,
          }),
          createCell(u.year, { fill: baseFill, align: AlignmentType.CENTER, widthPercent: 9 }),
          createCell(u.fourAct, { fill: baseFill, widthPercent: 11 }),
          createCell(u.textbook, { fill: baseFill, widthPercent: 13 }),
          createCell(u.workbook, { fill: baseFill, widthPercent: 13 }),
          createCell(u.themes, { fill: baseFill, align: AlignmentType.CENTER, widthPercent: 9 }),
          createCell(u.skills, { fill: baseFill, align: AlignmentType.CENTER, widthPercent: 9 }),
          createCell(u.statusLabel, {
            bold: true,
            color: statusColor,
            fill: statusFill,
            align: AlignmentType.CENTER,
            widthPercent: 9,
          }),
          createCell(u.guidance, { fill: baseFill, size: 16, color: '334155', widthPercent: 10 }),
        ],
      }),
    );
  });

  const mainTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: tableRows,
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: { orientation: PageOrientation.LANDSCAPE },
            margin: {
              top: 720, // 0.5 inch
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: [
          // Title Banner
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: 'THE HISTORY DEPARTMENT • CURRICULUM AUDIT & IMPLEMENTATION ROADMAP',
                bold: true,
                size: 32, // 16pt
                color: '0F172A',
                font: 'Segoe UI',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: '16-Unit Pedagogical Architecture, Companion Textbook & 20-Page Workbook Matrix (Single Source of Truth) • Academic Year 2026–2027',
                size: 20, // 10pt
                color: '475569',
                font: 'Segoe UI',
              }),
            ],
          }),

          // Executive Summary Banner Box
          new Paragraph({
            spacing: { after: 140 },
            children: [
              new TextRun({
                text: '🌟 4 Finished Master Gold Standards: ',
                bold: true,
                color: '15803D',
                size: 18,
                font: 'Segoe UI',
              }),
              new TextRun({
                text: 'Medicine in Britain (GCSE), Conflict in the Middle East (GCSE), Industrialisation & Empire (KS3), and The Early Modern World (KS3).\n',
                size: 18,
                color: '334155',
                font: 'Segoe UI',
              }),
              new TextRun({
                text: '🛡️ 2 Classroom-Protected Units (Do NOT modify live files): ',
                bold: true,
                color: 'B45309',
                size: 18,
                font: 'Segoe UI',
              }),
              new TextRun({
                text: 'Year 7 Sanitation and Year 9 Causes of the Great War (staged on branch feat/4act-v2-reprint for reprint window).\n',
                size: 18,
                color: '334155',
                font: 'Segoe UI',
              }),
              new TextRun({
                text: '🎯 Immediate Next Priority Actions: ',
                bold: true,
                color: '1E3A8A',
                size: 18,
                font: 'Segoe UI',
              }),
              new TextRun({
                text: 'KS3 Target: Compile Great War Part 2 (Western Front) into the 20p Universal Engine. • GCSE Target: Consolidate Early Elizabethan England into 16p master booklets.',
                size: 18,
                color: '334155',
                font: 'Segoe UI',
              }),
            ],
          }),

          // Main 16-Unit Audit Table
          mainTable,

          // Footer Notice
          new Paragraph({
            spacing: { before: 240 },
            children: [
              new TextRun({
                text: `Generated: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} • The History Department Revision Hub • Synchronized with DEPARTMENTAL_ROADMAP.md`,
                italics: true,
                size: 16,
                color: '64748B',
                font: 'Segoe UI',
              }),
            ],
          }),
        ],
      },
    ],
  });

  return doc;
}

async function exportWordDocument() {
  console.log(`\n======================================================`);
  console.log(`📄 Generating Word Document: 16-Unit Curriculum Roadmap`);
  console.log(`======================================================\n`);

  const doc = buildDocument();
  const buffer = await Packer.toBuffer(doc);

  // 1. Save to Desktop
  const desktopFile = path.join(DESKTOP_PATH, 'History_Curriculum_Master_Roadmap_16_Units.docx');
  try {
    fs.writeFileSync(desktopFile, buffer);
    console.log(`✅ Saved directly to Desktop: ${desktopFile}`);
  } catch (err) {
    console.warn(`⚠️ Warning: Could not write directly to Desktop:`, err.message);
  }

  // 2. Save to Repository (public/docs/)
  const repoDocsDir = path.join(ROOT_DIR, 'public', 'docs');
  fs.mkdirSync(repoDocsDir, { recursive: true });
  const repoFile = path.join(repoDocsDir, 'History_Curriculum_Master_Roadmap_16_Units.docx');
  fs.writeFileSync(repoFile, buffer);
  console.log(`✅ Saved to Repository: ${repoFile}`);

  // 3. Save to Google Drive Department File (if available)
  if (fs.existsSync(GDRIVE_PATH)) {
    try {
      const gDriveFile = path.join(GDRIVE_PATH, 'History_Curriculum_Master_Roadmap_16_Units.docx');
      fs.writeFileSync(gDriveFile, buffer);
      console.log(`✅ Synchronized to Google Drive: ${gDriveFile}`);
    } catch (gErr) {
      console.warn(`⚠️ Warning: Could not write to Google Drive:`, gErr.message);
    }
  }

  console.log(`\n🎉 Word Document successfully created and ready for inspection!`);
}

exportWordDocument().catch((err) => {
  console.error('❌ Error generating Word document:', err);
  process.exit(1);
});
