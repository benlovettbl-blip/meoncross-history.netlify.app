/**
 * History Revision Hub — Master Quality Assurance & Curriculum Architecture Suite
 *
 * Generates both:
 * 1. Microsoft Word Document (.docx) on Desktop & public/docs/
 * 2. High-Resolution PDF (.pdf) on Desktop & public/docs/
 *
 * Contains:
 * - Executive Guidance & Architectural Clarification (KS3 5-Act Enquiry vs GCSE Key Topics)
 * - The KS3 Chronological Master Scheme of Work (Years 7–9)
 * - The "Industrialisation & Empire" Restructuring Blueprint (Splitting the 8-Lesson Unit into two 5-Act Units)
 * - The 16-Point Master Quality Control & Verification Audit Matrix
 * - The Master Unit Registry & Status Tracker (KS3 & GCSE)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
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
const DESKTOP_DIR = 'C:\\Users\\fives\\Desktop';
const PUBLIC_DOCS_DIR = path.join(ROOT_DIR, 'public', 'docs');

if (!fs.existsSync(PUBLIC_DOCS_DIR)) {
  fs.mkdirSync(PUBLIC_DOCS_DIR, { recursive: true });
}

// -------------------------------------------------------------
// 1. DOCX GENERATION HELPERS
// -------------------------------------------------------------

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
      top: 120,
      bottom: 120,
      left: 120,
      right: 120,
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

function createHeading(text, level = HeadingLevel.HEADING_1) {
  const sizes = {
    [HeadingLevel.HEADING_1]: 28, // 14pt
    [HeadingLevel.HEADING_2]: 22, // 11pt
    [HeadingLevel.HEADING_3]: 19, // 9.5pt
  };
  return new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        color: '1E3A8A', // Navy
        size: sizes[level] || 22,
        font: 'Segoe UI',
      }),
    ],
  });
}

function createParagraph(text, options = {}) {
  const { bold = false, italic = false, color = '334155', size = 18, spaceAfter = 120 } = options;
  return new Paragraph({
    spacing: { after: spaceAfter },
    children: [
      new TextRun({
        text,
        bold,
        italic,
        color,
        size,
        font: 'Segoe UI',
      }),
    ],
  });
}

// -------------------------------------------------------------
// 2. BUILD DOCX DOCUMENT
// -------------------------------------------------------------

async function buildDocx() {
  console.log('📄 Assembling Master Word Document (.docx)...');

  // Table 1: 16-Point QA Checklist
  const qaChecks = [
    {
      num: '1',
      area: '5-Act Symmetry',
      spec: 'Exact 1:1 match: 5 app narrative acts = 5 left-hand workbook stages.',
      pitfall: '4 acts in app while workbook had 5 steps, or mismatched heading dates.',
      method: 'scripts/verify_workbook_to_app_alignment.cjs',
    },
    {
      num: '2',
      area: 'KS3 Model Answers',
      spec: 'Exactly 3 developed PEEL paragraphs (~250–350 words total). Accessible for Year 7–9.',
      pitfall: 'University-level 600-word historiographical essays with academic citations.',
      method: 'Word count check (250–350 words) & 3 paragraph count.',
    },
    {
      num: '3',
      area: 'Strict Signposting',
      spec: 'Words from the question appear TWICE in each paragraph (at start for Point, at end for Link).',
      pitfall: 'Missing question stems in paragraph conclusions, leading to argument drift.',
      method: 'Text inspection: check sentence 1 and final sentence of each PEEL point.',
    },
    {
      num: '4',
      area: 'Zero Giveaways',
      spec: 'Printed workbook stems & connectives must be purely structural (no facts, dates, or answers).',
      pitfall:
        'Sentence starters revealing answers (e.g. "Furthermore, Article 231 caused hyperinflation...").',
      method: 'Review writing frames in render_*_workbook.cjs.',
    },
    {
      num: '5',
      area: 'Visual Source Check',
      spec: 'Physical image exists on disk in public/images/ and visually depicts title & caption.',
      pitfall:
        'Poster labeled "Scrap of Paper" showing French troops; castle ruins labeled DORA censorship.',
      method: 'Disk verification + manual view_file inspection.',
    },
    {
      num: '6',
      area: 'How Useful Questions',
      spec: 'Accessible Edexcel-style source utility question with provenance prompts (Author, Audience, Motive).',
      pitfall:
        'Generic comprehension ("What does Source A show?") rather than disciplinary evaluation.',
      method: 'Check tariff: "How useful" in tasks array.',
    },
    {
      num: '7',
      area: 'Quiz Pack PDF Link',
      spec: 'Aligned 20-question (or 70+ master) Quiz Pack PDF generated and linked in unit hero banner.',
      pitfall: 'Dead link or missing PDF in public/pdfs/ on banner click.',
      method: 'Verify file in public/pdfs/ & test banner click.',
    },
    {
      num: '8',
      area: 'Hero Banners & Covers',
      spec: 'High-res authentic primary artwork/photos positioned cleanly (center 20%) with informative captions.',
      pitfall: 'Distorted aspect ratios, broken paths, or generic stock graphics.',
      method: 'Inspect banner.image & cover_image in data.js.',
    },
    {
      num: '9',
      area: 'School Anonymity',
      spec: '0 instances of school name, associated school email domains, or teacher surnames. Neutral branding.',
      pitfall: 'Accidental school badge, email, or teacher nameplate on covers or footers.',
      method: 'node scripts/verify_sanitization.cjs (Must be 100% clean).',
    },
    {
      num: '10',
      area: 'Page Budget / 0px Overflow',
      spec: 'Printed 16-page workbooks must enforce 0px overflow and >85% space budget utilization.',
      pitfall: 'Text spilling onto accidental page 17, or dead underflow gaps (>150px) at bottom.',
      method: 'node scripts/check_overflows.cjs <unit_id>.',
    },
    {
      num: '11',
      area: 'Do Now Recall Rule',
      spec: 'Do Now questions must STRICTLY test recall from previous lessons. Never current lesson.',
      pitfall:
        'Asking recall questions about text the student has not yet read in the current lesson.',
      method: 'Check do_now.questions against previous lesson titles.',
    },
    {
      num: '12',
      area: 'Rotating Vocab Tasks',
      spec: 'Printed workbooks dynamically rotate across 3 tasks: Cloze, Mapping, and Dual Distinction.',
      pitfall:
        'Repeating the identical fill-in-the-blank format every lesson, causing pupil fatigue.',
      method: 'Verify lessonIndex % 3 dynamic rotation in scripts.',
    },
    {
      num: '13',
      area: 'Domino Flowchart',
      spec: 'Timeline Do Nows must render as shuffled Domino Flowchart boxes requiring pupil causal arrows.',
      pitfall: 'Pre-sorted chronological table that removes active cognitive retrieval.',
      method: 'Check do_now.type === "timeline" styling in workbook.',
    },
    {
      num: '14',
      area: 'Teacher Notes & Hinge',
      spec: 'Root teacher_notes object with primer, objectives, and every visual source ending with Hinge Question.',
      pitfall: 'Missing teacher notes or source context lacking targeted Hinge Question.',
      method: 'Verify teacher_notes & **Hinge Question:** blurb.',
    },
    {
      num: '15',
      area: 'Zero AI Jargon',
      spec: 'Authentic classroom/exam board terminology only. Strictly no corporate buzzwords or AI filler.',
      pitfall: 'Using "Disciplinary Synthesis", "Holistic Framework", or "Specification Mastery".',
      method: 'Grep audit for forbidden marketing buzzwords.',
    },
    {
      num: '16',
      area: 'Strict No AI Images',
      spec: 'Strictly authentic historical photographs and primary source illustrations. Zero AI images.',
      pitfall: 'AI-generated illustrations or fantasy artwork masquerading as historical sources.',
      method: 'node verify_images.cjs (Must be 100% clean).',
    },
  ];

  const qaTableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        createCell('#', { bold: true, color: 'FFFFFF', fill: '1E3A8A', widthPercent: 5 }),
        createCell('Check Area', { bold: true, color: 'FFFFFF', fill: '1E3A8A', widthPercent: 18 }),
        createCell('Specification Standard', {
          bold: true,
          color: 'FFFFFF',
          fill: '1E3A8A',
          widthPercent: 32,
        }),
        createCell('Common Pitfall / Recent Error', {
          bold: true,
          color: 'FFFFFF',
          fill: '1E3A8A',
          widthPercent: 25,
        }),
        createCell('Verification Method', {
          bold: true,
          color: 'FFFFFF',
          fill: '1E3A8A',
          widthPercent: 20,
        }),
      ],
    }),
    ...qaChecks.map(
      (c) =>
        new TableRow({
          children: [
            createCell(c.num, { bold: true, color: '1E3A8A', fill: 'F8FAFC' }),
            createCell(c.area, { bold: true, color: '0F172A' }),
            createCell(c.spec, { color: '334155' }),
            createCell(c.pitfall, { color: 'DC2626' }),
            createCell(c.method, { color: '2563EB', size: 15 }),
          ],
        }),
    ),
  ];

  // Table 2: KS3 Scheme of Work
  const sowData = [
    {
      term: 'Y7 Term 1',
      unit: 'Water & Sanitation Through Time',
      type: 'Thematic Baseline',
      enq: '5 Enquiries: Roman Aqueducts, Medieval Miasma, 19th C Cholera/Snow, Bazalgette, Modern Water.',
      status: 'Production (Frozen)',
    },
    {
      term: 'Y7 Term 2',
      unit: 'Medieval England (1066–1485)',
      type: 'Enquiry Depth Study',
      enq: '5 Enquiries: 1066 Hastings, Norman Subjugation & Castles, Henry II vs Becket, Magna Carta, Black Death.',
      status: 'Active (Gold 16p)',
    },
    {
      term: 'Y7 Term 3',
      unit: 'The Early Modern World (1450–1600)',
      type: 'Enquiry Depth Study',
      enq: '5 Enquiries: Renaissance Humanism, Global Explorations, Reformation, Ottoman Empire, Scientific Rev.',
      status: 'Production (Frozen)',
    },
    {
      term: 'Y8 Term 1',
      unit: 'Monarchy, Religion & Power (1517–1689)',
      type: 'Enquiry Depth Study',
      enq: '5 Enquiries: Break with Rome, Elizabeth I Middle Way, Spanish Armada 1588, Civil War/Regicide, 1689 Bill of Rights.',
      status: 'Active (Gold 16p)',
    },
    {
      term: 'Y8 Term 2',
      unit: 'The First British Empire (1600–1783)',
      type: 'Enquiry Depth Study',
      enq: '5 Enquiries: Mughal Bengal & EIC, Transatlantic Slavery/Middle Passage, Caribbean Maroons, 13 Colonies, American Rev 1776.',
      status: 'Active (Gold 16p)',
    },
    {
      term: 'Y8 Term 3',
      unit: 'The Industrial Revolution (1750–1900)',
      type: 'Enquiry Depth Study [Split A]',
      enq: '5 Enquiries: Cort & Iron/Steam, Factory Floor & Child Labour, Slums & Cholera, Peterloo & Radicalism, Chartism & Democracy.',
      status: 'Restructuring (Split)',
    },
    {
      term: 'Y9 Term 1A',
      unit: 'The Second British Empire (1857–1914)',
      type: 'Enquiry Depth Study [Split B]',
      enq: '5 Enquiries: Post-1783 Pivot & Pax Britannica, EIC Rule in India, 1857 Indian Mutiny/Raj, Scramble for Africa, Imperial Verdict.',
      status: 'Restructuring (Split)',
    },
    {
      term: 'Y9 Term 1B',
      unit: 'Causes of the Great War (1871–1914)',
      type: 'Enquiry Depth Study',
      enq: '5 Enquiries: German Unification 1871, Scramble for Africa/Agadir, Dreadnought Naval Race, Balkan Crises, July Crisis 1914.',
      status: 'Active (Gold 16p)',
    },
    {
      term: 'Y9 Term 2A',
      unit: 'The Great War: Frontline & Peace (1914–1919)',
      type: 'Enquiry Depth Study',
      enq: '5 Enquiries: 1914 Desperation/BEF, Trenches/Haig/Somme, Forgotten Empire Troops, Munitionettes, Versailles 1919.',
      status: 'Active (Gold 16p)',
    },
    {
      term: 'Y9 Term 2B',
      unit: 'The Shoah (Holocaust Education)',
      type: 'Thematic Depth Study',
      enq: '5 Enquiries: Pre-War Jewish Life & Nazi Ideology, Ghettos & Segregation, Einsatzgruppen & Wannsee, Camps, Memory.',
      status: 'Queued (Term 2/3)',
    },
    {
      term: 'Y9 Term 3',
      unit: 'Rights, Protest & Post-War Britain',
      type: 'Modern Depth Study',
      enq: '5 Enquiries: Cold War Division, Decolonisation/Partition, Windrush Generation, NHS/Welfare State, Modern Protest.',
      status: 'Queued (Term 3)',
    },
  ];

  const sowTableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        createCell('Term', { bold: true, color: 'FFFFFF', fill: '1E3A8A', widthPercent: 12 }),
        createCell('Unit Title', { bold: true, color: 'FFFFFF', fill: '1E3A8A', widthPercent: 24 }),
        createCell('Type & Structure', {
          bold: true,
          color: 'FFFFFF',
          fill: '1E3A8A',
          widthPercent: 18,
        }),
        createCell('5-Enquiry Sequence Overview', {
          bold: true,
          color: 'FFFFFF',
          fill: '1E3A8A',
          widthPercent: 34,
        }),
        createCell('Status', { bold: true, color: 'FFFFFF', fill: '1E3A8A', widthPercent: 12 }),
      ],
    }),
    ...sowData.map(
      (s) =>
        new TableRow({
          children: [
            createCell(s.term, { bold: true, color: '1E3A8A', fill: 'F8FAFC' }),
            createCell(s.unit, { bold: true, color: '0F172A' }),
            createCell(s.type, { color: '475569' }),
            createCell(s.enq, { color: '334155' }),
            createCell(s.status, {
              color: s.status.includes('Active')
                ? '059669'
                : s.status.includes('Restructuring')
                  ? 'D97706'
                  : '475569',
              bold: true,
            }),
          ],
        }),
    ),
  ];

  // Table 3: Unit Splitting Blueprint
  const splitRows = [
    new TableRow({
      tableHeader: true,
      children: [
        createCell('Enquiry', { bold: true, color: 'FFFFFF', fill: '1E3A8A', widthPercent: 8 }),
        createCell('Unit A: The Industrial Revolution (1750–1900)', {
          bold: true,
          color: 'FFFFFF',
          fill: '1E3A8A',
          widthPercent: 46,
        }),
        createCell('Unit B: The Second British Empire (1857–1914)', {
          bold: true,
          color: 'FFFFFF',
          fill: '1E3A8A',
          widthPercent: 46,
        }),
      ],
    }),
    new TableRow({
      children: [
        createCell('Enq 1', { bold: true, color: '1E3A8A', fill: 'F8FAFC' }),
        createCell(
          'What powered the Industrial Revolution, and how did a Fareham ironmaster change the world? (Coal, steam, Henry Cort, puddling process, railway boom)',
          { color: '334155' },
        ),
        createCell(
          'From the Ashes of 1783: How did Britain pivot to a Second Global Empire? (Post-American Revolution pivot to Asia, Pax Britannica, Royal Navy supremacy)',
          { color: '334155' },
        ),
      ],
    }),
    new TableRow({
      children: [
        createCell('Enq 2', { bold: true, color: '1E3A8A', fill: 'F8FAFC' }),
        createCell(
          'Was industrial work progress or punishment? (Factory conditions, child labour, textile mills, coal mines, Luddite machine wrecking)',
          { color: '334155' },
        ),
        createCell(
          'The Jewel in the Crown: How did the East India Company subjugate India? (Robert Clive, Battle of Plassey, exploitation of regional divisions, economic drain)',
          { color: '334155' },
        ),
      ],
    }),
    new TableRow({
      children: [
        createCell('Enq 3', { bold: true, color: '1E3A8A', fill: 'F8FAFC' }),
        createCell(
          'Did industrialisation make British towns unlivable? (Urban migration, back-to-backs, miasma, cholera epidemics, Edwin Chadwick & public health)',
          { color: '334155' },
        ),
        createCell(
          'The Empire Strikes Back: Why did the 1857 Indian Rebellion erupt? (Greased cartridges, siege of Cawnpore, brutal retribution, shift to direct Crown Raj rule)',
          { color: '334155' },
        ),
      ],
    }),
    new TableRow({
      children: [
        createCell('Enq 4', { bold: true, color: '1E3A8A', fill: 'F8FAFC' }),
        createCell(
          'How did ordinary people fight for a voice? (Working-class radicalism, Peterloo Massacre 1819, Tolpuddle Martyrs, Chartism & the 6 demands)',
          { color: '334155' },
        ),
        createCell(
          'The Scramble for Africa: Civilising mission or armed plunder? (Berlin Conference 1884, Cecil Rhodes, Maxim guns, rubber/gold syndicates, Morel vs Kipling)',
          { color: '334155' },
        ),
      ],
    }),
    new TableRow({
      children: [
        createCell('Enq 5', { bold: true, color: '1E3A8A', fill: 'F8FAFC' }),
        createCell(
          "How did the road to democracy expand? (Great Reform Acts 1832/1867/1884, secret ballots, early women's suffrage movement)",
          { color: '334155' },
        ),
        createCell(
          'Who truly benefited from the British Empire? (Synoptic Assessment: British industrial elites vs British working class vs colonized indigenous populations)',
          { color: '334155' },
        ),
      ],
    }),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            orientation: PageOrientation.LANDSCAPE,
            margin: { top: 720, bottom: 720, left: 720, right: 720 }, // 0.5 in margins
          },
        },
        children: [
          createHeading(
            'The History Department — Quality Assurance & Curriculum Architecture Manual',
            HeadingLevel.HEADING_1,
          ),
          createParagraph(
            'Master Quality Control Audit Checklist, KS3 Chronological Scheme of Work (Years 7–9), and Unit Restructuring Blueprint.',
            { italic: true, size: 20 },
          ),

          createHeading(
            '1. Architectural Clarification: KS3 Enquiry Engine vs GCSE Key Topic Packs',
            HeadingLevel.HEADING_2,
          ),
          createParagraph(
            'The History Hub operates on a unified pedagogical engine across Key Stages 3 and 4, ensuring absolute consistency in classroom routines and cognitive rigor. Every unit features Do Now prior knowledge retrieval, physical primary visual sources with provenance prompts, 3-tier PEEL model answers with question signposting, zero knowledge giveaways in printed stems, and dedicated 20-question quiz packs.',
            { spaceAfter: 80 },
          ),
          createParagraph(
            "• Key Stage 3 Architecture (Years 7–9): Structured around Christine Counsell's 5-Act enquiry sequence. Each unit corresponds to a half-term sequence of exactly 5 lessons/enquiries, compiled into an executive 16-page master double-spread pupil workbook and companion textbook.",
            { spaceAfter: 80 },
          ),
          createParagraph(
            '• Key Stage 4 / GCSE Architecture (Years 10–11): Early Elizabethan England (eee), Conflict in the Middle East (cme_new), and Weimar & Nazi Germany are GCSE exam courses. They mirror the exact same 2-page double spread workbook engine, but are organized into official Pearson Edexcel Key Topics (KT1, KT2, KT3) rather than single half-term enquiries. Aligning GCSE units to this standard gives pupils a seamless, predictable learning routine from Year 7 through to their Year 11 exams.',
            { spaceAfter: 160 },
          ),

          createHeading(
            '2. The 16-Point Master Quality Control & Verification Audit Matrix',
            HeadingLevel.HEADING_2,
          ),
          createParagraph(
            'Every new or modified unit must pass all 16 audit gates before being certified for live classroom deployment and reprographics printing:',
            { spaceAfter: 80 },
          ),
          new Table({
            rows: qaTableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),

          new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [new TextRun({ text: '' })],
          }),

          createHeading(
            '3. The KS3 Chronological Master Scheme of Work (Years 7–9)',
            HeadingLevel.HEADING_2,
          ),
          createParagraph(
            'The Key Stage 3 curriculum follows an unbroken chronological narrative spine from the Norman Conquest through to modern Britain, with each half-term unit precisely calibrated to 5 enquiries (16-page workbook):',
            { spaceAfter: 80 },
          ),
          new Table({
            rows: sowTableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),

          new Paragraph({
            spacing: { before: 240, after: 120 },
            children: [new TextRun({ text: '' })],
          }),

          createHeading(
            '4. The "Industrialisation & Empire" Restructuring Blueprint',
            HeadingLevel.HEADING_2,
          ),
          createParagraph(
            'The current "Industrialisation, Empire & Power" unit contains 8 lessons, which breaks the 5-lesson / 16-page workbook architecture and blurs the vital distinction between domestic industrial transformation and global imperial expansion. Furthermore, sequencing it against "The First British Empire" (which ends in 1783 with the American Revolution) requires a clean two-unit chronological progression:',
            { spaceAfter: 80 },
          ),
          createParagraph(
            '• Split Unit A: "The Industrial Revolution: Coal, Iron & Democracy (1750–1900)" [Year 8 Term 3]: Covers domestic industrial mechanisation (Henry Cort), factory labour, urban cholera, Peterloo, Chartism, and electoral reform. Preceded directly by Year 8 Term 2 (The First British Empire, 1600–1783).',
            { spaceAfter: 80 },
          ),
          createParagraph(
            '• Split Unit B: "The Second British Empire: Raj, Scramble & Resistance (1857–1914)" [Year 9 Term 1A]: Explores how Britain built a second global empire in Asia and Africa following the loss of the 13 colonies, the 1857 Indian Mutiny, the Scramble for Africa, and the synoptic debate over imperial benefit. Precedes directly Year 9 Term 1B (Causes of the Great War, 1871–1914).',
            { spaceAfter: 120 },
          ),
          new Table({
            rows: splitRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
        ],
      },
    ],
  });

  const docxBuffer = await Packer.toBuffer(doc);
  const desktopDocxPath = path.join(
    DESKTOP_DIR,
    'History_Curriculum_QA_Checklist_and_KS3_Roadmap.docx',
  );
  const publicDocxPath = path.join(
    PUBLIC_DOCS_DIR,
    'History_Curriculum_QA_Checklist_and_KS3_Roadmap.docx',
  );

  fs.writeFileSync(desktopDocxPath, docxBuffer);
  fs.writeFileSync(publicDocxPath, docxBuffer);
  console.log(
    `✅ Word Document (.docx) saved to:\n   - ${desktopDocxPath}\n   - ${publicDocxPath}`,
  );
}

// -------------------------------------------------------------
// 3. BUILD HTML & RENDER PDF VIA PUPPETEER
// -------------------------------------------------------------

async function buildPdf() {
  console.log('📑 Assembling High-Resolution Executive PDF...');

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The History Department — QA & Curriculum Architecture Manual</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
    
    @page {
      size: A4 landscape;
      margin: 10mm;
    }
    
    body {
      font-family: 'Outfit', sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 8pt;
      line-height: 1.35;
    }
    
    .page-container {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 185mm;
      box-sizing: border-box;
    }
    
    .page-container:last-child {
      page-break-after: avoid;
    }
    
    .header-banner {
      background: #1e3a8a;
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 6px;
      margin-bottom: 12px;
      border-bottom: 3px solid #facc15;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .header-banner h1 {
      font-family: 'Playfair Display', serif;
      font-size: 15pt;
      margin: 0 0 2px 0;
      color: #ffffff;
    }
    
    .header-banner p {
      font-size: 8.5pt;
      margin: 0;
      color: #cbd5e1;
    }
    
    .tag {
      background: #facc15;
      color: #1e3a8a;
      font-weight: 700;
      font-size: 7.5pt;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 11pt;
      color: #1e3a8a;
      margin: 10px 0 6px 0;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 3px;
    }
    
    p.intro {
      font-size: 8pt;
      color: #334155;
      margin: 0 0 8px 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      font-size: 7.5pt;
    }
    
    th {
      background: #1e3a8a;
      color: #ffffff;
      font-weight: 600;
      text-align: left;
      padding: 5px 8px;
      border: 1px solid #1e3a8a;
    }
    
    td {
      padding: 4.5px 8px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
    }
    
    tr:nth-child(even) td {
      background-color: #f8fafc;
    }
    
    .code {
      font-family: monospace;
      color: #2563eb;
      font-size: 7pt;
      background: #eff6ff;
      padding: 1px 4px;
      border-radius: 3px;
    }
    
    .pitfall {
      color: #dc2626;
      font-weight: 500;
    }
    
    .badge-active {
      color: #059669;
      font-weight: 700;
      background: #ecfdf5;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
    }
    
    .badge-split {
      color: #d97706;
      font-weight: 700;
      background: #fffbeb;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
    }
    
    .footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 4px;
      display: flex;
      justify-content: space-between;
      color: #64748b;
      font-size: 7pt;
    }
    
    .callout {
      background: #f1f5f9;
      border-left: 4px solid #1e3a8a;
      padding: 6px 12px;
      border-radius: 0 4px 4px 0;
      margin-bottom: 8px;
      font-size: 7.5pt;
      color: #334155;
    }
  </style>
</head>
<body>

  <!-- PAGE 1: ARCHITECTURE & 16-POINT QA MATRIX -->
  <div class="page-container">
    <div>
      <div class="header-banner">
        <div>
          <h1>The History Department — Quality Assurance & Architecture Manual</h1>
          <p>Master Quality Control Checklist & Key Stage 3 Scheme of Work</p>
        </div>
        <div class="tag">Executive Reference</div>
      </div>
      
      <div class="callout">
        <strong>Architectural Clarification (KS3 vs GCSE):</strong> The History Revision Hub enforces a single, unified pedagogical engine across all units. <strong>KS3 Units (Years 7–9)</strong> are structured around Christine Counsell's 5-Act enquiry sequence (5 enquiries per half-term, 2-page double-spread per enquiry = 16-page master workbook). <strong>GCSE Units (Years 10–11)</strong>, such as Early Elizabethan England (<em>eee</em>) and Middle East (<em>cme_new</em>), utilize the identical double-page workbook engine and cognitive scaffolding, but are partitioned into Pearson Edexcel Key Topics (KT1, KT2, KT3) rather than single enquiries.
      </div>
      
      <h2>Master 16-Point Quality Control & Verification Matrix</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 4%;">#</th>
            <th style="width: 15%;">Audit Gate</th>
            <th style="width: 32%;">Specification Standard</th>
            <th style="width: 27%;">Common Pitfall / Observed Error</th>
            <th style="width: 22%;">Verification Protocol</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1</strong></td>
            <td><strong>5-Act Symmetry</strong></td>
            <td>Exact 1:1 match: 5 app narrative acts = 5 left-hand workbook stages.</td>
            <td class="pitfall">4 acts in app while workbook had 5 steps, or mismatched heading dates.</td>
            <td><span class="code">verify_workbook_to_app_alignment.cjs</span></td>
          </tr>
          <tr>
            <td><strong>2</strong></td>
            <td><strong>KS3 Model Answers</strong></td>
            <td>Exactly 3 developed PEEL paragraphs (~250–350 words total). Accessible for Year 7–9.</td>
            <td class="pitfall">University-level 600-word historiographical essays with obscure citations.</td>
            <td>Word count audit (250–350 words) &amp; exactly 3 paragraphs.</td>
          </tr>
          <tr>
            <td><strong>3</strong></td>
            <td><strong>Strict Signposting</strong></td>
            <td>Words from question appear TWICE in each paragraph (at start for Point, at end for Link).</td>
            <td class="pitfall">Missing question stems in paragraph conclusions, leading to argument drift.</td>
            <td>Inspect sentence 1 and final sentence of each PEEL point.</td>
          </tr>
          <tr>
            <td><strong>4</strong></td>
            <td><strong>Zero Giveaways</strong></td>
            <td>Printed workbook stems &amp; connectives must be purely structural (no facts, dates, answers).</td>
            <td class="pitfall">Starters revealing answers (e.g. "Furthermore, Article 231 caused hyperinflation...").</td>
            <td>Grep writing frames in <span class="code">render_*_workbook.cjs</span>.</td>
          </tr>
          <tr>
            <td><strong>5</strong></td>
            <td><strong>Visual Source Check</strong></td>
            <td>Physical image on disk in public/images/ visually depicts title and caption.</td>
            <td class="pitfall">Poster labeled "Scrap of Paper" showing French troops; castle ruins labeled DORA.</td>
            <td>Disk presence check + proactive <span class="code">view_file</span> inspection.</td>
          </tr>
          <tr>
            <td><strong>6</strong></td>
            <td><strong>How Useful Questions</strong></td>
            <td>Accessible Edexcel-style source utility question with provenance prompts (Author, Audience, Motive).</td>
            <td class="pitfall">Generic comprehension ("What does Source A show?") rather than utility evaluation.</td>
            <td>Check <span class="code">tariff: 'How useful'</span> with provenance scaffolding.</td>
          </tr>
          <tr>
            <td><strong>7</strong></td>
            <td><strong>Quiz Pack PDF Link</strong></td>
            <td>Aligned 20-question (or 70+ master) Quiz Pack PDF generated &amp; linked in unit hero banner.</td>
            <td class="pitfall">Dead link or missing PDF in <span class="code">public/pdfs/</span> on banner click.</td>
            <td>Verify file in <span class="code">public/pdfs/</span> &amp; test banner click.</td>
          </tr>
          <tr>
            <td><strong>8</strong></td>
            <td><strong>Hero Banners &amp; Covers</strong></td>
            <td>High-res authentic primary artwork/photos positioned cleanly (center 20%) with informative captions.</td>
            <td class="pitfall">Distorted aspect ratios, broken paths, or generic stock graphics.</td>
            <td>Inspect <span class="code">banner.image</span> &amp; <span class="code">cover_image</span> in data.js.</td>
          </tr>
          <tr>
            <td><strong>9</strong></td>
            <td><strong>School Anonymity</strong></td>
            <td>0 instances of school name, associated school email domains, or teacher surnames. Neutral branding.</td>
            <td class="pitfall">Accidental school badge, email, or teacher nameplate on covers or footers.</td>
            <td><span class="code">node scripts/verify_sanitization.cjs</span> (100% Clean).</td>
          </tr>
          <tr>
            <td><strong>10</strong></td>
            <td><strong>Universal Page Budget</strong></td>
            <td>Printed 16-page workbooks must enforce 0px overflow and &gt;85% space budget utilization.</td>
            <td class="pitfall">Text spilling onto accidental page 17, or dead underflow gaps (&gt;150px) at bottom.</td>
            <td><span class="code">node scripts/check_overflows.cjs &lt;unit_id&gt;</span></td>
          </tr>
          <tr>
            <td><strong>11</strong></td>
            <td><strong>Do Now Recall Rule</strong></td>
            <td>Do Now questions must STRICTLY test recall from previous lessons. Never current lesson.</td>
            <td class="pitfall">Asking recall questions about text the student has not yet read in current lesson.</td>
            <td>Check <span class="code">do_now.questions</span> against previous lessons.</td>
          </tr>
          <tr>
            <td><strong>12</strong></td>
            <td><strong>Rotating Vocab Tasks</strong></td>
            <td>Printed workbooks dynamically rotate across 3 tasks: Cloze, Mapping, and Dual Distinction.</td>
            <td class="pitfall">Repeating identical fill-in-the-blank format every lesson, causing pupil fatigue.</td>
            <td>Verify <span class="code">lessonIndex % 3</span> dynamic rotation in scripts.</td>
          </tr>
          <tr>
            <td><strong>13</strong></td>
            <td><strong>Domino Flowchart</strong></td>
            <td>Timeline Do Nows must render as shuffled Domino Flowchart boxes requiring pupil causal arrows.</td>
            <td class="pitfall">Pre-sorted chronological table that removes active cognitive retrieval.</td>
            <td>Check <span class="code">do_now.type === 'timeline'</span> in workbook template.</td>
          </tr>
          <tr>
            <td><strong>14</strong></td>
            <td><strong>Teacher Notes &amp; Hinge</strong></td>
            <td>Root teacher_notes object with primer, objectives, and every visual source ending with Hinge Question.</td>
            <td class="pitfall">Missing teacher notes or source context lacking targeted Hinge Question.</td>
            <td>Verify <span class="code">teacher_notes</span> &amp; <span class="code">**Hinge Question:**</span> blurb.</td>
          </tr>
          <tr>
            <td><strong>15</strong></td>
            <td><strong>Zero AI Jargon</strong></td>
            <td>Authentic classroom/exam board terminology only. Strictly no corporate buzzwords or AI filler.</td>
            <td class="pitfall">Using "Disciplinary Synthesis", "Holistic Framework", or "Specification Mastery".</td>
            <td>Grep audit for forbidden marketing buzzwords.</td>
          </tr>
          <tr>
            <td><strong>16</strong></td>
            <td><strong>Strict No AI Images</strong></td>
            <td>Strictly authentic historical photographs and primary source illustrations. Zero AI images.</td>
            <td class="pitfall">AI-generated illustrations or fantasy artwork masquerading as historical sources.</td>
            <td><span class="code">node verify_images.cjs</span> (100% Clean).</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer">
      <span>The History Department — Quality Assurance &amp; Curriculum Manual</span>
      <span>Page 1 of 2</span>
    </div>
  </div>

  <!-- PAGE 2: KS3 CHRONOLOGICAL SOW & UNIT SPLITTING BLUEPRINT -->
  <div class="page-container">
    <div>
      <div class="header-banner">
        <div>
          <h1>Key Stage 3 Chronological Scheme of Work &amp; Unit Splitting Blueprint</h1>
          <p>Unbroken Chronological Narrative Spine (Years 7–9) &amp; Industrialisation Split</p>
        </div>
        <div class="tag">Curriculum Architecture</div>
      </div>
      
      <h2>1. Key Stage 3 Chronological Master Scheme of Work (Years 7–9)</h2>
      <table>
        <thead>
          <tr>
            <th style="width: 10%;">Term</th>
            <th style="width: 25%;">Unit Title</th>
            <th style="width: 17%;">Structure</th>
            <th style="width: 36%;">5-Enquiry Sequence Overview</th>
            <th style="width: 12%;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Y7 Term 1</strong></td>
            <td><strong>Water &amp; Sanitation Through Time</strong></td>
            <td>Thematic Baseline</td>
            <td>Roman Aqueducts, Medieval Miasma, 19th C Cholera/Snow, Bazalgette, Modern Clean Water.</td>
            <td><span class="badge-active">Complete</span></td>
          </tr>
          <tr>
            <td><strong>Y7 Term 2</strong></td>
            <td><strong>Medieval England (1066–1485)</strong></td>
            <td>Enquiry Depth</td>
            <td>1066 Hastings, Norman Subjugation &amp; Castles, Henry II vs Becket, Magna Carta, Black Death.</td>
            <td><span class="badge-active">Gold 16p</span></td>
          </tr>
          <tr>
            <td><strong>Y7 Term 3</strong></td>
            <td><strong>The Early Modern World (1450–1600)</strong></td>
            <td>Enquiry Depth</td>
            <td>Renaissance Humanism, Global Explorations, Reformation, Ottoman Empire, Scientific Rev.</td>
            <td><span class="badge-active">Complete</span></td>
          </tr>
          <tr>
            <td><strong>Y8 Term 1</strong></td>
            <td><strong>Monarchy, Religion &amp; Power (1517–1689)</strong></td>
            <td>Enquiry Depth</td>
            <td>Break with Rome, Elizabeth I Middle Way, Spanish Armada 1588, Civil War/Regicide, 1689 Bill of Rights.</td>
            <td><span class="badge-active">Gold 16p</span></td>
          </tr>
          <tr>
            <td><strong>Y8 Term 2</strong></td>
            <td><strong>The First British Empire (1600–1783)</strong></td>
            <td>Enquiry Depth</td>
            <td>Mughal Bengal &amp; EIC, Transatlantic Slavery/Middle Passage, Caribbean Maroons, 13 Colonies, American Rev.</td>
            <td><span class="badge-active">Gold 16p</span></td>
          </tr>
          <tr>
            <td><strong>Y8 Term 3</strong></td>
            <td><strong>The Industrial Revolution (1750–1900)</strong></td>
            <td>Enquiry Depth [Split A]</td>
            <td>Cort &amp; Iron/Steam, Factory Floor &amp; Child Labour, Slums &amp; Cholera, Peterloo &amp; Radicalism, Chartism &amp; Democracy.</td>
            <td><span class="badge-split">Split Ready</span></td>
          </tr>
          <tr>
            <td><strong>Y9 Term 1A</strong></td>
            <td><strong>The Second British Empire (1857–1914)</strong></td>
            <td>Enquiry Depth [Split B]</td>
            <td>Post-1783 Pivot &amp; Pax Britannica, EIC Rule in India, 1857 Indian Mutiny/Raj, Scramble for Africa, Imperial Verdict.</td>
            <td><span class="badge-split">Split Ready</span></td>
          </tr>
          <tr>
            <td><strong>Y9 Term 1B</strong></td>
            <td><strong>Causes of the Great War (1871–1914)</strong></td>
            <td>Enquiry Depth</td>
            <td>German Unification 1871, Scramble for Africa/Agadir, Dreadnought Naval Race, Balkan Crises, July Crisis 1914.</td>
            <td><span class="badge-active">Gold 16p</span></td>
          </tr>
          <tr>
            <td><strong>Y9 Term 2A</strong></td>
            <td><strong>The Great War: Frontline &amp; Peace (1914–1919)</strong></td>
            <td>Enquiry Depth</td>
            <td>1914 Desperation/BEF, Trenches/Haig/Somme, Forgotten Empire Troops, Munitionettes, Versailles 1919.</td>
            <td><span class="badge-active">Gold 16p</span></td>
          </tr>
          <tr>
            <td><strong>Y9 Term 2B</strong></td>
            <td><strong>The Shoah (Holocaust Education)</strong></td>
            <td>Thematic Depth</td>
            <td>Pre-War Jewish Life &amp; Nazi Ideology, Ghettos &amp; Segregation, Einsatzgruppen &amp; Wannsee, Camps, Memory.</td>
            <td>Queued</td>
          </tr>
          <tr>
            <td><strong>Y9 Term 3</strong></td>
            <td><strong>Rights, Protest &amp; Post-War Britain</strong></td>
            <td>Modern Depth</td>
            <td>Cold War Division, Decolonisation/Partition, Windrush Generation, NHS/Welfare State, Modern Protest.</td>
            <td>Queued</td>
          </tr>
        </tbody>
      </table>

      <h2>2. "Industrialisation &amp; Empire" Restructuring Blueprint (Splitting the 8-Lesson Monster)</h2>
      <p class="intro">
        Splitting the 8-lesson unit into two standalone 5-act units resolves the 16-page budget overflow and creates a flawless chronological bridge between <strong>The First British Empire (1600–1783)</strong> and <strong>Causes of the Great War (1871–1914)</strong>:
      </p>
      <table>
        <thead>
          <tr>
            <th style="width: 8%;">Enquiry</th>
            <th style="width: 46%;">Unit A: The Industrial Revolution (1750–1900) [Year 8 Term 3]</th>
            <th style="width: 46%;">Unit B: The Second British Empire (1857–1914) [Year 9 Term 1A]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Enq 1</strong></td>
            <td><strong>What powered the Industrial Revolution?</strong><br>Henry Cort, puddling process, coal, steam power, ironworks, and the railway network.</td>
            <td><strong>From the Ashes of 1783: How did Britain pivot to a Second Empire?</strong><br>Post-American Revolution pivot to Asia, Royal Navy Pax Britannica, and commercial trade routes.</td>
          </tr>
          <tr>
            <td><strong>Enq 2</strong></td>
            <td><strong>Was industrial work progress or punishment?</strong><br>Factory floor discipline, child chimney sweeps and scavengers, textile mills, and Luddite resistance.</td>
            <td><strong>The Jewel in the Crown: How did the East India Company subjugate India?</strong><br>Robert Clive, Battle of Plassey, exploitation of Mughal fragmentation, and economic extraction.</td>
          </tr>
          <tr>
            <td><strong>Enq 3</strong></td>
            <td><strong>Did industrialisation make British towns unlivable?</strong><br>Slums, back-to-back housing, open sewers, cholera epidemics, and Edwin Chadwick's public health reform.</td>
            <td><strong>The Empire Strikes Back: Why did the 1857 Indian Rebellion erupt?</strong><br>Greased cartridges, sepoys, siege of Cawnpore, brutal British retribution, and shift to direct Crown Raj rule.</td>
          </tr>
          <tr>
            <td><strong>Enq 4</strong></td>
            <td><strong>How did ordinary people fight for a voice?</strong><br>Post-war distress, 1819 Peterloo Massacre, Tolpuddle Martyrs, and the rise of Chartism and the 6 demands.</td>
            <td><strong>The Scramble for Africa: Civilising mission or armed plunder?</strong><br>Berlin Conference 1884, Maxim guns, rubber/gold syndicates, and the debate between E.D. Morel and Rudyard Kipling.</td>
          </tr>
          <tr>
            <td><strong>Enq 5</strong></td>
            <td><strong>How did the road to democracy expand?</strong><br>Great Reform Acts 1832/1867/1884, secret ballots, trade unions, and the early women's suffrage movement.</td>
            <td><strong>Who truly benefited from the British Empire?</strong><br>Synoptic assessment weighing benefits for British industrial elites vs working-class soldiers vs colonized peoples.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer">
      <span>The History Department — Quality Assurance &amp; Curriculum Manual</span>
      <span>Page 2 of 2</span>
    </div>
  </div>

</body>
</html>
  `;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const desktopPdfPath = path.join(
    DESKTOP_DIR,
    'History_Curriculum_QA_Checklist_and_KS3_Roadmap.pdf',
  );
  const publicPdfPath = path.join(
    PUBLIC_DOCS_DIR,
    'History_Curriculum_QA_Checklist_and_KS3_Roadmap.pdf',
  );

  await page.pdf({
    path: desktopPdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '10mm',
      right: '10mm',
    },
  });

  // Copy to public/docs
  fs.copyFileSync(desktopPdfPath, publicPdfPath);

  await browser.close();
  console.log(`✅ High-Resolution PDF saved to:\n   - ${desktopPdfPath}\n   - ${publicPdfPath}`);
}

// -------------------------------------------------------------
// MAIN EXECUTION
// -------------------------------------------------------------

async function main() {
  console.log('=============================================================');
  console.log('🚀 GENERATING DESKTOP QA CHECKLIST & CURRICULUM ROADMAP');
  console.log('=============================================================\n');

  try {
    await buildDocx();
    await buildPdf();
    console.log('\n=============================================================');
    console.log('🎉 100% COMPLETE: Both Word (.docx) and PDF files ready on Desktop!');
    console.log('=============================================================\n');
  } catch (err) {
    console.error('❌ Error generating files:', err);
    process.exit(1);
  }
}

main();
