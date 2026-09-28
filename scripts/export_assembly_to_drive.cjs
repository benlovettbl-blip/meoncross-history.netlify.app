/**
 * History Revision Hub — Export Assembly to Dep File (Google Drive)
 *
 * Destination:
 * G:\My Drive\AAMX\Dep File\Assemblies\
 */

const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} = docx;

const DEP_FILE_ROOT = 'G:\\My Drive\\AAMX\\Dep File';
const ASSEMBLIES_DIR = path.join(DEP_FILE_ROOT, 'Assemblies');
const SUBDIR = path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Black_British_History');
const IMAGES_DIR = path.join(SUBDIR, 'Images');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const PDF_SRC = path.join(PUBLIC_DIR, 'pdfs', 'assembly_beyond_the_single_story_pupil_script.pdf');
const PPTX_SRC = path.join(PUBLIC_DIR, 'assembly_beyond_the_single_story.pptx');
const HTML_SRC = path.join(PUBLIC_DIR, 'assembly_beyond_the_single_story.html');
const LOCAL_IMG_DIR = path.join(PUBLIC_DIR, 'images', 'assembly');

async function createDocx() {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              bottom: 1000,
              left: 1200,
              right: 1200,
            },
          },
        },
        children: [
          new Paragraph({
            text: 'Beyond the Single Story – Deep Roots of Black British History',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: 'Whole School Assembly Script  •  4 Speakers  •  Time: ~8–10 Minutes',
                italics: true,
                color: '64748B',
              }),
            ],
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({ children: [new TextRun({ text: 'Speakers:', bold: true })] }),
                      new Paragraph({
                        children: [
                          new TextRun('Pupil 1, Pupil 2, Pupil 3, Pupil 4 (Equal delivery)'),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Core Historical Message:', bold: true })],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun(
                            'Black British history did not begin with the Windrush generation in 1948—it stretches back nearly two thousand years through the Roman Empire, Tudor courts, and the founding of modern Britain.',
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            spacing: { before: 300, after: 120 },
            text: 'Slide Structure & Presenter Allocations',
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: '• Slide 1: Beyond the Single Story (Title & 2,000-year timeline) — Pupil 1',
          }),
          new Paragraph({
            text: '• Slide 2: The Ivory Bangle Lady (c. 350 AD, Roman York) — Pupil 1',
          }),
          new Paragraph({ text: '• Slide 3: John Blanke (1511, Tudor Royal Court) — Pupil 2' }),
          new Paragraph({
            text: '• Slide 4: Dr. Harold Moody (1904–1947, Civil Rights Leader) — Pupil 3',
          }),
          new Paragraph({
            text: '• Slide 5: The Empire Windrush (1948, Rebuilding Britain & NHS) — Pupil 4',
          }),
          new Paragraph({
            text: "• Slide 6: Conclusion: 'How deep do our shared roots go?' — All 4 Pupils",
            spacing: { after: 300 },
          }),

          // Part 1
          new Paragraph({
            text: '1. Introduction: Challenging the Timeline',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: '[Slide 1: Title, then Advance to Slide 2: Ivory Bangle Lady]',
            italics: true,
            color: '475569',
            spacing: { after: 120 },
          }),
          new Paragraph({ text: 'PUPIL 1:', bold: true, color: '991B1B' }),
          new Paragraph({
            text: '"Good morning, everyone.\n\nWhen people talk about Black British history, many assume it begins in 1948 with the arrival of the Empire Windrush.\n\nWe often think of it as a relatively modern story. But history tells a very different tale. Black people have lived, worked, and shaped life on this island for nearly two thousand years.\n\nOur first story takes us all the way back to the 4th century, to Roman Britain—in the city of York.\n\nIn 1901, archaeologists uncovered a stone sarcophagus containing the skeleton of a woman. Along with her remains were expensive bracelets made of jet and elephant ivory, glass perfume bottles, and fine jewellery.\n\nForensic analysis revealed she was of North African descent, and she lived in York around the year 350 AD. She became known as the Ivory Bangle Lady.\n\nShe wasn’t an enslaved person or an outsider; she was a wealthy, high-status member of Roman British society. Her presence proves that Britain was multicultural long before it was even called Great Britain."',
            spacing: { after: 300 },
          }),

          // Part 2
          new Paragraph({
            text: '2. Tudor Royal Court: John Blanke',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: '[Advance to Slide 3: Westminster Tournament Roll]',
            italics: true,
            color: '475569',
            spacing: { after: 120 },
          }),
          new Paragraph({ text: 'PUPIL 2:', bold: true, color: '92400E' }),
          new Paragraph({
            text: '"Move forward a thousand years to Tudor England, and we find another remarkable figure: John Blanke.\n\nJohn Blanke was a gifted musician who served as a regular trumpeter in the royal courts of both King Henry VII and King Henry VIII.\n\nWe don\'t just know about him from written records—we can actually see him. In 1511, Henry VIII held a massive tournament to celebrate the birth of a royal son. An illuminated 60-foot scroll called the Westminster Tournament Roll was created to document the occasion.\n\nTwice on that scroll, John Blanke is painted riding a horse, wearing royal Tudor livery and playing his trumpet alongside the other royal musicians.\n\nCourt records also show something fascinating about his character: he wrote a petition directly to King Henry VIII asking for a pay rise—and the King approved it.\n\nJohn Blanke was a respected professional at the very centre of royal court ceremony."',
            spacing: { after: 300 },
          }),

          // Part 3
          new Paragraph({
            text: '3. Fighting for Equality: Dr. Harold Moody',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: '[Advance to Slide 4: Dr. Harold Moody]',
            italics: true,
            color: '475569',
            spacing: { after: 120 },
          }),
          new Paragraph({ text: 'PUPIL 3:', bold: true, color: '166534' }),
          new Paragraph({
            text: '"Fast-forward to London in the early 20th century, and meet Dr. Harold Moody.\n\nBorn in Jamaica, Harold arrived in Britain in 1904 to study medicine at King’s College London. He graduated top of his class and won numerous medical prizes.\n\nYet, when he applied for doctor roles in London hospitals, he was repeatedly turned down simply because of the colour of his skin.\n\nInstead of giving up, Dr. Moody opened his own private GP surgery in Peckham, South London, in 1913. He became beloved by the local community because he treated poor families for free when they couldn\'t afford medicine.\n\nIn 1931, seeing how Black people in Britain faced unfair barriers in finding jobs and renting homes, he founded the League of Coloured Peoples.\n\nDr. Moody campaigned tirelessly for decades, successfully challenging discriminatory housing policies and racist employment bans. He laid the direct groundwork for Britain’s modern race relations laws."',
            spacing: { after: 300 },
          }),

          // Part 4
          new Paragraph({
            text: '4. Rebuilding Modern Britain: The Windrush Generation',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: '[Advance to Slide 5: Empire Windrush & NHS]',
            italics: true,
            color: '475569',
            spacing: { after: 120 },
          }),
          new Paragraph({ text: 'PUPIL 4:', bold: true, color: '1E40AF' }),
          new Paragraph({
            text: '"That brings us to 1948 and the Empire Windrush.\n\nAfter the Second World War, Britain was devastated by bombing and facing a massive shortage of workers to rebuild towns, run transport systems, and staff hospitals.\n\nThe British government invited citizens from across the Commonwealth to come and help rebuild the country. Hundreds of Caribbean men, women, and families answered that call.\n\nThey became the engine room of modern Britain. They drove the buses, laid the railway tracks, and became the backbone of our newly founded National Health Service.\n\nThey also enriched British music, literature, food, and culture, turning events like the Notting Hill Carnival into celebrations known across the world.\n\nTheir resilience and contribution shaped the public services we all depend on every single day."',
            spacing: { after: 300 },
          }),

          // Part 5
          new Paragraph({
            text: '5. Conclusion & Whole School Reflection',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            text: '[Advance to Slide 6: Reflection Slide]',
            italics: true,
            color: '475569',
            spacing: { after: 120 },
          }),
          new Paragraph({ text: 'PUPIL 1:', bold: true, color: '991B1B' }),
          new Paragraph({
            text: '"So why does this matter?\n\nBecause history is not just about isolated dates; it is about belonging.\n\nFrom the Roman streets of York to the Tudor royal court, and from a community doctor’s surgery in South London to the arrival of the Windrush—Black history is not a separate topic tucked away for one month of the year.\n\nIt is part of the deep, continuous story of Britain itself."',
            spacing: { after: 140 },
          }),
          new Paragraph({ text: 'PUPIL 2:', bold: true, color: '92400E' }),
          new Paragraph({
            text: '"As we head into our day, let\'s remember that Britain’s story has always been built by people from diverse backgrounds working, creating, and standing together."',
            spacing: { after: 140 },
          }),
          new Paragraph({ text: 'PUPIL 3:', bold: true, color: '166534' }),
          new Paragraph({
            text: '"Take ten seconds of quiet now to reflect on how learning our full, shared history helps us build a stronger community today."',
            spacing: { after: 140 },
          }),
          new Paragraph({
            text: '[Pause for 10 seconds of whole-hall silence]',
            alignment: AlignmentType.CENTER,
            bold: true,
            color: '78350F',
            spacing: { before: 100, after: 140 },
          }),
          new Paragraph({ text: 'PUPIL 4:', bold: true, color: '1E40AF' }),
          new Paragraph({
            text: '"Thank you for your attention. Have a great day, everyone."',
            spacing: { after: 200 },
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
}

async function run() {
  if (!fs.existsSync(DEP_FILE_ROOT)) {
    console.error(`Error: Google Drive Dep File not found at ${DEP_FILE_ROOT}`);
    process.exit(1);
  }

  // Ensure directories exist
  if (!fs.existsSync(ASSEMBLIES_DIR)) {
    fs.mkdirSync(ASSEMBLIES_DIR, { recursive: true });
    console.log(`Created: ${ASSEMBLIES_DIR}`);
  }
  if (!fs.existsSync(SUBDIR)) {
    fs.mkdirSync(SUBDIR, { recursive: true });
    console.log(`Created: ${SUBDIR}`);
  }
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    console.log(`Created: ${IMAGES_DIR}`);
  }

  // 1. Copy PowerPoint presentation to both Assemblies root and subfolder
  const pptxDestRoot = path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Assembly.pptx');
  const pptxDestSub = path.join(SUBDIR, 'Beyond_the_Single_Story_Assembly.pptx');
  fs.copyFileSync(PPTX_SRC, pptxDestRoot);
  fs.copyFileSync(PPTX_SRC, pptxDestSub);
  console.log(`✅ Copied PPTX to: ${pptxDestRoot}`);
  console.log(`✅ Copied PPTX to: ${pptxDestSub}`);

  // 2. Copy 2-page Pupil Delivery Script PDF
  const pdfDestRoot = path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Pupil_Script.pdf');
  const pdfDestSub = path.join(SUBDIR, 'Beyond_the_Single_Story_Pupil_Script.pdf');
  fs.copyFileSync(PDF_SRC, pdfDestRoot);
  fs.copyFileSync(PDF_SRC, pdfDestSub);
  console.log(`✅ Copied Script PDF to: ${pdfDestRoot}`);
  console.log(`✅ Copied Script PDF to: ${pdfDestSub}`);

  // 3. Generate Word document (.docx)
  const docxBuffer = await createDocx();
  const docxDest = path.join(SUBDIR, 'Beyond_the_Single_Story_Assembly_Script.docx');
  const docxDestRoot = path.join(ASSEMBLIES_DIR, 'Beyond_the_Single_Story_Assembly_Script.docx');
  fs.writeFileSync(docxDest, docxBuffer);
  fs.writeFileSync(docxDestRoot, docxBuffer);
  console.log(`✅ Generated Word DOCX to: ${docxDest}`);
  console.log(`✅ Generated Word DOCX to: ${docxDestRoot}`);

  // 4. Copy standalone HTML presentation
  const htmlDest = path.join(SUBDIR, 'Beyond_the_Single_Story_Presentation.html');
  fs.copyFileSync(HTML_SRC, htmlDest);
  console.log(`✅ Copied HTML presentation to: ${htmlDest}`);

  // 5. Copy historical source images
  if (fs.existsSync(LOCAL_IMG_DIR)) {
    const imgFiles = fs.readdirSync(LOCAL_IMG_DIR);
    imgFiles.forEach((f) => {
      const srcFile = path.join(LOCAL_IMG_DIR, f);
      const destFile = path.join(IMAGES_DIR, f);
      fs.copyFileSync(srcFile, destFile);
    });
    console.log(`✅ Copied ${imgFiles.length} source images to: ${IMAGES_DIR}`);
  }

  // 6. Write README index file
  const readmeContent = `# Whole School Assembly: Beyond the Single Story

**Topic:** Deep Roots of Black British History: Roman York to the Modern Era
**Speakers:** Pupil 1, Pupil 2, Pupil 3, Pupil 4 (Equal 4-way delivery)
**Duration:** ~8–10 Minutes
**Slide Count:** 6 Slides (16:9 Widescreen)

## Files in this Folder

1. **\`Beyond_the_Single_Story_Assembly.pptx\`**
   - The master presentation for Microsoft PowerPoint or Google Slides.
   - 16:9 widescreen layout with dark navy/gold palette and authentic archival imagery.
   - **Speaker notes are embedded on every slide** with the exact pupil lines and slide triggers.

2. **\`Beyond_the_Single_Story_Pupil_Script.pdf\`**
   - Printable 2-page double-sided A4 delivery prompt sheet.
   - Side 1: Pupils 1 & 2 (Roman Britain & Tudor England).
   - Side 2: Pupils 3 & 4 + Shared Conclusion (Civil Rights, Windrush, 10s Silence).

3. **\`Beyond_the_Single_Story_Assembly_Script.docx\`**
   - Fully formatted Word document of the complete assembly script.

4. **\`Beyond_the_Single_Story_Presentation.html\`**
   - Standalone browser slide deck with built-in presenter notes and fullscreen mode (press \`F\`).

5. **\`Images/\`**
   - High-resolution authentic archival sources from York Museums Trust, The College of Arms, National Portrait Gallery, and Imperial War Museum.
`;
  fs.writeFileSync(path.join(SUBDIR, 'README.md'), readmeContent, 'utf8');
  fs.writeFileSync(path.join(ASSEMBLIES_DIR, 'README_Assemblies.md'), readmeContent, 'utf8');
  console.log(`✅ Written README documentation to Assemblies folder.`);
  console.log(`🎉 Assembly successfully placed in Dep File under: ${ASSEMBLIES_DIR}`);
}

run().catch((err) => {
  console.error('Export error:', err);
  process.exit(1);
});
